import React from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity,ScrollView,Image} from 'react-native';
const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

export default function RegistroScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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

        <View style={styles.headerCard}>
          <Text style={styles.logo}>Ahorra+</Text>
          <View style={styles.subtitle}>
            <Text style={styles.subtitleText}>Gestión de Finanzas</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Lleva control de tus{'\n'}gastos!
        </Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe aquí"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe aquí"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe aquí"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe aquí"
            placeholderTextColor="#999"
            secureTextEntry
          />

          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe aquí"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 18,
    color: '#999',
    marginBottom: 30,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 20,
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
  
  logoImage: {
    width: 80, 
    height: 80,
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
  headerCard: {
    width: '100%',
    marginBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#1976D2',
    paddingVertical: 15,
    paddingHorizontal: 20,
    textAlign: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  subtitle: {
    backgroundColor: '#1565C0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  subtitleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
    fontWeight: '500',
  },
  formContainer: {
    width: '100%',
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    marginBottom: 20,
    color: '#333',
  },
  primaryButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#1565C0',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
