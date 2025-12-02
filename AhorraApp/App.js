import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

// Importar Contexto de Autenticación
import { AuthProvider, useAuth } from './context/AuthContext';

// --- PANTALLAS DE ACCESO (Auth) ---
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import RegistroScreen from './screens/RegistroScreen';
import OlvidarContraScreen from './screens/OlvidarContraScreen';

// --- PANTALLAS PRINCIPALES (Tabs) ---
import HomeScreen from './screens/HomeScreen';
import EstadisticasScreen from './screens/EstadisticasScreen';
import PresupuestoScreen from './screens/PresupuestoScreen';
import PerfilScreen from './screens/PerfilScreen';

// --- PANTALLAS SECUNDARIAS (Detalles, Formularios, Config) ---
import AgregarTransaccionScreen from './screens/AgregarTransaccionScreen';
import EditarTransaccionScreen from './screens/EditarTransaccionScreen';
import ListadoTransaccionesScreen from './screens/ListadoTransaccionesScreen';
import PersonalizarScreen from './screens/PersonalizarScreen';
import SeguridadScreen from './screens/SeguridadScreen';
import AyudaScreen from './screens/AyudaScreen';
import MonedaScreen from './screens/MonedaScreen';
import IdiomaScreen from './screens/IdiomaScreen';
import CambiarContraScreen from './screens/CambiarContraScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 1. BARRA DE NAVEGACIÓN INFERIOR (TABS)
// Esto es lo que verá el usuario apenas inicie sesión
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 5, height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = 'home';
          else if (route.name === 'Reportes') iconName = 'bar-chart';
          else if (route.name === 'Presupuestos') iconName = 'wallet';
          else if (route.name === 'Perfil') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Reportes" component={EstadisticasScreen} />
      <Tab.Screen name="Presupuestos" component={PresupuestoScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

// 2. CONTROLADOR DE PANTALLAS
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Aquí podrías poner un Splash Screen de carga
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // === ZONA PRIVADA (Usuario Logueado) ===
        <>
          {/* La pantalla principal son los TABS */}
          <Stack.Screen name="AppTabs" component={AppTabs} />
          
          {/* Pantallas a las que se navega desde adentro */}
          <Stack.Screen name="AgregarTransaccion" component={AgregarTransaccionScreen} />
          <Stack.Screen name="EditarTransaccion" component={EditarTransaccionScreen} />
          <Stack.Screen name="ListadoTransacciones" component={ListadoTransaccionesScreen} />
          
          {/* Configuración y Extras */}
          <Stack.Screen name="Personalizar" component={PersonalizarScreen} />
          <Stack.Screen name="Seguridad" component={SeguridadScreen} />
          <Stack.Screen name="Ayuda" component={AyudaScreen} />
          <Stack.Screen name="Moneda" component={MonedaScreen} />
          <Stack.Screen name="Idioma" component={IdiomaScreen} />
          <Stack.Screen name="CambiarContra" component={CambiarContraScreen} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />

        </>
      ) : (
        // === ZONA PÚBLICA (Sin Loguear) ===
        <>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registro" component={RegistroScreen} />
          <Stack.Screen name="Recuperar" component={OlvidarContraScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}