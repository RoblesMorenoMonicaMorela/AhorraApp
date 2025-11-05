import React from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity,Image,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

export default function AyudaScreen({ navigation }) {
  const faqs = [
    {
      id: 1,
      question: '¿Cómo creo un presupuesto?',
      answer:
        'Para crear un presupuesto, ve a la sección de Presupuestos, toca el botón "+" y completa la información requerida como categoría, monto y período.',
    },
    {
      id: 2,
      question: '¿Cómo registro un gasto?',
      answer:
        'Puedes registrar un gasto desde la pantalla principal tocando el botón de agregar gasto. Selecciona la categoría, ingresa el monto y una descripción opcional.',
    },
    {
      id: 3,
      question: '¿Puedo exportar mis datos?',
      answer:
        'Sí, puedes exportar tus datos en formato CSV o PDF desde la sección de Configuración > Exportar Datos.',
    },
  ];

  const contactOptions = [
    {
      id: 1,
      title: 'Correo Electrónico',
      subtitle: 'soporte@budgetapp.com',
      icon: 'email',
      color: '#4A90E2',
    },
    {
      id: 2,
      title: 'WhatsApp',
      subtitle: '+52 123 456 7890',
      icon: 'whatsapp',
      color: '#25D366',
    },
    {
      id: 3,
      title: 'Chat en Vivo',
      subtitle: 'Disponible 24/7',
      icon: 'chat',
      color: '#F59E0B',
    },
  ];

  const FAQItem = ({ item }) => (
    <TouchableOpacity
      style={styles.faqItem}
      onPress={() => {}}
      activeOpacity={0.7}>
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{item.question}</Text>
        <Icon name="chevron-down" size={24} color="#6B7280" />
      </View>
    </TouchableOpacity>
  );

  const ContactOption = ({ item }) => (
    <TouchableOpacity
      style={styles.contactOption}
      onPress={() => {}}
      activeOpacity={0.7}>
      <View
        style={[
          styles.contactIconContainer,
          { backgroundColor: `${item.color}15` },
        ]}>
        <Icon name={item.icon} size={28} color={item.color} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>{item.title}</Text>
        <Text style={styles.contactSubtitle}>{item.subtitle}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#D1D5DB" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="arrow-left" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.header}>Ayuda</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.iconContainer}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Ayuda</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
          <View style={styles.faqContainer}>
            {faqs.map((faq) => (
              <FAQItem key={faq.id} item={faq} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contáctanos</Text>
          <View style={styles.contactContainer}>
            {contactOptions.map((option) => (
              <ContactOption key={option.id} item={option} />
            ))}
          </View>
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versión 1.0.0</Text>
          <Text style={styles.versionSubtext}>
            © 2025 Budget App. Todos los derechos reservados.
          </Text>
        </View>
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
    backgroundColor: '#F5F5F5',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  faqContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 10,
  },
  contactContainer: {
    gap: 12,
  },
  contactOption: {
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
  contactIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  versionText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
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