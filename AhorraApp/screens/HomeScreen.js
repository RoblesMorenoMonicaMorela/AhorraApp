import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

// Importar Lógica
import { useAuth } from '../context/AuthContext';
import { TransaccionController } from '../controllers/TransaccionController';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const controller = new TransaccionController();

  const [balance, setBalance] = useState({ ingresos: 0, gastos: 0, total: 0 });
  const [transacciones, setTransacciones] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarDatos = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // 1. Obtener todas las transacciones de la BD
      const lista = await controller.obtenerTodas(user.id);
      
      // 2. ORDENAMIENTO ESTRICTO: LO NUEVO HASTA ARRIBA
      lista.sort((a, b) => {
        // Convertir string de fecha a objeto Date para comparar
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        
        // Primero comparamos por fecha (descendente)
        if (fechaB.getTime() !== fechaA.getTime()) {
          return fechaB - fechaA;
        }
        
        // Si la fecha es igual (mismo día), usamos el ID para desempatar.
        // El ID más grande es el que se creó al final.
        return b.id - a.id; 
      });

      // 3. Guardar en el estado
      // (Opcional: .slice(0, 10) si solo quieres ver las últimas 10)
      setTransacciones(lista.slice(0, 20));

      // 4. Calcular el Balance Total (usando toda la lista, no solo la visible)
      const datosBalance = controller.calcularBalance(lista);
      setBalance(datosBalance);

    } catch (error) {
      console.error("Error al cargar Home:", error);
    } finally {
      setLoading(false);
    }
  };

  // Recargar datos cada vez que la pantalla se enfoca (al volver de agregar/editar)
  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [])
  );

  const renderTransaccion = ({ item }) => (
    <TouchableOpacity 
      style={styles.cardItem}
      onPress={() => navigation.navigate('EditarTransaccion', { transaccion: item })}
    >
      <View style={styles.cardLeft}>
        {/* Icono dinámico: Flecha Arriba (Verde) o Abajo (Rojo) */}
        <View style={[styles.iconCircle, { backgroundColor: item.tipo === 'gasto' ? '#FEE2E2' : '#D1FAE5' }]}>
          <Ionicons 
            name={item.tipo === 'gasto' ? 'arrow-down' : 'arrow-up'} 
            size={20} 
            color={item.tipo === 'gasto' ? '#EF4444' : '#10B981'} 
          />
        </View>
        <View>
          <Text style={styles.cardCategory}>{item.categoria}</Text>
          <Text style={styles.cardDate}>{item.fecha}</Text>
        </View>
      </View>
      
      {/* Monto con signo + o - */}
      <Text style={[
        styles.cardAmount, 
        { color: item.tipo === 'gasto' ? '#EF4444' : '#10B981' }
      ]}>
        {item.tipo === 'gasto' ? '-' : '+'}${item.monto.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  const HeaderComponent = () => (
    <>
      <View style={styles.headerRow}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
             <Image source={LOGO_APP_IMAGE} style={{width:40, height:40, marginRight:10}} resizeMode="contain"/>
             <View>
                <Text style={styles.welcomeText}>Hola,</Text>
                <Text style={styles.userName}>{user ? user.nombre : 'Usuario'}</Text>
             </View>
        </View>
        {/* Botón de Configuración Rápida */}
        <TouchableOpacity onPress={() => navigation.navigate('Personalizar')}> 
           <Ionicons name="settings-outline" size={26} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {/* Tarjeta Azul de Balance */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Saldo Disponible</Text>
        <Text style={styles.balanceTotal}>${balance.total.toFixed(2)}</Text>
        
        <View style={styles.balanceRow}>
          <View style={styles.balanceItem}>
            <Ionicons name="arrow-up-circle" color="#A7F3D0" size={18} />
            <Text style={styles.balanceSubText}> Ingresos: ${balance.ingresos.toFixed(2)}</Text>
          </View>
          <View style={styles.balanceItem}>
            <Ionicons name="arrow-down-circle" color="#FECACA" size={18} />
            <Text style={styles.balanceSubText}> Gastos: ${balance.gastos.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Botones Grandes de Acción */}
      <View style={{flexDirection: 'row', gap: 10, marginBottom: 20}}>
        <TouchableOpacity 
            style={styles.fabButton}
            onPress={() => navigation.navigate('AgregarTransaccion')}
        >
            <Ionicons name="add-circle" size={22} color="#FFF" style={{marginRight:5}} />
            <Text style={styles.fabText}>Nuevo Movimiento</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.historialButton}
            onPress={() => navigation.navigate('ListadoTransacciones')}
        >
            <Ionicons name="list" size={22} color="#333" style={{marginRight:5}} />
            <Text style={[styles.fabText, {color: '#333'}]}>Ver Historial</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Últimos Movimientos</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading && transacciones.length === 0 ? (
        <ActivityIndicator size="large" color="#4A90E2" style={{marginTop: 50}} />
      ) : (
        <FlatList
          data={transacciones}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTransaccion}
          ListHeaderComponent={HeaderComponent}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="wallet-outline" size={50} color="#ccc" />
              <Text style={styles.emptyText}>Sin movimientos recientes</Text>
              <Text style={styles.emptySubText}>Toca "Nuevo Movimiento" para empezar</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  listContent: { padding: 20, paddingBottom: 80 },
  
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  welcomeText: { fontSize: 14, color: '#666' },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#333' },

  balanceCard: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  balanceLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '500' },
  balanceTotal: { color: '#FFF', fontSize: 36, fontWeight: 'bold', marginVertical: 10 },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  balanceItem: { flexDirection: 'row', alignItems: 'center' },
  balanceSubText: { color: '#FFF', fontSize: 12, marginLeft: 5, fontWeight: '500' },

  fabButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historialButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  fabText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },

  cardItem: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  cardCategory: { fontSize: 16, fontWeight: '600', color: '#333' },
  cardDate: { fontSize: 12, color: '#999', marginTop: 2 },
  cardAmount: { fontSize: 16, fontWeight: 'bold' },

  emptyState: { alignItems: 'center', marginTop: 40 },
  emptyText: { fontSize: 18, color: '#666', marginTop: 10, fontWeight: '600' },
  emptySubText: { fontSize: 14, color: '#999', marginTop: 5 },
});