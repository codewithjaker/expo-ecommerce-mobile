import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  CreditCard,
  Plus,
  Trash2,
  Check,
  Lock,
} from 'lucide-react-native';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'paypal' | 'applepay';
  lastFour: string;
  expiryDate: string;
  cardholderName: string;
  isDefault: boolean;
}

export default function PaymentsScreen() {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'visa',
      lastFour: '4321',
      expiryDate: '12/25',
      cardholderName: 'Andrew Ainsley',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mastercard',
      lastFour: '8765',
      expiryDate: '08/24',
      cardholderName: 'Andrew Ainsley',
      isDefault: false,
    },
    {
      id: '3',
      type: 'paypal',
      lastFour: 'user@example.com',
      expiryDate: '',
      cardholderName: 'Andrew Ainsley',
      isDefault: false,
    },
  ]);

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDeleteMethod = (id: string) => {
    Alert.alert(
      'Remove Payment Method',
      'Are you sure you want to remove this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(prev => prev.filter(method => method.id !== id));
          },
        },
      ]
    );
  };

  const getCardIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      case 'paypal':
        return '🔵';
      case 'applepay':
        return '';
      default:
        return '💳';
    }
  };

  const getCardBackground = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'visa':
        return ['#1A1F71', '#F7B600'];
      case 'mastercard':
        return ['#EB001B', '#F79E1B'];
      case 'amex':
        return ['#2E77BC', '#FFFFFF'];
      case 'paypal':
        return ['#003087', '#009CDE'];
      case 'applepay':
        return ['#000000', '#666666'];
      default:
        return ['#1A1A1A', '#2A2A2A'];
    }
  };

  const renderPaymentCard = (method: PaymentMethod) => {
    const [bgStart, bgEnd] = getCardBackground(method.type);
    
    return (
      <View key={method.id} className="mb-3">
        <View
          className="rounded-2xl p-5 border"
          style={{
            backgroundColor: bgStart,
            borderColor: bgEnd,
          }}
        >
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center gap-2">
              <Text className="text-2xl">{getCardIcon(method.type)}</Text>
              <Text className="text-white text-base font-semibold opacity-90">
                {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
              </Text>
            </View>
            {method.isDefault && (
              <View className="flex-row items-center bg-white/20 px-2 py-1 rounded-full gap-1">
                <Check size={12} color="#4ECDC4" />
                <Text className="text-white text-[10px] font-semibold">Default</Text>
              </View>
            )}
          </View>

          <View className="mb-5">
            <Text className="text-white text-2xl font-semibold tracking-wider mb-5">
              •••• •••• •••• {method.lastFour}
            </Text>
            <View className="flex-row justify-between">
              <View>
                <Text className="text-white/70 text-[10px] mb-1">Cardholder Name</Text>
                <Text className="text-white text-sm font-semibold">{method.cardholderName}</Text>
              </View>
              {method.expiryDate && (
                <View>
                  <Text className="text-white/70 text-[10px] mb-1">Expires</Text>
                  <Text className="text-white text-sm font-semibold">{method.expiryDate}</Text>
                </View>
              )}
            </View>
          </View>

          <View className="flex-row justify-between items-center pt-4 border-t border-white/20">
            <TouchableOpacity
              className="py-2"
              onPress={() => handleSetDefault(method.id)}
            >
              <Text
                className={`text-sm font-medium ${
                  method.isDefault ? 'text-[#4ECDC4]' : 'text-white/70'
                }`}
              >
                {method.isDefault ? 'Default' : 'Set as Default'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-2"
              onPress={() => handleDeleteMethod(method.id)}
            >
              <Trash2 size={18} color="#EF476F" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Payment Methods</Text>
        <TouchableOpacity
          className="p-2"
          onPress={() => router.push('/payments/add')}
        >
          <Plus size={24} color="#4ECDC4" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Security Notice */}
        <View className="flex-row items-center bg-[#4ECDC4]/10 p-3 rounded-xl gap-2 mb-6">
          <Lock size={20} color="#4ECDC4" />
          <Text className="text-[#4ECDC4] text-xs flex-1">
            Your payment information is secured with 256-bit encryption
          </Text>
        </View>

        {/* Payment Methods List */}
        <View className="mb-6">
          {paymentMethods.length > 0 ? (
            paymentMethods.map(renderPaymentCard)
          ) : (
            <View className="items-center justify-center py-16 px-8">
              <CreditCard size={64} color="#666666" />
              <Text className="text-white text-xl font-semibold mt-6 mb-2">
                No Payment Methods
              </Text>
              <Text className="text-[#888888] text-sm text-center leading-5">
                You haven't added any payment methods yet.
              </Text>
            </View>
          )}
        </View>

        {/* Add New Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center bg-[#4ECDC4]/10 py-4 rounded-xl border border-[#4ECDC4] gap-3 mb-8"
          onPress={() => router.push('/payments/add')}
        >
          <Plus size={20} color="#4ECDC4" />
          <Text className="text-[#4ECDC4] text-base font-semibold">
            Add New Payment Method
          </Text>
        </TouchableOpacity>

        {/* Other Payment Options */}
        <View className="mb-8">
          <Text className="text-white text-base font-semibold mb-4">
            Other Payment Options
          </Text>
          
          <TouchableOpacity className="flex-row items-center bg-[#1A1A1A] rounded-xl p-4 mb-3">
            <View className="w-10 h-10 rounded-full bg-[#2A2A2A] justify-center items-center mr-3">
              <Text className="text-xl">🔵</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-base font-semibold mb-1">PayPal</Text>
              <Text className="text-[#888888] text-xs">Link your PayPal account</Text>
            </View>
            <ChevronLeft size={20} color="#666666" className="rotate-180" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center bg-[#1A1A1A] rounded-xl p-4">
            <View className="w-10 h-10 rounded-full bg-[#2A2A2A] justify-center items-center mr-3">
              <Text className="text-xl"></Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-base font-semibold mb-1">Apple Pay</Text>
              <Text className="text-[#888888] text-xs">Add to Apple Wallet</Text>
            </View>
            <ChevronLeft size={20} color="#666666" className="rotate-180" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}