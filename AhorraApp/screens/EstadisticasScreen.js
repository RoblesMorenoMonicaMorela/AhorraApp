import React, { useState } from 'react';
import {View,
  Text,StyleSheet, SafeAreaView, ScrollView,TouchableOpacity, Image,  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function GraficasScreen() {
  const [selectedMonth, setSelectedMonth] = useState('Marzo');

  // Datos simulados (Mock Data)
  const data = {
    Enero: { ingresos: 1500, gastos: 800 },
    Febrero: { ingresos: 2000, gastos: 1200 },
    Marzo: { ingresos: 1800, gastos: 1600 },
    Abril: { ingresos: 2200, gastos: 900 },
  };

  const currentData = data[selectedMonth] || { ingresos: 0, gastos: 0 };

  // Preparar datos para las gráficas verticales
  
  // 1. Datos Balance (Ingresos vs Gastos)
  const balanceData = [
    { label: 'Ingresos', value: currentData.ingresos, color: '#4A90E2' }, // Azul
    { label: 'Gastos', value: currentData.gastos, color: '#EF4444' },     // Rojo
  ];

  // 2. Datos Gastos por Categoría (Simulados basados en el total de gastos)
  const gastosData = [
    { label: 'Comida', value: Math.round(currentData.gastos * 0.4), color: '#F59E0B' },   // Amarillo
    { label: 'Transp.', value: Math.round(currentData.gastos * 0.25), color: '#10B981' }, // Verde
    { label: 'Ocio', value: Math.round(currentData.gastos * 0.2), color: '#8B5CF6' },     // Morado
    { label: 'Otros', value: Math.round(currentData.gastos * 0.15), color: '#6B7280' },   // Gris
  ];

  // 3. Datos Ingresos por Fuente
  const ingresosData = [
    { label: 'Nomina', value: Math.round(currentData.ingresos * 0.7), color: '#3B82F6' }, // Azul fuerte
    { label: 'Extra', value: Math.round(currentData.ingresos * 0.3), color: '#34D399' },  // Verde claro
  ];

  // Componente de Gráfica Vertical (Vertical Bar Chart)
  const VerticalChart = ({ data }) => {
    // Encontrar el valor máximo para escalar las barras (evitar división por cero)
    const maxValue = Math.max(...data.map(d => d.value), 1); 
    const CHART_HEIGHT = 180;

    return (
      <View style={styles.chartContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.barColumn}>
            {/* Valor arriba de la barra */}
            <Text style={styles.barValueText}>${item.value}</Text>
            
            {/* La Barra Vertical */}
            <View 
              style={[
                styles.bar, 
                { 
                  height: (item.value / maxValue) * (CHART_HEIGHT - 40), // Escalar altura
                  backgroundColor: item.color 
                }
              ]} 
            />
            
            {/* Etiqueta abajo de la barra */}
            <Text style={styles.barLabelText} numberOfLines={1}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Reportes</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.iconContainer}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Gráficas Financieras</Text>

        {/* Filtro de Mes */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Seleccionar Mes:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthSelector}>
            {['Enero', 'Febrero', 'Marzo', 'Abril'].map((mes) => (
              <TouchableOpacity
                key={mes}
                style={[
                  styles.monthButton,
                  selectedMonth === mes && styles.monthButtonActive,
                ]}
                onPress={() => setSelectedMonth(mes)}>
                <Text
                  style={[
                    styles.monthText,
                    selectedMonth === mes && styles.monthTextActive,
                  ]}>
                  {mes}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Gráfica 1: Comparativa Mensual (Balance) */}
        <View style={styles.chartCard}>
          <View style={styles.cardHeader}>
            <Icon name="scale-balance" size={24} color="#4A90E2" />
            <Text style={styles.cardTitle}>Balance de {selectedMonth}</Text>
          </View>
          
          <VerticalChart data={balanceData} />
          
          <View style={styles.summaryFooter}>
            <Text style={styles.summaryText}>
              Resultado: 
              <Text style={{ fontWeight: 'bold', color: currentData.ingresos - currentData.gastos >= 0 ? '#10B981' : '#EF4444' }}>
                 ${currentData.ingresos - currentData.gastos}
              </Text>
            </Text>
          </View>
        </View>

        {/* Gráfica 2: Desglose de Gastos */}
        <View style={styles.chartCard}>
          <View style={styles.cardHeader}>
            <Icon name="chart-bar" size={24} color="#F59E0B" />
            <Text style={styles.cardTitle}>Gastos por Categoría</Text>
          </View>
          
          <VerticalChart data={gastosData} />
        </View>

        {/* Gráfica 3: Ingresos */}
        <View style={styles.chartCard}>
          <View style={styles.cardHeader}>
            <Icon name="cash-multiple" size={24} color="#10B981" />
            <Text style={styles.cardTitle}>Fuentes de Ingreso</Text>
          </View>
          
          <VerticalChart data={ingresosData} />
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <Icon name="home" size={28} color="#9CA3AF" />
        <Icon name="calendar-blank" size={28} color="#9CA3AF" />
        <Icon name="chart-bar" size={28} color="#4A90E2" />
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
    paddingBottom: 100,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 20,
  },
  // Estilos del Filtro
  filterContainer: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 10,
    fontWeight: '600',
  },
  monthSelector: {
    flexDirection: 'row',
  },
  monthButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  monthButtonActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  monthText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  monthTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // Estilos de las Tarjetas de Gráficas
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 10,
  },
  // --- Estilos de la Gráfica Vertical ---
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200, // Altura total del área de la gráfica
    paddingBottom: 10,
  },
  barColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  bar: {
    width: 40, // Ancho de la barra
    borderRadius: 6,
    marginBottom: 8,
  },
  barValueText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 4,
  },
  barLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  // -------------------------------------
  summaryFooter: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: '#6B7280',
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
