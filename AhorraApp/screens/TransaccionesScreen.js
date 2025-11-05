import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity, Image,SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png'); 

export default function TransaccionesScreen(){
    return(
    <SafeAreaView style={styles.container}>
        {/* <View style={styles.container}>  */}
        
        <Image 
          source={LOGO_APP_IMAGE} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        <Text style={styles.appName}>Ahorra App</Text>
    
        <Text style={styles.titulo}>Transacciones</Text>

        {/* Ingresos */}
        <View style={styles.card}> 
            <Text style={styles.cardTitulo}>Ingresos</Text>
            <Text style={styles.ingresos}>$2,000</Text>
        </View>

        {/* Gastos */}
        <View style={styles.card}>
            <Text style={styles.cardTitulo}>Gastos</Text>
            <Text style={styles.gastos}>$1,050</Text>
        </View>

       {/* Saldo */}
       <View style={styles.card}>
            <Text style={styles.cardTitulo}>Saldo</Text>
            <Text style={styles.cardMonto}>$4,050</Text>
       </View>

        {/* Botón Continuar */}
      <TouchableOpacity style={styles.botonPrincipal} onPress={() => {}}>
        <Text style={styles.botonPrincipalTexto}>Continuar</Text>
      </TouchableOpacity>
  
      <View style={styles.bottomNav}>
              <Icon name="home" size={28} color="#9CA3AF" />
              <Icon name="calendar-blank" size={28} color="#9CA3AF" />
              <Icon name="heart" size={28} color="#9CA3AF" />
              <Icon name="account" size={28} color="#9CA3AF" />
            </View>
          </SafeAreaView>
  /*   </View> */
    
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FF', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  container1: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: 80, 
    height: 80,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C', 
    marginBottom: 5, 
  },
  titulo: {
    fontSize: 20, 
    fontWeight: '600',
    color: '#718096', 
    marginBottom: 25, 
  },
  card: {
    backgroundColor: "#fff",
    width: '100%',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitulo: {
    fontSize: 18,
    color: '#718096', 
    fontWeight: '500',
  },
  cardMonto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  ingresos: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
  },
  gastos: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc3545',
  },
  botonPrincipal: {
    width: '100%',
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  botonPrincipalTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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

