// app/(tabs)/orders.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  ArrowRight,
  Filter,
  Search,
  Download,
  Share2,
  Repeat,
  Star,
  MessageCircle,
} from "lucide-react-native";
import { useRouter } from "expo-router";

// Types
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  status: "delivered" | "processing" | "shipped" | "cancelled";
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "delivered" | "processing" | "shipped" | "cancelled";
  items: OrderItem[];
  total: number;
  shippingAddress: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  paymentMethod: string;
}

interface OrderFilter {
  id: string;
  label: string;
  status?: Order["status"];
}

// Mock Data

// Mock Data
const orders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-789012",
    date: "Oct 15, 2024",
    status: "delivered",
    items: [
      {
        id: "1a",
        name: "Venesa Long Shirt",
        price: 320.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=500&fit=crop&crop=center",
        status: "delivered",
      },
      {
        id: "1b",
        name: "Suga Leather Shoes",
        price: 375.0,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=center",
        status: "delivered",
      },
    ],
    total: 1070.0,
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "TRK78901234",
    estimatedDelivery: "Oct 18, 2024",
    paymentMethod: "Visa •••• 4321",
  },
  {
    id: "2",
    orderNumber: "ORD-789013",
    date: "Oct 20, 2024",
    status: "shipped",
    items: [
      {
        id: "2a",
        name: "Mini Leather Bag",
        price: 540.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop&crop=center",
        status: "shipped",
      },
      {
        id: "2b",
        name: "Hybrid Smartwatch",
        price: 215.0,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
        status: "shipped",
      },
      {
        id: "2c",
        name: "Leather Card Holder",
        price: 45.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=500&fit=crop&crop=center",
        status: "shipped",
      },
    ],
    total: 540.0,
    shippingAddress: "456 Park Ave, Brooklyn, NY 11201",
    trackingNumber: "TRK78901235",
    estimatedDelivery: "Oct 25, 2024",
    paymentMethod: "Mastercard •••• 8765",
  },
  {
    id: "3",
    orderNumber: "ORD-789014",
    date: "Oct 25, 2024",
    status: "processing",
    items: [
      {
        id: "3a",
        name: "Vinia Headphones",
        price: 360.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop&crop=center",
        status: "processing",
      },
      {
        id: "3b",
        name: "Red Ruby Rings",
        price: 445.0,
        quantity: 1,
        // High-quality ruby ring image from Pexels
        image:
          "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
        status: "processing",
      },
      {
        id: "3c",
        name: "Designer Sunglasses",
        price: 290.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop&crop=center",
        status: "processing",
      },
    ],
    total: 1095.0,
    shippingAddress: "789 Broadway, Queens, NY 11355",
    estimatedDelivery: "Nov 1, 2024",
    paymentMethod: "PayPal",
  },
  {
    id: "4",
    orderNumber: "ORD-789015",
    date: "Nov 1, 2024",
    status: "cancelled",
    items: [
      {
        id: "4a",
        name: "Zonio Super Watch",
        price: 850.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=500&fit=crop&crop=center",
        status: "cancelled",
      },
      {
        id: "4b",
        name: "Arctic Winter Jacket",
        price: 420.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop&crop=center",
        status: "cancelled",
      },
    ],
    total: 850.0,
    shippingAddress: "101 5th Ave, Manhattan, NY 10003",

    trackingNumber: "TRK78901236",
    paymentMethod: "Visa •••• 1234",
  },
  {
    id: "5",
    orderNumber: "ORD-789016",
    date: "Nov 5, 2024",
    status: "delivered",
    items: [
      {
        id: "5a",
        name: "Running Sneakers",
        price: 145.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop&crop=center",
        status: "delivered",
      },
      {
        id: "5b",
        name: "Sports Wear Set",
        price: 89.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop&crop=center",
        status: "delivered",
      },
    ],
    total: 324.98,
    shippingAddress: "202 Central Park West, NY 10024",
    trackingNumber: "TRK78901237",
    estimatedDelivery: "Nov 8, 2024",
    paymentMethod: "Apple Pay",
  },
  {
    id: "6",
    orderNumber: "ORD-789019",
    date: "Nov 14, 2024",
    status: "shipped",
    items: [
      {
        id: "8a",
        name: "Mechanical Keyboard",
        price: 185.0,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
        status: "shipped",
      },
      {
        id: "8b",
        name: "Wireless Ergonomic Mouse",
        price: 75.0,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
        status: "shipped",
      },
    ],
    total: 260.0,
    shippingAddress: "742 Evergreen Terrace, Springfield, IL 62704",
    trackingNumber: "TRK78901239",
    estimatedDelivery: "Nov 17, 2024",
    paymentMethod: "Apple Pay",
  },
  {
    id: "9",
    orderNumber: "ORD-789020",
    date: "Nov 18, 2024",
    status: "cancelled",
    items: [
      {
        id: "9a",
        name: "Premium Coffee Machine",
        price: 520.0,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
        status: "cancelled",
      },
      {
        id: "9b",
        name: "Glass Pour-Over Kit",
        price: 85.0,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/4264049/pexels-photo-4264049.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
        status: "cancelled",
      },
    ],
    total: 605.0,
    shippingAddress: "321 Ocean Drive, Santa Monica, CA 90401",
    trackingNumber: "TRK78901238",
    paymentMethod: "Visa •••• 9988",
  },
  {
    id: "10",
    orderNumber: "ORD-789021",
    date: "Nov 20, 2024",
    status: "processing",
    items: [
      {
        id: "10a",
        name: "Minimalist Laptop Sleeve",
        price: 85.0,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/306763/pexels-photo-306763.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
        status: "processing",
      },
      {
        id: "10b",
        name: "Portable Power Bank",
        price: 120.0,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/400678/pexels-photo-400678.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
        status: "processing",
      },
      {
        id: "10c",
        name: "USB-C Hub Adapter",
        price: 65.0,
        quantity: 2,
        image:
          "https://images.pexels.com/photos/50617/pexels-photo-50617.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
        status: "processing",
      },
    ],
    total: 335.0,
    shippingAddress: "555 Market St, San Francisco, CA 94105",
    trackingNumber: "TRK78901239",
    estimatedDelivery: "Nov 28, 2024",
    paymentMethod: "Apple Pay",
  },
];

