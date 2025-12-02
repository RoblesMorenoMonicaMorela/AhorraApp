export class Presupuesto {
  constructor(id, usuarioId, categoria, montoMaximo) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.categoria = categoria;
    this.montoMaximo = Number(montoMaximo);
  }
}