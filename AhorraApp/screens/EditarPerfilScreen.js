import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { UsuarioController } from '../controllers/UsuarioController';

export default function EditarPerfilScreen({ navigation }) {
  const { user, actualizarUsuarioState } = useAuth();
  const controller = new UsuarioController();
  
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setNombre(user.nombre);
      setTelefono(user.telefono || '');
      setDireccion(user.direccion || '');
    }
  }, [user]);

  const handleGuardar = async () => {
    setLoading(true);
    try {
      // Nota: Pasamos el email original porque en este ejemplo no lo editamos por seguridad simple
      const actualizado = await controller.actualizarPerfil(user.id, nombre, user.email, telefono, direccion);
      actualizarUsuarioState(actualizado);
      Alert.alert("Éxito", "Perfil actualizado", [{ text: "OK", onPress: () => navigation.goBack() }]);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Editar Datos</Text>
        </View>

        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" placeholder="Ej. +52 123..." />

        <Text style={styles.label}>Dirección</Text>
        <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} placeholder="Calle, Ciudad..." />

        <TouchableOpacity style={styles.btn} onPress={handleGuardar} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFF"/> : <Text style={styles.btnText}>Guardar Cambios</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
//estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  content: { padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 22, fontWeight: 'bold', marginLeft: 15 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5, color: '#555' },
  input: { backgroundColor: '#FFF', borderRadius: 8, padding: 12, marginBottom: 20, borderWidth: 1, borderColor: '#DDD' },
  btn: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});