import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  CheckCircle,
  Package,
  MapPin,
  CreditCard,
  Share2,
  Download,
  Home,
  ShoppingBag,
  Truck,
} from "lucide-react-native";
// import LottieView from "lottie-react-native";

export default function ConfirmationScreen() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  useEffect(() => {
    // Generate random order details
    const randomOrderNum = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 5);

    setOrderNumber(randomOrderNum);
    setEstimatedDelivery(
      deliveryDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
    setTrackingNumber(`TRK-${Math.floor(10000000 + Math.random() * 90000000)}`);
  }, []);

  const orderDetails = {
    items: [
      { id: "1", name: "Venesa Long Shirt", quantity: 1, price: 320.0 },
      { id: "2", name: "Suga Leather Shoes", quantity: 2, price: 375.0 },
    ],
    shipping: {
      name: "Andrew Ainsley",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (234) 567-8900",
      method: "Standard Shipping",
      cost: 5.99,
    },
    payment: {
      type: "Visa",
      lastFour: "4321",
    },
    summary: {
      subtotal: 1070.0,
      shipping: 5.99,
      tax: 85.6,
      total: 1161.59,
    },
  };

  const handleContinueShopping = () => {
    router.replace("/(tabs)");
  };

  const handleViewOrder = () => {
    router.push(`/orders/${orderNumber}`);
  };

  const handleShare = () => {
    Alert.alert("Share Order", "Order details shared!");
  };

  const handleDownloadInvoice = () => {
    Alert.alert("Download", "Invoice downloaded successfully!");
  };

  const handleTrackOrder = () => {
    Alert.alert("Track Order", `Tracking Number: ${trackingNumber}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      <ScrollView
        className="flex-1 px-4 pb-44"
        showsVerticalScrollIndicator={false}
      >
        {/* Success Animation */}
        <View className="items-center mb-4">
          {/* <LottieView
            source={require("../../assets/lottie/success.json")}
            autoPlay
            loop={false}
            className="w-36 h-36"
          /> */}
        </View>

        {/* Order Confirmed */}
        <View className="items-center py-6 mb-6">
          <CheckCircle size={48} color="#4ECDC4" />
          <Text className="text-white text-3xl font-bold mt-4 mb-2">
            Order Confirmed!
          </Text>
          <Text className="text-[#888888] text-base mb-4">
            Thank you for your purchase
          </Text>
          <Text className="text-[#4ECDC4] text-lg font-semibold">
            Order #{orderNumber}
          </Text>
        </View>

        {/* Delivery Estimate */}
        <View className="bg-[#4ECDC4]/10 rounded-2xl p-5 items-center mb-6 border border-[#4ECDC4]">
          <View className="flex-row items-center gap-2 mb-2">
            <Truck size={20} color="#4ECDC4" />
            <Text className="text-[#4ECDC4] text-lg font-semibold">
              Estimated Delivery
            </Text>
          </View>
          <Text className="text-white text-2xl font-bold mb-4">
            {estimatedDelivery}
          </Text>
          <TouchableOpacity
            className="bg-white/10 px-6 py-2.5 rounded-full"
            onPress={handleTrackOrder}
          >
            <Text className="text-[#4ECDC4] text-sm font-semibold">
              Track Order
            </Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View className="bg-[#1A1A1A] rounded-2xl p-5 mb-4">
          <Text className="text-white text-lg font-semibold mb-4">
            Order Summary
          </Text>

          <View className="mb-5 pb-5 border-b border-[#2A2A2A]">
            {orderDetails.items.map((item) => (
              <View key={item.id} className="flex-row items-center mb-3">
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
          </View>

          <View className="gap-3">
            <View className="flex-row justify-between">
              <Text className="text-[#888888] text-sm">Subtotal</Text>
              <Text className="text-white text-sm font-medium">
                ${orderDetails.summary.subtotal.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-[#888888] text-sm">Shipping</Text>
              <Text className="text-white text-sm font-medium">
                ${orderDetails.summary.shipping.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-[#888888] text-sm">Tax</Text>
              <Text className="text-white text-sm font-medium">
                ${orderDetails.summary.tax.toFixed(2)}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between mt-4 pt-4 border-t border-[#333333]">
            <Text className="text-white text-lg font-semibold">Total</Text>
            <Text className="text-white text-xl font-bold">
              ${orderDetails.summary.total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Shipping Information */}
        <View className="bg-[#1A1A1A] rounded-2xl p-5 mb-4">
          <View className="flex-row items-center gap-3 mb-4">
            <MapPin size={20} color="#4ECDC4" />
            <Text className="text-white text-lg font-semibold">
              Shipping Address
            </Text>
          </View>

          <View className="gap-2">
            <Text className="text-[#AAAAAA] text-sm leading-5">
              {orderDetails.shipping.name}
            </Text>
            <Text className="text-[#AAAAAA] text-sm leading-5">
              {orderDetails.shipping.address}
            </Text>
            <Text className="text-[#AAAAAA] text-sm leading-5">
              {orderDetails.shipping.city}, {orderDetails.shipping.state}{" "}
              {orderDetails.shipping.zipCode}
            </Text>
            <Text className="text-[#AAAAAA] text-sm leading-5">
              {orderDetails.shipping.country}
            </Text>
            <Text className="text-[#AAAAAA] text-sm leading-5">
              {orderDetails.shipping.phone}
            </Text>
            <Text className="text-[#4ECDC4] text-sm font-semibold mt-2">
              {orderDetails.shipping.method} (${orderDetails.shipping.cost})
            </Text>
          </View>
        </View>

        {/* Payment Information */}
        <View className="bg-[#1A1A1A] rounded-2xl p-5 mb-4">
          <View className="flex-row items-center gap-3 mb-4">
            <CreditCard size={20} color="#4ECDC4" />
            <Text className="text-white text-lg font-semibold">
              Payment Method
            </Text>
          </View>

          <View className="gap-2">
            <Text className="text-[#AAAAAA] text-sm leading-5">
              {orderDetails.payment.type}
            </Text>
            <Text className="text-[#AAAAAA] text-sm leading-5">
              •••• •••• •••• {orderDetails.payment.lastFour}
            </Text>
          </View>
        </View>

        {/* Order Actions */}
        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center bg-[#1A1A1A] py-4 rounded-xl gap-2"
            onPress={handleShare}
          >
            <Share2 size={20} color="#4ECDC4" />
            <Text className="text-[#4ECDC4] text-sm font-semibold">
              Share Order
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center bg-[#1A1A1A] py-4 rounded-xl gap-2"
            onPress={handleDownloadInvoice}
          >
            <Download size={20} color="#4ECDC4" />
            <Text className="text-[#4ECDC4] text-sm font-semibold">
              Download Invoice
            </Text>
          </TouchableOpacity>
        </View>

        {/* What's Next? */}
        <View className="bg-[#1A1A1A] rounded-2xl p-5 mb-6">
          <Text className="text-white text-lg font-semibold mb-5">
            What's Next?
          </Text>

          <View className="gap-5">
            <View className="flex-row">
              <View className="w-8 h-8 rounded-full bg-[#4ECDC4] justify-center items-center mr-3">
                <Package size={16} color="#000000" />
              </View>
              <View className="flex-1 pt-1">
                <Text className="text-white text-base font-semibold mb-1">
                  Order Processing
                </Text>
                <Text className="text-[#888888] text-sm leading-5">
                  We're preparing your order for shipment
                </Text>
              </View>
            </View>

            <View className="flex-row">
              <View className="w-8 h-8 rounded-full bg-[#4ECDC4] justify-center items-center mr-3">
                <Truck size={16} color="#000000" />
              </View>
              <View className="flex-1 pt-1">
                <Text className="text-white text-base font-semibold mb-1">
                  Shipping
                </Text>
                <Text className="text-[#888888] text-sm leading-5">
                  Your order will be shipped within 24 hours
                </Text>
              </View>
            </View>

            <View className="flex-row">
              <View className="w-8 h-8 rounded-full bg-[#4ECDC4] justify-center items-center mr-3">
                <CheckCircle size={16} color="#000000" />
              </View>
              <View className="flex-1 pt-1">
                <Text className="text-white text-base font-semibold mb-1">
                  Delivery
                </Text>
                <Text className="text-[#888888] text-sm leading-5">
                  Estimated delivery: {estimatedDelivery}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Support */}
        <View className="p-4 mb-6">
          <Text className="text-[#888888] text-sm text-center">
            Need help with your order?{" "}
            <Text className="text-[#4ECDC4] font-semibold">Contact Support</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-[#1A1A1A] p-4 pb-9 gap-3">
        <TouchableOpacity
          className="flex-row items-center justify-center bg-[#4ECDC4] py-4 rounded-full gap-3"
          onPress={handleContinueShopping}
        >
          <Home size={20} color="#000000" />
          <Text className="text-black text-base font-semibold">
            Continue Shopping
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-center bg-[#2A2A2A] py-4 rounded-full border border-[#333333] gap-3"
          onPress={handleViewOrder}
        >
          <ShoppingBag size={20} color="#FFFFFF" />
          <Text className="text-white text-base font-semibold">View Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}