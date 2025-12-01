import DatabaseService from '../database/DatabaseService';

export class UsuarioController {
  
  async initialize() {
    await DatabaseService.initialize();
  }

  // Validar formato de email
  validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async registrar(nombre, email, password) {
    if (!nombre || !email || !password) throw new Error("Todos los campos son obligatorios.");
    if (!this.validarEmail(email)) throw new Error("Correo inválido.");
    if (password.length < 6) throw new Error("Contraseña mínima de 6 caracteres.");

    try {
      return await DatabaseService.registerUser(nombre, email, password);
    } catch (error) {
      throw new Error("No se pudo registrar. Es posible que el correo ya exista.");
    }
  }
  

  async login(email, password) {
    if (!email || !password) throw new Error("Ingresa correo y contraseña.");
    const user = await DatabaseService.loginUser(email, password);
    if (!user) throw new Error("Usuario o contraseña incorrectos.");
    return user;
  }

  // --- ESTA ES LA FUNCIÓN QUE FALTABA ---
  async actualizarPerfil(id, nombre, email, telefono, direccion) {
    if (!nombre || !email) throw new Error("Nombre y correo son obligatorios.");
    // Aquí podrías agregar más validaciones si quisieras
    return await DatabaseService.updateUser(id, nombre, email, telefono, direccion);
  }
}