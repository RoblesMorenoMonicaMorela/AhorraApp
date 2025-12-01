import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

export default function RegistroScreen({ navigation }) {
  const { register } = useAuth();
  
  // Estado de carga LOCAL (solo afecta al botón)
  const [localLoading, setLocalLoading] = useState(false);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegistro = async () => {
    // 1. Validaciones
    if (!nombre.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Campos vacíos", "Por favor llena todos los campos.");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Correo inválido", "Verifica que el correo esté bien escrito.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Contraseña Insegura", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    // 2. Proceso de Registro con carga local
    setLocalLoading(true); 
    try {
      await register(nombre, email, password);
      
      Alert.alert(
        "¡Registro Exitoso!",
        "Bienvenido a Ahorra+. Tu cuenta ha sido creada.",
        [{ text: "Continuar" }] 
      );
    } catch (error) {
      Alert.alert("Error de Registro", error.message);
    } finally {
      setLocalLoading(false); // Desbloqueamos el botón
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Crear Cuenta</Text>
          
          <View style={styles.iconContainer}>
            <View style={styles.piggyBankIcon}>
              <Image source={LOGO_APP_IMAGE} style={styles.logoImage} resizeMode="contain" />
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Juan Pérez"
              placeholderTextColor="#999"
              value={nombre}
              onChangeText={setNombre}
            />

            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="correo@ejemplo.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Text style={styles.label}>Confirmar Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Repite tu contraseña"
              placeholderTextColor="#999"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, localLoading && { opacity: 0.7 }]} 
            onPress={handleRegistro}
            disabled={localLoading}
          >
            {localLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Registrarse</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>Ya tengo cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, alignItems: 'center', paddingTop: 20, paddingHorizontal: 20, paddingBottom: 40 },
  title: { fontSize: 18, color: '#999', marginBottom: 20 },
  iconContainer: { marginBottom: 20 },
  piggyBankIcon: { width: 80, height: 80, backgroundColor: '#2196F3', borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
  logoImage: { width: 50, height: 50 },
  formContainer: { width: '100%', marginBottom: 20 },
  label: { fontSize: 14, color: '#333', marginBottom: 5, fontWeight: '500' },
  input: { backgroundColor: '#e0e0e0', borderRadius: 5, padding: 12, marginBottom: 15, color: '#333' },
  primaryButton: { backgroundColor: '#1976D2', paddingVertical: 15, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 15 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  secondaryButton: { padding: 10 },
  secondaryButtonText: { color: '#1976D2', fontSize: 14, fontWeight: '600' },
});