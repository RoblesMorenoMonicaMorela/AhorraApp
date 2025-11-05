import React from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity,Image,Alert, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

const mostrarAlertaEliminarTodo = () => {
  Alert.alert(
    'Eliminar Todo',
    '¿Estás seguro de que quieres eliminar todas las notificaciones?',
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Aceptar', onPress: () => {} },
    ]
  );
};

export default function NotificationsScreen() {
  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Presupuesto excedido',
      message: 'El gasto en alimentación excedió tu presupuesto.',
      category: 'Alimentación',
      amount: 50,
      date: 'Hace 2 horas',
      read: false,
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Pago programado próximo',
      message: 'El pago de tarjeta vence en 3 días.',
      category: 'Pago de tarjeta',
      amount: 200,
      date: 'Hace 5 horas',
      read: false,
    },
    {
      id: 3,
      type: 'success',
      title: 'Meta alcanzada',
      message: 'Has ahorrado el 80% de tu meta mensual.',
      category: 'Ahorro',
      amount: 800,
      date: 'Ayer',
      read: true,
    },
  ];

  const getIconForType = (type) => {
    switch (type) {
      case 'warning':
        return { name: 'alert', color: '#EF4444' };
      case 'reminder':
        return { name: 'bell-ring', color: '#F59E0B' };
      case 'success':
        return { name: 'check-circle', color: '#10B981' };
      case 'info':
        return { name: 'information', color: '#3B82F6' };
      default:
        return { name: 'bell', color: '#6B7280' };
    }
  };

  const getBackgroundForType = (type) => {
    switch (type) {
      case 'warning':
        return '#FEE2E2';
      case 'reminder':
        return '#FEF3C7';
      case 'success':
        return '#D1FAE5';
      case 'info':
        return '#DBEAFE';
      default:
        return '#F3F4F6';
    }
  };

  const NotificationCard = ({ notification }) => {
    const icon = getIconForType(notification.type);
    const backgroundColor = getBackgroundForType(notification.type);

    return (
      <TouchableOpacity
        style={[
          styles.notificationCard,
          !notification.read && styles.unreadCard,
        ]}
        onPress={() => {}}
        activeOpacity={0.7}>
        <View style={[styles.iconContainer, { backgroundColor }]}>
          <Icon name={icon.name} size={28} color={icon.color} />
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            {!notification.read && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {notification.message}
          </Text>
          <Text style={styles.notificationDate}>{notification.date}</Text>
        </View>
        <Icon name="chevron-right" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.header}>Precaución</Text>
            <Text style={styles.unreadCount}>2 nuevas</Text>
          </View>
          <View style={styles.headerActions}>
           
            <TouchableOpacity
              onPress={mostrarAlertaEliminarTodo}
              style={styles.headerButton}>
              <Icon name="delete-sweep" size={24} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.iconMainContainer}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Precaución</Text>

        <View style={styles.notificationsList}>
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
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
  unreadCount: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  headerButton: {
    padding: 5,
  },
  iconMainContainer: {
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
  notificationsList: {
    gap: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A90E2',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#9CA3AF',
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