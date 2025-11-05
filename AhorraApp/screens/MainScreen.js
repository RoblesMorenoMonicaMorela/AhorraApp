/* importamos lo necesario */
import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity, Image} from 'react-native';
const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png'); 
export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página de Registro</Text>
      
      <View style={styles.iconContainer}>
        
        <View style={styles.piggyBankIcon}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage} 
            resizeMode="contain"
          />
        </View>
        <View style={styles.infoIcon}>
          <Text style={styles.infoText}>ℹ️</Text>
        </View>
      </View>

      <Text style={styles.logo}>Ahorra+</Text>
      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>Gestión de Finanzas</Text>
      </View>

      <Text style={styles.description}>
        Lleva el control de{'\n'}tus gastos!
      </Text>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    color: '#999',
    marginBottom: 30,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  piggyBankIcon: {
    width: 120,
    height: 120,
    backgroundColor: '#2196F3',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', 
  },
  infoIcon: {
    position: 'absolute',
    right: -10,
    top: 0,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  infoText: {
    fontSize: 18,
  },
  logo: { 
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  subtitle: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 30,
  },
  subtitleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  logoImage: {
    width: 80, 
    height: 80,
  }
});
