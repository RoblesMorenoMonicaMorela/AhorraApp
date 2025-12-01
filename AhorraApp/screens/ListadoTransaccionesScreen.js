import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../context/AuthContext';
import { TransaccionController } from '../controllers/TransaccionController';

export default function ListadoTransaccionesScreen({ navigation }) {
  const { user } = useAuth();
  const controller = new TransaccionController();

  const [lista, setLista] = useState([]);
  const [filtro, setFiltro] = useState('');

  const cargarDatos = async () => {
    if (!user) return;
    try {
      const datos = await controller.obtenerTodas(user.id);
      
      // ORDENAMIENTO ESTRICTO:
      // 1. Convertimos fechas a objetos Date para comparar correctamente.
      // 2. Si las fechas son iguales, usamos el ID para que el último creado (mayor ID) salga primero.
      datos.sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        
        // Comparar fechas (Más reciente primero)
        if (fechaB.getTime() !== fechaA.getTime()) {
          return fechaB - fechaA;
        }
        
        // Si es el mismo día, desempatar por ID (Más nuevo primero)
        return b.id - a.id; 
      });
      
      setLista(datos);
    } catch (error) {
      console.error("Error al cargar lista:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [])
  );

  const handleEliminar = (id) => {
    Alert.alert(
      'Eliminar Transacción',
      '¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
             await controller.eliminarTransaccion(id);
             cargarDatos(); 
          }
        },
      ]
    );
  };

  // Buscador por Categoría o Fecha
  const datosFiltrados = lista.filter(item => {
      const termino = filtro.toLowerCase();
      return (
        item.categoria.toLowerCase().includes(termino) ||
        item.fecha.includes(termino)
      );
  });

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={{flex: 1}}>
        <Text style={styles.itemCategoria}>{item.categoria}</Text>
        <Text style={styles.itemFecha}>{item.fecha}</Text>
        {item.descripcion ? (
          <Text style={styles.itemDescripcion} numberOfLines={1}>{item.descripcion}</Text>
        ) : null}
      </View>
      <View style={styles.itemLadoDerecho}>
        <Text style={[
            styles.itemMonto,
            item.tipo === 'ingreso' ? styles.ingreso : styles.gasto,
          ]}>
          {item.tipo === 'ingreso' ? '+' : '-'}${item.monto.toFixed(2)}
        </Text>
        <View style={styles.itemAcciones}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('EditarTransaccion', { transaccion: item })}
            style={styles.btnEditar}
          >
            <Icon name="pencil" size={20} color="#4A90E2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEliminar(item.id)} style={styles.btnEliminar}>
            <Icon name="trash-can-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 5}}>
                <Icon name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.titulo}>Historial</Text>
        </View>

        <View style={styles.filtrosContainer}>
          <Icon name="magnify" size={20} color="#999" style={styles.iconBusqueda} />
          <TextInput
            style={styles.inputFiltro}
            placeholder="Buscar por categoría o fecha..."
            placeholderTextColor="#718096"
            value={filtro}
            onChangeText={setFiltro}
          />
        </View>

        <FlatList
          data={datosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
          ListEmptyComponent={
            <Text style={{textAlign:'center', marginTop:50, color:'#999'}}>No hay movimientos</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: '#F4F8FF' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#1A202C', marginLeft: 15 },
  filtrosContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#E0E0E0', marginBottom: 15, paddingHorizontal: 10 },
  iconBusqueda: { marginRight: 5 },
  inputFiltro: { flex: 1, paddingVertical: 10, fontSize: 16, color: '#333' },
  itemCard: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  itemCategoria: { fontSize: 16, fontWeight: '600', color: '#1A202C' },
  itemFecha: { fontSize: 12, color: '#718096', marginTop: 2 },
  itemDescripcion: { fontSize: 12, color: '#999', fontStyle: 'italic', marginTop: 2 },
  itemLadoDerecho: { alignItems: 'flex-end' },
  itemMonto: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  ingreso: { color: '#10B981' },
  gasto: { color: '#EF4444' },
  itemAcciones: { flexDirection: 'row', gap: 15 },
  btnEditar: { padding: 5 },
  btnEliminar: { padding: 5 },
});