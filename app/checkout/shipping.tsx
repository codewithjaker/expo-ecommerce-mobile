import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  MapPin,
  ChevronRight,
  Home,
  Briefcase,
  Plus,
  Check,
} from 'lucide-react-native';

interface Address {
  id: string;
  name: string;
  type: 'home' | 'work' | 'other';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export default function ShippingScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Andrew Ainsley',
      type: 'home',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (234) 567-8900',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Andrew Ainsley',
      type: 'work',
      address: '456 Park Avenue',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      country: 'United States',
      phone: '+1 (234) 567-8901',
      isDefault: false,
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState('1');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    type: 'home' as const,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    saveAddress: false,
  });

  const handleSelectAddress = (id: string) => {
    setSelectedAddress(id);
  };

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.address || !newAddress.city || !newAddress.zipCode) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const newId = (addresses.length + 1).toString();
    const addressToAdd: Address = {
      id: newId,
      name: newAddress.name,
      type: newAddress.type,
      address: newAddress.address,
      city: newAddress.city,
      state: newAddress.state,
      zipCode: newAddress.zipCode,
      country: newAddress.country,
      phone: newAddress.phone,
      isDefault: false,
    };

    setAddresses([...addresses, addressToAdd]);
    setSelectedAddress(newId);
    setNewAddress({
      name: '',
      type: 'home',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: '',
      saveAddress: false,
    });
    setShowAddForm(false);
    Alert.alert('Success', 'New address added successfully.');
  };

  const proceedToPayment = () => {
    router.push('/checkout/payment');
  };

  const getTypeIcon = (type: Address['type']) => {
    switch (type) {
      case 'home':
        return <Home size={16} color="#4ECDC4" />;
      case 'work':
        return <Briefcase size={16} color="#4ECDC4" />;
      default:
        return <MapPin size={16} color="#4ECDC4" />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      <ScrollView className="flex-1 px-4 pb-24" showsVerticalScrollIndicator={false}>
        {/* Shipping Methods */}
        <View className="bg-[#1A1A1A] rounded-2xl p-4 mb-4">
          <Text className="text-white text-lg font-semibold mb-4">Shipping Method</Text>
          
          <TouchableOpacity className="flex-row items-center bg-[#2A2A2A] rounded-xl p-4 mb-2 border border-[#4ECDC4]">
            <View className="mr-3">
              <View className="w-5 h-5 rounded-full bg-[#4ECDC4] border-4 border-[#0F0F0F]" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-base font-semibold mb-1">Standard Shipping</Text>
              <Text className="text-[#888888] text-xs">5-7 business days</Text>
            </View>
            <Text className="text-white text-base font-bold">$5.99</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center bg-[#2A2A2A] rounded-xl p-4 mb-2">
            <View className="mr-3">
              <View className="w-5 h-5 rounded-full border-2 border-[#888888]" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-base font-semibold mb-1">Express Shipping</Text>
              <Text className="text-[#888888] text-xs">2-3 business days</Text>
            </View>
            <Text className="text-white text-base font-bold">$14.99</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center bg-[#2A2A2A] rounded-xl p-4">
            <View className="mr-3">
              <View className="w-5 h-5 rounded-full border-2 border-[#888888]" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-base font-semibold mb-1">Next Day Delivery</Text>
              <Text className="text-[#888888] text-xs">1 business day</Text>
            </View>
            <Text className="text-white text-base font-bold">$24.99</Text>
          </TouchableOpacity>
        </View>

        {/* Saved Addresses */}
        <View className="bg-[#1A1A1A] rounded-2xl p-4 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-semibold">Saved Addresses</Text>
            <TouchableOpacity onPress={() => setShowAddForm(true)}>
              <Plus size={20} color="#4ECDC4" />
            </TouchableOpacity>
          </View>
          
          <View className="gap-3">
            {addresses.map((address) => (
              <TouchableOpacity
                key={address.id}
                className={`flex-row bg-[#2A2A2A] rounded-xl p-4 ${
                  selectedAddress === address.id ? 'bg-[#4ECDC4]/10 border border-[#4ECDC4]' : ''
                }`}
                onPress={() => handleSelectAddress(address.id)}
              >
                <View className="mr-3">
                  <View
                    className={`w-5 h-5 rounded-full border-2 ${
                      selectedAddress === address.id
                        ? 'bg-[#4ECDC4] border-[#4ECDC4]'
                        : 'border-[#888888]'
                    }`}
                  />
                </View>
                
                <View className="flex-1 ml-3">
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center gap-2">
                      {getTypeIcon(address.type)}
                      <Text className="text-[#4ECDC4] text-xs font-semibold">
                        {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                      </Text>
                      {address.isDefault && (
                        <View className="flex-row items-center bg-[#4ECDC4]/10 px-1.5 py-0.5 rounded-full gap-1 ml-2">
                          <Check size={10} color="#4ECDC4" />
                          <Text className="text-[#4ECDC4] text-[10px] font-semibold">Default</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  
                  <Text className="text-white text-base font-semibold mb-2">{address.name}</Text>
                  <Text className="text-[#AAAAAA] text-sm leading-5">{address.address}</Text>
                  <Text className="text-[#AAAAAA] text-sm leading-5">
                    {address.city}, {address.state} {address.zipCode}
                  </Text>
                  <Text className="text-[#AAAAAA] text-sm leading-5">{address.country}</Text>
                  <Text className="text-[#888888] text-sm mt-2">{address.phone}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add New Address Form */}
        {showAddForm && (
          <View className="bg-[#1A1A1A] rounded-2xl p-4 mb-4">
            <Text className="text-white text-lg font-semibold mb-4">Add New Address</Text>
            
            <View className="gap-4">
              <View className="gap-2">
                <Text className="text-white text-sm font-medium">Full Name *</Text>
                <TextInput
                  className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                  value={newAddress.name}
                  onChangeText={(text) => setNewAddress({ ...newAddress, name: text })}
                  placeholder="Enter your full name"
                  placeholderTextColor="#666666"
                />
              </View>

              <View className="gap-2">
                <Text className="text-white text-sm font-medium">Address *</Text>
                <TextInput
                  className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                  value={newAddress.address}
                  onChangeText={(text) => setNewAddress({ ...newAddress, address: text })}
                  placeholder="Street address"
                  placeholderTextColor="#666666"
                />
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1 gap-2">
                  <Text className="text-white text-sm font-medium">City *</Text>
                  <TextInput
                    className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                    value={newAddress.city}
                    onChangeText={(text) => setNewAddress({ ...newAddress, city: text })}
                    placeholder="City"
                    placeholderTextColor="#666666"
                  />
                </View>
                <View className="flex-1 gap-2">
                  <Text className="text-white text-sm font-medium">ZIP Code *</Text>
                  <TextInput
                    className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                    value={newAddress.zipCode}
                    onChangeText={(text) => setNewAddress({ ...newAddress, zipCode: text })}
                    placeholder="ZIP code"
                    placeholderTextColor="#666666"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1 gap-2">
                  <Text className="text-white text-sm font-medium">State</Text>
                  <TextInput
                    className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                    value={newAddress.state}
                    onChangeText={(text) => setNewAddress({ ...newAddress, state: text })}
                    placeholder="State"
                    placeholderTextColor="#666666"
                  />
                </View>
                <View className="flex-1 gap-2">
                  <Text className="text-white text-sm font-medium">Country</Text>
                  <TextInput
                    className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                    value={newAddress.country}
                    onChangeText={(text) => setNewAddress({ ...newAddress, country: text })}
                    placeholder="Country"
                    placeholderTextColor="#666666"
                  />
                </View>
              </View>

              <View className="gap-2">
                <Text className="text-white text-sm font-medium">Phone Number</Text>
                <TextInput
                  className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                  value={newAddress.phone}
                  onChangeText={(text) => setNewAddress({ ...newAddress, phone: text })}
                  placeholder="Phone number"
                  placeholderTextColor="#666666"
                  keyboardType="phone-pad"
                />
              </View>

              <View className="gap-3">
                <Text className="text-white text-sm font-medium">Address Type</Text>
                <View className="flex-row gap-2">
                  {(['home', 'work', 'other'] as const).map((type) => (
                    <TouchableOpacity
                      key={type}
                      className={`flex-1 py-3 rounded-xl items-center ${
                        newAddress.type === type ? 'bg-[#4ECDC4]' : 'bg-[#2A2A2A]'
                      }`}
                      onPress={() => setNewAddress({ ...newAddress, type })}
                    >
                      <Text
                        className={`text-sm font-medium ${
                          newAddress.type === type ? 'text-black' : 'text-white'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View className="flex-row items-center gap-3">
                <Switch
                  value={newAddress.saveAddress}
                  onValueChange={(value) => setNewAddress({ ...newAddress, saveAddress: value })}
                  trackColor={{ false: '#767577', true: '#4ECDC4' }}
                  thumbColor={newAddress.saveAddress ? '#FFFFFF' : '#f4f3f4'}
                />
                <Text className="text-white text-sm flex-1">Save this address for future orders</Text>
              </View>

              <View className="flex-row gap-3 mt-2">
                <TouchableOpacity
                  className="flex-1 bg-[#2A2A2A] py-4 rounded-xl items-center border border-[#333333]"
                  onPress={() => setShowAddForm(false)}
                >
                  <Text className="text-[#888888] text-base font-medium">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 bg-[#4ECDC4] py-4 rounded-xl items-center"
                  onPress={handleAddAddress}
                >
                  <Text className="text-black text-base font-semibold">Save Address</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Continue Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-[#1A1A1A] p-4 pb-9">
        <TouchableOpacity
          className="flex-row items-center justify-center bg-[#4ECDC4] py-4 rounded-full gap-2"
          onPress={proceedToPayment}
        >
          <Text className="text-black text-base font-semibold">Continue to Payment</Text>
          <ChevronRight size={20} color="#000000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}