import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TransaccionController } from '../controllers/TransaccionController';

export default function EditarTransaccionScreen({ route, navigation }) {
  // Recibimos la transacción a editar por parámetros de navegación
  const { transaccion } = route.params || {};
  
  const controller = new TransaccionController();
  const [loading, setLoading] = useState(false);

  // Estados iniciales (llenados con los datos de la transacción)
  const [tipo, setTipo] = useState('gasto');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (transaccion) {
      setTipo(transaccion.tipo);
      setMonto(transaccion.monto.toString());
      setCategoria(transaccion.categoria);
      setFecha(transaccion.fecha);
      setDescripcion(transaccion.descripcion || '');
    }
  }, [transaccion]);

  const handleActualizar = async () => {
    if (!transaccion) return;
    setLoading(true);
    try {
      await controller.actualizarTransaccion(
        transaccion.id,
        tipo,
        monto,
        categoria,
        fecha,
        descripcion
      );
      Alert.alert("Éxito", "Transacción actualizada", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!transaccion) return <View style={styles.container}><Text>No se seleccionó transacción</Text></View>;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Editar Transacción</Text>

        <Text style={styles.label}>Tipo</Text>
        <View style={styles.selectorContainer}>
          <TouchableOpacity
            style={[styles.selectorBoton, tipo === 'gasto' ? styles.selectorActivoGasto : styles.selectorInactivo]}
            onPress={() => setTipo('gasto')}>
            <Text style={tipo === 'gasto' ? styles.selectorTextoActivo : styles.selectorTextoInactivo}>Gasto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.selectorBoton, tipo === 'ingreso' ? styles.selectorActivoIngreso : styles.selectorInactivo]}
            onPress={() => setTipo('ingreso')}>
            <Text style={tipo === 'ingreso' ? styles.selectorTextoActivo : styles.selectorTextoInactivo}>Ingreso</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Monto</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={monto} onChangeText={setMonto} />

        <Text style={styles.label}>Categoría</Text>
        <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} />

        <Text style={styles.label}>Fecha</Text>
        <TextInput style={styles.input} value={fecha} onChangeText={setFecha} placeholder="YYYY-MM-DD" />

        <Text style={styles.label}>Descripción</Text>
        <TextInput style={[styles.input, {height: 80}]} multiline value={descripcion} onChangeText={setDescripcion} />

        <TouchableOpacity style={styles.botonPrincipal} onPress={handleActualizar} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff"/> : <Text style={styles.botonPrincipalTexto}>Guardar Cambios</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ... (Usa los mismos estilos de AgregarTransaccionScreen para mantener consistencia) ...
const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: '#F4F8FF' },
  container: { flexGrow: 1, padding: 20, paddingTop: 40 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign:'center' },
  label: { marginBottom: 5, fontWeight: '500' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 15 },
  selectorContainer: { flexDirection: 'row', marginBottom: 20 },
  selectorBoton: { flex: 1, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  selectorActivoGasto: { backgroundColor: '#dc3545', borderColor: '#dc3545' },
  selectorActivoIngreso: { backgroundColor: '#28a745', borderColor: '#28a745' },
  selectorInactivo: { backgroundColor: '#fff' },
  selectorTextoActivo: { color: '#fff', fontWeight: 'bold' },
  selectorTextoInactivo: { color: '#666' },
  botonPrincipal: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 8, alignItems: 'center' },
  botonPrincipalTexto: { color: '#fff', fontWeight: 'bold' }
});