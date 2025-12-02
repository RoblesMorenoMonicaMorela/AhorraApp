import React from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity,Image,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

//Funcion que le permite al usuario personalizar su configuracion
export default function PersonalizarScreen({ navigation }) {
  const menuItems = [
    {
      id: 1,
      title: 'Perfil',
      icon: 'account',
      screen: 'Profile',
    },
    {
      id: 2,
      title: 'Notificaciones',
      icon: 'bell',
      screen: 'Notifications',
    },
    {
      id: 3,
      title: 'Seguridad',
      icon: 'shield-check',
      screen: 'Security',
    },
    {
      id: 4,
      title: 'Cambio de Moneda',
      icon: 'currency-usd',
      screen: 'CurrencyChange',
    },
    {
      id: 5,
      title: 'Idioma',
      icon: 'web',
      screen: 'Language',
    },
    {
      id: 6,
      title: 'Ayuda',
      icon: 'help-circle',
      screen: 'Help',
    },
  ];

  const handleMenuPress = (screen) => {
    if (navigation) {
      navigation.navigate(screen);
    }
    console.log(`Navigating to ${screen}`);
  };

  const MenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => handleMenuPress(item.screen)}
      activeOpacity={0.7}>
      <View style={styles.menuIconContainer}>
        <Icon name={item.icon} size={24} color="#4A90E2" />
      </View>
      <Text style={styles.menuText}>{item.title}</Text>
      <Icon name="chevron-right" size={24} color="#D1D5DB" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Configuración Personalizada...</Text>

        <View style={styles.iconContainer}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Configuración Personalizada</Text>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={28} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="calendar-blank" size={28} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="heart" size={28} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="account" size={28} color="#4A90E2" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

//Seccion de estilos
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
  menuContainer: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
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
  navItem: {
    padding: 5,
  },
});