import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { TransaccionController } from '../controllers/TransaccionController';
import { useFocusEffect } from '@react-navigation/native';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png'); //logo de la App

//Funcion EstadisticasScreen nos permite ver las estadísticas generadas con respecto a los datos
export default function EstadisticasScreen() {
  const { user } = useAuth();
  const controller = new TransaccionController();

  const [loading, setLoading] = useState(false);
  
  // Filtros de fecha
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Datos
  const [balanceData, setBalanceData] = useState([]);
  const [gastosData, setGastosData] = useState([]);
  const [ingresosData, setIngresosData] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const cargarDatos = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const transacciones = await controller.obtenerTransaccionesPorFecha(user.id, selectedMonthIndex, selectedYear);

      // Balance
      const { ingresos, gastos } = controller.calcularBalance(transacciones);
      setTotalBalance(ingresos - gastos);
      setBalanceData([
        { label: 'Ingresos', value: ingresos, color: '#4A90E2' },
        { label: 'Gastos', value: gastos, color: '#EF4444' },
      ]);

      // Categorías
      setGastosData(controller.calcularPorCategoria(transacciones, 'gasto'));
      setIngresosData(controller.calcularPorCategoria(transacciones, 'ingreso'));

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [selectedMonthIndex, selectedYear])
  );

  // Componente de Gráfica
  const VerticalChart = ({ data }) => {
    if (!data || data.length === 0) return <Text style={{textAlign:'center', marginTop: 20, color:'#999'}}>No hay datos para mostrar</Text>;
    
    const maxValue = Math.max(...data.map(d => d.value), 1); 
    const CHART_HEIGHT = 150;

    return (
      <View style={styles.chartContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.barColumn}>
            <Text style={styles.barValueText}>${item.value.toFixed(0)}</Text>
            <View 
              style={[
                styles.bar, 
                { 
                  height: (item.value / maxValue) * (CHART_HEIGHT), 
                  backgroundColor: item.color,
                  minHeight: 5 
                }
              ]} 
            />
            <Text style={styles.barLabelText} numberOfLines={1}>{item.label}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={{alignItems:'center', marginVertical:15}}>
            <Text style={styles.header}>Reportes</Text>
            <Image source={LOGO_APP_IMAGE} style={{width:50, height:50, marginTop:10}} resizeMode="contain" />
            <Text style={styles.title}>Gráficas Financieras</Text>
        </View>

        {/* SELECTOR DE AÑO */}
        <View style={styles.yearSelector}>
            <TouchableOpacity onPress={() => setSelectedYear(selectedYear - 1)}>
                <Icon name="chevron-left" size={30} color="#4A90E2" />
            </TouchableOpacity>
            <Text style={styles.yearText}>Año: {selectedYear}</Text>
            <TouchableOpacity onPress={() => setSelectedYear(selectedYear + 1)}>
                <Icon name="chevron-right" size={30} color="#4A90E2" />
            </TouchableOpacity>
        </View>

        {/* SELECTOR DE MES */}
        <View style={styles.monthContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthSelector}>
            {meses.map((mes, index) => (
              <TouchableOpacity
                key={mes}
                style={[styles.monthButton, selectedMonthIndex === index && styles.monthButtonActive]}
                onPress={() => setSelectedMonthIndex(index)}>
                <Text style={[styles.monthText, selectedMonthIndex === index && styles.monthTextActive]}>
                  {mes}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {loading ? <ActivityIndicator size="large" color="#4A90E2" style={{marginTop: 20}} /> : (
          <>
            <View style={styles.chartCard}>
              <View style={styles.cardHeader}>
                <Icon name="scale-balance" size={24} color="#4A90E2" />
                <Text style={styles.cardTitle}>Balance de {meses[selectedMonthIndex]}</Text>
              </View>
              <VerticalChart data={balanceData} />
              <View style={styles.summaryFooter}>
                <Text style={styles.summaryText}>
                  Total Neto: <Text style={{ fontWeight: 'bold', color: totalBalance >= 0 ? '#10B981' : '#EF4444' }}>${totalBalance.toFixed(2)}</Text>
                </Text>
              </View>
            </View>

            <View style={styles.chartCard}>
              <View style={styles.cardHeader}>
                <Icon name="chart-bar" size={24} color="#F59E0B" />
                <Text style={styles.cardTitle}>Gastos por Categoría</Text>
              </View>
              <VerticalChart data={gastosData} />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  header: { fontSize: 18, color: '#9CA3AF', fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4A90E2', textAlign: 'center', marginTop: 5 },
  
  yearSelector: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  yearText: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 20, color: '#333' },

  monthContainer: { marginBottom: 20 },
  monthSelector: { flexDirection: 'row' },
  monthButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#FFFFFF', marginRight: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  monthButtonActive: { backgroundColor: '#4A90E2', borderColor: '#4A90E2' },
  monthText: { color: '#6B7280', fontWeight: '500' },
  monthTextActive: { color: '#FFFFFF', fontWeight: 'bold' },

  chartCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 20, elevation: 3 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginLeft: 10 },
  
  chartContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 180, paddingBottom: 10 },
  barColumn: { alignItems: 'center', justifyContent: 'flex-end', flex: 1, marginHorizontal: 2 },
  bar: { width: 30, borderRadius: 6, marginBottom: 8 },
  barValueText: { fontSize: 10, fontWeight: 'bold', color: '#6B7280', marginBottom: 4 },
  barLabelText: { fontSize: 10, fontWeight: '600', color: '#374151', textAlign: 'center' },
  
  summaryFooter: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F3F4F6', alignItems: 'center' },
  summaryText: { fontSize: 16, color: '#6B7280' },
});