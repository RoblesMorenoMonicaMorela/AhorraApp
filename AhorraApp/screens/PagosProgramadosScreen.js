import React from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity,Image,Alert,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

const mostrarAlertaEliminar = () => {
  Alert.alert(
    'Atención',
    'estas a punto de eliminar este pago programado',
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Aceptar', onPress: () => {} },
    ]
  );
};

export default function PagosProgramadosScreen() {
  const PaymentCard = ({ payment }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardTitle}>{payment.name}</Text>
          <Text style={styles.cardDate}>{payment.date}</Text>
        </View>
        <Text style={styles.cardAmount}>${payment.amount}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={mostrarAlertaEliminar}>
          <Text style={[styles.actionText, styles.actionDelete]}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Pagos programados</Text>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="plus-circle" size={28} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        <View style={styles.iconContainer}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Pagos</Text>
        <Text style={styles.title}>Programados</Text>

        <View style={styles.cardsContainer}>
          <PaymentCard
            payment={{
              id: 1,
              name: 'Pago de tarjeta',
              date: '10 marzo',
              amount: 200,
            }}
          />
          <PaymentCard
            payment={{
              id: 2,
              name: 'Factura de luz',
              date: '15 marzo',
              amount: 100,
            }}
          />
          <PaymentCard
            payment={{
              id: 3,
              name: 'Seguro de auto',
              date: '20 marzo',
              amount: 30,
            }}
          />
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
  },
  cardsContainer: {
    marginTop: 30,
    gap: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 15,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },
  actionText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  actionDelete: {
    color: '#dc3545',
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