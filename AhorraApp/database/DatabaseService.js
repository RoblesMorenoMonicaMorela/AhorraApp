import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
  constructor() {
    this.db = null;
    this.storageKeyUsers = 'usuarios_data';
    this.storageKeyTrans = 'transacciones_data';
    this.storageKeyPresu = 'presupuestos_data';
  }

  async initialize() {
    if (Platform.OS === 'web') {
      console.log('Inicializado en WEB (LocalStorage)');
    } else {
      console.log('Inicializado en MOVIL (SQLite Moderno)');
      try {
        this.db = await SQLite.openDatabaseAsync('financeapp.db');
        await this.db.execAsync('PRAGMA foreign_keys = ON;');

        await this.db.execAsync(`
          CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            telefono TEXT,
            direccion TEXT,
            fecha_creacion TEXT
          );

          CREATE TABLE IF NOT EXISTS transacciones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER,
            tipo TEXT NOT NULL,
            monto REAL NOT NULL,
            categoria TEXT,
            fecha TEXT,
            descripcion TEXT,
            FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
          );

          CREATE TABLE IF NOT EXISTS presupuestos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER,
            categoria TEXT,
            monto_maximo REAL,
            fecha TEXT,
            FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
          );
        `);

        try { await this.db.execAsync('ALTER TABLE usuarios ADD COLUMN telefono TEXT;'); } catch (e) {}
        try { await this.db.execAsync('ALTER TABLE usuarios ADD COLUMN direccion TEXT;'); } catch (e) {}
        try { await this.db.execAsync('ALTER TABLE presupuestos ADD COLUMN fecha TEXT;'); } catch (e) {}

      } catch (error) {
        console.error('Error al iniciar BD:', error);
      }
    }
  }

  // --- AYUDAS WEB ---
  _getWebData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }
  _saveWebData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // --- USUARIOS ---
  async registerUser(n, e, p) {
    const f = new Date().toISOString();
    if(Platform.OS==='web'){
       const u=this._getWebData(this.storageKeyUsers); 
       if(u.find(x=>x.email===e)) throw new Error("Email existe");
       const nu={id:Date.now(), nombre:n, email:e, password:p, telefono:'', direccion:'', fecha_creacion:f};
       u.push(nu); this._saveWebData(this.storageKeyUsers, u); return nu;
    } else {
       const r = await this.db.runAsync('INSERT INTO usuarios (nombre, email, password, telefono, direccion, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?)', [n,e,p,'','',f]);
       return {id:r.lastInsertRowId, nombre:n, email:e, telefono:'', direccion:'', fecha_creacion:f};
    }
  }
  async loginUser(e, p) {
    if(Platform.OS==='web') return this._getWebData(this.storageKeyUsers).find(u=>u.email===e && u.password===p);
    const r = await this.db.getAllAsync('SELECT * FROM usuarios WHERE email=? AND password=?', [e,p]);
    return r[0] || null;
  }
  async updateUser(id, n, e, t, d) {
    if(Platform.OS==='web'){
       const u=this._getWebData(this.storageKeyUsers); const idx=u.findIndex(x=>x.id===id);
       if(idx>=0){ u[idx]={...u[idx], nombre:n, email:e, telefono:t, direccion:d}; this._saveWebData(this.storageKeyUsers, u); return u[idx]; }
    } else {
       await this.db.runAsync('UPDATE usuarios SET nombre=?, email=?, telefono=?, direccion=? WHERE id=?', [n,e,t,d,id]);
       const r = await this.db.getAllAsync('SELECT * FROM usuarios WHERE id=?', [id]); return r[0];
    }
  }

  // --- NUEVO: RECUPERACIÓN DE CONTRASEÑA ---
  async checkEmailExists(email) {
    if (Platform.OS === 'web') {
      const users = this._getWebData(this.storageKeyUsers);
      return users.some(u => u.email.toLowerCase() === email.toLowerCase());
    } else {
      const result = await this.db.getAllAsync('SELECT id FROM usuarios WHERE email = ?', [email]);
      return result.length > 0;
    }
  }

  async updatePasswordByEmail(email, newPassword) {
    if (Platform.OS === 'web') {
      const users = this._getWebData(this.storageKeyUsers);
      const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
      if (index >= 0) {
        users[index].password = newPassword;
        this._saveWebData(this.storageKeyUsers, users);
        return true;
      }
      return false;
    } else {
      await this.db.runAsync(
        'UPDATE usuarios SET password = ? WHERE email = ?',
        [newPassword, email]
      );
      return true;
    }
  }

  // --- TRANSACCIONES ---
  async addTransaction(uid, t, m, c, f, d) {
    if(Platform.OS==='web'){
       const tr=this._getWebData(this.storageKeyTrans); const n={id:Date.now(), usuario_id:uid, tipo:t, monto:m, categoria:c, fecha:f, descripcion:d};
       tr.push(n); this._saveWebData(this.storageKeyTrans, tr); return n;
    } else {
       const r = await this.db.runAsync('INSERT INTO transacciones (usuario_id, tipo, monto, categoria, fecha, descripcion) VALUES (?, ?, ?, ?, ?, ?)', [uid,t,m,c,f,d]);
       return {id:r.lastInsertRowId, usuario_id:uid, tipo:t, monto:m, categoria:c, fecha:f, descripcion:d};
    }
  }
  async getTransactions(uid) {
    if(Platform.OS==='web') return this._getWebData(this.storageKeyTrans).filter(x=>x.usuario_id===uid);
    return await this.db.getAllAsync('SELECT * FROM transacciones WHERE usuario_id=? ORDER BY fecha DESC, id DESC', [uid]);
  }
  async updateTransaction(id, t, m, c, f, d) {
     if(Platform.OS==='web'){
        const tr=this._getWebData(this.storageKeyTrans); const idx=tr.findIndex(x=>x.id===id);
        if(idx>=0){ tr[idx]={...tr[idx], tipo:t, monto:m, categoria:c, fecha:f, descripcion:d}; this._saveWebData(this.storageKeyTrans, tr); return true; }
     } else {
        await this.db.runAsync('UPDATE transacciones SET tipo=?, monto=?, categoria=?, fecha=?, descripcion=? WHERE id=?', [t,m,c,f,d,id]); return true;
     }
  }
  async deleteTransaction(id) {
     if(Platform.OS==='web'){
        let tr=this._getWebData(this.storageKeyTrans); tr=tr.filter(x=>x.id!==id); this._saveWebData(this.storageKeyTrans, tr);
     } else {
        await this.db.runAsync('DELETE FROM transacciones WHERE id=?', [id]);
     }
  }

  // --- PRESUPUESTOS ---
  async getPresupuestos(usuarioId) {
    if (Platform.OS === 'web') {
      const data = this._getWebData(this.storageKeyPresu);
      return data.filter(p => p.usuario_id === usuarioId);
    } else {
      return await this.db.getAllAsync('SELECT * FROM presupuestos WHERE usuario_id = ? ORDER BY id DESC', [usuarioId]);
    }
  }

  async createPresupuesto(usuarioId, categoria, montoMaximo, fecha) {
    if (Platform.OS === 'web') {
      const data = this._getWebData(this.storageKeyPresu);
      const nuevo = { id: Date.now(), usuario_id: usuarioId, categoria, monto_maximo: montoMaximo, fecha };
      data.push(nuevo);
      this._saveWebData(this.storageKeyPresu, data);
    } else {
      await this.db.runAsync('INSERT INTO presupuestos (usuario_id, categoria, monto_maximo, fecha) VALUES (?, ?, ?, ?)', [usuarioId, categoria, montoMaximo, fecha]);
    }
  }

  async updatePresupuesto(id, categoria, montoMaximo, fecha) {
    if (Platform.OS === 'web') {
      const data = this._getWebData(this.storageKeyPresu);
      const index = data.findIndex(p => p.id === id);
      if (index >= 0) {
        data[index] = { ...data[index], categoria, monto_maximo: montoMaximo, fecha };
        this._saveWebData(this.storageKeyPresu, data);
      }
    } else {
      await this.db.runAsync('UPDATE presupuestos SET categoria = ?, monto_maximo = ?, fecha = ? WHERE id = ?', [categoria, montoMaximo, fecha, id]);
    }
  }

  async deletePresupuesto(id) {
    if (Platform.OS === 'web') {
      let data = this._getWebData(this.storageKeyPresu);
      data = data.filter(p => p.id !== id);
      this._saveWebData(this.storageKeyPresu, data);
    } else {
      await this.db.runAsync('DELETE FROM presupuestos WHERE id = ?', [id]);
    }
  }
}

export default new DatabaseService();