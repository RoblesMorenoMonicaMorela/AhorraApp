import DatabaseService from '../database/DatabaseService';
import { TransaccionController } from './TransaccionController';

export class PresupuestoController {
  
  // Obtener y filtrar (Requisito: filtros por categoría y por fecha)
  async obtenerPresupuestos(usuarioId, filtroCategoria = '', filtroFecha = '') {
    try {
      let datos = await DatabaseService.getPresupuestos(usuarioId);
      
      // Aplicar filtros
      if (filtroCategoria) {
        datos = datos.filter(p => p.categoria.toLowerCase().includes(filtroCategoria.toLowerCase()));
      }
      if (filtroFecha) {
        datos = datos.filter(p => p.fecha && p.fecha.includes(filtroFecha));
      }
      
      return datos;
    } catch (error) {
      console.error("Error obteniendo presupuestos:", error);
      return [];
    }
  }

  async crearNuevoPresupuesto(usuarioId, categoria, monto, fecha) {
    if (!categoria || !monto || !fecha) throw new Error("Todos los campos son obligatorios");
    await DatabaseService.createPresupuesto(usuarioId, categoria, Number(monto), fecha);
  }

  async editarPresupuesto(id, categoria, monto, fecha) {
    if (!categoria || !monto) throw new Error("Campos inválidos");
    await DatabaseService.updatePresupuesto(id, categoria, Number(monto), fecha);
  }

  async eliminarPresupuesto(id) {
    await DatabaseService.deletePresupuesto(id);
  }

  // Validación de gasto vs presupuesto (Busca el presupuesto más relevante para la fecha actual)
  async verificarSiExcedePresupuesto(usuarioId, categoria, montoNuevo) {
    try {
      const allPresupuestos = await this.obtenerPresupuestos(usuarioId);
      
      // Buscar un presupuesto que coincida con la categoría y el mes actual
      // (Asumiendo formato YYYY-MM para la fecha del presupuesto)
      const hoy = new Date();
      const mesActual = hoy.toISOString().slice(0, 7); // "2025-11"
      
      // Intentamos encontrar uno específico de este mes, sino uno general (sin fecha)
      const presupuestoCat = allPresupuestos.find(p => 
        p.categoria.toLowerCase() === categoria.toLowerCase() && 
        (p.fecha === mesActual || !p.fecha)
      );

      if (!presupuestoCat) return false;

      const transController = new TransaccionController();
      const transaccionesMes = await transController.obtenerTransaccionesPorFecha(
        usuarioId, 
        hoy.getMonth(), 
        hoy.getFullYear()
      );

      const gastosActuales = transaccionesMes
        .filter(t => t.tipo === 'gasto' && t.categoria.toLowerCase() === categoria.toLowerCase())
        .reduce((acc, t) => acc + t.monto, 0);

      return (gastosActuales + Number(montoNuevo)) > presupuestoCat.monto_maximo;
    } catch (error) {
      return false;
    }
  }
}