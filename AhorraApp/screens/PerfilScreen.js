import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { UsuarioController } from '../controllers/UsuarioController';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

// --- COMPONENTE EXTRAÍDO (Solución al problema del teclado) ---
const EditableField = ({ icon, label, value, onChangeText, keyboardType, isEditing }) => (
  <View style={styles.fieldContainer}>
    <View style={styles.fieldIconContainer}>
      <Icon name={icon} size={20} color="#4A90E2" />
    </View>
    <View style={styles.fieldContent}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing ? (
        <TextInput 
          style={styles.fieldInput} 
          value={value} 
          onChangeText={onChangeText}
          keyboardType={keyboardType || 'default'}
          placeholder={`Ingresa ${label.toLowerCase()}`}
        />
      ) : (
        <Text style={styles.fieldValue}>{value || 'No especificado'}</Text>
      )}
    </View>
  </View>
);
// -------------------------------------------------------------

export default function PerfilScreen() {
  const { user, logout, actualizarUsuarioState } = useAuth();
  const controller = new UsuarioController();

  // Estados para edición
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Campos de formulario
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  // Sincronizar datos al cargar
  useEffect(() => {
    if (user) {
      setNombre(user.nombre || '');
      setTelefono(user.telefono || '');
      setDireccion(user.direccion || '');
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Llamada al controlador
      const updatedUser = await controller.actualizarPerfil(
        user.id, 
        nombre, 
        user.email, 
        telefono, 
        direccion
      );
      
      // Actualizar el estado global de la app
      actualizarUsuarioState(updatedUser);
      
      setIsEditing(false); // Salir de modo edición
      Alert.alert("¡Éxito!", "Tu perfil ha sido actualizado.");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro?', [
      { text: 'Cancelar' },
      { text: 'Salir', style:'destructive', onPress: () => logout() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <Image source={LOGO_APP_IMAGE} style={styles.logoImage} resizeMode="contain" />
        </View>

        <Text style={styles.title}>Perfil de Usuario</Text>

        <View style={styles.photoContainer}>
          <View style={styles.photoCircle}>
            <Icon name="account" size={60} color="#4A90E2" />
          </View>
          
          {/* BOTÓN EDITAR PERFIL */}
          {!isEditing && (
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Icon name="pencil" size={16} color="#FFF" />
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Información Personal</Text>
          
          <EditableField 
            icon="account" 
            label="Nombre completo" 
            value={nombre} 
            onChangeText={setNombre} 
            isEditing={isEditing} 
          />
          
          {/* Email (Solo lectura) */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldIconContainer}><Icon name="email" size={20} color="#4A90E2" /></View>
            <View style={styles.fieldContent}>
                <Text style={styles.fieldLabel}>Correo electrónico</Text>
                <Text style={[styles.fieldValue, {color:'#999'}]}>{user?.email}</Text>
            </View>
          </View>

          <EditableField 
            icon="phone" 
            label="Teléfono" 
            value={telefono} 
            onChangeText={setTelefono} 
            keyboardType="phone-pad" 
            isEditing={isEditing}
          />
          
          <EditableField 
            icon="map-marker" 
            label="Dirección" 
            value={direccion} 
            onChangeText={setDireccion} 
            isEditing={isEditing}
          />

          {/* BOTONES DE ACCIÓN (Solo al editar) */}
          {isEditing && (
            <View style={{flexDirection:'row', gap:10, marginTop:15}}>
                <TouchableOpacity style={[styles.actionBtn, {backgroundColor:'#ccc'}]} onPress={() => {
                    setIsEditing(false);
                    // Restaurar valores originales
                    setNombre(user.nombre);
                    setTelefono(user.telefono || '');
                    setDireccion(user.direccion || '');
                }}>
                    <Text style={[styles.actionBtnText, {color:'#333'}]}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, {backgroundColor:'#4A90E2'}]} onPress={handleSave} disabled={loading}>
                    {loading ? <ActivityIndicator color="#FFF"/> : <Text style={styles.actionBtnText}>Guardar</Text>}
                </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#EF4444" />
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100, paddingTop: 20 },
  iconContainer: { alignItems: 'center', marginBottom: 10 },
  logoImage: { width: 60, height: 60 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4A90E2', textAlign: 'center', marginBottom: 20 },
  photoContainer: { alignItems: 'center', marginBottom: 20 },
  photoCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  
  editButton: { flexDirection:'row', backgroundColor:'#4A90E2', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, alignItems: 'center', gap: 5 },
  editButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },

  infoCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 20, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 20 },
  
  fieldContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 10 },
  fieldIconContainer: { width: 35, height: 35, borderRadius: 17.5, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  fieldContent: { flex: 1 },
  fieldLabel: { fontSize: 12, color: '#6B7280', marginBottom: 2 },
  fieldValue: { fontSize: 16, color: '#1F2937', fontWeight: '500' },
  fieldInput: { fontSize: 16, color: '#333', borderBottomWidth:1, borderColor:'#4A90E2', paddingVertical:2, width:'100%' },

  actionBtn: { flex:1, padding:12, borderRadius:8, alignItems:'center' },
  actionBtnText: { color:'#FFF', fontWeight:'bold' },

  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FEE2E2', borderRadius: 12, padding: 15 },
  logoutButtonText: { fontSize: 16, fontWeight: '600', color: '#EF4444', marginLeft: 10 },
});