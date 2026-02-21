import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Globe,
  Check,
  Download,
} from 'lucide-react-native';

interface Language {
  id: string;
  name: string;
  nativeName: string;
  code: string;
  direction: 'ltr' | 'rtl';
  available: boolean;
}

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [downloading, setDownloading] = useState<string | null>(null);

  const languages: Language[] = [
    {
      id: '1',
      name: 'English',
      nativeName: 'English',
      code: 'en',
      direction: 'ltr',
      available: true,
    },
    {
      id: '2',
      name: 'Spanish',
      nativeName: 'Español',
      code: 'es',
      direction: 'ltr',
      available: true,
    },
    {
      id: '3',
      name: 'French',
      nativeName: 'Français',
      code: 'fr',
      direction: 'ltr',
      available: true,
    },
    {
      id: '4',
      name: 'German',
      nativeName: 'Deutsch',
      code: 'de',
      direction: 'ltr',
      available: true,
    },
    {
      id: '5',
      name: 'Chinese (Simplified)',
      nativeName: '简体中文',
      code: 'zh',
      direction: 'ltr',
      available: false,
    },
    {
      id: '6',
      name: 'Japanese',
      nativeName: '日本語',
      code: 'ja',
      direction: 'ltr',
      available: false,
    },
    {
      id: '7',
      name: 'Korean',
      nativeName: '한국어',
      code: 'ko',
      direction: 'ltr',
      available: false,
    },
    {
      id: '8',
      name: 'Arabic',
      nativeName: 'العربية',
      code: 'ar',
      direction: 'rtl',
      available: false,
    },
    {
      id: '9',
      name: 'Russian',
      nativeName: 'Русский',
      code: 'ru',
      direction: 'ltr',
      available: false,
    },
    {
      id: '10',
      name: 'Portuguese',
      nativeName: 'Português',
      code: 'pt',
      direction: 'ltr',
      available: false,
    },
  ];

  const handleSelectLanguage = (code: string) => {
    const language = languages.find(lang => lang.code === code);
    
    if (language?.available) {
      setSelectedLanguage(code);
      Alert.alert(
        'Language Changed',
        `App language changed to ${language.name}`,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Download Required',
        `The ${language?.name} language pack needs to be downloaded first.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Download',
            onPress: () => downloadLanguagePack(code),
          },
        ]
      );
    }
  };

  const downloadLanguagePack = (code: string) => {
    setDownloading(code);
    
    // Simulate download
    setTimeout(() => {
      setDownloading(null);
      // In real app, you would update the state here
      Alert.alert(
        'Download Complete',
        `The language pack has been downloaded successfully.`,
        [
          {
            text: 'Switch Now',
            onPress: () => {
              setSelectedLanguage(code);
              Alert.alert('Success', 'Language changed successfully!');
            },
          },
          { text: 'Later' },
        ]
      );
    }, 2000);
  };

  const renderLanguage = (language: Language) => {
    const isSelected = selectedLanguage === language.code;
    const isDownloading = downloading === language.code;

    return (
      <TouchableOpacity
        key={language.id}
        className={`flex-row items-center justify-between p-4 border-b border-[#2A2A2A] ${
          isSelected ? 'bg-[#4ECDC4]/5' : ''
        }`}
        onPress={() => handleSelectLanguage(language.code)}
        disabled={isDownloading}
      >
        <View className="flex-row items-center flex-1">
          <View className="w-12 h-12 rounded-full bg-[#2A2A2A] justify-center items-center mr-4">
            <Globe size={24} color={language.available ? '#4ECDC4' : '#666666'} />
          </View>
          <View className="flex-1">
            <Text className="text-white text-base font-semibold mb-0.5">
              {language.name}
            </Text>
            <Text className="text-[#888888] text-sm mb-0.5">
              {language.nativeName}
            </Text>
            <Text className="text-[#666666] text-[10px]">
              {language.direction === 'rtl' ? 'Right-to-left' : 'Left-to-right'}
            </Text>
          </View>
        </View>

        <View className="ml-3">
          {isDownloading ? (
            <View className="px-3 py-2">
              <Text className="text-[#888888] text-xs italic">Downloading...</Text>
            </View>
          ) : !language.available ? (
            <TouchableOpacity
              className="flex-row items-center bg-[#4ECDC4]/10 px-3 py-2 rounded-full gap-1"
              onPress={() => downloadLanguagePack(language.code)}
            >
              <Download size={16} color="#4ECDC4" />
              <Text className="text-[#4ECDC4] text-xs font-semibold">Download</Text>
            </TouchableOpacity>
          ) : isSelected ? (
            <View className="w-8 h-8 rounded-full bg-[#4ECDC4]/10 justify-center items-center">
              <Check size={20} color="#4ECDC4" />
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Language</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Current Language */}
        <View className="p-4 border-b border-[#1A1A1A]">
          <Text className="text-white text-base font-semibold mb-3">
            Current Language
          </Text>
          <View className="flex-row items-center justify-between bg-[#4ECDC4]/10 p-4 rounded-2xl border border-[#4ECDC4]">
            <View className="flex-row items-center gap-4">
              <Globe size={32} color="#4ECDC4" />
              <View className="gap-1">
                <Text className="text-white text-lg font-semibold">
                  {languages.find(l => l.code === selectedLanguage)?.name}
                </Text>
                <Text className="text-[#4ECDC4] text-sm">
                  {languages.find(l => l.code === selectedLanguage)?.nativeName}
                </Text>
              </View>
            </View>
            <Check size={24} color="#4ECDC4" />
          </View>
        </View>

        {/* Available Languages */}
        <View className="p-4 border-b border-[#1A1A1A]">
          <View className="mb-4">
            <Text className="text-white text-lg font-semibold mb-1">
              Available Languages
            </Text>
            <Text className="text-[#888888] text-xs">
              {languages.filter(l => l.available).length} of {languages.length} languages available
            </Text>
          </View>
          
          <View className="bg-[#1A1A1A] rounded-xl overflow-hidden">
            {languages
              .filter(language => language.available)
              .map(renderLanguage)}
          </View>
        </View>

        {/* Downloadable Languages */}
        <View className="p-4">
          <View className="mb-4">
            <Text className="text-white text-lg font-semibold mb-1">
              Additional Languages
            </Text>
            <Text className="text-[#888888] text-xs">
              Download language packs to use them offline
            </Text>
          </View>
          
          <View className="bg-[#1A1A1A] rounded-xl overflow-hidden">
            {languages
              .filter(language => !language.available)
              .map(renderLanguage)}
          </View>
        </View>

        {/* Help Text */}
        <Text className="text-[#666666] text-xs text-center px-4 py-6 leading-4">
          Changing the language will affect all text in the app. Some languages may require downloading additional language packs.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}