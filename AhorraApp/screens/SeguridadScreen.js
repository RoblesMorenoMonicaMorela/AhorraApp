import React from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity,Switch,Image,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

//Funcion que muestra la seguridad de la App
export default function SeguridadScreen() {
  const securityOptions = [
    {
      id: 1,
      title: 'Autenticación Biométrica',
      subtitle: 'Usa huella digital o Face ID',
      icon: 'fingerprint',
      value: true,
    },
    {
      id: 2,
      title: 'Bloqueo Automático',
      subtitle: 'Bloquea la app después de 5 minutos',
      icon: 'lock-clock',
      value: true,
    },
  ];

  const securityActions = [
    {
      id: 1,
      title: 'Cambiar Contraseña',
      subtitle: 'Actualiza tu contraseña',
      icon: 'key',
      color: '#4A90E2',
    },
    {
      id: 2,
      title: 'Cerrar Sesión en Todos',
      subtitle: 'Cierra sesión en todos los dispositivos',
      icon: 'logout',
      color: '#EF4444',
    },
  ];

  const SecurityOption = ({ item }) => (
    <View style={styles.securityOption}>
      <View style={[styles.optionIconContainer, { backgroundColor: '#EFF6FF' }]}>
        <Icon name={item.icon} size={24} color="#4A90E2" />
      </View>
      <View style={styles.optionInfo}>
        <Text style={styles.optionTitle}>{item.title}</Text>
        <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
      </View>
      <Switch
        value={item.value}
        onValueChange={() => {}}
        trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
        thumbColor={item.value ? '#4A90E2' : '#F3F4F6'}
      />
    </View>
  );

  const SecurityAction = ({ item }) => (
    <TouchableOpacity
      style={styles.securityAction}
      onPress={() => {}}
      activeOpacity={0.7}>
      <View
        style={[
          styles.actionIconContainer,
          { backgroundColor: `${item.color}15` },
        ]}>
        <Icon name={item.icon} size={24} color={item.color} />
      </View>
      <View style={styles.actionInfo}>
        <Text style={styles.actionTitle}>{item.title}</Text>
        <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#D1D5DB" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="arrow-left" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.header}>Seguridad</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.iconContainer}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Seguridad</Text>

        <View style={styles.statusCard}>
          <View style={styles.statusIconContainer}>
            <Icon name="shield-check" size={40} color="#10B981" />
          </View>
          <Text style={styles.statusTitle}>Tu cuenta está protegida</Text>
          <Text style={styles.statusSubtitle}>Nivel de seguridad: Medio</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opciones de Seguridad</Text>
          <View style={styles.optionsContainer}>
            {securityOptions.map((option) => (
              <SecurityOption key={option.id} item={option} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones de Seguridad</Text>
          <View style={styles.actionsContainer}>
            {securityActions.map((action) => (
              <SecurityAction key={action.id} item={action} />
            ))}
          </View>
        </View>

        <View style={styles.tipsCard}>
          <Icon name="lightbulb" size={24} color="#F59E0B" />
          <Text style={styles.tipsTitle}>Consejos de Seguridad</Text>
          <Text style={styles.tipsText}>
            • Usa una contraseña única y fuerte{'\n'}
            • No compartas tu contraseña con nadie{'\n'}
            • Revisa regularly tu actividad
          </Text>
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

//Seccion de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
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
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  securityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  actionsContainer: {
    gap: 12,
  },
  securityAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  tipsCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginTop: 8,
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 22,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});