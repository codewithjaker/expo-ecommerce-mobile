import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Share,
  Alert,
  Clipboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Users,
  Gift,
  Share2,
  Copy,
  QrCode,
  MessageCircle,
  Mail,
} from 'lucide-react-native';

interface Reward {
  id: string;
  title: string;
  description: string;
  requirement: string;
  status: 'available' | 'claimed' | 'pending';
}

export default function InviteScreen() {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState('ANDREW123');
  const [inviteLink, setInviteLink] = useState('https://ecommerce.app/invite/ANDREW123');
  const [copied, setCopied] = useState(false);

  const rewards: Reward[] = [
    {
      id: '1',
      title: 'First Friend Joined',
      description: 'Get 500 loyalty points when your first friend signs up',
      requirement: '1 friend',
      status: 'claimed',
    },
    {
      id: '2',
      title: '5 Friends Joined',
      description: 'Earn $25 credit when 5 friends make their first purchase',
      requirement: '5 friends',
      status: 'available',
    },
    {
      id: '3',
      title: '10 Friends Joined',
      description: 'Unlock exclusive VIP benefits and priority support',
      requirement: '10 friends',
      status: 'pending',
    },
    {
      id: '4',
      title: '25 Friends Joined',
      description: 'Get a premium gift box worth $100',
      requirement: '25 friends',
      status: 'pending',
    },
  ];

  const stats = {
    invitedFriends: 3,
    pendingRewards: 2,
    earnedPoints: 1500,
    totalRewards: '$25 credit',
  };

  const handleCopyCode = () => {
    Clipboard.setString(inviteCode);
    setCopied(true);
    Alert.alert('Copied!', 'Invite code copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    Clipboard.setString(inviteLink);
    Alert.alert('Copied!', 'Invite link copied to clipboard.');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on Ecommerce App! Use my invite code ${inviteCode} or click ${inviteLink} to get started.`,
        title: 'Join Ecommerce App',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share. Please try again.');
    }
  };

  const shareViaMessage = () => {
    Alert.alert('Coming Soon', 'Message sharing feature coming soon!');
  };

  const shareViaEmail = () => {
    Alert.alert('Coming Soon', 'Email sharing feature coming soon!');
  };

  const showQRCode = () => {
    Alert.alert('QR Code', 'QR code feature coming soon!');
  };

  const renderReward = (reward: Reward) => {
    let cardClass = "bg-[#1A1A1A] rounded-2xl p-4";
    if (reward.status === 'claimed') {
      cardClass += " bg-[#4ECDC4]/5 border border-[#4ECDC4]/30";
    } else if (reward.status === 'pending') {
      cardClass += " opacity-60";
    }

    let statusColor = "";
    let statusTextClass = "";
    if (reward.status === 'claimed') {
      statusColor = '#4ECDC4';
      statusTextClass = "text-[#4ECDC4]";
    } else if (reward.status === 'available') {
      statusColor = '#FFD700';
      statusTextClass = "text-[#FFD700]";
    } else {
      statusColor = '#888888';
      statusTextClass = "text-[#888888]";
    }

    return (
      <View key={reward.id} className={cardClass}>
        <View className="flex-row justify-between items-center mb-3">
          <Gift size={20} color={statusColor} />
          <View className="px-2 py-1 rounded-full bg-white/10">
            <Text className={`text-[10px] font-semibold ${statusTextClass}`}>
              {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
            </Text>
          </View>
        </View>

        <Text className="text-white text-base font-semibold mb-2">{reward.title}</Text>
        <Text className="text-[#AAAAAA] text-sm leading-5 mb-3">{reward.description}</Text>

        <View className="flex-row justify-between items-center">
          <Text className="text-[#888888] text-xs">{reward.requirement}</Text>
          {reward.status === 'available' && (
            <TouchableOpacity className="bg-[#4ECDC4] px-4 py-2 rounded-full">
              <Text className="text-black text-xs font-semibold">Claim</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Invite Friends</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="items-center py-8 px-4">
          <View className="w-20 h-20 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-4">
            <Users size={48} color="#4ECDC4" />
          </View>
          <Text className="text-white text-2xl font-semibold mb-2 text-center">
            Invite Friends, Get Rewards
          </Text>
          <Text className="text-[#888888] text-sm text-center leading-5">
            Share the love and earn rewards when your friends join and shop
          </Text>
        </View>

        {/* Stats */}
        <View className="px-4 mb-6">
          <View className="flex-row flex-wrap gap-3">
            <View className="w-[48%] bg-[#1A1A1A] rounded-2xl p-4 mb-3">
              <Text className="text-white text-2xl font-bold mb-1">{stats.invitedFriends}</Text>
              <Text className="text-[#888888] text-xs">Friends</Text>
            </View>
            <View className="w-[48%] bg-[#1A1A1A] rounded-2xl p-4 mb-3">
              <Text className="text-white text-2xl font-bold mb-1">{stats.pendingRewards}</Text>
              <Text className="text-[#888888] text-xs">Pending Rewards</Text>
            </View>
            <View className="w-[48%] bg-[#1A1A1A] rounded-2xl p-4 mb-3">
              <Text className="text-white text-2xl font-bold mb-1">{stats.earnedPoints}</Text>
              <Text className="text-[#888888] text-xs">Points Earned</Text>
            </View>
            <View className="w-[48%] bg-[#1A1A1A] rounded-2xl p-4 mb-3">
              <Text className="text-white text-2xl font-bold mb-1">{stats.totalRewards}</Text>
              <Text className="text-[#888888] text-xs">Total Rewards</Text>
            </View>
          </View>
        </View>

        {/* Invite Code */}
        <View className="px-4 mb-8">
          <Text className="text-white text-lg font-semibold mb-4">Your Invite Code</Text>

          <View className="flex-row mb-4">
            <TextInput
              className="flex-1 bg-[#1A1A1A] text-white text-xl font-bold px-4 py-3.5 rounded-l-xl border border-[#4ECDC4] border-r-0 tracking-wider"
              value={inviteCode}
              editable={false}
              selectTextOnFocus
            />
            <TouchableOpacity
              className={`bg-[#4ECDC4] px-5 py-3.5 rounded-r-xl flex-row items-center gap-2 ${
                copied ? "bg-[#4ECDC4]" : ""
              }`}
              onPress={handleCopyCode}
            >
              {copied ? (
                <Text className="text-black text-sm font-semibold">Copied!</Text>
              ) : (
                <>
                  <Copy size={16} color="#000000" />
                  <Text className="text-black text-sm font-semibold">Copy</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View className="bg-[#1A1A1A] rounded-xl p-3">
            <Text className="text-[#888888] text-xs mb-1">Invite Link:</Text>
            <View className="flex-row items-center">
              <Text className="text-white text-sm flex-1" numberOfLines={1}>
                {inviteLink}
              </Text>
              <TouchableOpacity className="p-2" onPress={handleCopyLink}>
                <Copy size={16} color="#4ECDC4" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Share Options */}
        <View className="px-4 mb-8">
          <Text className="text-white text-lg font-semibold mb-4">Share With Friends</Text>

          <View className="flex-row flex-wrap gap-3">
            <TouchableOpacity className="w-[48%] bg-[#1A1A1A] rounded-2xl p-5 items-center mb-3" onPress={handleShare}>
              <View className="w-12 h-12 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-3">
                <Share2 size={24} color="#4ECDC4" />
              </View>
              <Text className="text-white text-sm font-semibold">Share</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[48%] bg-[#1A1A1A] rounded-2xl p-5 items-center mb-3" onPress={shareViaMessage}>
              <View className="w-12 h-12 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-3">
                <MessageCircle size={24} color="#4ECDC4" />
              </View>
              <Text className="text-white text-sm font-semibold">Message</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[48%] bg-[#1A1A1A] rounded-2xl p-5 items-center mb-3" onPress={shareViaEmail}>
              <View className="w-12 h-12 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-3">
                <Mail size={24} color="#4ECDC4" />
              </View>
              <Text className="text-white text-sm font-semibold">Email</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[48%] bg-[#1A1A1A] rounded-2xl p-5 items-center mb-3" onPress={showQRCode}>
              <View className="w-12 h-12 rounded-full bg-[#4ECDC4]/10 justify-center items-center mb-3">
                <QrCode size={24} color="#4ECDC4" />
              </View>
              <Text className="text-white text-sm font-semibold">QR Code</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* How It Works */}
        <View className="px-4 mb-8">
          <Text className="text-white text-lg font-semibold mb-4">How It Works</Text>

          <View className="bg-[#1A1A1A] rounded-2xl p-4">
            <View className="flex-row mb-5">
              <View className="w-8 h-8 rounded-full bg-[#4ECDC4] justify-center items-center mr-3">
                <Text className="text-black text-sm font-bold">1</Text>
              </View>
              <View className="flex-1 pt-1">
                <Text className="text-white text-base font-semibold mb-1">Share Your Code</Text>
                <Text className="text-[#888888] text-sm leading-5">
                  Share your unique invite code or link with friends
                </Text>
              </View>
            </View>

            <View className="flex-row mb-5">
              <View className="w-8 h-8 rounded-full bg-[#4ECDC4] justify-center items-center mr-3">
                <Text className="text-black text-sm font-bold">2</Text>
              </View>
              <View className="flex-1 pt-1">
                <Text className="text-white text-base font-semibold mb-1">Friend Signs Up</Text>
                <Text className="text-[#888888] text-sm leading-5">
                  Your friend signs up using your code and makes their first purchase
                </Text>
              </View>
            </View>

            <View className="flex-row">
              <View className="w-8 h-8 rounded-full bg-[#4ECDC4] justify-center items-center mr-3">
                <Text className="text-black text-sm font-bold">3</Text>
              </View>
              <View className="flex-1 pt-1">
                <Text className="text-white text-base font-semibold mb-1">You Get Rewarded</Text>
                <Text className="text-[#888888] text-sm leading-5">
                  Earn points, credits, and exclusive rewards
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Rewards */}
        <View className="px-4 mb-8">
          <Text className="text-white text-lg font-semibold mb-4">Your Rewards</Text>

          <View className="gap-3">
            {rewards.map(renderReward)}
          </View>
        </View>

        {/* Terms */}
        <Text className="text-[#666666] text-[10px] text-center px-4 pb-8 leading-4">
          *Terms and conditions apply. Rewards are subject to change. Friends must make a minimum purchase of $50 to qualify.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}