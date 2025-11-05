import React from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity, Image,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LOGO_APP_IMAGE = require('../assets/recursos/Ahorro.png');

export default function IdiomaScreen() {
  const selectedLanguage = 'es';

  const languages = [
    { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  ];

  const currentLanguage = languages.find(
    (lang) => lang.code === selectedLanguage
  );

  const LanguageItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        item.code === selectedLanguage && styles.languageItemSelected,
      ]}
      onPress={() => {}}
      activeOpacity={0.7}>
      <Text style={styles.languageFlag}>{item.flag}</Text>
      <View style={styles.languageInfo}>
        <Text style={styles.languageName}>{item.nativeName}</Text>
        <Text style={styles.languageSubname}>{item.name}</Text>
      </View>
      {item.code === selectedLanguage && (
        <Icon name="check-circle" size={24} color="#4A90E2" />
      )}
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
          <Text style={styles.header}>Idioma</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.iconContainer}>
          <Image
            source={LOGO_APP_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Idioma</Text>

        <View style={styles.currentLanguageCard}>
          <Text style={styles.flagIcon}>{currentLanguage.flag}</Text>
          <Text style={styles.currentLanguageName}>
            {currentLanguage.nativeName}
          </Text>
          <Text style={styles.currentLanguageDescription}>
            Selecciona el idioma que prefieras usar en la app.
          </Text>
        </View>

        <View style={styles.languageList}>
          <Text style={styles.listTitle}>Idiomas Disponibles</Text>
          {languages.map((language) => (
            <LanguageItem key={language.code} item={language} />
          ))}
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
  currentLanguageCard: {
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
  currentLanguageName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  currentLanguageDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  languageList: {
    marginBottom: 24,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  languageItemSelected: {
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  languageFlag: {
    fontSize: 32,
    marginRight: 12,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  languageSubname: {
    fontSize: 14,
    color: '#6B7280',
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