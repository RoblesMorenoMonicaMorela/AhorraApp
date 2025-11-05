import React from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity,Image,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

export default function MonedaScreen({ navigation }) {
  const currencies = [
    { code: 'USD', name: 'Dólar estadounidense', flag: '🇺🇸', symbol: '$' },
  ];

  const currentCurrency = currencies[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="arrow-left" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.header}>Cambio de moneda</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.iconContainer}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Cambio de Moneda</Text>

        <View style={styles.currencyCard}>
          <Text style={styles.flagIcon}>{currentCurrency.flag}</Text>
          <Text style={styles.currencyName}>
            {currentCurrency.name} ({currentCurrency.code})
          </Text>
          <Text style={styles.currencyDescription}>
            Selecciona la moneda que prefieras usar en la app.
          </Text>
        </View>

        <View style={styles.selectorContainer}>
          <Text style={styles.selectorLabel}>Moneda</Text>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerText}>
              {currentCurrency.flag} {currentCurrency.name} (
              {currentCurrency.code})
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.acceptButton} onPress={() => {}}>
          <Text style={styles.acceptButtonText}>Aceptar</Text>
        </TouchableOpacity>
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
    backgroundColor: '#F5F5FF',
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
  currencyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 30,
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
  flagIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  currencyName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  currencyDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  selectorContainer: {
    marginBottom: 24,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pickerText: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 15,
    color: '#1F2937',
  },
  acceptButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
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