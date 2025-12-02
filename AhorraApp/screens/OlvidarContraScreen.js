import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, Alert } from 'react-native';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

export default function OlvidarContraScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleEnviar = () => {
    if (!email.trim()) {
      Alert.alert("Campo vacío", "Por favor ingresa tu correo para recuperar la contraseña.");
      return;
    }

    // Simulación de envío
    Alert.alert(
      "Correo Enviado",
      `Hemos enviado instrucciones de recuperación a ${email}. Por favor revisa tu bandeja de entrada.`,
      [
        { text: "OK", onPress: () => navigation.goBack() } 
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Recuperar Contraseña</Text>
          
          <View style={styles.iconContainer}>
            <View style={styles.piggyBankIcon}>
              <Image source={LOGO_APP_IMAGE} style={styles.logoImage} resizeMode="contain" />
            </View>
          </View>

          <Text style={styles.instruction}>
            Ingresa tu correo electrónico para recibir instrucciones de recuperación.
          </Text>

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
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleEnviar}>
            <Text style={styles.buttonText}>Enviar Instrucciones</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Volver al Inicio</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  scrollContainer: { flexGrow: 1 },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    paddingTop: 40, 
    paddingHorizontal: 20 
  },
  title: { 
    fontSize: 18, 
    color: '#999', 
    marginBottom: 30 
  },
  iconContainer: { marginBottom: 30 },
  piggyBankIcon: { width: 100, height: 100, backgroundColor: '#2196F3', borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
  logoImage: { width: 60, height: 60 },
  instruction: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30 },
  formContainer: { width: '100%', marginBottom: 20 },
  label: { fontSize: 14, color: '#333', marginBottom: 8, fontWeight: '500' },
  input: { backgroundColor: '#e0e0e0', borderRadius: 5, padding: 12, color: '#333' },
  primaryButton: { backgroundColor: '#1976D2', paddingVertical: 15, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 15 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  secondaryButton: { padding: 10 },
  secondaryButtonText: { color: '#1976D2', fontSize: 14 },
});
