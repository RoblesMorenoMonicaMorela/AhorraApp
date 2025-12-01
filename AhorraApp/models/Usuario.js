export class Usuario {
  constructor(id, nombre, email, password, telefono, direccion, fechaCreacion) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.telefono = telefono || '';
    this.direccion = direccion || '';
    this.fechaCreacion = fechaCreacion;
  }
}