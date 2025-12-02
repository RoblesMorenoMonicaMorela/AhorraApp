import { Text, StyleSheet, View, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';

import TransaccionesScreen from './TransaccionesScreen';
import AgregarTransaccionScreen from './AgregarTransaccionScreen';
import ListadoTransaccionesScreen from './ListadoTransaccionesScreen';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import RegistroScreen from './RegistroScreen';
import EditarTransaccionScreen from './EditarTransaccionScreen';
import OlvidarContraScreen from './OlvidarContraScreen';
import PresupuestoScreen from './PresupuestoScreen';
import EditarPresuScreen from './EditarPresuScreen';
import HomeScreen from './HomeScreen';
import PagosProgramadosScreen from './PagosProgramadosScreen';
import CrearPagoScreen from './CrearPagroScreen';
import EditarPagoScreen from './EditarPagoScreen';
import EstadisticasScreen from './EstadisticasScreen';
import NotificationsScreen from './NotificacionesScreen';
import PersonalizarScreen from './PersonalizarScreen';
import MonedaScreen from './MonedaScreen';
import PerfilScreen from './PerfilScreen';
import EditarPerfilScreen from './EditarPerfilScreen';
import AyudaScreen from './AyudaScreen';
import IdiomaScreen from './IdiomaScreen';
import SeguridadScreen from './SeguridadScreen.js';
import CambiarContraScreen from './CambiarContraScreen.js';
import ConfInicialScreen from './ConfInicialScreen.js';

export default function MenuScreen() {
  const [screen, setScreen] = useState('menu');
  switch (screen) {
    case 'transacciones':
      return <TransaccionesScreen />;
    case 'agregar':
      return <AgregarTransaccionScreen />;
    case 'listado':
      return <ListadoTransaccionesScreen />;
    case 'editartrans':
      return <EditarTransaccionScreen />;
    case 'login':
      return <LoginScreen />;
    case 'agregar':
    case 'main':
      return <MainScreen />;
    case 'registro':
      return <RegistroScreen />;
    case 'confinicial':
      return <ConfInicialScreen />;
    case 'contra':
      return <OlvidarContraScreen />;
    case 'presupuesto':
      return <PresupuestoScreen />;
    case 'editarpresu':
      return <EditarPresuScreen />;
    case 'home':
      return <HomeScreen />;
    case 'pagosprogra':
      return <PagosProgramadosScreen />;
    case 'crearpago':
      return <CrearPagoScreen />;
    case 'editarpago':
      return <EditarPagoScreen />;
    case 'estadisticas':
      return <EstadisticasScreen />;
    case 'notificaciones':
      return <NotificationsScreen />;
    case 'moneda':
      return <MonedaScreen />;
    case 'perfil':
      return <PerfilScreen />;
    case 'editarperfil':
      return <EditarPerfilScreen />;
    case 'ayuda':
      return <AyudaScreen />;
    case 'personalizar':
      return <PersonalizarScreen/>;
    case 'idioma':
      return <IdiomaScreen/>;
    case 'seguridad':
      return <SeguridadScreen/>;
    case 'cambiarcontra':
      return <CambiarContraScreen/>;

    case 'menu':
    default:
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titulo}>Proyecto: App de Finanzas</Text>
          <Text style={styles.subtitulo}>Menú Principal</Text>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Login"
              onPress={() => setScreen('login')}
              color="#4A90E2"
            />
          </View>

          <View style={styles.botonera}>
            <Button
              title="Pantalla Transacciones (Resumen)"
              onPress={() => setScreen('transacciones')}
              color="#4A90E2"
            />
          </View>
          
          <View style={styles.botonera}>
            <Button
              title="Pantalla Agregar Transacción (Form)"
              onPress={() => setScreen('agregar')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Listado Transacciones"
              onPress={() => setScreen('listado')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Editar Transaccion"
              onPress={() => setScreen('editartrans')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Main"
              onPress={() => setScreen('main')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Configuracion Inicial"
              onPress={() => setScreen('confinicial')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Registro"
              onPress={() => setScreen('registro')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Olvidar Contraseña"
              onPress={() => setScreen('contra')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Presupuesto"
              onPress={() => setScreen('presupuesto')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Editar Presupuesto"
              onPress={() => setScreen('editarpresu')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Home"
              onPress={() => setScreen('home')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Pagos Programados"
              onPress={() => setScreen('pagosprogra')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Crear Pagos Programados"
              onPress={() => setScreen('crearpago')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Editar Pagos Programados"
              onPress={() => setScreen('editarpago')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Estadisticas"
              onPress={() => setScreen('estadisticas')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Notificaciones"
              onPress={() => setScreen('notificaciones')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Personalizar"
              onPress={() => setScreen('personalizar')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Moneda"
              onPress={() => setScreen('moneda')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Perfil"
              onPress={() => setScreen('perfil')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Editar Perfil"
              onPress={() => setScreen('editarperfil')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Ayuda"
              onPress={() => setScreen('ayuda')}
              color="#4A90E2"
            />
          </View>
           <View style={styles.botonera}>
            <Button
              title="Pantalla Idioma"
              onPress={() => setScreen('idioma')}
              color="#4A90E2"
            />
          </View>
          <View style={styles.botonera}>
            <Button
              title="Pantalla Seguridad"
              onPress={() => setScreen('seguridad')}
              color="#4A90E2"
            />
          </View>
           <View style={styles.botonera}>
            <Button
              title="Pantalla Cambiar Contra"
              onPress={() => setScreen('cambiarcontra')}
              color="#4A90E2"
            />
          </View>
        </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fefefeff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 20,
    color: '#718096',
    marginBottom: 30,
    textAlign: 'center',
  },
  botonera: {
    width: '80%',
    marginVertical: 8, 
    borderRadius: 8,
    overflow: 'hidden',
  },
});