import React, { useState } from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,Image, } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

const PresupuestoScreen = () => {
  const [alimentacion, setAlimentacion] = useState(50);
  const [transporte, setTransporte] = useState(50);
  const [ocio, setOcio] = useState(30);

  const BudgetCard = ({ title, value, min, max, onValueChange }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="#4A90E2"
        maximumTrackTintColor="#D3D3D3"
        thumbTintColor="#4A90E2"
      />
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>$ {min}</Text>
        <Text style={styles.valueText}>$ {max}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
       
        <Text style={styles.header}>Presupuesto</Text>

      
        <View style={styles.iconContainer}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage} 
          />
        </View>

       
        <Text style={styles.title}>Definición de</Text>
        <Text style={styles.title}>Presupuesto</Text>

     
        <BudgetCard
          title="Alimentación"
          value={alimentacion}
          min={50}
          max={2500}
          onValueChange={setAlimentacion}
        />

        <BudgetCard
          title="Transporte"
          value={transporte}
          min={50}
          max={100}
          onValueChange={setTransporte}
        />

        <BudgetCard
          title="Ocio"
          value={ocio}
          min={30}
          max={100}
          onValueChange={setOcio}
        />
      </ScrollView>

      <View style={styles.bottomNav}>
        <Icon name="home" size={28} color="#9CA3AF" />
        <Icon name="calendar-blank" size={28} color="#9CA3AF" />
        <Icon name="heart" size={28} color="#9CA3AF" />
        <Icon name="account" size={28} color="#9CA3AF" />
      </View>
    </SafeAreaView>
  );
};

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
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4A90E2',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
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
    color: '#4A90E2',
    marginBottom: 15,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  valueText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '500',
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

export default PresupuestoScreen;