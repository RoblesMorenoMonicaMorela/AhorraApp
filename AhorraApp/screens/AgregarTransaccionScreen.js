import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Importamos los controladores y el contexto
import { useAuth } from '../context/AuthContext';
import { TransaccionController } from '../controllers/TransaccionController';
import { PresupuestoController } from '../controllers/PresupuestoController';

export default function AgregarTransaccionScreen({ navigation }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Estados del formulario
  const [tipo, setTipo] = useState('gasto');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]); // Fecha de hoy
  const [descripcion, setDescripcion] = useState('');

  const handleGuardar = async () => {
    // 1. Verificar sesión
    if (!user) {
      Alert.alert("Error", "No hay sesión activa. Por favor reinicia la app.");
      return;
    }

    // 2. Validaciones simples
    if (!monto.trim() || isNaN(Number(monto)) || Number(monto) <= 0) {
      Alert.alert("Monto Inválido", "Por favor ingresa una cantidad numérica válida mayor a 0.");
      return;
    }
    if (!categoria.trim()) {
      Alert.alert("Categoría Requerida", "Escribe una categoría (ej. Comida, Transporte).");
      return;
    }

    setLoading(true);
    
    try {
      // Instancias de controladores
      const transController = new TransaccionController();
      const presuController = new PresupuestoController();

      // 3. Guardar transacción (La conversión a número se asegura aquí)
      await transController.crearTransaccion(
        user.id,
        tipo,
        monto, // Se pasa como string, el controlador lo convierte a Number
        categoria,
        fecha,
        descripcion
      );

      // 4. Verificar Presupuesto (Solo si es gasto)
      if (tipo === 'gasto') {
        try {
          const excede = await presuController.verificarSiExcedePresupuesto(
            user.id, 
            categoria.trim(), 
            monto
          );

          if (excede) {
            Alert.alert(
              "⚠️ ¡Alerta de Presupuesto!", 
              `Has excedido tu límite definido para "${categoria}". El gasto se guardó, pero ten cuidado.`,
              [{ text: "Entendido", onPress: () => navigation.goBack() }]
            );
            return;
          }
        } catch (presuError) {
          console.log("Error verificando presupuesto (no crítico):", presuError);
        }
      }

      // 5. Éxito
      Alert.alert("¡Listo!", "Transacción guardada correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
      
    } catch (error) {
      console.error(error);
      Alert.alert("Error al Guardar", "No se pudo guardar la transacción. " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Nueva Transacción</Text>

        {/* Tipo: Ingreso / Gasto */}
        <Text style={styles.label}>Tipo</Text>
        <View style={styles.selectorContainer}>
          <TouchableOpacity
            style={[styles.selectorBoton, tipo === 'gasto' ? styles.selectorActivoGasto : styles.selectorInactivo]}
            onPress={() => setTipo('gasto')}>
            <Text style={[styles.selectorTexto, tipo === 'gasto' ? {color:'#FFF'} : {color:'#666'}]}>Gasto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.selectorBoton, tipo === 'ingreso' ? styles.selectorActivoIngreso : styles.selectorInactivo]}
            onPress={() => setTipo('ingreso')}>
            <Text style={[styles.selectorTexto, tipo === 'ingreso' ? {color:'#FFF'} : {color:'#666'}]}>Ingreso</Text>
          </TouchableOpacity>
        </View>

        {/* Monto */}
        <Text style={styles.label}>Monto ($)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          keyboardType="numeric"
          value={monto}
          onChangeText={setMonto}
        />

        {/* Categoría */}
        <Text style={styles.label}>Categoría</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Comida, Transporte, Salario..."
          value={categoria}
          onChangeText={setCategoria}
        />

        {/* Fecha */}
        <Text style={styles.label}>Fecha (YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={fecha}
          onChangeText={setFecha}
        />

        {/* Descripción */}
        <Text style={styles.label}>Descripción (Opcional)</Text>
        <TextInput
          style={[styles.input, {height: 80, textAlignVertical: 'top'}]}
          placeholder="Detalles adicionales..."
          multiline={true}
          numberOfLines={3}
          value={descripcion}
          onChangeText={setDescripcion}
        />

        {/* Botón Guardar */}
        <TouchableOpacity 
            style={[styles.botonPrincipal, loading && { opacity: 0.7 }]} 
            onPress={handleGuardar}
            disabled={loading}
        >
          {loading ? (
             <ActivityIndicator color="#FFFFFF" />
          ) : (
             <Text style={styles.botonPrincipalTexto}>Guardar Transacción</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { 
    flex: 1, 
    backgroundColor: '#F4F8FF'
   },
  container: {
     flexGrow: 1, 
     padding: 20, 
     paddingTop: 40 
    },
  titulo: { 
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#1A202C', 
    marginBottom: 30, 
    textAlign: 'center' 
  },
  label: { 
    fontSize: 16, 
    color: '#333', 
    marginBottom: 8, 
    fontWeight: '600' 
  },
  input: { 
    backgroundColor: '#FFF', 
    padding: 15, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#DDD', 
    marginBottom: 20, 
    fontSize: 16 
  },
  
  selectorContainer: { 
    flexDirection: 'row', 
    marginBottom: 20, 
    borderRadius: 10, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: '#DDD'
   },
  selectorBoton: { flex: 1, 
    padding: 15, 
    alignItems: 'center'
   },
  selectorInactivo: { backgroundColor: '#FFF' },
  selectorActivoGasto: { backgroundColor: '#EF4444' },
  selectorActivoIngreso: { 
    backgroundColor: '#10B981' 
  },
  selectorTexto: { 
    fontWeight: 'bold', 
    fontSize: 16 
  },

  botonPrincipal: { 
    backgroundColor: '#4A90E2', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    elevation: 3 
  },
  botonPrincipalTexto: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold'
   },
});