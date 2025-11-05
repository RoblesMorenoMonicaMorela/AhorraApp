import React from 'react';
import {View,Text,StyleSheet,ScrollView,TextInput,TouchableOpacity,Alert,SafeAreaView, } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const mostrarAlertaEliminar = () => {
  Alert.alert(
    'Atención',
    '¿Seguro que deseas eliminar esta transacción?',
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Aceptar', onPress: () => {} },
    ]
  );
};

const ItemTransaccion = ({ categoria, fecha, monto, tipo }) => {
  return (
    <View style={styles.itemCard}>
      <View>
        <Text style={styles.itemCategoria}>{categoria}</Text>
        <Text style={styles.itemFecha}>{fecha}</Text>
      </View>
      <View style={styles.itemLadoDerecho}>
        <Text
          style={[
            styles.itemMonto,
            tipo === 'ingreso' ? styles.ingreso : styles.gasto,
          ]}>
          {tipo === 'ingreso' ? '+' : '-'}${monto.toFixed(2)}
        </Text>
        <View style={styles.itemAcciones}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.accionTexto}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={mostrarAlertaEliminar}>
            <Text style={[styles.accionTexto, styles.gasto]}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default function ListadoTransaccionesScreen() {
  return (
  
    <SafeAreaView style={styles.safeAreaContainer}>
    
      <View style={styles.container}>
        <Text style={styles.titulo}>Listado de Transacciones</Text>
        <View style={styles.filtrosContainer}>
          <TextInput
            style={styles.inputFiltro}
            placeholder="Filtrar por Categoría"
            placeholderTextColor="#718096"
          />
          <TextInput
            style={styles.inputFiltro}
            placeholder="Filtrar por Fecha"
            placeholderTextColor="#718096"
          />
          <TouchableOpacity style={styles.botonPrincipal} onPress={() => {}}>
            <Text style={styles.botonPrincipalTexto}>Buscar Transacción</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scroll}>
          <ItemTransaccion
            categoria="Comida"
            fecha="2025-10-30"
            monto={25.5}
            tipo="gasto"
          />
          <ItemTransaccion
            categoria="Salario"
            fecha="2025-10-29"
            monto={1200.0}
            tipo="ingreso"
          />
          <ItemTransaccion
            categoria="Transporte"
            fecha="2025-10-28"
            monto={15.0}
            tipo="gasto"
          />
          <ItemTransaccion
            categoria="Ocio"
            fecha="2025-10-27"
            monto={50.0}
            tipo="gasto"
          />
          <ItemTransaccion
            categoria="Venta"
            fecha="2025-10-26"
            monto={75.0}
            tipo="ingreso"
          />
        </ScrollView>
      </View>

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
  container: {
    flex: 1, 
    backgroundColor: '#F4F8FF',
    paddingHorizontal: 20, 
    paddingTop: 60,
    paddingBottom: 80, 
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 20,
    textAlign: 'center',
  },
  filtrosContainer: {
    marginBottom: 15,
  },
  inputFiltro: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 10,
    fontSize: 15,
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemCategoria: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A202C',
  },
  itemFecha: {
    fontSize: 13,
    color: '#718096',
    marginTop: 4,
  },
  itemLadoDerecho: {
    alignItems: 'flex-end',
  },
  itemMonto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ingreso: {
    color: '#28a745',
  },
  gasto: {
    color: '#dc3545',
  },
  itemAcciones: {
    flexDirection: 'row',
    marginTop: 5,
  },
  accionTexto: {
    fontSize: 12,
    color: '#4A90E2',
    marginLeft: 10,
    fontWeight: '600',
  },
  botonPrincipal: {
    width: '100%',
    backgroundColor: '#a9c7e9ff',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});
