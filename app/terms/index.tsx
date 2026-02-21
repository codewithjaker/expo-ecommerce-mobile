import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  FileText,
  CheckCircle,
  AlertCircle,
  Shield,
} from 'lucide-react-native';

export default function TermsScreen() {
  const router = useRouter();

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using Ecommerce App, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.`,
    },
    {
      title: '2. Description of Service',
      content: `Ecommerce App provides an online platform for purchasing various products. The service is available to users who are at least 18 years old or have parental/guardian consent.`,
    },
    {
      title: '3. User Account',
      content: `To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.`,
    },
    {
      title: '4. Product Information',
      content: `We strive to display accurate product information, including descriptions, prices, and availability. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.`,
    },
    {
      title: '5. Pricing and Payment',
      content: `All prices are in USD and subject to change without notice. Payment must be made at the time of purchase through our secure payment gateway. We accept various payment methods as displayed during checkout.`,
    },
    {
      title: '6. Shipping and Delivery',
      content: `Shipping times and costs vary based on location and shipping method selected. We are not responsible for delays caused by carriers or customs. Delivery dates are estimates and not guaranteed.`,
    },
    {
      title: '7. Returns and Refunds',
      content: `We offer a 30-day return policy for most items in original condition. Certain items may not be returnable. Refunds are processed to the original payment method within 5-10 business days after we receive the returned item.`,
    },
    {
      title: '8. User Conduct',
      content: `You agree not to use the service for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks. You must not attempt to gain unauthorized access to any part of the service.`,
    },
    {
      title: '9. Intellectual Property',
      content: `All content included on this site, such as text, graphics, logos, images, and software, is the property of Ecommerce App or its content suppliers and protected by international copyright laws.`,
    },
    {
      title: '10. Limitation of Liability',
      content: `To the fullest extent permitted by law, Ecommerce App shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.`,
    },
    {
      title: '11. Changes to Terms',
      content: `We reserve the right to modify these terms at any time. We will notify users of any changes by posting the new terms on this page. Your continued use of the service after changes constitutes acceptance of those changes.`,
    },
    {
      title: '12. Governing Law',
      content: `These terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.`,
    },
  ];

  const importantPoints = [
    'You must be at least 18 years old to use our services',
    'Prices and availability are subject to change',
    '30-day return policy for most items',
    'We are not liable for carrier delays',
    'User accounts are non-transferable',
    'Unauthorized use may result in account termination',
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Terms of Service</Text>
        <View className="min-w-[80px] items-end">
          <Text className="text-[#888888] text-[10px]">Last updated: Nov 2024</Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View className="items-center py-8 px-4">
          <View className="w-20 h-20 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-4">
            <FileText size={48} color="#4ECDC4" />
          </View>
          <Text className="text-white text-2xl font-semibold mb-3 text-center">
            Terms of Service
          </Text>
          <Text className="text-[#888888] text-sm text-center leading-5">
            Please read these terms carefully before using our services. By using Ecommerce App, you agree to be bound by these terms.
          </Text>
        </View>

        {/* Important Points */}
        <View className="bg-[#1A1A1A] mx-4 mb-6 p-5 rounded-2xl">
          <View className="flex-row items-center mb-4 gap-3">
            <AlertCircle size={20} color="#FFD700" />
            <Text className="text-white text-lg font-semibold">Important Points</Text>
          </View>
          
          <View className="gap-3">
            {importantPoints.map((point, index) => (
              <View key={index} className="flex-row items-start gap-3">
                <CheckCircle size={16} color="#4ECDC4" />
                <Text className="text-[#AAAAAA] text-sm flex-1 leading-5">
                  {point}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Full Terms */}
        <View className="px-4 mb-8">
          <View className="flex-row items-center mb-4 gap-3">
            <Shield size={20} color="#FFFFFF" />
            <Text className="text-white text-lg font-semibold">Full Terms & Conditions</Text>
          </View>

          <View className="gap-6">
            {sections.map((section, index) => (
              <View key={index} className="pb-6 border-b border-[#2A2A2A]">
                <Text className="text-white text-base font-semibold mb-3">
                  {section.title}
                </Text>
                <Text className="text-[#AAAAAA] text-sm leading-6">
                  {section.content}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Agreement */}
        <View className="bg-[#4ECDC4]/10 mx-4 mb-6 p-6 rounded-2xl items-center border border-[#4ECDC4]">
          <Text className="text-white text-xl font-semibold mb-3">
            Your Agreement
          </Text>
          <Text className="text-white/80 text-sm text-center leading-5 mb-4">
            By continuing to use Ecommerce App, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </Text>
          <View className="flex-row items-center bg-white/10 px-4 py-2 rounded-full gap-2">
            <Shield size={20} color="#4ECDC4" />
            <Text className="text-[#4ECDC4] text-xs font-semibold">
              Agreement Accepted
            </Text>
          </View>
        </View>

        {/* Contact */}
        <View className="px-4 pb-8">
          <Text className="text-white text-lg font-semibold mb-3">Questions?</Text>
          <Text className="text-[#888888] text-sm leading-5">
            If you have any questions about these Terms of Service, please contact us at legal@ecommerceapp.com
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}