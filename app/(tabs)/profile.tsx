// app/(tabs)/profile.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  User,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  CreditCard,
  MapPin,
  Package,
  Heart,
  Star,
  MessageSquare,
  Camera,
  Edit,
  Lock,
  Globe,
  Moon,
  Gift,
  Users,
  ShieldCheck,
  Trash2,
  X,
  Key,
  RefreshCcw,
} from "lucide-react-native";
import { useRouter } from "expo-router";

// Types
interface MenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  route?: string;
  badge?: string;
  type?: "default" | "danger";
}

interface ProfileStats {
  orders: number;
  reviews: number;
  wishlist: number;
  loyaltyPoints: number;
}

// Mock Data
const userProfile = {
  name: "Andrew Ainsley",
  email: "andrew.ainsley@example.com",
  phone: "+1 (234) 567-8900",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  joinDate: "Joined October 2023",
  membership: "Gold Member",
  address: "123 Main St, New York, NY 10001",
};

const profileStats: ProfileStats = {
  orders: 24,
  reviews: 12,
  wishlist: 8,
  loyaltyPoints: 1540,
};

const menuSections: { title: string; items: MenuItem[] }[] = [
  {
    title: "Account",
    items: [
      { id: "1", title: "Edit Profile", icon: User, route: "/profile/edit" },
      {
        id: "2",
        title: "Shipping Addresses",
        icon: MapPin,
        route: "/addresses",
        badge: "3",
      },
      {
        id: "3",
        title: "Payment Methods",
        icon: CreditCard,
        route: "/payments",
        badge: "2",
      },
      { id: "4", title: "My Orders", icon: Package, route: "/orders" },
      { id: "5", title: "My Reviews", icon: Star, route: "/reviews" },
      {
        id: "6",
        title: "Wishlist",
        icon: Heart,
        route: "/wishlist",
        badge: "8",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      { id: "7", title: "Notifications", icon: Bell, route: "/notifications" },
      { id: "8", title: "Privacy & Security", icon: Shield, route: "/privacy" },
      { id: "9", title: "Language", icon: Globe, route: "/language" },
      { id: "10", title: "Dark Mode", icon: Moon },
      {
        id: "11",
        title: "Help & Support",
        icon: HelpCircle,
        route: "/support",
      },
      { id: "12", title: "Invite Friends", icon: Users, route: "/invite" },
    ],
  },
  {
    title: "Legal",
    items: [
      {
        id: "13",
        title: "Terms of Service",
        icon: ShieldCheck,
        route: "/terms",
      },
      {
        id: "14",
        title: "Privacy Policy",
        icon: ShieldCheck,
        route: "/privacy-policy",
      },
      {
        id: "15",
        title: "Refund Policy",
        icon: RefreshCcw,
        route: "/refund-policy",
      },
      { id: "16", title: "Delete Account", icon: Trash2, type: "danger" },
    ],
  },
];

const recentActivities = [
  {
    id: "1",
    title: "Order #789012 shipped",
    time: "2 hours ago",
    icon: Package,
  },
  {
    id: "2",
    title: "New login from New York",
    time: "Yesterday",
    icon: Shield,
  },
  {
    id: "3",
    title: "Review added for Leather Shoes",
    time: "2 days ago",
    icon: Star,
  },
  {
    id: "4",
    title: "Payment method updated",
    time: "3 days ago",
    icon: CreditCard,
  },
];

const loyaltyTiers = [
  { name: "Silver", points: 0, color: "#C0C0C0", active: false },
  { name: "Gold", points: 1000, color: "#FFD700", active: true },
  { name: "Platinum", points: 5000, color: "#E5E4E2", active: false },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editedName, setEditedName] = useState(userProfile.name);
  const [editedEmail, setEditedEmail] = useState(userProfile.email);
  const [editedPhone, setEditedPhone] = useState(userProfile.phone);

  const handleMenuPress = (item: MenuItem) => {
    if (item.route) {
      router.push(item.route);
    } else if (item.title === "Delete Account") {
      setDeleteModalVisible(true);
    }
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    Alert.alert("Logged Out", "You have been successfully logged out.");
    // router.replace('/login');
  };

  const handleDeleteAccount = () => {
    setDeleteModalVisible(false);
    Alert.alert(
      "Account Deleted",
      "Your account has been permanently deleted.",
      [{ text: "OK", onPress: () => router.replace("/(tabs)") }],
    );
  };

  const handleSaveProfile = () => {
    setEditModalVisible(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const renderStats = () => (
    <View className="flex-row px-4 py-5 gap-3">
      <TouchableOpacity
        className="flex-1 bg-[#1A1A1A] rounded-2xl p-4 items-center"
        onPress={() => router.push("/orders")}
      >
        <Text className="text-white text-xl font-bold mb-1">
          {profileStats.orders}
        </Text>
        <Text className="text-[#888888] text-xs">Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 bg-[#1A1A1A] rounded-2xl p-4 items-center"
        onPress={() => router.push("/reviews")}
      >
        <Text className="text-white text-xl font-bold mb-1">
          {profileStats.reviews}
        </Text>
        <Text className="text-[#888888] text-xs">Reviews</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 bg-[#1A1A1A] rounded-2xl p-4 items-center"
        onPress={() => router.push("/wishlist")}
      >
        <Text className="text-white text-xl font-bold mb-1">
          {profileStats.wishlist}
        </Text>
        <Text className="text-[#888888] text-xs">Wishlist</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-1 bg-[#1A1A1A] rounded-2xl p-4 items-center">
        <View className="flex-row items-center gap-1.5">
          <Gift size={16} color="#FFD700" />
          <Text className="text-white text-xl font-bold">
            {profileStats.loyaltyPoints}
          </Text>
        </View>
        <Text className="text-[#888888] text-xs">Points</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProfileHeader = () => (
    <View className="flex-row items-center px-4 py-6 border-b border-[#1A1A1A]">
      <View className="relative mr-4">
        <Image source={{ uri: userProfile.avatar }} className="w-20 h-20 rounded-full" />
        <TouchableOpacity
          className="absolute bottom-0 right-0 bg-[#4ECDC4] w-7 h-7 rounded-full justify-center items-center border-2 border-[#0F0F0F]"
          onPress={() =>
            Alert.alert(
              "Coming Soon",
              "Profile photo upload feature coming soon!",
            )
          }
        >
          <Camera size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <Text className="text-white text-xl font-semibold mb-1">
          {userProfile.name}
        </Text>
        <Text className="text-[#888888] text-sm mb-1">{userProfile.email}</Text>
        <Text className="text-[#4ECDC4] text-xs">
          {userProfile.membership} • {userProfile.joinDate}
        </Text>
      </View>

      <TouchableOpacity
        className="p-2 bg-[#4ECDC4]/10 rounded-xl"
        onPress={() => setEditModalVisible(true)}
      >
        <Edit size={20} color="#4ECDC4" />
      </TouchableOpacity>
    </View>
  );

  const renderLoyaltyProgress = () => (
    <View className="px-4 py-5 border-t border-b border-[#1A1A1A]">
      <View className="flex-row items-center mb-4 gap-2">
        <Gift size={20} color="#FFD700" />
        <Text className="text-white text-base font-semibold flex-1">
          Loyalty Program
        </Text>
      </View>

      <View className="bg-[#1A1A1A] rounded-2xl p-4">
        <View className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden mb-6">
          <View className="h-full bg-[#FFD700] rounded-full w-[30%]" />
        </View>

        <View className="flex-row justify-between mb-3">
          {loyaltyTiers.map((tier, index) => (
            <View key={tier.name} className="items-center w-[30%]">
              <View className="items-center mb-2">
                <View
                  className={`w-4 h-4 rounded-full z-10 ${tier.active ? 'border-2 border-white' : ''}`}
                  style={{ backgroundColor: tier.color }}
                />
                {index < loyaltyTiers.length - 1 && (
                  <View className="absolute top-2 left-4 right-[-16px] h-0.5 bg-[#2A2A2A]" />
                )}
              </View>
              <Text
                className={`text-xs font-medium mb-0.5 ${
                  tier.active ? "text-[#FFD700]" : "text-[#888888]"
                }`}
              >
                {tier.name}
              </Text>
              <Text className="text-[#666666] text-[10px]">{tier.points} pts</Text>
            </View>
          ))}
        </View>

        <Text className="text-[#888888] text-xs text-center mt-2">
          {profileStats.loyaltyPoints} / 5000 points to Platinum
        </Text>
      </View>
    </View>
  );

  const renderRecentActivity = () => (
    <View className="px-4 py-5 border-b border-[#1A1A1A]">
      <View className="flex-row items-center mb-4 gap-2">
        <Bell size={20} color="#FFFFFF" />
        <Text className="text-white text-base font-semibold flex-1">
          Recent Activity
        </Text>
        <TouchableOpacity>
          <Text className="text-[#4ECDC4] text-xs font-medium">See All</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-[#1A1A1A] rounded-2xl overflow-hidden">
        {recentActivities.map((activity) => {
          const Icon = activity.icon;
          return (
            <TouchableOpacity
              key={activity.id}
              className="flex-row items-center p-4 border-b border-[#2A2A2A]"
            >
              <View className="w-8 h-8 rounded-full bg-[#4ECDC4]/10 justify-center items-center mr-3">
                <Icon size={16} color="#4ECDC4" />
              </View>
              <View className="flex-1">
                <Text className="text-white text-sm font-medium mb-0.5">
                  {activity.title}
                </Text>
                <Text className="text-[#888888] text-xs">{activity.time}</Text>
              </View>
              <ChevronRight size={16} color="#666666" />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderMenuSection = (section: (typeof menuSections)[0]) => (
    <View key={section.title} className="px-4 py-5">
      <Text className="text-[#888888] text-xs font-semibold uppercase tracking-wide mb-3">
        {section.title}
      </Text>
      <View className="bg-[#1A1A1A] rounded-2xl overflow-hidden">
        {section.items.map((item) => {
          const Icon = item.icon;
          const isDarkModeItem = item.title === "Dark Mode";

          return (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center justify-between p-4 border-b border-[#2A2A2A] ${
                item.type === "danger" ? "border-[#EF476F]/20" : ""
              }`}
              onPress={() => handleMenuPress(item)}
            >
              <View className="flex-row items-center flex-1">
                <View
                  className={`w-9 h-9 rounded-xl justify-center items-center mr-3 ${
                    item.type === "danger"
                      ? "bg-[#EF476F]/10"
                      : "bg-[#4ECDC4]/10"
                  }`}
                >
                  <Icon
                    size={20}
                    color={item.type === "danger" ? "#EF476F" : "#4ECDC4"}
                  />
                </View>
                <Text
                  className={`text-base font-medium flex-1 ${
                    item.type === "danger" ? "text-[#EF476F]" : "text-white"
                  }`}
                >
                  {item.title}
                </Text>
                {item.badge && (
                  <View className="bg-[#4ECDC4] px-1.5 py-0.5 rounded-full ml-2">
                    <Text className="text-black text-[10px] font-bold">
                      {item.badge}
                    </Text>
                  </View>
                )}
              </View>

              {isDarkModeItem ? (
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: "#767577", true: "#4ECDC4" }}
                  thumbColor={darkMode ? "#FFFFFF" : "#f4f3f4"}
                />
              ) : (
                <ChevronRight size={20} color="#666666" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderEditModal = () => (
    <Modal
      visible={editModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setEditModalVisible(false)}
    >
      <View className="flex-1 bg-black/80 justify-center items-center p-4">
        <View className="bg-[#1A1A1A] rounded-2xl w-full max-h-[80%]">
          <View className="flex-row justify-between items-center p-5 border-b border-[#2A2A2A]">
            <Text className="text-white text-xl font-semibold">Edit Profile</Text>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView className="p-5">
            <View className="mb-4">
              <Text className="text-white text-sm font-medium mb-2">Full Name</Text>
              <TextInput
                className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                value={editedName}
                onChangeText={setEditedName}
                placeholder="Enter your name"
                placeholderTextColor="#666666"
              />
            </View>

            <View className="mb-4">
              <Text className="text-white text-sm font-medium mb-2">Email Address</Text>
              <TextInput
                className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                value={editedEmail}
                onChangeText={setEditedEmail}
                placeholder="Enter your email"
                placeholderTextColor="#666666"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-4">
              <Text className="text-white text-sm font-medium mb-2">Phone Number</Text>
              <TextInput
                className="bg-[#2A2A2A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                value={editedPhone}
                onChangeText={setEditedPhone}
                placeholder="Enter your phone number"
                placeholderTextColor="#666666"
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity
              className="bg-[#4ECDC4] py-4 rounded-xl items-center mt-6 mb-3"
              onPress={handleSaveProfile}
            >
              <Text className="text-black text-base font-semibold">Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-4 rounded-xl items-center border border-[#333333]"
              onPress={() => setEditModalVisible(false)}
            >
              <Text className="text-[#888888] text-base font-medium">Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderLogoutModal = () => (
    <Modal
      visible={logoutModalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setLogoutModalVisible(false)}
    >
      <View className="flex-1 bg-black/80 justify-center items-center p-4">
        <View className="bg-[#1A1A1A] rounded-2xl p-6 w-full max-w-md items-center">
          <View className="w-20 h-20 rounded-full bg-[#FF6B6B]/10 justify-center items-center mb-4">
            <LogOut size={48} color="#FF6B6B" />
          </View>
          <Text className="text-white text-xl font-semibold mb-2 text-center">
            Log Out
          </Text>
          <Text className="text-[#888888] text-sm text-center leading-5 mb-6">
            Are you sure you want to log out of your account?
          </Text>
          <View className="flex-row gap-3 w-full">
            <TouchableOpacity
              className="flex-1 py-3.5 rounded-xl border border-[#333333] items-center"
              onPress={() => setLogoutModalVisible(false)}
            >
              <Text className="text-[#888888] text-base font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-[#FF6B6B] py-3.5 rounded-xl items-center"
              onPress={handleLogout}
            >
              <Text className="text-black text-base font-semibold">Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderDeleteModal = () => (
    <Modal
      visible={deleteModalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setDeleteModalVisible(false)}
    >
      <View className="flex-1 bg-black/80 justify-center items-center p-4">
        <View className="bg-[#1A1A1A] rounded-2xl p-6 w-full max-w-md items-center">
          <View className="w-20 h-20 rounded-full bg-[#EF476F]/10 justify-center items-center mb-4">
            <Trash2 size={48} color="#EF476F" />
          </View>
          <Text className="text-white text-xl font-semibold mb-2 text-center">
            Delete Account
          </Text>
          <Text className="text-[#888888] text-sm text-center leading-5 mb-6">
            This action cannot be undone. All your data will be permanently deleted.
          </Text>
          <View className="flex-row gap-3 w-full">
            <TouchableOpacity
              className="flex-1 py-3.5 rounded-xl border border-[#333333] items-center"
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text className="text-[#888888] text-base font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-[#EF476F] py-3.5 rounded-xl items-center"
              onPress={handleDeleteAccount}
            >
              <Text className="text-black text-base font-semibold">Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {renderProfileHeader()}
        {renderStats()}
        {renderLoyaltyProgress()}
        {renderRecentActivity()}
        {menuSections.map(renderMenuSection)}

        <TouchableOpacity
          className="flex-row items-center justify-center bg-[#EF476F]/10 mx-4 mt-2 mb-6 p-4 rounded-2xl gap-3"
          onPress={() => setLogoutModalVisible(true)}
        >
          <LogOut size={20} color="#EF476F" />
          <Text className="text-[#EF476F] text-base font-semibold">Log Out</Text>
        </TouchableOpacity>

        <Text className="text-[#666666] text-xs text-center mb-8">
          Version 1.0.0 • Ecommerce App
        </Text>
      </ScrollView>

      {renderEditModal()}
      {renderLogoutModal()}
      {renderDeleteModal()}
    </SafeAreaView>
  );
}