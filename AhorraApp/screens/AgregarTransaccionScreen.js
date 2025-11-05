import React, { useState } from 'react';
import { View,Text,TextInput,StyleSheet,TouchableOpacity,ScrollView,SafeAreaView,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AgregarTransaccionScreen() {
  const [tipo, setTipo] = useState('gasto');

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Agregar Transacción</Text>

        <Text style={styles.label}>Tipo de Transacción</Text>
        <View style={styles.selectorContainer}>
          <TouchableOpacity
            style={[
              styles.selectorBoton,
              tipo === 'gasto'
                ? styles.selectorActivoGasto
                : styles.selectorInactivo,
            ]}
            onPress={() => setTipo('gasto')}>
            <Text
              style={[
                tipo === 'gasto'
                  ? styles.selectorTextoActivo
                  : styles.selectorTextoInactivo,
              ]}>
              Gasto
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectorBoton,
              tipo === 'ingreso'
                ? styles.selectorActivoIngreso
                : styles.selectorInactivo,
            ]}
            onPress={() => setTipo('ingreso')}>
            <Text
              style={[
                tipo === 'ingreso'
                  ? styles.selectorTextoActivo
                  : styles.selectorTextoInactivo,
              ]}>
              Ingreso
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Monto</Text>
        <TextInput
          style={styles.input}
          placeholder="$0.00"
          keyboardType="numeric"
          placeholderTextColor="#718096"
        />

        <Text style={styles.label}>Categoría</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Alimentación, Transporte..."
          placeholderTextColor="#718096"
        />

        <Text style={styles.label}>Fecha</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#718096"
        />

        <Text style={styles.label}>Descripción (Opcional)</Text>
        <TextInput
          style={styles.multilineInput}
          placeholder="Ej: Café con amigos..."
          multiline={true}
          numberOfLines={3}
          placeholderTextColor="#718096"
        />

        <TouchableOpacity style={styles.botonPrincipal} onPress={() => {}}>
          <Text style={styles.botonPrincipalTexto}>Guardar Transacción</Text>
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
    backgroundColor: '#F4F8FF',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 100, // Espacio para que el botón no quede detrás del Nav Bar
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 30,
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
  multilineInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    height: 80,
    textAlignVertical: 'top',
  },
  selectorContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  selectorBoton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectorActivoGasto: {
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
  },
  selectorActivoIngreso: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  selectorInactivo: {
    backgroundColor: '#FFFFFF',
  },
  selectorTextoActivo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectorTextoInactivo: {
    color: '#718096',
    fontSize: 16,
  },
  botonPrincipal: {
    width: '100%',
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botonPrincipalTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});
