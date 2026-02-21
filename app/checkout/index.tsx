import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import {
  Package,
  MapPin,
  CreditCard,
  ChevronRight,
  ArrowLeft,
  Tag,
  Check,
} from "lucide-react-native";

// Assuming useCart is a custom hook that provides cart items and total price
// import { useCart } from "@/hooks/useCart"; // adjust import as needed
import { useCart } from "@/context/CartContext";

export default function CheckoutStartScreen() {
  const router = useRouter();
  const { items, totalPrice } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Mock data
  const shippingAddress = {
    name: "Andrew Ainsley",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    phone: "+1 (234) 567-8900",
  };

  const paymentMethod = {
    type: "Visa",
    lastFour: "4321",
    expiryDate: "12/25",
  };

  const orderSummary = {
    subtotal: totalPrice,
    shipping: 5.99,
    tax: totalPrice * 0.08,
    discount: 0,
    total: totalPrice + 5.99 + totalPrice * 0.08,
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SUMMER25") {
      setAppliedPromo("SUMMER25");
      Alert.alert("Promo Applied!", "25% discount applied successfully.");
    } else {
      Alert.alert("Invalid Code", "The promo code you entered is invalid.");
    }
    setPromoCode("");
  };

  const proceedToShipping = () => {
    router.push("/checkout/shipping");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      <ScrollView className="flex-1 px-4 pb-24" showsVerticalScrollIndicator={false}>
        {/* Progress Steps */}
        <View className="flex-row items-center justify-between mb-8 px-2">
          <View className="items-center">
            <View className="w-8 h-8 rounded-full bg-[#1A1A1A] justify-center items-center mb-2">
              <Text className="text-[#888888] text-sm font-semibold">1</Text>
            </View>
            <Text className="text-[#888888] text-[10px]">Review</Text>
          </View>

          <View className="flex-1 h-0.5 bg-[#1A1A1A] mx-1" />

          <View className="items-center opacity-100">
            <View className="w-8 h-8 rounded-full bg-[#1A1A1A] justify-center items-center mb-2">
              <Text className="text-[#888888] text-sm font-semibold">2</Text>
            </View>
            <Text className="text-[#888888] text-[10px]">Shipping</Text>
          </View>

          <View className="flex-1 h-0.5 bg-[#1A1A1A] mx-1" />

          <View className="items-center">
            <View className="w-8 h-8 rounded-full bg-[#1A1A1A] justify-center items-center mb-2">
              <Text className="text-[#888888] text-sm font-semibold">3</Text>
            </View>
            <Text className="text-[#888888] text-[10px]">Payment</Text>
          </View>

          <View className="flex-1 h-0.5 bg-[#1A1A1A] mx-1" />

          <View className="items-center">
            <View className="w-8 h-8 rounded-full bg-[#1A1A1A] justify-center items-center mb-2">
              <Text className="text-[#888888] text-sm font-semibold">4</Text>
            </View>
            <Text className="text-[#888888] text-[10px]">Confirm</Text>
          </View>
        </View>

        {/* Order Items */}
        <View className="bg-[#1A1A1A] rounded-2xl p-4 mb-4">
          <View className="flex-row items-center mb-4 gap-3">
            <Package size={20} color="#FFFFFF" />
            <Text className="text-white text-base font-semibold flex-1">
              Order Items ({items.length})
            </Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/cart")}>
              <Text className="text-[#4ECDC4] text-sm font-medium">Edit</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3">
            {items.slice(0, 3).map((item) => (
              <View key={item.id} className="flex-row items-center">
                <Text className="text-[#AAAAAA] text-sm flex-1" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className="text-[#888888] text-sm mx-3">
                  ×{item.quantity}
                </Text>
                <Text className="text-white text-sm font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
            {items.length > 3 && (
              <Text className="text-[#666666] text-xs text-center mt-1">
                +{items.length - 3} more items
              </Text>
            )}
          </View>
        </View>

        {/* Shipping Address */}
        <View className="bg-[#1A1A1A] rounded-2xl p-4 mb-4">
          <View className="flex-row items-center mb-4 gap-3">
            <MapPin size={20} color="#FFFFFF" />
            <Text className="text-white text-base font-semibold flex-1">
              Shipping Address
            </Text>
            <TouchableOpacity onPress={() => router.push("/checkout/shipping")}>
              <Text className="text-[#4ECDC4] text-sm font-medium">Change</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-[#2A2A2A] rounded-xl p-4"
            onPress={() => router.push("/checkout/shipping")}
          >
            <Text className="text-white text-base font-semibold mb-2">
              {shippingAddress.name}
            </Text>
            <Text className="text-[#AAAAAA] text-sm leading-5">
              {shippingAddress.address}
            </Text>
            <Text className="text-[#AAAAAA] text-sm leading-5">
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
            </Text>
            <Text className="text-[#AAAAAA] text-sm leading-5">
              {shippingAddress.country}
            </Text>
            <Text className="text-[#888888] text-sm mt-2">
              {shippingAddress.phone}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View className="bg-[#1A1A1A] rounded-2xl p-4 mb-4">
          <View className="flex-row items-center mb-4 gap-3">
            <CreditCard size={20} color="#FFFFFF" />
            <Text className="text-white text-base font-semibold flex-1">
              Payment Method
            </Text>
            <TouchableOpacity onPress={() => router.push("/checkout/payment")}>
              <Text className="text-[#4ECDC4] text-sm font-medium">Change</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-[#2A2A2A] rounded-xl p-4"
            onPress={() => router.push("/checkout/payment")}
          >
            <Text className="text-white text-base font-semibold mb-2">
              {paymentMethod.type}
            </Text>
            <Text className="text-[#AAAAAA] text-sm tracking-wide mb-1">
              •••• •••• •••• {paymentMethod.lastFour}
            </Text>
            <Text className="text-[#888888] text-xs">
              Expires {paymentMethod.expiryDate}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Promo Code */}
        <View className="bg-[#1A1A1A] rounded-2xl p-4 mb-4">
          <View className="flex-row items-center mb-4 gap-3">
            <Tag size={20} color="#FFFFFF" />
            <Text className="text-white text-base font-semibold flex-1">
              Promo Code
            </Text>
          </View>

          <View className="flex-row mb-3">
            <TextInput
              className="flex-1 bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-l-xl border border-[#333333] border-r-0"
              placeholder="Enter promo code"
              placeholderTextColor="#666666"
              value={promoCode}
              onChangeText={setPromoCode}
              autoCapitalize="characters"
            />
            <TouchableOpacity
              className="bg-[#4ECDC4] px-5 py-3 rounded-r-xl justify-center"
              onPress={applyPromoCode}
            >
              <Text className="text-black text-base font-semibold">Apply</Text>
            </TouchableOpacity>
          </View>

          {appliedPromo && (
            <View className="flex-row items-center bg-[#4ECDC4]/10 p-3 rounded-xl gap-2">
              <Check size={16} color="#4ECDC4" />
              <Text className="text-[#4ECDC4] text-sm font-medium">
                Promo code {appliedPromo} applied
              </Text>
            </View>
          )}
        </View>

        {/* Order Summary */}
        <View className="bg-[#1A1A1A] rounded-2xl p-4 mb-4">
          <Text className="text-white text-base font-semibold mb-4">
            Order Summary
          </Text>

          <View className="flex-row justify-between mb-3">
            <Text className="text-[#888888] text-sm">Subtotal</Text>
            <Text className="text-white text-sm font-medium">
              ${orderSummary.subtotal.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between mb-3">
            <Text className="text-[#888888] text-sm">Shipping</Text>
            <Text className="text-white text-sm font-medium">
              ${orderSummary.shipping.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between mb-3">
            <Text className="text-[#888888] text-sm">Tax</Text>
            <Text className="text-white text-sm font-medium">
              ${orderSummary.tax.toFixed(2)}
            </Text>
          </View>

          {appliedPromo && (
            <View className="flex-row justify-between mb-3">
              <Text className="text-[#888888] text-sm">Discount</Text>
              <Text className="text-[#4ECDC4] text-sm font-medium">
                -${(orderSummary.subtotal * 0.25).toFixed(2)}
              </Text>
            </View>
          )}

          <View className="flex-row justify-between mt-4 pt-4 border-t border-[#333333]">
            <Text className="text-white text-lg font-semibold">Total</Text>
            <Text className="text-white text-xl font-bold">
              $
              {appliedPromo
                ? (orderSummary.total - orderSummary.subtotal * 0.25).toFixed(2)
                : orderSummary.total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Terms & Conditions */}
        <View className="px-4 mb-8">
          <Text className="text-[#888888] text-xs text-center leading-4">
            By placing your order, you agree to our{" "}
            <Text className="text-[#4ECDC4]">Terms of Service</Text> and{" "}
            <Text className="text-[#4ECDC4]">Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-[#1A1A1A] px-4 pt-4 pb-9">
        <TouchableOpacity
          className="flex-row items-center justify-center bg-[#4ECDC4] py-4 rounded-full gap-2"
          onPress={proceedToShipping}
        >
          <Text className="text-black text-base font-semibold">
            Continue to Shipping
          </Text>
          <ChevronRight size={20} color="#000000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}