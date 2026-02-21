import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  RotateCcw,
  Calendar,
  Package,
  Clock,
  DollarSign,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react-native";

export default function RefundPolicyScreen() {
  const router = useRouter();

  const policySections = [
    {
      title: "1. Return Eligibility",
      content: `Items must be returned within 30 days of the delivery date. All returned items must be in their original condition: unworn, unwashed, undamaged, and with all original tags and packaging attached.`,
      icon: CheckCircle,
    },
    {
      title: "2. Non-Returnable Items",
      content: `Certain items cannot be returned for hygiene and safety reasons, including: underwear, swimwear, earrings, personalized items, gift cards, and digital products. Final sale items marked "Non-Returnable" are also excluded.`,
      icon: XCircle,
    },
    {
      title: "3. Return Process",
      content: `To initiate a return, go to your Orders page, select the item, and click "Return Item." You'll receive a prepaid return label and instructions. Returns must be shipped back within 7 days of return authorization.`,
      icon: RotateCcw,
    },
    {
      title: "4. Refund Methods",
      content: `Refunds are issued to the original payment method. Credit card refunds take 5-10 business days to appear on your statement. PayPal refunds are processed within 24 hours. Store credit is issued immediately.`,
      icon: DollarSign,
    },
    {
      title: "5. Return Shipping",
      content: `We provide free return shipping for items that are defective, damaged, or incorrect. For returns due to change of mind, return shipping costs are deducted from the refund amount.`,
      icon: Package,
    },
    {
      title: "6. Damaged or Defective Items",
      content: `If you receive a damaged or defective item, please contact us within 48 hours of delivery. We'll arrange for a free return and replacement or full refund, including shipping costs.`,
      icon: AlertCircle,
    },
    {
      title: "7. Exchange Policy",
      content: `We offer exchanges for size or color within 30 days of delivery. Exchanges are subject to availability. If the requested item is unavailable, we'll issue a refund or store credit.`,
      icon: Shield,
    },
    {
      title: "8. Late or Missing Refunds",
      content: `If you haven't received your refund within 10 business days, first check your bank account. Then contact your credit card company or PayPal. If you still have issues, contact our customer support.`,
      icon: Clock,
    },
  ];

  const returnTimeframes = [
    {
      step: "Return Initiated",
      timeframe: "Within 30 days of delivery",
      icon: Calendar,
    },
    {
      step: "Return Shipped",
      timeframe: "Within 7 days of return authorization",
      icon: Package,
    },
    {
      step: "Item Received",
      timeframe: "2-5 business days for processing",
      icon: Clock,
    },
    {
      step: "Refund Issued",
      timeframe: "5-10 business days to original payment",
      icon: DollarSign,
    },
  ];

  const refundMethods = [
    {
      method: "Credit/Debit Card",
      timeframe: "5-10 business days",
      note: "Processing time depends on your bank",
    },
    {
      method: "PayPal",
      timeframe: "24 hours",
      note: "Instant processing to your PayPal balance",
    },
    {
      method: "Store Credit",
      timeframe: "Immediate",
      note: "Issued as e-gift card with 1-year validity",
    },
    {
      method: "Bank Transfer",
      timeframe: "3-5 business days",
      note: "Available in select countries only",
    },
  ];

  const nonReturnableItems = [
    "Underwear and intimate apparel",
    "Swimwear (except with hygiene seal intact)",
    "Earrings and other pierced jewelry",
    "Personalized or customized items",
    "Gift cards and digital products",
    "Final sale items (marked as non-returnable)",
    "Items without original tags or packaging",
    "Used, worn, or damaged items",
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Refund Policy</Text>
        <View className="min-w-[80px] items-end">
          <Text className="text-[#888888] text-[10px]">Last updated: Nov 2024</Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="items-center py-8 px-4">
          <View className="w-20 h-20 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-4">
            <RotateCcw size={48} color="#4ECDC4" />
          </View>
          <Text className="text-white text-2xl font-semibold mb-3 text-center">
            Easy Returns & Refunds
          </Text>
          <Text className="text-[#888888] text-sm text-center leading-5 mb-6">
            We want you to love what you buy. If you don't, we make returns easy
            and hassle-free.
          </Text>
          <View className="flex-row justify-center gap-6">
            <View className="items-center">
              <Text className="text-[#4ECDC4] text-lg font-bold mb-1">30 Days</Text>
              <Text className="text-[#888888] text-xs">Return Window</Text>
            </View>
            <View className="items-center">
              <Text className="text-[#4ECDC4] text-lg font-bold mb-1">Free</Text>
              <Text className="text-[#888888] text-xs">Defective Returns</Text>
            </View>
            <View className="items-center">
              <Text className="text-[#4ECDC4] text-lg font-bold mb-1">5-10 Days</Text>
              <Text className="text-[#888888] text-xs">Refund Processing</Text>
            </View>
          </View>
        </View>

        {/* Quick Summary */}
        <View className="px-4 mb-8">
          <Text className="text-white text-lg font-semibold mb-4">Quick Summary</Text>

          <View className="flex-row flex-wrap gap-3">
            <View className="w-[48%] bg-[#1A1A1A] rounded-xl p-4 mb-3">
              <View className="w-10 h-10 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-3">
                <Calendar size={20} color="#4ECDC4" />
              </View>
              <Text className="text-white text-base font-semibold mb-2">30-Day Returns</Text>
              <Text className="text-[#888888] text-xs leading-4">
                Return most items within 30 days of delivery
              </Text>
            </View>

            <View className="w-[48%] bg-[#1A1A1A] rounded-xl p-4 mb-3">
              <View className="w-10 h-10 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-3">
                <DollarSign size={20} color="#4ECDC4" />
              </View>
              <Text className="text-white text-base font-semibold mb-2">Full Refunds</Text>
              <Text className="text-[#888888] text-xs leading-4">
                Refund to original payment method within 10 days
              </Text>
            </View>

            <View className="w-[48%] bg-[#1A1A1A] rounded-xl p-4 mb-3">
              <View className="w-10 h-10 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-3">
                <Package size={20} color="#4ECDC4" />
              </View>
              <Text className="text-white text-base font-semibold mb-2">Free Returns</Text>
              <Text className="text-[#888888] text-xs leading-4">
                Free returns for defective, damaged, or incorrect items
              </Text>
            </View>

            <View className="w-[48%] bg-[#1A1A1A] rounded-xl p-4 mb-3">
              <View className="w-10 h-10 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-3">
                <Shield size={20} color="#4ECDC4" />
              </View>
              <Text className="text-white text-base font-semibold mb-2">Hassle-Free</Text>
              <Text className="text-[#888888] text-xs leading-4">
                Prepaid return labels and easy online process
              </Text>
            </View>
          </View>
        </View>

        {/* Return Timeline */}
        <View className="px-4 mb-8">
          <Text className="text-white text-lg font-semibold mb-4">Return Timeline</Text>

          <View className="bg-[#1A1A1A] rounded-2xl p-5">
            {returnTimeframes.map((item, index) => {
              const Icon = item.icon;
              return (
                <View key={index} className="flex-row items-center mb-6 relative">
                  <View className="w-10 h-10 rounded-full bg-[#2A2A2A] justify-center items-center mr-4 z-10">
                    <Icon size={20} color="#4ECDC4" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white text-base font-semibold mb-1">
                      {item.step}
                    </Text>
                    <Text className="text-[#4ECDC4] text-sm">{item.timeframe}</Text>
                  </View>
                  {index < returnTimeframes.length - 1 && (
                    <View className="absolute top-10 left-5 w-px h-6 bg-[#4ECDC4] opacity-30" />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Refund Methods */}
        <View className="px-4 mb-8">
          <Text className="text-white text-lg font-semibold mb-4">Refund Methods</Text>

          <View className="gap-3">
            {refundMethods.map((method, index) => (
              <View key={index} className="bg-[#1A1A1A] rounded-xl p-4">
                <Text className="text-white text-base font-semibold mb-2">
                  {method.method}
                </Text>
                <Text className="text-[#4ECDC4] text-sm font-semibold mb-2">
                  {method.timeframe}
                </Text>
                <Text className="text-[#888888] text-xs leading-4">{method.note}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Non-Returnable Items */}
        <View className="mx-4 mb-8 p-5 rounded-2xl border border-[#EF476F]/20 bg-[#EF476F]/5">
          <View className="flex-row items-center gap-3 mb-4">
            <AlertCircle size={20} color="#EF476F" />
            <Text className="text-white text-lg font-semibold">Non-Returnable Items</Text>
          </View>

          <View className="gap-3">
            {nonReturnableItems.map((item, index) => (
              <View key={index} className="flex-row items-start gap-3">
                <XCircle size={16} color="#EF476F" />
                <Text className="text-[#AAAAAA] text-sm flex-1 leading-5">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Detailed Policy */}
        <View className="px-4 mb-8">
          <Text className="text-white text-lg font-semibold mb-4">Detailed Refund Policy</Text>

          <View className="gap-6">
            {policySections.map((section, index) => {
              const Icon = section.icon;
              return (
                <View key={index} className="pb-6 border-b border-[#2A2A2A]">
                  <View className="flex-row items-center mb-3 gap-3">
                    <View className="w-8 h-8 rounded-lg bg-[#4ECDC4]/10 justify-center items-center">
                      <Icon size={20} color="#4ECDC4" />
                    </View>
                    <Text className="text-white text-base font-semibold flex-1">
                      {section.title}
                    </Text>
                  </View>
                  <Text className="text-[#AAAAAA] text-sm leading-6">
                    {section.content}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* FAQs */}
        <View className="px-4 mb-8">
          <Text className="text-white text-lg font-semibold mb-4">Common Questions</Text>

          <View className="bg-[#1A1A1A] rounded-xl overflow-hidden">
            <View className="p-4 border-b border-[#2A2A2A]">
              <Text className="text-white text-base font-semibold mb-3">
                How do I start a return?
              </Text>
              <Text className="text-[#AAAAAA] text-sm leading-5">
                Go to your Orders page, select the item, and click "Return Item." You'll
                receive a prepaid return label and instructions via email.
              </Text>
            </View>

            <View className="p-4 border-b border-[#2A2A2A]">
              <Text className="text-white text-base font-semibold mb-3">
                Who pays for return shipping?
              </Text>
              <Text className="text-[#AAAAAA] text-sm leading-5">
                We provide free return shipping for defective, damaged, or incorrect
                items. For change of mind returns, shipping costs are deducted from your
                refund.
              </Text>
            </View>

            <View className="p-4 border-b border-[#2A2A2A]">
              <Text className="text-white text-base font-semibold mb-3">
                Can I exchange an item instead of returning?
              </Text>
              <Text className="text-[#AAAAAA] text-sm leading-5">
                Yes! We offer exchanges for size or color within 30 days. Select
                "Exchange" instead of "Return" during the return process.
              </Text>
            </View>

            <View className="p-4">
              <Text className="text-white text-base font-semibold mb-3">
                What if I receive a damaged item?
              </Text>
              <Text className="text-[#AAAAAA] text-sm leading-5">
                Contact us within 48 hours of delivery with photos of the damage. We'll
                arrange a free return and replacement or full refund.
              </Text>
            </View>
          </View>
        </View>

        {/* Contact & Help */}
        <View className="px-4 pb-8">
          <View className="bg-[#4ECDC4]/10 rounded-2xl p-6 items-center border border-[#4ECDC4]">
            <Text className="text-white text-xl font-semibold mb-3 text-center">
              Need Help with a Return?
            </Text>
            <Text className="text-white/80 text-sm text-center leading-5 mb-6">
              Our customer support team is here to help with any return or refund
              questions.
            </Text>

            <TouchableOpacity
              className="bg-[#4ECDC4] px-8 py-3.5 rounded-full mb-3 w-full items-center"
              onPress={() => router.push("/support")}
            >
              <Text className="text-black text-base font-semibold">Contact Support</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-8 py-3.5 rounded-full border border-[#4ECDC4] w-full items-center"
              onPress={() => router.push("/orders")}
            >
              <Text className="text-[#4ECDC4] text-base font-semibold">View My Orders</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}