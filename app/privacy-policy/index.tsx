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
  Shield,
  Lock,
  Eye,
  Database,
  User,
} from 'lucide-react-native';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes your name, email address, phone number, shipping address, and payment information.`,
      icon: User,
    },
    {
      title: '2. How We Use Your Information',
      content: `We use your information to process transactions, provide customer support, improve our services, send promotional communications (with your consent), and comply with legal obligations.`,
      icon: Eye,
    },
    {
      title: '3. Information Sharing',
      content: `We do not sell your personal information. We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.`,
      icon: Shield,
    },
    {
      title: '4. Data Security',
      content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.`,
      icon: Lock,
    },
    {
      title: '5. Cookies and Tracking',
      content: `We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.`,
      icon: Database,
    },
    {
      title: '6. Your Rights',
      content: `You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data. To exercise these rights, please contact us.`,
      icon: User,
    },
    {
      title: '7. Data Retention',
      content: `We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.`,
      icon: Database,
    },
    {
      title: '8. Children\'s Privacy',
      content: `Our service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.`,
      icon: Shield,
    },
    {
      title: '9. International Transfers',
      content: `Your information may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.`,
      icon: Lock,
    },
    {
      title: '10. Changes to Privacy Policy',
      content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.`,
      icon: Eye,
    },
  ];

  const dataCategories = [
    {
      type: 'Personal Information',
      examples: 'Name, email, phone number, address',
      purpose: 'Account creation, order processing, customer support',
    },
    {
      type: 'Payment Information',
      examples: 'Credit card details, billing address',
      purpose: 'Transaction processing, fraud prevention',
    },
    {
      type: 'Usage Data',
      examples: 'IP address, browser type, pages visited',
      purpose: 'Analytics, service improvement, security',
    },
    {
      type: 'Cookies Data',
      examples: 'Session cookies, preference cookies',
      purpose: 'Website functionality, personalization',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Privacy Policy</Text>
        <View className="items-end min-w-[80px]">
          <Text className="text-[#888888] text-[10px]">Last updated: Nov 2024</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View className="items-center py-8">
          <View className="w-20 h-20 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-4">
            <Shield size={48} color="#4ECDC4" />
          </View>
          <Text className="text-white text-2xl font-semibold mb-3 text-center">
            Your Privacy Matters
          </Text>
          <Text className="text-[#888888] text-sm text-center leading-5">
            We are committed to protecting your privacy and being transparent
            about how we collect, use, and protect your personal information.
          </Text>
        </View>

        {/* Quick Overview */}
        <View className="bg-[#1A1A1A] mx-0 mb-6 p-5 rounded-xl">
          <Text className="text-white text-lg font-semibold mb-4">At a Glance</Text>
          <View className="flex-row flex-wrap gap-3">
            <View className="flex-row items-center w-[48%] gap-2">
              <Shield size={16} color="#4ECDC4" />
              <Text className="text-[#AAAAAA] text-xs flex-1">We don't sell your data</Text>
            </View>
            <View className="flex-row items-center w-[48%] gap-2">
              <Lock size={16} color="#4ECDC4" />
              <Text className="text-[#AAAAAA] text-xs flex-1">Bank-level security</Text>
            </View>
            <View className="flex-row items-center w-[48%] gap-2">
              <User size={16} color="#4ECDC4" />
              <Text className="text-[#AAAAAA] text-xs flex-1">You control your data</Text>
            </View>
            <View className="flex-row items-center w-[48%] gap-2">
              <Eye size={16} color="#4ECDC4" />
              <Text className="text-[#AAAAAA] text-xs flex-1">Transparent practices</Text>
            </View>
          </View>
        </View>

        {/* Data Categories */}
        <View className="mb-8">
          <Text className="text-white text-lg font-semibold mb-4">Data We Collect</Text>
          <View className="gap-3">
            {dataCategories.map((category, index) => (
              <View key={index} className="bg-[#1A1A1A] rounded-xl p-4">
                <Text className="text-[#4ECDC4] text-base font-semibold mb-3">
                  {category.type}
                </Text>
                <View className="mb-3">
                  <Text className="text-[#888888] text-[10px] mb-0.5">Examples:</Text>
                  <Text className="text-[#AAAAAA] text-xs leading-4">
                    {category.examples}
                  </Text>
                </View>
                <View className="pt-3 border-t border-[#2A2A2A]">
                  <Text className="text-[#888888] text-[10px] mb-0.5">Purpose:</Text>
                  <Text className="text-[#AAAAAA] text-xs leading-4">
                    {category.purpose}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Detailed Policy */}
        <View className="mb-8">
          <Text className="text-white text-lg font-semibold mb-4">Detailed Privacy Policy</Text>
          <View className="gap-6">
            {sections.map((section, index) => {
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

        {/* Your Choices */}
        <View className="mb-8">
          <Text className="text-white text-lg font-semibold mb-4">Your Privacy Choices</Text>
          <View className="bg-[#1A1A1A] rounded-xl p-4">
            {[
              {
                number: 1,
                title: 'Access Your Data',
                desc: 'Request a copy of the personal data we hold about you',
              },
              {
                number: 2,
                title: 'Correct Your Data',
                desc: 'Update or correct inaccurate personal information',
              },
              {
                number: 3,
                title: 'Delete Your Data',
                desc: 'Request deletion of your personal data',
              },
              {
                number: 4,
                title: 'Opt-Out',
                desc: 'Opt out of marketing communications at any time',
              },
            ].map((choice, idx) => (
              <View
                key={idx}
                className="flex-row mb-5 last:mb-0"
              >
                <View className="w-7 h-7 rounded-full bg-[#4ECDC4] justify-center items-center mr-3">
                  <Text className="text-black text-xs font-bold">{choice.number}</Text>
                </View>
                <View className="flex-1 pt-0.5">
                  <Text className="text-white text-base font-semibold mb-1">
                    {choice.title}
                  </Text>
                  <Text className="text-[#888888] text-sm leading-5">
                    {choice.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Contact & Support */}
        <View className="bg-[#4ECDC4]/10 mx-0 mb-8 p-6 rounded-xl">
          <Text className="text-white text-xl font-semibold mb-3">Contact Us</Text>
          <Text className="text-white/80 text-sm leading-5 mb-4">
            If you have any questions about this Privacy Policy or wish to exercise
            your rights, please contact our Data Protection Officer at:
          </Text>
          <View className="bg-black/20 rounded-xl p-4">
            <Text className="text-[#4ECDC4] text-base font-semibold mb-3">
              privacy@ecommerceapp.com
            </Text>
            <Text className="text-white/70 text-xs leading-5">
              Data Protection Officer{'\n'}
              123 Privacy Street{'\n'}
              New York, NY 10001{'\n'}
              United States
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}