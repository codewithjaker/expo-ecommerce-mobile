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
  Bell,
  ShoppingBag,
  Tag,
  Gift,
  Star,
  MessageCircle,
  Settings,
  Volume2,
  VolumeX,
} from 'lucide-react-native';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: React.ComponentType<any>;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'promo' | 'price' | 'review' | 'system';
  read: boolean;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      title: 'Order Updates',
      description: 'Track your orders and delivery status',
      enabled: true,
      icon: ShoppingBag,
    },
    {
      id: '2',
      title: 'Promotions & Offers',
      description: 'Get notified about sales and special offers',
      enabled: true,
      icon: Tag,
    },
    {
      id: '3',
      title: 'Price Drops',
      description: 'Alerts when items in your wishlist go on sale',
      enabled: false,
      icon: Gift,
    },
    {
      id: '4',
      title: 'Review Reminders',
      description: 'Reminders to review purchased products',
      enabled: true,
      icon: Star,
    },
    {
      id: '5',
      title: 'Messages',
      description: 'Customer support and seller messages',
      enabled: true,
      icon: MessageCircle,
    },
    {
      id: '6',
      title: 'System Notifications',
      description: 'App updates and important announcements',
      enabled: true,
      icon: Settings,
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Order Shipped',
      message: 'Your order #789012 has been shipped and is on its way',
      time: '2 hours ago',
      type: 'order',
      read: false,
    },
    {
      id: '2',
      title: 'Summer Sale Live!',
      message: 'Up to 50% off on summer collection. Shop now!',
      time: 'Yesterday',
      type: 'promo',
      read: true,
    },
    {
      id: '3',
      title: 'Price Drop Alert',
      message: 'Venesa Long Shirt price dropped to $299.99',
      time: '2 days ago',
      type: 'price',
      read: true,
    },
    {
      id: '4',
      title: 'Review Your Purchase',
      message: 'How was your recent purchase? Share your experience',
      time: '3 days ago',
      type: 'review',
      read: true,
    },
    {
      id: '5',
      title: 'App Update Available',
      message: 'Update to version 2.1 for new features and bug fixes',
      time: '1 week ago',
      type: 'system',
      read: true,
    },
  ]);

  const [globalMute, setGlobalMute] = useState(false);

  const toggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const toggleGlobalMute = () => {
    setGlobalMute(!globalMute);
    if (!globalMute) {
      Alert.alert(
        'Mute All Notifications',
        'All notifications will be muted. You can turn them back on anytime.',
        [{ text: 'OK' }]
      );
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearAllNotifications = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => setNotifications([]),
        },
      ]
    );
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingBag size={20} color="#4ECDC4" />;
      case 'promo':
        return <Tag size={20} color="#FF6B6B" />;
      case 'price':
        return <Gift size={20} color="#FFD166" />;
      case 'review':
        return <Star size={20} color="#FFD700" />;
      case 'system':
        return <Settings size={20} color="#888888" />;
    }
  };

  const renderNotification = (notification: Notification) => (
    <TouchableOpacity
      key={notification.id}
      className={`flex-row bg-[#1A1A1A] rounded-xl p-4 mb-2 relative ${
        !notification.read ? 'bg-[#4ECDC4]/10' : ''
      }`}
    >
      <View className="w-10 h-10 rounded-full bg-[#2A2A2A] justify-center items-center mr-3">
        {getNotificationIcon(notification.type)}
      </View>
      <View className="flex-1">
        <Text className="text-white text-base font-semibold mb-1">
          {notification.title}
        </Text>
        <Text className="text-[#AAAAAA] text-sm leading-5 mb-1" numberOfLines={2}>
          {notification.message}
        </Text>
        <Text className="text-[#888888] text-xs">{notification.time}</Text>
      </View>
      {!notification.read && (
        <View className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#4ECDC4]" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Notifications</Text>
        <View className="min-w-[60px] items-end">
          <Text className="text-[#4ECDC4] text-xs font-semibold">
            {notifications.filter(n => !n.read).length} new
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Global Mute */}
        <View className="bg-[#1A1A1A] mx-4 my-4 p-5 rounded-2xl items-center">
          <View className="flex-row items-center gap-3 mb-2">
            {globalMute ? (
              <VolumeX size={24} color="#EF476F" />
            ) : (
              <Volume2 size={24} color="#4ECDC4" />
            )}
            <Text className="text-white text-lg font-semibold">
              {globalMute ? 'Notifications Muted' : 'Notifications Active'}
            </Text>
          </View>
          <Text className="text-[#888888] text-sm text-center mb-4 leading-5">
            {globalMute
              ? 'All notifications are currently muted'
              : 'You will receive notifications based on your settings'}
          </Text>
          <TouchableOpacity
            className="bg-[#4ECDC4]/10 border border-[#4ECDC4] px-6 py-3 rounded-full"
            onPress={toggleGlobalMute}
          >
            <Text className="text-[#4ECDC4] text-sm font-semibold">
              {globalMute ? 'Turn On Notifications' : 'Mute All Notifications'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notification Actions */}
        <View className="flex-row px-4 mb-6 gap-3">
          <TouchableOpacity
            className="flex-1 bg-[#2A2A2A] py-3 rounded-xl items-center"
            onPress={markAllAsRead}
          >
            <Text className="text-white text-sm font-medium">Mark All as Read</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-[#EF476F]/10 py-3 rounded-xl items-center"
            onPress={clearAllNotifications}
          >
            <Text className="text-[#EF476F] text-sm font-medium">Clear All</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Notifications */}
        <View className="mb-8">
          <View className="px-4 mb-4">
            <Text className="text-white text-xl font-semibold">Recent</Text>
          </View>

          {notifications.length > 0 ? (
            <View className="px-4">{notifications.map(renderNotification)}</View>
          ) : (
            <View className="items-center justify-center py-10 px-8">
              <Bell size={48} color="#666666" />
              <Text className="text-white text-lg font-semibold mt-4 mb-2">
                No Notifications
              </Text>
              <Text className="text-[#888888] text-sm text-center leading-5">
                You're all caught up! Check back later for updates.
              </Text>
            </View>
          )}
        </View>

        {/* Notification Settings */}
        <View className="mb-8">
          <View className="px-4 mb-4">
            <Text className="text-white text-xl font-semibold">Notification Settings</Text>
            <Text className="text-[#888888] text-sm mt-1">
              Customize what notifications you receive
            </Text>
          </View>

          <View className="bg-[#1A1A1A] mx-4 rounded-2xl overflow-hidden">
            {settings.map((setting) => {
              const Icon = setting.icon;
              return (
                <View
                  key={setting.id}
                  className="flex-row justify-between items-center p-4 border-b border-[#2A2A2A]"
                >
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
                    value={globalMute ? false : setting.enabled}
                    onValueChange={() => toggleSetting(setting.id)}
                    trackColor={{ false: '#767577', true: '#4ECDC4' }}
                    thumbColor={setting.enabled ? '#FFFFFF' : '#f4f3f4'}
                    disabled={globalMute}
                  />
                </View>
              );
            })}
          </View>

          <Text className="text-[#666666] text-xs text-center px-4 mt-3 leading-4">
            {globalMute
              ? 'All notifications are currently muted. Turn on notifications to customize settings.'
              : 'Adjust your preferences to receive only the notifications you want.'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}