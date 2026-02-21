import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Home,
  Briefcase,
  Star,
  Check,
} from "lucide-react-native";

interface Address {
  id: string;
  name: string;
  type: "home" | "work" | "other";
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "Andrew Ainsley",
      type: "home",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (234) 567-8900",
      isDefault: true,
    },
    {
      id: "2",
      name: "Andrew Ainsley",
      type: "work",
      address: "456 Park Avenue",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      country: "United States",
      phone: "+1 (234) 567-8901",
      isDefault: false,
    },
    {
      id: "3",
      name: "Andrew Ainsley",
      type: "other",
      address: "789 Broadway",
      city: "Queens",
      state: "NY",
      zipCode: "11355",
      country: "United States",
      phone: "+1 (234) 567-8902",
      isDefault: false,
    },
  ]);

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDeleteAddress = (id: string) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setAddresses((prev) => prev.filter((addr) => addr.id !== id));
          },
        },
      ]
    );
  };

  const getTypeIcon = (type: Address["type"]) => {
    switch (type) {
      case "home":
        return <Home size={16} color="#4ECDC4" />;
      case "work":
        return <Briefcase size={16} color="#4ECDC4" />;
      default:
        return <MapPin size={16} color="#4ECDC4" />;
    }
  };

  const renderAddressCard = (address: Address) => (
    <View
      key={address.id}
      className="bg-[#1A1A1A] rounded-2xl p-4 mb-3 border border-[#2A2A2A]"
    >
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center gap-2">
          {getTypeIcon(address.type)}
          <Text className="text-white text-sm font-semibold">
            {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
          </Text>
          {address.isDefault && (
            <View className="flex-row items-center bg-[#FFD700]/10 px-2 py-1 rounded-full gap-1 ml-2">
              <Star size={12} color="#FFD700" fill="#FFD700" />
              <Text className="text-[#FFD700] text-[10px] font-semibold">
                Default
              </Text>
            </View>
          )}
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity
            className="p-1.5"
            onPress={() => router.push(`/addresses/edit/${address.id}`)}
          >
            <Edit size={18} color="#888888" />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-1.5"
            onPress={() => handleDeleteAddress(address.id)}
          >
            <Trash2 size={18} color="#EF476F" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-white text-base font-semibold mb-2">
          {address.name}
        </Text>
        <Text className="text-[#AAAAAA] text-sm leading-5">
          {address.address}
        </Text>
        <Text className="text-[#AAAAAA] text-sm leading-5">
          {address.city}, {address.state} {address.zipCode}
        </Text>
        <Text className="text-[#AAAAAA] text-sm leading-5">
          {address.country}
        </Text>
        <Text className="text-[#888888] text-sm mt-1">{address.phone}</Text>
      </View>

      <View className="flex-row justify-between items-center pt-4 border-t border-[#2A2A2A]">
        <TouchableOpacity
          className="flex-1"
          onPress={() => handleSetDefault(address.id)}
        >
          <View className="flex-row items-center gap-2">
            <Switch
              value={address.isDefault}
              onValueChange={() => handleSetDefault(address.id)}
              trackColor={{ false: "#767577", true: "#4ECDC4" }}
              thumbColor={address.isDefault ? "#FFFFFF" : "#f4f3f4"}
            />
            <Text className="text-[#888888] text-sm">Set as Default</Text>
          </View>
        </TouchableOpacity>

        {address.isDefault && (
          <View className="flex-row items-center gap-1.5">
            <Check size={16} color="#4ECDC4" />
            <Text className="text-[#4ECDC4] text-xs font-semibold">
              Default Address
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">
          Shipping Addresses
        </Text>
        <TouchableOpacity
          className="p-2"
          onPress={() => router.push("/addresses/new")}
        >
          <Plus size={24} color="#4ECDC4" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Address List */}
        <View className="mb-6">
          {addresses.length > 0 ? (
            addresses.map(renderAddressCard)
          ) : (
            <View className="items-center justify-center py-16 px-8">
              <MapPin size={64} color="#666666" />
              <Text className="text-white text-xl font-semibold mt-6 mb-2">
                No Addresses
              </Text>
              <Text className="text-[#888888] text-sm text-center mb-8 leading-5">
                You haven't added any shipping addresses yet.
              </Text>
              <TouchableOpacity
                className="flex-row items-center bg-[#4ECDC4] px-6 py-3 rounded-full gap-2"
                onPress={() => router.push("/addresses/new")}
              >
                <Plus size={20} color="#000000" />
                <Text className="text-black text-base font-semibold">
                  Add Your First Address
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Add New Address Button */}
        {addresses.length > 0 && (
          <TouchableOpacity
            className="flex-row items-center justify-center bg-[#4ECDC4]/10 py-4 rounded-xl border border-[#4ECDC4] gap-3 mb-4"
            onPress={() => router.push("/addresses/new")}
          >
            <Plus size={20} color="#4ECDC4" />
            <Text className="text-[#4ECDC4] text-base font-semibold">
              Add New Address
            </Text>
          </TouchableOpacity>
        )}

        {/* Help Text */}
        <Text className="text-[#666666] text-xs text-center leading-4">
          Your default address will be used for all orders unless specified
          otherwise.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}