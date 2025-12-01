import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator, Modal, TextInput, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuth } from '../context/AuthContext';
import { PresupuestoController } from '../controllers/PresupuestoController';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

export default function PresupuestoScreen() {
  const { user } = useAuth();
  const controller = new PresupuestoController();
  
  const [lista, setLista] = useState([]);
  
  // Filtros
  const [filtroCat, setFiltroCat] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [esEdicion, setEsEdicion] = useState(false);
  const [idEdicion, setIdEdicion] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Campos Formulario
  const [categoria, setCategoria] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(''); 

  useEffect(() => {
    cargarDatos();
  }, [filtroCat, filtroFecha]);

  const cargarDatos = async () => {
    if (!user) return;
    const datos = await controller.obtenerPresupuestos(user.id, filtroCat, filtroFecha);
    setLista(datos);
  };

  const abrirModalCrear = () => {
    setEsEdicion(false);
    setCategoria('');
    setMonto('');
    setFecha(new Date().toISOString().slice(0, 7)); // Año-Mes actual
    setModalVisible(true);
  };

  const abrirModalEditar = (item) => {
    setEsEdicion(true);
    setIdEdicion(item.id);
    setCategoria(item.categoria);
    // Validación segura para evitar crash si es null
    setMonto(item.monto_maximo ? item.monto_maximo.toString() : '');
    setFecha(item.fecha || '');
    setModalVisible(true);
  };

  const guardarPresupuesto = async () => {
    // 1. VALIDACIÓN ESTRICTA DE MONTO
    // Verificamos si está vacío, si es solo un punto, o si no es un número
    const montoLimpio = monto.trim();
    if (!categoria.trim()) {
      Alert.alert("Error", "La categoría es obligatoria.");
      return;
    }
    if (!montoLimpio || montoLimpio === '.' || isNaN(Number(montoLimpio)) || Number(montoLimpio) <= 0) {
      Alert.alert("Monto Inválido", "Por favor escribe una cantidad numérica válida mayor a 0.");
      return;
    }

    setLoading(true);
    try {
      if (esEdicion) {
        await controller.editarPresupuesto(idEdicion, categoria, montoLimpio, fecha);
      } else {
        await controller.crearNuevoPresupuesto(user.id, categoria, montoLimpio, fecha);
      }
      setModalVisible(false);
      cargarDatos();
      Alert.alert("Éxito", "Guardado correctamente");
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarItem = (id) => {
    Alert.alert("Eliminar", "¿Seguro que deseas borrar este presupuesto?", [
      { text: "Cancelar" },
      { text: "Borrar", style: 'destructive', onPress: async () => {
          await controller.eliminarPresupuesto(id);
          cargarDatos();
      }}
    ]);
  };

  const handleSliderChange = (id, valor) => {
    // Actualización visual local del slider
    const nuevaLista = lista.map(p => {
        if (p.id === id) return { ...p, monto_maximo: valor };
        return p;
    });
    setLista(nuevaLista);
  };

  // Guardado individual del slider al soltarlo (opcional, para UX rápida)
  const guardarSlider = async (item) => {
      try {
          await controller.editarPresupuesto(item.id, item.categoria, item.monto_maximo, item.fecha);
      } catch (error) {
          console.log("Error guardando slider", error);
      }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconBox}>
           <Icon name="chart-pie" size={24} color="#4A90E2" />
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
           <Text style={styles.cardTitle}>{item.categoria}</Text>
           <Text style={styles.cardDate}>{item.fecha || 'Sin fecha'}</Text>
        </View>
        <Text style={styles.cardAmount}>${item.monto_maximo ? item.monto_maximo.toFixed(0) : '0'}</Text>
      </View>
      
      <Slider
        style={{width: '100%', height: 40}}
        minimumValue={0}
        maximumValue={5000} // Puedes aumentar este máximo si manejas cantidades grandes
        step={50}
        value={item.monto_maximo || 0}
        onValueChange={(val) => handleSliderChange(item.id, val)}
        onSlidingComplete={() => guardarSlider(item)} // Guarda al soltar
        minimumTrackTintColor="#4A90E2"
        thumbTintColor="#4A90E2"
      />

      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.btnAction} onPress={() => abrirModalEditar(item)}>
           <Text style={{color:'#4A90E2', fontWeight:'bold'}}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnAction} onPress={() => eliminarItem(item.id)}>
           <Text style={{color:'#EF4444', fontWeight:'bold'}}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <View style={{padding: 20}}>
            <View style={{alignItems:'center', marginBottom:15}}>
                <Image source={LOGO_APP_IMAGE} style={{width:50, height:50}} resizeMode="contain"/>
                <Text style={styles.title}>Mis Presupuestos</Text>
            </View>
            
            {/* Filtros */}
            <View style={styles.filterRow}>
                <TextInput 
                    style={[styles.inputFilter, {flex: 2}]} 
                    placeholder="Filtrar Categoría..." 
                    value={filtroCat} 
                    onChangeText={setFiltroCat} 
                />
                <TextInput 
                    style={[styles.inputFilter, {flex: 1}]} 
                    placeholder="Año-Mes" 
                    value={filtroFecha} 
                    onChangeText={setFiltroFecha} 
                />
            </View>

            <TouchableOpacity style={styles.btnAdd} onPress={abrirModalCrear}>
                <Icon name="plus" size={20} color="#FFF" />
                <Text style={styles.btnAddText}>Nuevo Presupuesto</Text>
            </TouchableOpacity>
        </View>

        <FlatList
            data={lista}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            scrollEnabled={false}
            ListEmptyComponent={<Text style={{textAlign:'center', color:'#999', marginTop:20}}>No hay presupuestos definidos</Text>}
        />
      </ScrollView>

      {/* Modal Formulario */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>{esEdicion ? "Editar" : "Nuevo"} Presupuesto</Text>
                
                <Text style={styles.label}>Categoría</Text>
                <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} placeholder="Ej. Comida"/>
                
                <Text style={styles.label}>Monto Máximo ($)</Text>
                <TextInput 
                    style={styles.input} 
                    value={monto} 
                    onChangeText={setMonto} 
                    keyboardType="numeric" 
                    placeholder="Ej. 500"
                />
                
                <Text style={styles.label}>Fecha (Mes)</Text>
                <TextInput style={styles.input} value={fecha} onChangeText={setFecha} placeholder="YYYY-MM"/>

                <View style={styles.modalActions}>
                    <TouchableOpacity style={[styles.btnModal, {backgroundColor:'#ccc'}]} onPress={() => setModalVisible(false)}>
                        <Text>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnModal, {backgroundColor:'#4A90E2'}]} onPress={guardarPresupuesto} disabled={loading}>
                        {loading ? <ActivityIndicator color="#FFF"/> : <Text style={{color:'#FFF', fontWeight:'bold'}}>Guardar</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 10 },
  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  inputFilter: { backgroundColor: '#FFF', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#DDD' },
  btnAdd: { flexDirection:'row', backgroundColor:'#1F2937', padding: 15, borderRadius: 12, alignItems: 'center', justifyContent:'center' },
  btnAddText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
  
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  iconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardDate: { fontSize: 12, color: '#999' },
  cardAmount: { fontSize: 18, fontWeight: 'bold', color: '#4A90E2' },
  cardActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20, marginTop: 5 },
  btnAction: { padding: 5 },

  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
  modalCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 20, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5, color: '#555' },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 10 },
  btnModal: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center' }
});