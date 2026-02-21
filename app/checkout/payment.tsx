import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  CreditCard,
  ChevronRight,
  Lock,
  Plus,
  Check,
  Shield,
} from 'lucide-react-native';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'paypal';
  lastFour: string;
  expiryDate: string;
  cardholderName: string;
  isDefault: boolean;
}

export default function PaymentScreen() {
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
  ]);

  const [selectedMethod, setSelectedMethod] = useState('1');
  const [showAddCard, setShowAddCard] = useState(false);
  const [saveCard, setSaveCard] = useState(true);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const [useDifferentBilling, setUseDifferentBilling] = useState(false);

  const handleSelectMethod = (id: string) => {
    setSelectedMethod(id);
  };

  const handleAddCard = () => {
    if (!newCard.cardNumber || !newCard.expiryDate || !newCard.cvv || !newCard.cardholderName) {
      Alert.alert('Missing Information', 'Please fill in all card details.');
      return;
    }

    const newId = (paymentMethods.length + 1).toString();
    const cardToAdd: PaymentMethod = {
      id: newId,
      type: 'visa', // In real app, detect from card number
      lastFour: newCard.cardNumber.slice(-4),
      expiryDate: newCard.expiryDate,
      cardholderName: newCard.cardholderName,
      isDefault: false,
    };

    if (saveCard) {
      setPaymentMethods([...paymentMethods, cardToAdd]);
    }
    
    setSelectedMethod(newId);
    setNewCard({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
    });
    setShowAddCard(false);
    Alert.alert('Success', 'Card added successfully.');
  };

  const proceedToConfirmation = () => {
    // Process payment logic here
    router.push('/checkout/confirmation');
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
      default:
        return '💳';
    }
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      <ScrollView className="flex-1 px-4 pb-24" showsVerticalScrollIndicator={false}>
        {/* Security Notice */}
        <View className="flex-row items-center bg-[#4ECDC4]/10 p-3 rounded-xl gap-2 mb-4">
          <Lock size={20} color="#4ECDC4" />
          <Text className="text-[#4ECDC4] text-xs flex-1">
            Your payment information is secured with 256-bit encryption
          </Text>
        </View>

        {/* Saved Payment Methods */}
        <View className="bg-[#1A1A1A] rounded-2xl p-4 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-semibold">Saved Payment Methods</Text>
            <TouchableOpacity onPress={() => setShowAddCard(true)}>
              <Plus size={20} color="#4ECDC4" />
            </TouchableOpacity>
          </View>
          
          <View className="gap-3 mb-4">
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                className={`flex-row bg-[#2A2A2A] rounded-xl p-4 ${
                  selectedMethod === method.id
                    ? 'bg-[#4ECDC4]/10 border border-[#4ECDC4]'
                    : ''
                }`}
                onPress={() => handleSelectMethod(method.id)}
              >
                <View className="mr-3">
                  <View
                    className={`w-5 h-5 rounded-full border-2 ${
                      selectedMethod === method.id
                        ? 'bg-[#4ECDC4] border-[#4ECDC4]'
                        : 'border-[#888888]'
                    }`}
                  />
                </View>
                
                <View className="flex-1">
                  <View className="flex-row justify-between items-center mb-3">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-xl">{getCardIcon(method.type)}</Text>
                      <Text className="text-[#4ECDC4] text-sm font-semibold">
                        {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
                      </Text>
                      {method.isDefault && (
                        <View className="flex-row items-center bg-[#4ECDC4]/10 px-1.5 py-0.5 rounded-full gap-1 ml-2">
                          <Check size={10} color="#4ECDC4" />
                          <Text className="text-[#4ECDC4] text-[10px] font-semibold">Default</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  
                  <Text className="text-white text-base font-semibold tracking-wide mb-2">
                    •••• •••• •••• {method.lastFour}
                  </Text>
                  <View className="flex-row justify-between">
                    <Text className="text-[#AAAAAA] text-sm">{method.cardholderName}</Text>
                    <Text className="text-[#888888] text-xs">Expires {method.expiryDate}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Other Payment Options */}
          <TouchableOpacity className="flex-row items-center bg-[#2A2A2A] rounded-xl p-4">
            <View className="w-10 h-10 rounded-full bg-[#333333] justify-center items-center mr-3">
              <Text className="text-xl">🔵</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-base font-semibold mb-1">PayPal</Text>
              <Text className="text-[#888888] text-xs">Pay with your PayPal account</Text>
            </View>
            <View className="ml-3">
              <View className="w-5 h-5 rounded-full border-2 border-[#888888]" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Add New Card Form */}
        {showAddCard && (
          <View className="bg-[#1A1A1A] rounded-2xl p-4 mb-4">
            <Text className="text-white text-lg font-semibold mb-4">Add New Card</Text>
            
            <View className="gap-4">
              <View className="gap-2">
                <Text className="text-white text-sm font-medium">Card Number *</Text>
                <TextInput
                  className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                  value={newCard.cardNumber}
                  onChangeText={(text) => setNewCard({ ...newCard, cardNumber: formatCardNumber(text) })}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#666666"
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>

              <View className="flex-row">
                <View className="flex-1 mr-3 gap-2">
                  <Text className="text-white text-sm font-medium">Expiry Date *</Text>
                  <TextInput
                    className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                    value={newCard.expiryDate}
                    onChangeText={(text) => setNewCard({ ...newCard, expiryDate: formatExpiryDate(text) })}
                    placeholder="MM/YY"
                    placeholderTextColor="#666666"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
                <View className="flex-1 gap-2">
                  <Text className="text-white text-sm font-medium">CVV *</Text>
                  <TextInput
                    className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                    value={newCard.cvv}
                    onChangeText={(text) => setNewCard({ ...newCard, cvv: text.replace(/\D/g, '').slice(0, 4) })}
                    placeholder="123"
                    placeholderTextColor="#666666"
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>

              <View className="gap-2">
                <Text className="text-white text-sm font-medium">Cardholder Name *</Text>
                <TextInput
                  className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                  value={newCard.cardholderName}
                  onChangeText={(text) => setNewCard({ ...newCard, cardholderName: text })}
                  placeholder="Name on card"
                  placeholderTextColor="#666666"
                  autoCapitalize="words"
                />
              </View>

              <View className="flex-row items-center gap-3">
                <Switch
                  value={saveCard}
                  onValueChange={setSaveCard}
                  trackColor={{ false: '#767577', true: '#4ECDC4' }}
                  thumbColor={saveCard ? '#FFFFFF' : '#f4f3f4'}
                />
                <Text className="text-white text-sm flex-1">Save this card for future purchases</Text>
              </View>

              <View className="flex-row gap-3 mt-2">
                <TouchableOpacity
                  className="flex-1 bg-[#2A2A2A] py-4 rounded-xl items-center border border-[#333333]"
                  onPress={() => setShowAddCard(false)}
                >
                  <Text className="text-[#888888] text-base font-medium">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-[#4ECDC4] py-4 rounded-xl items-center" onPress={handleAddCard}>
                  <Text className="text-black text-base font-semibold">Add Card</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Billing Address */}
        <View className="bg-[#1A1A1A] rounded-2xl p-4 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-semibold">Billing Address</Text>
          </View>
          
          <View className="flex-row items-center gap-3 mb-4">
            <Switch
              value={useDifferentBilling}
              onValueChange={setUseDifferentBilling}
              trackColor={{ false: '#767577', true: '#4ECDC4' }}
              thumbColor={useDifferentBilling ? '#FFFFFF' : '#f4f3f4'}
            />
            <Text className="text-white text-base flex-1">Use a different billing address</Text>
          </View>

          {useDifferentBilling && (
            <View className="gap-4 pt-4 border-t border-[#2A2A2A]">
              <View className="gap-2">
                <Text className="text-white text-sm font-medium">Billing Address</Text>
                <TextInput
                  className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                  placeholder="Enter billing address"
                  placeholderTextColor="#666666"
                />
              </View>
              
              <View className="flex-row">
                <View className="flex-1 mr-3 gap-2">
                  <Text className="text-white text-sm font-medium">City</Text>
                  <TextInput
                    className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                    placeholder="City"
                    placeholderTextColor="#666666"
                  />
                </View>
                <View className="flex-1 gap-2">
                  <Text className="text-white text-sm font-medium">ZIP Code</Text>
                  <TextInput
                    className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                    placeholder="ZIP code"
                    placeholderTextColor="#666666"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Order Review */}
        <View className="bg-[#1A1A1A] rounded-2xl p-4 mb-4">
          <Text className="text-white text-lg font-semibold mb-4">Order Review</Text>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-[#888888] text-sm">Items (3)</Text>
            <Text className="text-white text-sm font-medium">$1,070.00</Text>
          </View>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-[#888888] text-sm">Shipping</Text>
            <Text className="text-white text-sm font-medium">$5.99</Text>
          </View>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-[#888888] text-sm">Tax</Text>
            <Text className="text-white text-sm font-medium">$85.60</Text>
          </View>
          
          <View className="flex-row justify-between mt-4 pt-4 border-t border-[#333333]">
            <Text className="text-white text-lg font-semibold">Total</Text>
            <Text className="text-white text-xl font-bold">$1,161.59</Text>
          </View>
        </View>

        {/* Protection Notice */}
        <View className="flex-row items-center bg-[#4ECDC4]/10 p-4 rounded-xl gap-3 mb-4">
          <Shield size={20} color="#4ECDC4" />
          <Text className="text-[#4ECDC4] text-sm flex-1">
            Your purchase is protected by our Buyer Protection policy
          </Text>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-[#1A1A1A] px-4 pt-4 pb-9">
        <TouchableOpacity
          className="flex-row items-center justify-center bg-[#4ECDC4] py-4 rounded-full gap-2"
          onPress={proceedToConfirmation}
        >
          <Text className="text-black text-base font-semibold">Place Order</Text>
          <ChevronRight size={20} color="#000000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}