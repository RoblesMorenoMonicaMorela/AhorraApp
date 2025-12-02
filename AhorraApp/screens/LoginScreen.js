import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

//Funcion LogInScreen (muestra la pantalla de registro/entrada)
export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  
  // Estado local para spinner
  const [localLoading, setLocalLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos vacíos", "Por favor ingresa tu correo y contraseña.");
      return;
    }

    setLocalLoading(true);
    try {
      await login(email, password);
      // Éxito: App.js cambiará la pantalla automáticamente
    } catch (error) {
      Alert.alert(
        "Error de Inicio de Sesión", 
        "Usuario no encontrado o contraseña incorrecta."
      );
    } finally {
      setLocalLoading(false);
    }
  };
//Inicio de Sesion
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          <View style={styles.iconContainer}>
            <View style={styles.piggyBankIcon}>
              <Image source={LOGO_APP_IMAGE} style={styles.logoImage} resizeMode="contain" />
            </View>
          </View>

          <View style={styles.headerCard}>
            <Text style={styles.logo}>Ahorra+</Text>
            <View style={styles.subtitle}>
              <Text style={styles.subtitleText}>Gestión de Finanzas</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="ejemplo@correo.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="******"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, localLoading && { opacity: 0.7 }]} 
            onPress={handleLogin}
            disabled={localLoading}
          >
            {localLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Ingresar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Recuperar')}
          >
            <Text style={styles.secondaryButtonText}>Olvidé mi contraseña</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{marginTop: 20}}
            onPress={() => navigation.navigate('Registro')}
          >
            <Text style={{color: '#1976D2', fontWeight:'600'}}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
//Seccion de estilos
const styles = StyleSheet.create({
  safeAreaContainer: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  scrollContainer: { flexGrow: 1 },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    paddingTop: 30, 
    paddingHorizontal: 20, 
    paddingBottom: 50 
  },
  title: { 
    fontSize: 18, 
    color: '#999', 
    marginBottom: 20 
  },
  iconContainer: { marginBottom: 20 },
  piggyBankIcon: { 
    width: 100, 
    height: 100, 
    backgroundColor: '#2196F3', 
    borderRadius: 50, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logoImage: { 
    width: 60, 
    height: 60 
  },
  headerCard: { 
    width: '100%', 
    marginBottom: 20 
  },
  logo: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: 'white', 
    backgroundColor: '#1976D2', 
    paddingVertical: 10, 
    textAlign: 'center', 
    borderTopLeftRadius: 8, 
    borderTopRightRadius: 8 
  },
  subtitle: { 
    backgroundColor: '#1565C0', 
    paddingVertical: 8, 
    borderBottomLeftRadius: 8, 
    borderBottomRightRadius: 8 
  },
  subtitleText: { 
    color: 'white', 
    fontSize: 14, 
    fontWeight: '600', 
    textAlign: 'center' 
  },
  formContainer: { 
    width: '100%', 
    marginBottom: 20 
  },
  label: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 5, 
    fontWeight: '500' 
  },
  input: { 
    backgroundColor: '#e0e0e0', 
    borderRadius: 5, 
    padding: 12, 
    marginBottom: 15, 
    color: '#333' 
  },
  primaryButton: { 
    backgroundColor: '#1976D2', 
    paddingVertical: 15, 
    borderRadius: 8, 
    width: '100%', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  buttonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  secondaryButton: { padding: 10 },
  secondaryButtonText: { 
    color: '#666', 
    fontSize: 14 
  },
});