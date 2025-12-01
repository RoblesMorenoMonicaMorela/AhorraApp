import DatabaseService from '../database/DatabaseService';

export class TransaccionController {
  
  // Función auxiliar para validar fechas reales
  _esFechaValida(fechaString) {
    // Formato esperado: YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(fechaString)) return false;

    // Desglosar componentes
    const [anio, mes, dia] = fechaString.split('-').map(Number);
    
    // Crear fecha en JS (Mes es índice 0-11)
    const fechaObj = new Date(anio, mes - 1, dia);

    // Verificar si JS tuvo que "corregir" la fecha (ej: 33 de Enero -> 2 de Febrero)
    // Si hubo corrección, significa que la fecha original era inválida.
    if (
      fechaObj.getFullYear() !== anio ||
      fechaObj.getMonth() !== mes - 1 ||
      fechaObj.getDate() !== dia
    ) {
      return false;
    }

    return true;
  }

  async crearTransaccion(usuarioId, tipo, monto, categoria, fecha, descripcion) {
    const montoNum = Number(monto);
    if (isNaN(montoNum) || montoNum <= 0) throw new Error("Monto inválido.");
    if (!categoria) throw new Error("Categoría obligatoria.");
    
    // VALIDACIÓN DE FECHA ESTRICTA
    if (!this._esFechaValida(fecha)) {
      throw new Error("Fecha inválida. Verifica que el día exista en el mes seleccionado.");
    }
    
    return await DatabaseService.addTransaction(usuarioId, tipo, montoNum, categoria, fecha, descripcion);
  }

  async obtenerTodas(usuarioId) {
    return await DatabaseService.getTransactions(usuarioId);
  }

  async eliminarTransaccion(id) {
    return await DatabaseService.deleteTransaction(id);
  }

  async actualizarTransaccion(id, tipo, monto, categoria, fecha, descripcion) {
     // También validamos al editar
     if (!this._esFechaValida(fecha)) {
        throw new Error("Fecha inválida.");
     }
     return await DatabaseService.updateTransaction(id, tipo, Number(monto), categoria, fecha, descripcion);
  }

  // Filtros para Estadísticas
  async obtenerTransaccionesPorFecha(usuarioId, mesIndex, anio) {
    const todas = await this.obtenerTodas(usuarioId);
    return todas.filter(t => {
      const [tAnio, tMes, tDia] = t.fecha.split('-').map(Number);
      return (tMes - 1) === mesIndex && tAnio === anio;
    });
  }

  calcularBalance(transacciones) {
    let ingresos = 0;
    let gastos = 0;
    transacciones.forEach(t => {
      if (t.tipo === 'ingreso') ingresos += t.monto;
      else if (t.tipo === 'gasto') gastos += t.monto;
    });
    return { ingresos, gastos, total: ingresos - gastos };
  }
  
  calcularPorCategoria(transacciones, tipo) {
      const items = transacciones.filter(t => t.tipo === tipo);
      const agrupado = items.reduce((acc, item) => {
          const cat = item.categoria || 'Otros';
          acc[cat] = (acc[cat] || 0) + item.monto;
          return acc;
      }, {});
      
      const colores = ['#F59E0B', '#10B981', '#8B5CF6', '#EF4444', '#3B82F6', '#6B7280'];
      let i = 0;
      return Object.keys(agrupado).map(key => ({
          label: key,
          value: agrupado[key],
          color: colores[i++ % colores.length]
      }));
  }
}