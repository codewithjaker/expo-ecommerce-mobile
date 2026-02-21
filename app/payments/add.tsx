import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import {
  ChevronLeft,
  CreditCard,
  Lock,
  Check,
  Calendar,
  User,
  MapPin,
  Eye,
  EyeOff,
} from 'lucide-react-native';

type PaymentMethod = 'card' | 'paypal' | 'applepay';

interface CardFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingZip: string;
}

export default function AddPaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [isSaving, setIsSaving] = useState(false);
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CardFormData>({
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      billingZip: '',
    },
  });

  const watchedCardNumber = watch('cardNumber');
  const watchedCardholderName = watch('cardholderName');
  const watchedExpiryDate = watch('expiryDate');

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🔵' },
    { id: 'applepay', name: 'Apple Pay', icon: '' },
  ] as const;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleCardNumberChange = (text: string, onChange: (value: string) => void) => {
    const formatted = formatCardNumber(text);
    onChange(formatted);
  };

  const handleExpiryDateChange = (text: string, onChange: (value: string) => void) => {
    const formatted = formatExpiryDate(text);
    onChange(formatted);
  };

  const onSubmit = async (data: CardFormData) => {
    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        'Success',
        'Payment method added successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to add payment method. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    const hasValues = Object.values(watch()).some(val => val && val.length > 0);
    if (hasValues) {
      Alert.alert(
        'Discard Changes?',
        'Are you sure you want to discard this payment method?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      router.back();
    }
  };

  const renderPaymentMethodSelector = () => (
    <View className="px-4 py-6">
      <Text className="text-white text-lg font-semibold mb-4">Payment Method</Text>
      <View className="flex-row gap-3">
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            className={`flex-1 items-center bg-[#1A1A1A] rounded-xl p-4 border ${
              selectedMethod === method.id
                ? 'border-[#4ECDC4] bg-[#4ECDC4]/10'
                : 'border-[#2A2A2A]'
            } relative`}
            onPress={() => setSelectedMethod(method.id as PaymentMethod)}
          >
            <Text className="text-2xl mb-2">{method.icon}</Text>
            <Text
              className={`text-xs font-medium text-center ${
                selectedMethod === method.id ? 'text-[#4ECDC4]' : 'text-white'
              }`}
            >
              {method.name}
            </Text>
            {selectedMethod === method.id && (
              <View className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#4ECDC4] justify-center items-center">
                <Check size={12} color="#000000" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCardForm = () => (
    <View className="px-4">
      {/* Card Preview */}
      <View className="bg-[#1A1A1A] rounded-2xl p-5 mb-6 border border-[#2A2A2A]">
        <View className="gap-5">
          <View className="flex-row justify-between items-center">
            <CreditCard size={24} color="#FFFFFF" />
            <Text className="text-white text-base font-semibold opacity-80">
              {watchedCardNumber?.startsWith('4')
                ? 'VISA'
                : watchedCardNumber?.startsWith('5')
                ? 'MASTERCARD'
                : watchedCardNumber?.startsWith('3')
                ? 'AMEX'
                : 'CARD'}
            </Text>
          </View>

          <Text className="text-white text-2xl font-semibold tracking-wider text-center">
            {watchedCardNumber || '•••• •••• •••• ••••'}
          </Text>

          <View className="flex-row justify-between">
            <View>
              <Text className="text-white/70 text-[10px] mb-1">Cardholder Name</Text>
              <Text className="text-white text-sm font-semibold">
                {watchedCardholderName || 'YOUR NAME'}
              </Text>
            </View>
            <View>
              <Text className="text-white/70 text-[10px] mb-1">Expires</Text>
              <Text className="text-white text-sm font-semibold">
                {watchedExpiryDate || 'MM/YY'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Form Fields */}
      <View className="gap-4">
        {/* Cardholder Name */}
        <View>
          <View className="flex-row items-center mb-2 gap-2">
            <User size={16} color="#888888" />
            <Text className="text-[#888888] text-sm">Cardholder Name</Text>
          </View>
          <Controller
            control={control}
            name="cardholderName"
            rules={{ required: 'Cardholder name is required', minLength: { value: 2, message: 'Enter a valid name' } }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                  errors.cardholderName ? 'border-[#EF476F]' : 'border-[#333333]'
                }`}
                value={value}
                onChangeText={onChange}
                placeholder="John Doe"
                placeholderTextColor="#666666"
                autoCapitalize="words"
              />
            )}
          />
          {errors.cardholderName && (
            <Text className="text-[#EF476F] text-xs mt-1">{errors.cardholderName.message}</Text>
          )}
        </View>

        {/* Card Number */}
        <View>
          <View className="flex-row items-center mb-2 gap-2">
            <CreditCard size={16} color="#888888" />
            <Text className="text-[#888888] text-sm">Card Number</Text>
          </View>
          <Controller
            control={control}
            name="cardNumber"
            rules={{
              required: 'Card number is required',
              pattern: {
                value: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
                message: 'Invalid card number',
              },
              minLength: { value: 19, message: 'Must be 16 digits' },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                  errors.cardNumber ? 'border-[#EF476F]' : 'border-[#333333]'
                }`}
                value={value}
                onChangeText={(text) => handleCardNumberChange(text, onChange)}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#666666"
                keyboardType="numeric"
                maxLength={19}
              />
            )}
          />
          {errors.cardNumber && (
            <Text className="text-[#EF476F] text-xs mt-1">{errors.cardNumber.message}</Text>
          )}
        </View>

        <View className="flex-row gap-3">
          {/* Expiry Date */}
          <View className="flex-1">
            <View className="flex-row items-center mb-2 gap-2">
              <Calendar size={16} color="#888888" />
              <Text className="text-[#888888] text-sm">Expiry Date</Text>
            </View>
            <Controller
              control={control}
              name="expiryDate"
              rules={{
                required: 'Expiry date is required',
                pattern: { value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, message: 'Use MM/YY' },
                validate: (value) => {
                  if (!value) return true;
                  const [month, year] = value.split('/');
                  if (!month || !year) return 'Invalid format';
                  const currentYear = new Date().getFullYear() % 100;
                  const currentMonth = new Date().getMonth() + 1;
                  const expMonth = parseInt(month, 10);
                  const expYear = parseInt(year, 10);
                  if (expMonth < 1 || expMonth > 12) return 'Invalid month';
                  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                    return 'Card expired';
                  }
                  return true;
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                    errors.expiryDate ? 'border-[#EF476F]' : 'border-[#333333]'
                  }`}
                  value={value}
                  onChangeText={(text) => handleExpiryDateChange(text, onChange)}
                  placeholder="MM/YY"
                  placeholderTextColor="#666666"
                  keyboardType="numeric"
                  maxLength={5}
                />
              )}
            />
            {errors.expiryDate && (
              <Text className="text-[#EF476F] text-xs mt-1">{errors.expiryDate.message}</Text>
            )}
          </View>

          {/* CVV */}
          <View className="flex-1">
            <View className="flex-row items-center mb-2 gap-2">
              <Lock size={16} color="#888888" />
              <Text className="text-[#888888] text-sm">CVV</Text>
            </View>
            <View className="relative">
              <Controller
                control={control}
                name="cvv"
                rules={{
                  required: 'CVV is required',
                  pattern: { value: /^\d{3,4}$/, message: 'CVV must be 3 or 4 digits' },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                      errors.cvv ? 'border-[#EF476F]' : 'border-[#333333]'
                    }`}
                    value={value}
                    onChangeText={onChange}
                    placeholder="123"
                    placeholderTextColor="#666666"
                    keyboardType="numeric"
                    secureTextEntry={!showCvv}
                    maxLength={4}
                  />
                )}
              />
              <TouchableOpacity
                className="absolute right-4 top-0 bottom-0 justify-center"
                onPress={() => setShowCvv(!showCvv)}
              >
                {showCvv ? (
                  <EyeOff size={20} color="#888888" />
                ) : (
                  <Eye size={20} color="#888888" />
                )}
              </TouchableOpacity>
            </View>
            {errors.cvv && (
              <Text className="text-[#EF476F] text-xs mt-1">{errors.cvv.message}</Text>
            )}
          </View>
        </View>

        {/* Billing ZIP */}
        <View>
          <View className="flex-row items-center mb-2 gap-2">
            <MapPin size={16} color="#888888" />
            <Text className="text-[#888888] text-sm">Billing ZIP Code</Text>
          </View>
          <Controller
            control={control}
            name="billingZip"
            rules={{ required: 'ZIP code is required', minLength: { value: 3, message: 'Invalid ZIP' } }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                  errors.billingZip ? 'border-[#EF476F]' : 'border-[#333333]'
                }`}
                value={value}
                onChangeText={onChange}
                placeholder="10001"
                placeholderTextColor="#666666"
                keyboardType="numeric"
                maxLength={10}
              />
            )}
          />
          {errors.billingZip && (
            <Text className="text-[#EF476F] text-xs mt-1">{errors.billingZip.message}</Text>
          )}
        </View>
      </View>
    </View>
  );

  const renderPayPalForm = () => (
    <View className="items-center bg-[#1A1A1A] mx-4 p-8 rounded-2xl border border-[#2A2A2A]">
      <View className="w-20 h-20 rounded-full bg-[#2A2A2A] justify-center items-center mb-4">
        <Text className="text-3xl">🔵</Text>
      </View>
      <Text className="text-white text-xl font-semibold mb-2">PayPal</Text>
      <Text className="text-[#888888] text-sm text-center leading-5 mb-6">
        You will be redirected to PayPal to complete the setup. Your PayPal account will be linked securely.
      </Text>
      <TouchableOpacity className="bg-[#4ECDC4] px-6 py-3 rounded-full">
        <Text className="text-black text-base font-semibold">Connect PayPal Account</Text>
      </TouchableOpacity>
    </View>
  );

  const renderApplePayForm = () => (
    <View className="items-center bg-[#1A1A1A] mx-4 p-8 rounded-2xl border border-[#2A2A2A]">
      <View className="w-20 h-20 rounded-full bg-[#2A2A2A] justify-center items-center mb-4">
        <Text className="text-3xl"></Text>
      </View>
      <Text className="text-white text-xl font-semibold mb-2">Apple Pay</Text>
      <Text className="text-[#888888] text-sm text-center leading-5 mb-6">
        Add your card to Apple Wallet. You'll be able to use Apple Pay for faster checkout.
      </Text>
      <TouchableOpacity className="bg-[#4ECDC4] px-6 py-3 rounded-full">
        <Text className="text-black text-base font-semibold">Add to Apple Wallet</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={handleCancel} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Add Payment Method</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 pb-24" showsVerticalScrollIndicator={false}>
        {/* Security Notice */}
        <View className="flex-row items-center bg-[#4ECDC4]/10 mx-4 mt-4 p-3 rounded-xl gap-2">
          <Lock size={20} color="#4ECDC4" />
          <Text className="text-[#4ECDC4] text-xs flex-1">
            Your payment information is secured with 256-bit encryption
          </Text>
        </View>

        {/* Payment Method Selector */}
        {renderPaymentMethodSelector()}

        {/* Form */}
        {selectedMethod === 'card' && renderCardForm()}
        {selectedMethod === 'paypal' && renderPayPalForm()}
        {selectedMethod === 'applepay' && renderApplePayForm()}

        {/* Save as Default */}
        <View className="px-4 py-6 border-t border-[#1A1A1A]">
          <TouchableOpacity
            className="flex-row items-center mb-2"
            onPress={() => setSaveAsDefault(!saveAsDefault)}
          >
            <View
              className={`w-5 h-5 rounded mr-3 justify-center items-center ${
                saveAsDefault ? 'bg-[#4ECDC4]' : 'bg-[#2A2A2A]'
              }`}
            >
              {saveAsDefault && <Check size={12} color="#000000" />}
            </View>
            <Text className="text-white text-base font-medium">Set as default payment method</Text>
          </TouchableOpacity>
          <Text className="text-[#666666] text-xs ml-8 leading-4">
            This payment method will be used for all future purchases unless changed
          </Text>
        </View>

        {/* Payment Info */}
        <View className="bg-[#1A1A1A] mx-4 mt-2 p-5 rounded-2xl">
          <Text className="text-white text-base font-semibold mb-4">Payment Information</Text>
          <View className="gap-3">
            <View className="flex-row justify-between items-center pb-3 border-b border-[#2A2A2A]">
              <Text className="text-[#888888] text-sm">Processing Fee</Text>
              <Text className="text-white text-sm font-medium">No fees</Text>
            </View>
            <View className="flex-row justify-between items-center pb-3 border-b border-[#2A2A2A]">
              <Text className="text-[#888888] text-sm">Currency</Text>
              <Text className="text-white text-sm font-medium">USD ($)</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-[#888888] text-sm">Security</Text>
              <Text className="text-white text-sm font-medium">PCI DSS Compliant</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#1A1A1A] rounded-t-2xl flex-row px-4 py-4 pb-9 border-t border-[#333333] gap-3">
        <TouchableOpacity
          className="flex-1 py-4 rounded-xl border border-[#333333] items-center"
          onPress={handleCancel}
        >
          <Text className="text-[#888888] text-base font-medium">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-2 py-4 rounded-xl items-center ${
            isSaving ? 'bg-[#2A2A2A] opacity-50' : 'bg-[#4ECDC4]'
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={isSaving}
        >
          <Text className="text-black text-base font-semibold">
            {isSaving ? 'Saving...' : 'Save Payment Method'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}