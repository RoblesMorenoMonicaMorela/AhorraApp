import React from 'react';
import {View, Text,TextInput,StyleSheet,TouchableOpacity,ScrollView,SafeAreaView,Image,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

export default function CrearPagoScreen() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.container}>
        <View style={styles.iconContainer}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.titulo}>Crear Pago Programado</Text>

        <Text style={styles.label}>Nombre del Pago</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Factura de luz"
          placeholderTextColor="#718096"
        />

        <Text style={styles.label}>Monto</Text>
        <TextInput
          style={styles.input}
          placeholder="$0.00"
          keyboardType="numeric"
          placeholderTextColor="#718096"
        />

        <Text style={styles.label}>Fecha</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 15 de marzo"
          placeholderTextColor="#718096"
        />

        <TouchableOpacity style={styles.botonPrincipal} onPress={() => {}}>
          <Text style={styles.botonPrincipalTexto}>Guardar Pago</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Icon name="home" size={28} color="#9CA3AF" />
        <Icon name="calendar-blank" size={28} color="#9CA3AF" />
        <Icon name="heart" size={28} color="#9CA3AF" />
        <Icon name="account" size={28} color="#9CA3AF" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#F4F8FF',
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 100,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#1A202C',
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 16,
  },
  botonPrincipal: {
    width: '100%',
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  botonPrincipalTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});
