import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

export default function GraficasScreen() {
  return (
    <ScrollView style={styles.fondo}>
      <Text style={styles.titulo}>Gráficas - Ahorra+App</Text>

      {/* Gráfica 1: Ingresos */}
      <View style={styles.caja}>
        <Text style={styles.subtitulo}>Ingresos Generales</Text>
        <Text style={styles.texto}>
          Aquí puedes ver de dónde provienen tus ingresos principales cada mes.
        </Text>
        <View style={styles.centrarImagen}>
          <Image
            source={require('../assets/recursos/Ingresos_pp.png')}
            style={styles.imagen}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Gráfica 2: Ahorro */}
      <View style={styles.caja}>
        <Text style={styles.subtitulo}>Ahorro Acumulado</Text>
        <Text style={styles.texto}>
          Muestra cómo ha crecido tu ahorro a lo largo del tiempo.
        </Text>
        <View style={styles.centrarImagen}>
          <Image
            source={require('../assets/recursos/Ahorro.png')}
            style={styles.imagen}
            resizeMode="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#EAF0FF',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 25,
  },
  caja: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 25,
    alignItems: 'center', // centra todo dentro
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  texto: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 10,
    textAlign: 'center',
  },
  centrarImagen: {
    width: '100%',
    alignItems: 'center',
  },
  imagen: {
    width: '90%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#DDE7FF',
  },
});
