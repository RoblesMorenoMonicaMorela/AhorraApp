import React, { useState } from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,Image,TextInput,TouchableOpacity,} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

const EditarPresuScreen = () => {
  const [valorPresupuesto, setValorPresupuesto] = useState(50);
  const MAX_PRESUPUESTO = 2500;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Editar</Text>

        <View style={styles.iconContainer}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Editar</Text>
        <Text style={styles.title}>Presupuesto</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Alimentación</Text>
          <Text style={styles.label}>Monto Máximo</Text>
          <TextInput
            style={styles.input}
            value={String(Math.round(valorPresupuesto))}
            keyboardType="numeric"
            onChangeText={(text) => setValorPresupuesto(Number(text) || 0)}
          />
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={MAX_PRESUPUESTO}
            value={valorPresupuesto}
            onValueChange={setValorPresupuesto}
            minimumTrackTintColor="#4A90E2"
            maximumTrackTintColor="#D3D3D3"
            thumbTintColor="#4A90E2"
          />
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>$ 0</Text>
            <Text style={styles.valueText}>$ {MAX_PRESUPUESTO}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.botonPrincipal} onPress={() => {}}>
          <Text style={styles.botonPrincipalTexto}>Guardar Cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonEliminar} onPress={() => {}}>
          <Text style={styles.botonPrincipalTexto}>Eliminar Presupuesto</Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  header: {
    fontSize: 18,
    color: '#9CA3AF',
    marginTop: 20,
    marginBottom: 30,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4A90E2',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  valueText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '500',
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
  botonPrincipal: {
    width: '100%',
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  botonEliminar: {
    width: '100%',
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  botonPrincipalTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditarPresuScreen;