const filters: OrderFilter[] = [
  { id: "1", label: "All" },
  { id: "2", label: "Processing", status: "processing" },
  { id: "3", label: "Shipped", status: "shipped" },
  { id: "4", label: "Delivered", status: "delivered" },
  { id: "5", label: "Cancelled", status: "cancelled" },
];

const orderStats = {
  totalOrders: 24,
  totalSpent: 5429.98,
  pendingOrders: 3,
  deliveredOrders: 18,
};

const statusConfig = {
  delivered: {
    icon: CheckCircle,
    color: "#4ECDC4",
    bgColor: "rgba(78, 205, 196, 0.1)",
    text: "Delivered",
    action: "Rate & Review",
    actionIcon: Star,
  },
  processing: {
    icon: Clock,
    color: "#FFD166",
    bgColor: "rgba(255, 209, 102, 0.1)",
    text: "Processing",
    action: "Track Order",
    actionIcon: Truck,
  },
  shipped: {
    icon: Truck,
    color: "#118AB2",
    bgColor: "rgba(17, 138, 178, 0.1)",
    text: "Shipped",
    action: "Track Order",
    actionIcon: Truck,
  },
  cancelled: {
    icon: XCircle,
    color: "#EF476F",
    bgColor: "rgba(239, 71, 111, 0.1)",
    text: "Cancelled",
    action: "Reorder",
    actionIcon: Repeat,
  },
};

