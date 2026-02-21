import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ChevronLeft,
  MapPin,
  Home,
  Briefcase,
  User,
  Phone,
  Mail,
  Save,
  Check,
} from "lucide-react-native";

// Define the form data type
type FormData = {
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  addressType: "home" | "work" | "other";
  isDefault: boolean;
};

// Validation schema using zod
const addressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
  addressType: z.enum(["home", "work", "other"]),
  isDefault: z.boolean(),
});

export default function NewAddressScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "Andrew Ainsley",
      phoneNumber: "+1 (234) 567-8900",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      addressType: "home",
      isDefault: false,
    },
  });

  const addressType = watch("addressType");

  const addressTypes = [
    { id: "home", label: "Home", icon: Home },
    { id: "work", label: "Work", icon: Briefcase },
    { id: "other", label: "Other", icon: MapPin },
  ];

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Address Added",
        "Your new address has been saved successfully",
        [
          {
            text: "Continue",
            onPress: () => router.back(),
          },
        ]
      );
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Add New Address</Text>
        <TouchableOpacity
          className="p-2 bg-[#4ECDC4]/10 rounded-xl"
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <Text className="text-[#4ECDC4] text-sm">Saving...</Text>
          ) : (
            <Save size={20} color="#4ECDC4" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Address Type Selection */}
        <View className="mb-6">
          <Text className="text-white text-base font-semibold mb-4">
            Address Type
          </Text>
          <View className="flex-row gap-3">
            {addressTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = addressType === type.id;

              return (
                <TouchableOpacity
                  key={type.id}
                  className={`flex-1 flex-row items-center justify-center py-3 rounded-xl gap-2 ${
                    isSelected ? "bg-[#4ECDC4]" : "bg-[#1A1A1A]"
                  }`}
                  onPress={() => setValue("addressType", type.id)}
                >
                  <Icon size={20} color={isSelected ? "#000000" : "#888888"} />
                  <Text
                    className={`text-sm font-medium ${
                      isSelected ? "text-black" : "text-[#888888]"
                    }`}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Contact Information */}
        <View className="mb-6">
          <Text className="text-white text-base font-semibold mb-4">
            Contact Information
          </Text>

          <View className="mb-4">
            <View className="flex-row items-center mb-2 gap-2">
              <User size={16} color="#888888" />
              <Text className="text-[#888888] text-sm">Full Name *</Text>
            </View>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                    errors.fullName ? "border-[#EF476F]" : "border-[#333333]"
                  }`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your full name"
                  placeholderTextColor="#666666"
                />
              )}
            />
            {errors.fullName && (
              <Text className="text-[#EF476F] text-xs mt-1">{errors.fullName.message}</Text>
            )}
          </View>

          <View className="mb-4">
            <View className="flex-row items-center mb-2 gap-2">
              <Phone size={16} color="#888888" />
              <Text className="text-[#888888] text-sm">Phone Number *</Text>
            </View>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                    errors.phoneNumber ? "border-[#EF476F]" : "border-[#333333]"
                  }`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#666666"
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.phoneNumber && (
              <Text className="text-[#EF476F] text-xs mt-1">{errors.phoneNumber.message}</Text>
            )}
          </View>
        </View>

        {/* Address Details */}
        <View className="mb-6">
          <Text className="text-white text-base font-semibold mb-4">
            Address Details
          </Text>

          <View className="mb-4">
            <View className="flex-row items-center mb-2 gap-2">
              <MapPin size={16} color="#888888" />
              <Text className="text-[#888888] text-sm">Address Line 1 *</Text>
            </View>
            <Controller
              control={control}
              name="addressLine1"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                    errors.addressLine1 ? "border-[#EF476F]" : "border-[#333333]"
                  }`}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Street address, P.O. box, company name"
                  placeholderTextColor="#666666"
                />
              )}
            />
            {errors.addressLine1 && (
              <Text className="text-[#EF476F] text-xs mt-1">{errors.addressLine1.message}</Text>
            )}
          </View>

          <View className="mb-4">
            <View className="flex-row items-center mb-2 gap-2">
              <MapPin size={16} color="#888888" />
              <Text className="text-[#888888] text-sm">Address Line 2 (Optional)</Text>
            </View>
            <Controller
              control={control}
              name="addressLine2"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Apartment, suite, unit, building, floor, etc."
                  placeholderTextColor="#666666"
                />
              )}
            />
          </View>

          <View className="flex-row gap-3">
            <View className="flex-1 mb-4">
              <Text className="text-[#888888] text-sm mb-2">City *</Text>
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                      errors.city ? "border-[#EF476F]" : "border-[#333333]"
                    }`}
                    value={value}
                    onChangeText={onChange}
                    placeholder="City"
                    placeholderTextColor="#666666"
                  />
                )}
              />
              {errors.city && (
                <Text className="text-[#EF476F] text-xs mt-1">{errors.city.message}</Text>
              )}
            </View>

            <View className="flex-1 mb-4">
              <Text className="text-[#888888] text-sm mb-2">State *</Text>
              <Controller
                control={control}
                name="state"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                      errors.state ? "border-[#EF476F]" : "border-[#333333]"
                    }`}
                    value={value}
                    onChangeText={onChange}
                    placeholder="State"
                    placeholderTextColor="#666666"
                  />
                )}
              />
              {errors.state && (
                <Text className="text-[#EF476F] text-xs mt-1">{errors.state.message}</Text>
              )}
            </View>
          </View>

          <View className="flex-row gap-3">
            <View className="flex-1 mb-4">
              <Text className="text-[#888888] text-sm mb-2">ZIP Code *</Text>
              <Controller
                control={control}
                name="zipCode"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                      errors.zipCode ? "border-[#EF476F]" : "border-[#333333]"
                    }`}
                    value={value}
                    onChangeText={onChange}
                    placeholder="ZIP code"
                    placeholderTextColor="#666666"
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.zipCode && (
                <Text className="text-[#EF476F] text-xs mt-1">{errors.zipCode.message}</Text>
              )}
            </View>

            <View className="flex-1 mb-4">
              <Text className="text-[#888888] text-sm mb-2">Country *</Text>
              <Controller
                control={control}
                name="country"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                      errors.country ? "border-[#EF476F]" : "border-[#333333]"
                    }`}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Country"
                    placeholderTextColor="#666666"
                  />
                )}
              />
              {errors.country && (
                <Text className="text-[#EF476F] text-xs mt-1">{errors.country.message}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Default Address Toggle */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between bg-[#1A1A1A] p-4 rounded-xl">
            <View className="flex-row items-center flex-1 gap-3">
              <Check size={20} color="#4ECDC4" />
              <View className="flex-1">
                <Text className="text-white text-base font-semibold mb-1">
                  Set as Default Address
                </Text>
                <Text className="text-[#888888] text-xs leading-4">
                  Use this address for all orders unless specified otherwise
                </Text>
              </View>
            </View>
            <Controller
              control={control}
              name="isDefault"
              render={({ field: { onChange, value } }) => (
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{ false: "#767577", true: "#4ECDC4" }}
                  thumbColor={value ? "#FFFFFF" : "#f4f3f4"}
                />
              )}
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className={`py-4 rounded-xl items-center mb-3 ${
            loading ? "bg-[#2A2A2A]" : "bg-[#4ECDC4]"
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <Text className="text-black text-base font-semibold">
            {loading ? "Saving Address..." : "Save Address"}
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          className="py-4 rounded-xl items-center border border-[#333333] mb-8"
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text className="text-[#888888] text-base font-medium">Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}