import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
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
  Save,
  Trash2,
  Check,
} from "lucide-react-native";

// Zod schema for validation
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

type AddressFormData = z.infer<typeof addressSchema>;

// Mock address data
const mockAddresses = [
  {
    id: "1",
    fullName: "Andrew Ainsley",
    phoneNumber: "+1 (234) 567-8900",
    addressLine1: "123 Main Street",
    addressLine2: "Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    addressType: "home",
    isDefault: true,
  },
  {
    id: "2",
    fullName: "Andrew Ainsley",
    phoneNumber: "+1 (234) 567-8901",
    addressLine1: "456 Park Avenue",
    addressLine2: "Floor 15",
    city: "Brooklyn",
    state: "NY",
    zipCode: "11201",
    country: "United States",
    addressType: "work",
    isDefault: false,
  },
  {
    id: "3",
    fullName: "Andrew Ainsley",
    phoneNumber: "+1 (234) 567-8902",
    addressLine1: "789 Broadway",
    addressLine2: "",
    city: "Queens",
    state: "NY",
    zipCode: "11355",
    country: "United States",
    addressType: "other",
    isDefault: false,
  },
];

export default function EditAddressScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const addressTypes = [
    { id: "home", label: "Home", icon: Home },
    { id: "work", label: "Work", icon: Briefcase },
    { id: "other", label: "Other", icon: MapPin },
  ];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
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

  // Load address data
  useEffect(() => {
    const loadAddress = () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const address = mockAddresses.find((addr) => addr.id === id);
        if (address) {
          reset(address); // populate form with loaded data
        } else {
          Alert.alert("Error", "Address not found", [
            { text: "OK", onPress: () => router.back() },
          ]);
        }
        setLoading(false);
      }, 500);
    };
    loadAddress();
  }, [id, reset]);

  const onSave = async (data: AddressFormData) => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      Alert.alert("Success", "Address updated successfully", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }, 1000);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            // Simulate API call
            setTimeout(() => {
              setDeleting(false);
              Alert.alert("Deleted", "Address deleted successfully", [
                { text: "OK", onPress: () => router.back() },
              ]);
            }, 1000);
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#0F0F0F]">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4ECDC4" />
          <Text className="text-white text-sm mt-4">Loading address...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Edit Address</Text>
        <TouchableOpacity
          className="p-2 bg-[#4ECDC4]/10 rounded-xl"
          onPress={handleSubmit(onSave)}
          disabled={saving}
        >
          {saving ? (
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
              return (
                <Controller
                  key={type.id}
                  control={control}
                  name="addressType"
                  render={({ field: { value, onChange } }) => (
                    <TouchableOpacity
                      className={`flex-1 flex-row items-center justify-center py-3 rounded-xl gap-2 ${
                        value === type.id ? "bg-[#4ECDC4]" : "bg-[#1A1A1A]"
                      }`}
                      onPress={() => onChange(type.id)}
                    >
                      <Icon
                        size={20}
                        color={value === type.id ? "#000000" : "#888888"}
                      />
                      <Text
                        className={`text-sm font-medium ${
                          value === type.id ? "text-black" : "text-[#888888]"
                        }`}
                      >
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              );
            })}
          </View>
        </View>

        {/* Contact Information */}
        <View className="mb-6">
          <Text className="text-white text-base font-semibold mb-4">
            Contact Information
          </Text>

          {/* Full Name */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2 gap-2">
              <User size={16} color="#888888" />
              <Text className="text-[#888888] text-sm">Full Name *</Text>
            </View>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                    errors.fullName ? "border-[#EF476F]" : "border-[#333333]"
                  }`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your full name"
                  placeholderTextColor="#666666"
                />
              )}
            />
            {errors.fullName && (
              <Text className="text-[#EF476F] text-xs mt-1">
                {errors.fullName.message}
              </Text>
            )}
          </View>

          {/* Phone Number */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2 gap-2">
              <Phone size={16} color="#888888" />
              <Text className="text-[#888888] text-sm">Phone Number *</Text>
            </View>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                    errors.phoneNumber ? "border-[#EF476F]" : "border-[#333333]"
                  }`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#666666"
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.phoneNumber && (
              <Text className="text-[#EF476F] text-xs mt-1">
                {errors.phoneNumber.message}
              </Text>
            )}
          </View>
        </View>

        {/* Address Details */}
        <View className="mb-6">
          <Text className="text-white text-base font-semibold mb-4">
            Address Details
          </Text>

          {/* Address Line 1 */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2 gap-2">
              <MapPin size={16} color="#888888" />
              <Text className="text-[#888888] text-sm">Address Line 1 *</Text>
            </View>
            <Controller
              control={control}
              name="addressLine1"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                    errors.addressLine1 ? "border-[#EF476F]" : "border-[#333333]"
                  }`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Street address, P.O. box, company name"
                  placeholderTextColor="#666666"
                />
              )}
            />
            {errors.addressLine1 && (
              <Text className="text-[#EF476F] text-xs mt-1">
                {errors.addressLine1.message}
              </Text>
            )}
          </View>

          {/* Address Line 2 */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2 gap-2">
              <MapPin size={16} color="#888888" />
              <Text className="text-[#888888] text-sm">
                Address Line 2 (Optional)
              </Text>
            </View>
            <Controller
              control={control}
              name="addressLine2"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  className="bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Apartment, suite, unit, building, floor, etc."
                  placeholderTextColor="#666666"
                />
              )}
            />
          </View>

          {/* City & State */}
          <View className="flex-row gap-3">
            <View className="flex-1 mb-4">
              <Text className="text-[#888888] text-sm mb-2">City *</Text>
              <Controller
                control={control}
                name="city"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                      errors.city ? "border-[#EF476F]" : "border-[#333333]"
                    }`}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="City"
                    placeholderTextColor="#666666"
                  />
                )}
              />
              {errors.city && (
                <Text className="text-[#EF476F] text-xs mt-1">
                  {errors.city.message}
                </Text>
              )}
            </View>

            <View className="flex-1 mb-4">
              <Text className="text-[#888888] text-sm mb-2">State *</Text>
              <Controller
                control={control}
                name="state"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                      errors.state ? "border-[#EF476F]" : "border-[#333333]"
                    }`}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="State"
                    placeholderTextColor="#666666"
                  />
                )}
              />
              {errors.state && (
                <Text className="text-[#EF476F] text-xs mt-1">
                  {errors.state.message}
                </Text>
              )}
            </View>
          </View>

          {/* ZIP & Country */}
          <View className="flex-row gap-3">
            <View className="flex-1 mb-4">
              <Text className="text-[#888888] text-sm mb-2">ZIP Code *</Text>
              <Controller
                control={control}
                name="zipCode"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                      errors.zipCode ? "border-[#EF476F]" : "border-[#333333]"
                    }`}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="ZIP code"
                    placeholderTextColor="#666666"
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.zipCode && (
                <Text className="text-[#EF476F] text-xs mt-1">
                  {errors.zipCode.message}
                </Text>
              )}
            </View>

            <View className="flex-1 mb-4">
              <Text className="text-[#888888] text-sm mb-2">Country *</Text>
              <Controller
                control={control}
                name="country"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    className={`bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border ${
                      errors.country ? "border-[#EF476F]" : "border-[#333333]"
                    }`}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Country"
                    placeholderTextColor="#666666"
                  />
                )}
              />
              {errors.country && (
                <Text className="text-[#EF476F] text-xs mt-1">
                  {errors.country.message}
                </Text>
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
              render={({ field: { value, onChange } }) => (
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
            saving ? "bg-[#2A2A2A]" : "bg-[#4ECDC4]"
          }`}
          onPress={handleSubmit(onSave)}
          disabled={saving}
        >
          <Text className="text-black text-base font-semibold">
            {saving ? "Saving Changes..." : "Save Changes"}
          </Text>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          className={`flex-row items-center justify-center py-4 rounded-xl gap-3 mb-3 ${
            deleting ? "bg-[#2A2A2A]" : "bg-[#EF476F]/10"
          }`}
          onPress={handleDelete}
          disabled={deleting}
        >
          <Trash2 size={20} color="#EF476F" />
          <Text className="text-[#EF476F] text-base font-semibold">
            {deleting ? "Deleting..." : "Delete Address"}
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          className="py-4 rounded-xl items-center border border-[#333333] mb-8"
          onPress={() => router.back()}
          disabled={saving || deleting}
        >
          <Text className="text-[#888888] text-base font-medium">Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}