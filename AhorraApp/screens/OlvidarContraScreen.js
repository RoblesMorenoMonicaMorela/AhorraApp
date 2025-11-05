import React from 'react';
import { View,Text,TextInput,StyleSheet, TouchableOpacity,ScrollView, Image,} from 'react-native';
const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

export default function OlvidarContraScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Recuperar Contraseña</Text>
        
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
          Te ayudaremos a{'\n'}recuperar tu contraseña
        </Text>

        <Text style={styles.instruction}>
          Ingresa tu correo electrónico o nombre de usuario para recibir instrucciones de recuperación.
        </Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Correo o Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe aquí"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Enviar Instrucciones</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Volver al Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tertiaryButton}>
          <Text style={styles.tertiaryButtonText}>¿No tienes cuenta? Regístrate</Text>
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
    marginBottom: 15,
    lineHeight: 24,
    fontWeight: '500',
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
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
    marginBottom: 10,
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
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  tertiaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
  },
  tertiaryButtonText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
