import { Text, StyleSheet, View, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';

import TransaccionesScreen from './TransaccionesScreen';
import AgregarTransaccionScreen from './AgregarTransaccionScreen';
import ListadoTransaccionesScreen from './ListadoTransaccionesScreen';
import MainScreen from './MainScreen';
import RegistroScreen from './RegistroScreen';
import EditarTransaccionScreen from './EditarTransaccionScreen';
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
    case 'main':
      return <MainScreen />;  
    case 'registro':
      return <RegistroScreen />;  
    case 'menu':
    default:
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titulo}>Proyecto: App de Finanzas</Text>
          <Text style={styles.subtitulo}>Menú Principal</Text>

          <View style={styles.botonera}>
            <Button title="Pantalla Transacciones (Resumen)"onPress={() => setScreen('transacciones')}color="#4A90E2"/>
            <Button title="Pantalla Agregar Transacción (Form)" onPress={() => setScreen('agregar')}color="#4A90E2"/>
            <Button title="Pantalla Listado Transacciones" onPress={() => setScreen('listado')}color="#4A90E2"/>
            <Button title="Pantalla Editar Transaccion" onPress={() => setScreen('editartrans')}color="#4A90E2"/>
            <Button title="Pantalla Main" onPress={() => setScreen('main')}color="#4A90E2"/>
            <Button title="Pantalla Registro" onPress={() => setScreen('registro')}color="#4A90E2"/>
            
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