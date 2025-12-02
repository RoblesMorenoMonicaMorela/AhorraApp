import React from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity,TextInput,Image,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//importaciones
const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');
//Datos de perfil simulados
export default function EditarPerfilScreen({ navigation }) {
  const profile = {
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+52 123 456 7890',
    birthDate: '15/03/1990',
    address: 'Ciudad de México, México',
  };
//Componente interno
  const ProfileField = ({ icon, label, value }) => (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldIconContainer}>
        <Icon name={icon} size={20} color="#4A90E2" />
      </View>
      <View style={styles.fieldContent}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TextInput style={styles.fieldInput} value={value} />
      </View>
    </View>
  );
//Cabeza, logo, perfil, tarjeta, botones inferiores
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="arrow-left" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.header}>Editar Perfil</Text>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="close" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <View style={styles.iconContainer}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Editar Perfil</Text>

        <View style={styles.photoContainer}>
          <View style={styles.photoCircle}>
            <Icon name="account" size={60} color="#4A90E2" />
          </View>
          <TouchableOpacity style={styles.photoEditButton}>
            <Icon name="camera" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Información Personal</Text>

          <ProfileField
            icon="account"
            label="Nombre completo"
            value={profile.name}
          />

          <ProfileField
            icon="email"
            label="Correo electrónico"
            value={profile.email}
          />

          <ProfileField icon="phone" label="Teléfono" value={profile.phone} />

          <ProfileField
            icon="cake"
            label="Fecha de nacimiento"
            value={profile.birthDate}
          />

          <ProfileField
            icon="map-marker"
            label="Dirección"
            value={profile.address}
          />
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => {}}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={() => {}}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
//estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  header: {
    fontSize: 18,
    color: '#9CA3AF',
    fontWeight: '500',
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
  photoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  photoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  photoEditButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#4A90E2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
    color: '#1F2937',
    marginBottom: 20,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  fieldIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  fieldInput: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#4A90E2',
  },
  fieldValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});