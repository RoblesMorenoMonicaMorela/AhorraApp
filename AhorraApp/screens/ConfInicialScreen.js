import React from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,TextInput,TouchableOpacity,KeyboardAvoidingView,Platform,Image,} from 'react-native';
//importaciones
const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');
//Carga de logo y componente principal
export default function ConfInicialScreen() {

  //safe area y keyboard
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.header}>Configuración inicial</Text>

          <View style={styles.iconContainer}>
            <Image
              source={LOGO_APP_IMAGE}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Configuración Inicial</Text>

          <Text style={styles.subtitle}>
            Completa tu perfil para comenzar a usar la app.
          </Text>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                ¿Cómo prefieres que te llamemos?
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Correo electrónico</Text>
              <TextInput
                style={styles.input}
                placeholder="correo@ejemplo.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                ¿Cuál es tu meta financiera?
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Ahorrar para vacaciones"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                ¿Cuál es tu entrada actual de ingresos?
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: $5,000"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {}}
            activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>Guardar y continuar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => {}}
            activeOpacity={0.7}>
            <Text style={styles.skipButtonText}>Omitir por ahora</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
//estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 20,
    marginBottom: 30,
    fontWeight: '500',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
});