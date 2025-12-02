import DatabaseService from '../database/DatabaseService';

export class UsuarioController {
  
  async initialize() {
    await DatabaseService.initialize();
  }

  async login(email, password) {
    const user = await DatabaseService.loginUser(email, password);
    if (!user) {
      throw new Error('Credenciales incorrectas');
    }
    return user;
  }

  async registrar(nombre, email, password) {
    if (!nombre || !email || !password) {
      throw new Error('Todos los campos son obligatorios');
    }
    try {
      const newUser = await DatabaseService.registerUser(nombre, email, password);
      return newUser;
    } catch (error) {
      throw new Error('Error al registrar: ' + error.message);
    }
  }

  // FUNCIÓN CORREGIDA PARA CAMBIO DE CONTRASEÑA DIRECTO
  async restablecerContrasenaDirecta(email, nuevaPass) {
    // 1. Validaciones
    if (!email) throw new Error("El correo es obligatorio.");
    if (!nuevaPass || nuevaPass.length < 4) throw new Error("La nueva contraseña debe tener al menos 4 caracteres.");

    // 2. Verificar que el usuario exista
    const existe = await DatabaseService.checkEmailExists(email);
    if (!existe) {
      throw new Error("No existe ninguna cuenta registrada con este correo.");
    }

    // 3. Actualizar
    await DatabaseService.updatePasswordByEmail(email, nuevaPass);
    return true;
  }
}