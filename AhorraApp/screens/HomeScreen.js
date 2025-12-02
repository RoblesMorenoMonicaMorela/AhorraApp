import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');
//Para pantalla home
export default function HomeScreen() {
  const transactions = [
    { id: 1, category: 'Alimentación', amount: -50.0, icon: 'food' },
    { id: 2, category: 'Transporte', amount: -20.0, icon: 'car' },
    { id: 3, category: 'Ocio', amount: -30.0, icon: 'gamepad-variant' },
  ];
//Losta de transacciones
  const TransactionItem = ({ category, amount, icon }) => (
    <TouchableOpacity style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={styles.iconCircle}>
          <Icon name={icon} size={20} color="#4A90E2" />
        </View>
        <Text style={styles.transactionCategory}>{category}</Text>
      </View>
      <Text style={styles.transactionAmount}>{amount.toFixed(2)} €</Text>
    </TouchableOpacity>
  );
//Componente interno
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Pag principal</Text>

        <View style={styles.iconContainer}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.greeting}>Hola, Cardenal</Text>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Ingresos</Text>
            <Text style={[styles.summaryAmount, styles.incomeAmount]}>
              +1.200 €
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Gastos</Text>
            <Text style={[styles.summaryAmount, styles.expenseAmount]}>
              -450 €
            </Text>
          </View>
        </View>

        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Icon name="credit-card-outline" size={20} color="#6B7280" />
            <Text style={styles.transactionsTitle}>Transacciones</Text>
          </View>

          <View style={styles.transactionsList}>
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                category={transaction.category}
                amount={transaction.amount}
                icon={transaction.icon}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Icon name="home" size={28} color="#4A90E2" />
        <Icon name="calendar-blank" size={28} color="#9CA3AF" />
        <Icon name="heart" size={28} color="#9CA3AF" />
        <Icon name="account" size={28} color="#9CA3AF" />
      </View>
    </SafeAreaView>
  );
}
//Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  header: {
    fontSize: 18,
    color: '#9CA3AF',
    marginTop: 20,
    marginBottom: 30,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 30,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 15,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: '700',
  },
  incomeAmount: {
    color: '#10B981',
  },
  expenseAmount: {
    color: '#EF4444',
  },
  transactionsContainer: {
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
  transactionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  transactionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 8,
  },
  transactionsList: {
    gap: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionCategory: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  transactionAmount: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
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