export default function OrdersScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>("1");
  const [refreshing, setRefreshing] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>("1");

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const filteredOrders =
    selectedFilter === "1"
      ? orders
      : orders.filter((order) => {
          const filter = filters.find((f) => f.id === selectedFilter);
          return filter?.status ? order.status === filter.status : true;
        });

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleOrderAction = (order: Order) => {
    const config = statusConfig[order.status];

    switch (order.status) {
      case "delivered":
        Alert.alert(
          "Rate & Review",
          `Would you like to rate and review your order ${order.orderNumber}?`,
          [
            { text: "Cancel", style: "cancel" },
            { text: "Rate Now", onPress: () => router.push("/review") },
          ]
        );
        break;
      case "processing":
      case "shipped":
        Alert.alert(
          "Track Order",
          `Tracking Number: ${order.trackingNumber || "Not Available"}`,
          [
            { text: "Close", style: "cancel" },
            { text: "View Details", onPress: () => router.push(`/order/${order.id}`) },
          ]
        );
        break;
      case "cancelled":
        Alert.alert(
          "Reorder",
          `Would you like to reorder ${order.items[0]?.name}?`,
          [
            { text: "Cancel", style: "cancel" },
            { text: "Reorder", onPress: () => router.push("/cart") },
          ]
        );
        break;
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    const Icon = statusConfig[status].icon;
    return <Icon size={16} color={statusConfig[status].color} />;
  };

  const renderOrderItem = (item: OrderItem) => (
    <View key={item.id} className="flex-row items-center py-2 border-b border-[#2A2A2A]">
      <Image source={{ uri: item.image }} className="w-15 h-15 rounded-lg mr-3" />
      <View className="flex-1">
        <Text className="text-white text-sm font-semibold mb-1" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-[#888888] text-xs mb-0.5">Qty: {item.quantity}</Text>
        <Text className="text-white text-sm font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      {item.status === "delivered" && (
        <TouchableOpacity className="p-2 bg-[#FFD700]/10 rounded-lg">
          <Star size={16} color="#FFD700" />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderOrder = ({ item }: { item: Order }) => {
    const config = statusConfig[item.status];
    const isExpanded = expandedOrder === item.id;
    const ActionIcon = config.actionIcon;

    return (
      <View className="bg-[#1A1A1A] rounded-2xl p-4 mb-3">
        {/* Order Header */}
        <TouchableOpacity
          className="flex-row justify-between items-center mb-3"
          onPress={() => toggleOrderExpansion(item.id)}
          activeOpacity={0.7}
        >
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-1">
              <Package size={20} color="#FFFFFF" />
              <Text className="text-white text-base font-semibold flex-1">
                {item.orderNumber}
              </Text>
              <View
                className="flex-row items-center gap-1 px-2 py-1 rounded-full"
                style={{ backgroundColor: config.bgColor }}
              >
                {getStatusIcon(item.status)}
                <Text style={{ color: config.color }} className="text-xs font-semibold">
                  {config.text}
                </Text>
              </View>
            </View>
            <Text className="text-[#888888] text-xs">{item.date}</Text>
          </View>
          <ArrowRight
            size={20}
            color="#666666"
            className={`transform ${isExpanded ? "rotate-90" : ""}`}
          />
        </TouchableOpacity>

        {/* Order Preview */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            {item.items.slice(0, 2).map((orderItem, index) => (
              <Image
                key={orderItem.id}
                source={{ uri: orderItem.image }}
                className="w-10 h-10 rounded-lg border-2 border-[#1A1A1A]"
                style={{ marginLeft: index > 0 ? -12 : 0 }}
              />
            ))}
            {item.items.length > 2 && (
              <View className="w-10 h-10 rounded-lg bg-[#2A2A2A] justify-center items-center -ml-3">
                <Text className="text-white text-xs font-semibold">
                  +{item.items.length - 2}
                </Text>
              </View>
            )}
          </View>
          <Text className="text-white text-lg font-bold">${item.total.toFixed(2)}</Text>
        </View>

        {/* Expanded Details */}
        {isExpanded && (
          <View className="mt-4 pt-4 border-t border-[#2A2A2A]">
            {/* Items List */}
            <View className="mb-4">{item.items.map(renderOrderItem)}</View>

            {/* Order Summary */}
            <View className="bg-[#2A2A2A] rounded-xl p-4 mb-4">
              <Text className="text-white text-base font-semibold mb-3">
                Order Summary
              </Text>

              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-[#888888] text-xs flex-1">Payment Method</Text>
                <Text className="text-white text-xs flex-[2] text-right">
                  {item.paymentMethod}
                </Text>
              </View>

              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-[#888888] text-xs flex-1">Shipping Address</Text>
                <Text className="text-white text-xs flex-[2] text-right" numberOfLines={2}>
                  {item.shippingAddress}
                </Text>
              </View>

              {item.trackingNumber && (
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-[#888888] text-xs flex-1">Tracking Number</Text>
                  <Text className="text-[#4ECDC4] text-xs font-semibold flex-[2] text-right">
                    {item.trackingNumber}
                  </Text>
                </View>
              )}

              {item.estimatedDelivery && (
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-[#888888] text-xs flex-1">Estimated Delivery</Text>
                  <Text className="text-white text-xs flex-[2] text-right">
                    {item.estimatedDelivery}
                  </Text>
                </View>
              )}

              <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-[#333333]">
                <Text className="text-white text-sm font-semibold">Total Amount</Text>
                <Text className="text-white text-lg font-bold">
                  ${item.total.toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-2">
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center bg-[#4ECDC4] py-3 rounded-xl gap-2"
                onPress={() => handleOrderAction(item)}
              >
                <ActionIcon size={20} color="#000000" />
                <Text className="text-black text-sm font-semibold">{config.action}</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-center bg-[#2A2A2A] py-3 px-4 rounded-xl gap-1.5">
                <Download size={20} color="#FFFFFF" />
                <Text className="text-white text-xs font-medium">Invoice</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-center bg-[#2A2A2A] py-3 px-4 rounded-xl gap-1.5">
                <Share2 size={20} color="#FFFFFF" />
                <Text className="text-white text-xs font-medium">Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-8 py-24">
      <View className="w-30 h-30 rounded-full bg-[#1A1A1A] justify-center items-center mb-6">
        <Package size={64} color="#666666" />
      </View>
      <Text className="text-white text-2xl font-semibold mb-2 text-center">
        No Orders Yet
      </Text>
      <Text className="text-[#888888] text-sm text-center mb-8 leading-5">
        When you place orders, they'll appear here
      </Text>
      <TouchableOpacity
        className="flex-row items-center bg-[#4ECDC4] px-6 py-3 rounded-full gap-2"
        onPress={() => router.push("/(tabs)")}
      >
        <Text className="text-black text-base font-semibold">Start Shopping</Text>
        <ArrowRight size={20} color="#000000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-[#1A1A1A]">
        <View>
          <Text className="text-white text-2xl font-bold">My Orders</Text>
          <Text className="text-[#888888] text-sm mt-1">
            {orderStats.totalOrders} orders • ${orderStats.totalSpent.toFixed(2)} spent
          </Text>
        </View>
        <View className="flex-row gap-4">
          <TouchableOpacity className="p-2">
            <Search size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Filter size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View className="flex-row px-4 py-5 gap-3">
        <View className="flex-1 bg-[#1A1A1A] rounded-2xl p-4 items-center">
          <Text className="text-white text-2xl font-bold mb-1">{orderStats.pendingOrders}</Text>
          <Text className="text-[#888888] text-xs">Pending</Text>
        </View>
        <View className="flex-1 bg-[#1A1A1A] rounded-2xl p-4 items-center">
          <Text className="text-white text-2xl font-bold mb-1">{orderStats.deliveredOrders}</Text>
          <Text className="text-[#888888] text-xs">Delivered</Text>
        </View>
        <TouchableOpacity className="bg-[#4ECDC4]/10 rounded-2xl p-4 items-center justify-center gap-2">
          <MessageCircle size={20} color="#4ECDC4" />
          <Text className="text-[#4ECDC4] text-xs font-semibold">Need Help?</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4 px-4"
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            className={`px-4 py-2 rounded-full mr-2 ${
              selectedFilter === filter.id ? "bg-white" : "bg-[#1A1A1A]"
            }`}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text
              className={`text-sm font-medium ${
                selectedFilter === filter.id ? "text-black" : "text-white"
              }`}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-4 pb-24"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FFFFFF"
              colors={["#FFFFFF"]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}