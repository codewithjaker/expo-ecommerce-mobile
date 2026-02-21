import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  ChevronRight,
  Search,
  ExternalLink,
} from 'lucide-react-native';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface ContactOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  action: () => void;
}

export default function SupportScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I track my order?',
      answer: 'You can track your order from the Orders section in your profile. Once your order is shipped, you will receive a tracking number via email and SMS.',
    },
    {
      id: '2',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some items like intimate apparel and personalized products are not returnable.',
    },
    {
      id: '3',
      question: 'How long does shipping take?',
      answer: 'Shipping times vary by location and shipping method. Standard shipping takes 5-7 business days, express shipping takes 2-3 business days, and next-day delivery is available in select areas.',
    },
    {
      id: '4',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries worldwide. International shipping times and costs vary by destination. Please check the shipping calculator at checkout.',
    },
    {
      id: '5',
      question: 'How do I change or cancel my order?',
      answer: 'You can change or cancel your order within 1 hour of placement from the Orders section. After 1 hour, please contact our support team for assistance.',
    },
    {
      id: '6',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers in select regions.',
    },
  ];

  const contactOptions: ContactOption[] = [
    {
      id: '1',
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: MessageCircle,
      action: () => {
        alert('Live chat feature coming soon!');
      },
    },
    {
      id: '2',
      title: 'Call Us',
      description: '+1 (800) 123-4567',
      icon: Phone,
      action: () => {
        Linking.openURL('tel:+18001234567');
      },
    },
    {
      id: '3',
      title: 'Email Us',
      description: 'support@ecommerceapp.com',
      icon: Mail,
      action: () => {
        Linking.openURL('mailto:support@ecommerceapp.com');
      },
    },
    {
      id: '4',
      title: 'FAQ & Help Center',
      description: 'Browse our help articles',
      icon: FileText,
      action: () => {
        alert('Help center coming soon!');
      },
    },
  ];

  const filteredFAQs = searchQuery
    ? faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Help & Support</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View className="items-center py-8 px-4">
          <View className="w-20 h-20 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-4">
            <HelpCircle size={48} color="#4ECDC4" />
          </View>
          <Text className="text-white text-2xl font-semibold mb-2 text-center">
            How can we help you?
          </Text>
          <Text className="text-[#888888] text-sm text-center leading-5">
            Get answers to your questions or contact our support team
          </Text>
        </View>

        {/* Search */}
        <View className="px-4 mb-6">
          <View className="flex-row items-center bg-[#1A1A1A] px-4 py-3 rounded-xl gap-3">
            <Search size={20} color="#888888" />
            <TextInput
              className="flex-1 text-white text-base"
              placeholder="Search for help..."
              placeholderTextColor="#666666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Contact Options */}
        <View className="px-4 mb-8">
          <Text className="text-white text-lg font-semibold mb-4">
            Contact Options
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {contactOptions.map((option) => {
              const Icon = option.icon;
              return (
                <TouchableOpacity
                  key={option.id}
                  className="w-[48%] bg-[#1A1A1A] rounded-2xl p-4 items-center mb-3"
                  onPress={option.action}
                >
                  <View className="w-12 h-12 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-3">
                    <Icon size={24} color="#4ECDC4" />
                  </View>
                  <Text className="text-white text-base font-semibold mb-1 text-center">
                    {option.title}
                  </Text>
                  <Text className="text-[#888888] text-xs text-center leading-4">
                    {option.description}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Frequently Asked Questions */}
        <View className="px-4 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-semibold">
              Frequently Asked Questions
            </Text>
            <Text className="text-[#888888] text-xs">{filteredFAQs.length} questions</Text>
          </View>

          <View className="bg-[#1A1A1A] rounded-xl overflow-hidden">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <View key={faq.id} className="border-b border-[#2A2A2A] last:border-b-0">
                  <TouchableOpacity
                    className="flex-row items-center justify-between p-4"
                    onPress={() => toggleFAQ(faq.id)}
                  >
                    <Text className="text-white text-base font-medium flex-1">
                      {faq.question}
                    </Text>
                    <ChevronRight
                      size={20}
                      color="#4ECDC4"
                      style={{
                        transform: [{ rotate: expandedFAQ === faq.id ? '90deg' : '0deg' }],
                      }}
                    />
                  </TouchableOpacity>

                  {expandedFAQ === faq.id && (
                    <View className="px-4 pb-4">
                      <Text className="text-[#AAAAAA] text-sm leading-5">
                        {faq.answer}
                      </Text>
                    </View>
                  )}
                </View>
              ))
            ) : (
              <View className="items-center justify-center py-10">
                <Search size={32} color="#666666" />
                <Text className="text-white text-lg font-semibold mt-4 mb-2">
                  No results found
                </Text>
                <Text className="text-[#888888] text-sm text-center px-8 leading-5">
                  Try different keywords or browse our contact options
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Additional Resources */}
        <View className="px-4 mb-8">
          <Text className="text-white text-lg font-semibold mb-4">
            Additional Resources
          </Text>

          <TouchableOpacity className="flex-row items-center justify-between bg-[#1A1A1A] p-4 rounded-xl mb-2">
            <View className="flex-row items-center flex-1 gap-3">
              <FileText size={20} color="#4ECDC4" />
              <View className="flex-1">
                <Text className="text-white text-base font-semibold mb-0.5">
                  Terms of Service
                </Text>
                <Text className="text-[#888888] text-xs">Our terms and conditions</Text>
              </View>
            </View>
            <ExternalLink size={20} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between bg-[#1A1A1A] p-4 rounded-xl mb-2">
            <View className="flex-row items-center flex-1 gap-3">
              <FileText size={20} color="#4ECDC4" />
              <View className="flex-1">
                <Text className="text-white text-base font-semibold mb-0.5">
                  Privacy Policy
                </Text>
                <Text className="text-[#888888] text-xs">How we handle your data</Text>
              </View>
            </View>
            <ExternalLink size={20} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between bg-[#1A1A1A] p-4 rounded-xl">
            <View className="flex-row items-center flex-1 gap-3">
              <FileText size={20} color="#4ECDC4" />
              <View className="flex-1">
                <Text className="text-white text-base font-semibold mb-0.5">
                  Shipping Information
                </Text>
                <Text className="text-[#888888] text-xs">Shipping methods and costs</Text>
              </View>
            </View>
            <ExternalLink size={20} color="#888888" />
          </TouchableOpacity>
        </View>

        {/* Support Hours */}
        <View className="px-4 mb-8">
          <Text className="text-white text-lg font-semibold mb-4">Support Hours</Text>
          <View className="flex-row gap-3 mb-3">
            <View className="flex-1 bg-[#1A1A1A] rounded-xl p-4">
              <Text className="text-white text-sm font-semibold mb-1">
                Monday - Friday
              </Text>
              <Text className="text-[#4ECDC4] text-sm">9:00 AM - 8:00 PM EST</Text>
            </View>
            <View className="flex-1 bg-[#1A1A1A] rounded-xl p-4">
              <Text className="text-white text-sm font-semibold mb-1">
                Saturday - Sunday
              </Text>
              <Text className="text-[#4ECDC4] text-sm">10:00 AM - 6:00 PM EST</Text>
            </View>
          </View>
          <Text className="text-[#666666] text-xs leading-4">
            Support available via chat, email, and phone during these hours
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}