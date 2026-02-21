import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Shield,
  Lock,
  Eye,
  User,
  Smartphone,
  Fingerprint,
  Key,
  Database,
  RefreshCw,
} from 'lucide-react-native';

interface SecuritySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: React.ComponentType<any>;
}

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export default function PrivacySecurityScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState<SecuritySetting[]>([
    {
      id: '1',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      enabled: true,
      icon: Shield,
    },
    {
      id: '2',
      title: 'Biometric Login',
      description: 'Use Face ID or Touch ID to log in',
      enabled: true,
      icon: Fingerprint,
    },
    {
      id: '3',
      title: 'Activity Tracking',
      description: 'Track your account activity and login history',
      enabled: true,
      icon: Eye,
    },
    {
      id: '4',
      title: 'Data Sharing',
      description: 'Allow sharing of anonymized data for improvements',
      enabled: false,
      icon: Database,
    },
    {
      id: '5',
      title: 'Personalized Ads',
      description: 'Show personalized advertisements based on your activity',
      enabled: false,
      icon: User,
    },
  ]);

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      device: 'iPhone 13 Pro',
      location: 'New York, USA',
      lastActive: 'Currently active',
      current: true,
    },
    {
      id: '2',
      device: 'MacBook Pro',
      location: 'New York, USA',
      lastActive: '2 hours ago',
      current: false,
    },
    {
      id: '3',
      device: 'Android Phone',
      location: 'Los Angeles, USA',
      lastActive: '3 days ago',
      current: false,
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const terminateSession = (id: string) => {
    if (sessions.find(s => s.id === id)?.current) {
      Alert.alert(
        'Terminate Current Session',
        'This will log you out of this device. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Log Out',
            style: 'destructive',
            onPress: () => {
              setSessions(prev => prev.filter(session => session.id !== id));
              // router.replace('/login');
            },
          },
        ]
      );
    } else {
      setSessions(prev => prev.filter(session => session.id !== id));
    }
  };

  const terminateAllSessions = () => {
    Alert.alert(
      'Terminate All Sessions',
      'This will log you out from all devices except this one. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Terminate All',
          style: 'destructive',
          onPress: () => {
            const currentSession = sessions.find(s => s.current);
            setSessions(currentSession ? [currentSession] : []);
          },
        },
      ]
    );
  };

  const changePassword = () => {
    router.push('/change-password');
  };

  const renderSetting = (setting: SecuritySetting) => {
    const Icon = setting.icon;
    return (
      <View key={setting.id} className="flex-row justify-between items-center p-4 border-b border-[#2A2A2A]">
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 rounded-xl bg-[#4ECDC4]/10 justify-center items-center mr-3">
            <Icon size={20} color="#4ECDC4" />
          </View>
          <View className="flex-1">
            <Text className="text-white text-base font-semibold mb-1">
              {setting.title}
            </Text>
            <Text className="text-[#888888] text-xs leading-4">
              {setting.description}
            </Text>
          </View>
        </View>
        <Switch
          value={setting.enabled}
          onValueChange={() => toggleSetting(setting.id)}
          trackColor={{ false: '#767577', true: '#4ECDC4' }}
          thumbColor={setting.enabled ? '#FFFFFF' : '#f4f3f4'}
        />
      </View>
    );
  };

  const renderSession = (session: Session) => (
    <View key={session.id} className="flex-row items-center p-4 border-b border-[#2A2A2A]">
      <View className="w-10 h-10 rounded-full bg-[#2A2A2A] justify-center items-center mr-3">
        <Smartphone size={20} color={session.current ? '#4ECDC4' : '#888888'} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center mb-1">
          <Text className="text-white text-base font-semibold flex-1">
            {session.device}
          </Text>
          {session.current && (
            <View className="bg-[#4ECDC4]/20 px-2 py-1 rounded-full">
              <Text className="text-[#4ECDC4] text-[10px] font-semibold">
                Current
              </Text>
            </View>
          )}
        </View>
        <Text className="text-[#888888] text-xs mb-0.5">{session.location}</Text>
        <Text className="text-[#666666] text-[10px]">{session.lastActive}</Text>
      </View>
      {!session.current && (
        <TouchableOpacity
          className="px-3 py-1.5 bg-[#EF476F]/10 rounded-lg"
          onPress={() => terminateSession(session.id)}
        >
          <Text className="text-[#EF476F] text-xs font-semibold">Terminate</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Privacy & Security</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Security Score */}
        <View className="bg-[#4ECDC4]/10 mx-4 my-4 p-6 rounded-2xl items-center">
          <View className="flex-row items-center gap-3 mb-4">
            <Shield size={32} color="#4ECDC4" />
            <Text className="text-[#4ECDC4] text-xl font-semibold">Security Score</Text>
          </View>
          <View className="flex-row items-center gap-4 mb-3 w-full">
            <View className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <View className="h-full bg-[#4ECDC4] rounded-full w-[85%]" />
            </View>
            <Text className="text-white text-2xl font-bold min-w-[60px] text-right">
              85/100
            </Text>
          </View>
          <Text className="text-white/80 text-sm text-center">
            Your account security is strong. Keep it up!
          </Text>
        </View>

        {/* Password Section */}
        <View className="mx-4 mb-8">
          <View className="flex-row items-center mb-4 gap-3">
            <Key size={20} color="#FFFFFF" />
            <Text className="text-white text-lg font-semibold">Password Security</Text>
          </View>

          <TouchableOpacity
            className="flex-row items-center justify-between bg-[#1A1A1A] p-4 rounded-xl mb-2"
            onPress={changePassword}
          >
            <Text className="text-white text-base font-medium">Change Password</Text>
            <ChevronLeft size={20} color="#4ECDC4" className="rotate-180" />
          </TouchableOpacity>

          <Text className="text-[#666666] text-xs mt-1">
            Last changed: October 15, 2024
          </Text>
        </View>

        {/* Security Settings */}
        <View className="mx-4 mb-8">
          <View className="flex-row items-center mb-4 gap-3">
            <Lock size={20} color="#FFFFFF" />
            <Text className="text-white text-lg font-semibold">Security Settings</Text>
          </View>

          <View className="bg-[#1A1A1A] rounded-xl overflow-hidden">
            {settings.map(renderSetting)}
          </View>
        </View>

        {/* Active Sessions */}
        <View className="mx-4 mb-8">
          <View className="flex-row items-center mb-4 gap-3">
            <RefreshCw size={20} color="#FFFFFF" />
            <View className="flex-1 flex-row justify-between items-center">
              <Text className="text-white text-lg font-semibold">Active Sessions</Text>
              <Text className="text-[#888888] text-xs">{sessions.length} devices</Text>
            </View>
          </View>

          <View className="bg-[#1A1A1A] rounded-xl overflow-hidden">
            {sessions.map(renderSession)}
          </View>

          {sessions.length > 1 && (
            <TouchableOpacity
              className="mt-3 p-3 bg-[#EF476F]/10 rounded-xl items-center"
              onPress={terminateAllSessions}
            >
              <Text className="text-[#EF476F] text-sm font-semibold">
                Terminate All Other Sessions
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Data & Privacy */}
        <View className="mx-4 mb-8">
          <View className="flex-row items-center mb-4 gap-3">
            <Database size={20} color="#FFFFFF" />
            <Text className="text-white text-lg font-semibold">Data & Privacy</Text>
          </View>

          <TouchableOpacity className="bg-[#1A1A1A] p-4 rounded-xl mb-2">
            <Text className="text-white text-base font-medium">Download Your Data</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#1A1A1A] p-4 rounded-xl mb-2">
            <Text className="text-white text-base font-medium">Request Data Deletion</Text>
          </TouchableOpacity>

          <Text className="text-[#666666] text-xs mt-2 leading-4">
            You have the right to access and control your personal data.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}