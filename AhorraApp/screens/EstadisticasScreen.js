import React from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,Image,TextInput,TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');
const STATS_IMAGE_1 = require('../assets/recursos/estadisticas.jpg');
const STATS_IMAGE_2 = require('../assets/recursos/estadisticas1.png');

export default function EstadisticasScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Estadísticas</Text>

        <View style={styles.iconContainer}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Estadísticas de Transacciones</Text>

        <View style={styles.filterContainer}>
          <Text style={styles.label}>Filtrar por Fecha</Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Fecha Inicio (YYYY-MM-DD)"
              placeholderTextColor="#718096"
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha Fin (YYYY-MM-DD)"
              placeholderTextColor="#718096"
            />
          </View>
          <TouchableOpacity style={styles.botonPrincipal} onPress={() => {}}>
            <Text style={styles.botonPrincipalTexto}>Buscar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsImageContainer}>
          <Image
            source={STATS_IMAGE_1}
            style={styles.statsImage}
            resizeMode="contain"
          />
          <Image
            source={STATS_IMAGE_2}
            style={styles.statsImage}
            resizeMode="contain"
          />
        </View>
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
    marginBottom: 30,
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 15,
  },
  dateInputContainer: {
    gap: 10,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#F4F8FF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    fontSize: 16,
  },
  botonPrincipal: {
    width: '100%',
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonPrincipalTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsImageContainer: {
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
  },
  statsImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
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