import React, { createContext, useState, useEffect, useContext } from 'react';
import { UsuarioController } from '../controllers/UsuarioController';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Este loading solo se usa para la carga inicial (Splash Screen)
  const [loading, setLoading] = useState(false); 
  
  const controller = new UsuarioController();

  useEffect(() => {
    controller.initialize();
  }, []);

  const login = async (email, password) => {
    // Ya no activamos loading global aquí
    try {
      const userData = await controller.login(email, password);
      setUser(userData);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const register = async (nombre, email, password) => {
    // Ya no activamos loading global aquí
    try {
      const newUser = await controller.registrar(nombre, email, password);
      setUser(newUser);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const actualizarUsuarioState = (nuevosDatos) => {
    setUser(nuevosDatos);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, actualizarUsuarioState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);