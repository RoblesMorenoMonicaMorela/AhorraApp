export class Transaccion {
  constructor(id, usuarioId, tipo, monto, categoria, fecha, descripcion) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.tipo = tipo; // 'ingreso' o 'gasto'
    this.monto = Number(monto);
    this.categoria = categoria;
    this.fecha = fecha;
    this.descripcion = descripcion || '';
  }
}