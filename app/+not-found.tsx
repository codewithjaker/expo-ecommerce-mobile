// app/+not-found.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Home, ArrowLeft } from 'lucide-react-native';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]">
      <View className="flex-1 items-center justify-center px-6">
        {/* Illustration */}
        <View className="w-48 h-48 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-8">
          <Text className="text-[#4ECDC4] text-6xl font-black opacity-30">404</Text>
        </View>

        {/* Message */}
        <Text className="text-white text-3xl font-bold text-center mb-4">
          Oops! Page not found
        </Text>
        <Text className="text-[#888888] text-base text-center leading-6 mb-10 max-w-[300px]">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </Text>

        {/* Actions */}
        <TouchableOpacity
          className="flex-row items-center justify-center bg-[#4ECDC4] w-full py-4 rounded-full gap-3 mb-4"
          onPress={() => router.replace('/(tabs)')}
        >
          <Home size={20} color="#000000" />
          <Text className="text-black text-base font-semibold">Go to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-center bg-transparent w-full py-4 rounded-full border border-[#333333] gap-3"
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#FFFFFF" />
          <Text className="text-white text-base font-medium">Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}