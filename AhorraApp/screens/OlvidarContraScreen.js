import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, Alert } from 'react-native';
// IMPORTANTE: Importamos el controlador
import { UsuarioController } from '../controllers/UsuarioController';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

export default function OlvidarContraScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const controller = new UsuarioController();

  const handleRestablecer = async () => {
    // IMPORTANTE: Limpiamos los espacios en blanco para evitar errores
    const correoLimpio = email.trim();
    const passLimpia = newPassword.trim();

    if (!correoLimpio || !passLimpia) {
      Alert.alert("Atención", "Por favor ingresa tu correo y la nueva contraseña.");
      return;
    }

    setLoading(true);
    try {
      // Llamada directa al controlador local
      await controller.restablecerContrasenaDirecta(correoLimpio, passLimpia);
      
      Alert.alert(
        "¡Éxito!", 
        "Contraseña actualizada correctamente. Ahora puedes iniciar sesión con tu nueva clave.",
        [{ text: "Ir al Login", onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Restablecer Contraseña</Text>
          
          <View style={styles.iconContainer}>
            <View style={styles.piggyBankIcon}>
              <Image source={LOGO_APP_IMAGE} style={styles.logoImage} resizeMode="contain" />
            </View>
          </View>

          <Text style={styles.instruction}>
            Ingresa tu correo registrado y define tu nueva contraseña.
          </Text>

          {/* CAMPO DE CORREO */}
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

          {/* CAMPO DE NUEVA CONTRASEÑA */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Nueva Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu nueva contraseña"
              placeholderTextColor="#999"
              secureTextEntry={true} // Oculta la contraseña
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, loading && { opacity: 0.7 }]} 
            onPress={handleRestablecer}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Actualizando..." : "Cambiar Contraseña"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, 
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
  instruction: { 
    fontSize: 14, 
    color: '#666', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  formContainer: { 
    width: '100%', 
    marginBottom: 15 
  },
  label: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 8, 
    fontWeight: '500' 
  },
  input: { 
    backgroundColor: '#e0e0e0', 
    borderRadius: 5, 
    padding: 12, 
    color: '#333' 
  },
  primaryButton: { 
    backgroundColor: '#1976D2', 
    paddingVertical: 15, 
    borderRadius: 8, 
    width: '100%', 
    alignItems: 'center', 
    marginBottom: 15, 
    marginTop: 10 
  },
  buttonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  secondaryButton: { padding: 10 },
  secondaryButtonText: { 
    color: '#1976D2', 
    fontSize: 14 
  },
});