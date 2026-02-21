// app/(tabs)/cart.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeft,
  Trash2,
  Plus,
  Minus,
  Tag,
  Truck,
  Shield,
  CreditCard,
  Lock,
  ChevronRight,
  ArrowRight,
} from "lucide-react-native";
import { useRouter } from "expo-router";

// Types
interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  inStock: boolean;
  category: string;
}

interface PromoCode {
  id: string;
  code: string;
  description: string;
  discount: number;
}

// Mock Data
const cartItems: CartItem[] = [
  {
    id: "1",
    name: "Venesa Long Shirt",
    price: 320.0,
    originalPrice: 399.99,
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=500&fit=crop&crop=center",
    color: "Black",
    size: "M",
    quantity: 1,
    inStock: true,
    category: "Clothes",
  },
  {
    id: "2",
    name: "Suga Leather Shoes",
    price: 375.0,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=center",
    color: "Brown",
    size: "42",
    quantity: 2,
    inStock: true,
    category: "Shoes",
  },
  {
    id: "3",
    name: "Mini Leather Bag",
    price: 540.0,
    originalPrice: 650.0,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop&crop=center",
    color: "Black",
    size: "Small",
    quantity: 1,
    inStock: false,
    category: "Bags",
  },
  {
    id: "4",
    name: "Vinia Headphones",
    price: 360.0,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop&crop=center",
    color: "White",
    size: "One Size",
    quantity: 1,
    inStock: true,
    category: "Electronics",
  },
];

const promoCodes: PromoCode[] = [
  {
    id: "promo_001",
    code: "SUMMER25",
    description: "25% off on summer collection",
    discount: 25,
  },
  {
    id: "promo_002",
    code: "WELCOME10",
    description: "10% off for new customers",
    discount: 10,
  },
  {
    id: "promo_003",
    code: "FREESHIP",
    description: "Free shipping on orders over $100",
    discount: 0,
  },
];

const shippingOptions = [
  {
    id: "1",
    name: "Standard Shipping",
    price: 5.99,
    days: "5-7 business days",
  },
  {
    id: "2",
    name: "Express Shipping",
    price: 14.99,
    days: "2-3 business days",
  },
  { id: "3", name: "Next Day Delivery", price: 24.99, days: "1 business day" },
];

export default function CartScreen() {
  const [items, setItems] = useState<CartItem[]>(cartItems);
  const [promoCode, setPromoCode] = useState("");
  const [selectedShipping, setSelectedShipping] = useState("1");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const router = useRouter();

  // Calculations
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = appliedPromo ? subtotal * (appliedPromo.discount / 100) : 0;
  const shippingPrice =
    shippingOptions.find((s) => s.id === selectedShipping)?.price || 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingPrice + tax - discount;

  const handleQuantityChange = (id: string, change: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity < 1) return item;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setItems((prev) => prev.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const applyPromoCode = () => {
    const promo = promoCodes.find((p) => p.code === promoCode.toUpperCase());
    if (promo) {
      setAppliedPromo(promo);
      Alert.alert(
        "Promo Applied!",
        `${promo.description} applied successfully.`
      );
    } else {
      Alert.alert("Invalid Code", "The promo code you entered is invalid.");
    }
    setPromoCode("");
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    router.push("/checkout");
  };

  const renderCartItem = (item: CartItem) => (
    <View key={item.id} className="flex-row bg-[#1A1A1A] rounded-xl p-3 mb-3">
      <Image source={{ uri: item.image }} className="w-24 h-30 rounded-lg mr-3" />
      <View className="flex-1">
        <View className="flex-row justify-between items-start mb-1">
          <Text className="text-white text-base font-semibold flex-1 mr-2">
            {item.name}
          </Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Trash2 size={20} color="#888888" />
          </TouchableOpacity>
        </View>
        <Text className="text-[#888888] text-xs mb-2">{item.category}</Text>
        <View className="flex-row mb-3 gap-4">
          <View className="flex-row">
            <Text className="text-[#888888] text-xs">Color: </Text>
            <Text className="text-white text-xs font-medium">{item.color}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-[#888888] text-xs">Size: </Text>
            <Text className="text-white text-xs font-medium">{item.size}</Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center bg-[#2A2A2A] rounded-full px-2 py-1">
            <TouchableOpacity
              className="p-1"
              onPress={() => handleQuantityChange(item.id, -1)}
              disabled={item.quantity <= 1}
            >
              <Minus
                size={16}
                color={item.quantity <= 1 ? "#444444" : "#FFFFFF"}
              />
            </TouchableOpacity>
            <Text className="text-white text-sm font-semibold mx-3 min-w-[20px] text-center">
              {item.quantity}
            </Text>
            <TouchableOpacity
              className="p-1"
              onPress={() => handleQuantityChange(item.id, 1)}
            >
              <Plus size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View className="items-end">
            {item.originalPrice && (
              <Text className="text-[#888888] text-xs line-through mb-0.5">
                ${item.originalPrice.toFixed(2)}
              </Text>
            )}
            <Text className="text-white text-lg font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        </View>
        {!item.inStock && (
          <View className="absolute top-2 right-2 bg-[#EF476F]/20 px-2 py-1 rounded-full">
            <Text className="text-[#EF476F] text-[10px] font-semibold">
              Out of Stock
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderEmptyCart = () => (
    <View className="flex-1 justify-center items-center px-8 py-24">
      <View className="w-30 h-30 rounded-full bg-[#1A1A1A] justify-center items-center mb-6">
        <Truck size={64} color="#666666" />
      </View>
      <Text className="text-white text-2xl font-semibold mb-2 text-center">
        Your cart is empty
      </Text>
      <Text className="text-[#888888] text-sm text-center mb-8 leading-5">
        Looks like you haven't added any items to your cart yet.
      </Text>
      <TouchableOpacity className="flex-row items-center bg-[#4ECDC4] px-6 py-3 rounded-full gap-2">
        <Text className="text-black text-base font-semibold">
          Continue Shopping
        </Text>
        <ArrowRight size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  const renderPromoCodeSection = () => (
    <View className="px-4 py-4 border-t border-b border-[#1A1A1A]">
      <View className="flex-row items-center mb-4 gap-2">
        <Tag size={20} color="#FFFFFF" />
        <Text className="text-white text-base font-semibold">Promo Code</Text>
      </View>

      <View className="flex-row mb-3">
        <TextInput
          className="flex-1 bg-[#2A2A2A] text-white text-sm px-4 py-3 rounded-xl mr-2"
          placeholder="Enter promo code"
          placeholderTextColor="#666666"
          value={promoCode}
          onChangeText={setPromoCode}
          autoCapitalize="characters"
        />
        <TouchableOpacity
          className="bg-[#4ECDC4] px-5 py-3 rounded-xl justify-center"
          onPress={applyPromoCode}
        >
          <Text className="text-black text-sm font-semibold">Apply</Text>
        </TouchableOpacity>
      </View>

      {appliedPromo && (
        <View className="flex-row justify-between items-center bg-[#4ECDC4]/10 p-3 rounded-xl mb-3 border border-[#4ECDC4]">
          <View className="flex-row items-center flex-1 gap-2">
            <Tag size={16} color="#4ECDC4" />
            <Text className="text-[#4ECDC4] text-sm font-semibold mr-2">
              {appliedPromo.code}
            </Text>
            <Text className="text-[#AAAAAA] text-xs flex-1">
              {appliedPromo.description}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setAppliedPromo(null)}>
            <Text className="text-[#FF6B6B] text-xs font-medium">Remove</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-2"
      >
        {promoCodes.map((promo) => (
          <TouchableOpacity
            key={promo.code}
            className="bg-[#1A1A1A] rounded-xl p-3 mr-2 w-36"
            onPress={() => {
              setPromoCode(promo.code);
              applyPromoCode();
            }}
          >
            <Text className="text-[#4ECDC4] text-sm font-bold mb-1">
              {promo.code}
            </Text>
            <Text className="text-[#888888] text-[10px] leading-4">
              {promo.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderShippingSection = () => (
    <View className="px-4 py-4 border-b border-[#1A1A1A]">
      <View className="flex-row items-center mb-4 gap-2">
        <Truck size={20} color="#FFFFFF" />
        <Text className="text-white text-base font-semibold">Shipping</Text>
      </View>

      {shippingOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          className={`flex-row items-center bg-[#1A1A1A] rounded-xl p-3 mb-2 ${
            selectedShipping === option.id
              ? "bg-[#4ECDC4]/10 border border-[#4ECDC4]"
              : ""
          }`}
          onPress={() => setSelectedShipping(option.id)}
        >
          <View className="mr-3">
            <View
              className={`w-5 h-5 rounded-full border-2 ${
                selectedShipping === option.id
                  ? "border-[#4ECDC4] bg-[#4ECDC4]"
                  : "border-[#888888]"
              }`}
            />
          </View>
          <View className="flex-1">
            <Text className="text-white text-sm font-semibold mb-0.5">
              {option.name}
            </Text>
            <Text className="text-[#888888] text-xs">{option.days}</Text>
          </View>
          <Text className="text-[#4ECDC4] text-sm font-bold">
            {option.price === 0 ? "FREE" : `$${option.price.toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderOrderSummary = () => (
    <View className="px-4 py-4 border-b border-[#1A1A1A]">
      <View className="flex-row items-center mb-4 gap-2">
        <CreditCard size={20} color="#FFFFFF" />
        <Text className="text-white text-base font-semibold">Order Summary</Text>
      </View>

      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[#888888] text-sm">Subtotal</Text>
        <Text className="text-white text-sm font-medium">
          ${subtotal.toFixed(2)}
        </Text>
      </View>

      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[#888888] text-sm">Shipping</Text>
        <Text className="text-white text-sm font-medium">
          {shippingPrice === 0 ? "FREE" : `$${shippingPrice.toFixed(2)}`}
        </Text>
      </View>

      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[#888888] text-sm">Tax</Text>
        <Text className="text-white text-sm font-medium">
          ${tax.toFixed(2)}
        </Text>
      </View>

      {appliedPromo && (
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-[#888888] text-sm">
            Discount ({appliedPromo.discount}%)
          </Text>
          <Text className="text-[#4ECDC4] text-sm font-medium">
            -${discount.toFixed(2)}
          </Text>
        </View>
      )}

      <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-[#333333]">
        <Text className="text-white text-lg font-semibold">Total</Text>
        <Text className="text-white text-2xl font-bold">
          ${total.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
          <TouchableOpacity className="p-2">
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">Cart</Text>
          <View className="w-10" />
        </View>
        {renderEmptyCart()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">
          Cart ({items.length} items)
        </Text>
        <TouchableOpacity
          className="px-3 py-1.5"
          onPress={() => {
            Alert.alert(
              "Clear Cart",
              "Are you sure you want to remove all items from your cart?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Clear All",
                  style: "destructive",
                  onPress: () => setItems([]),
                },
              ]
            );
          }}
        >
          <Text className="text-[#FF6B6B] text-sm font-medium">Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 pb-24" showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        <View className="p-4">{items.map(renderCartItem)}</View>

        {/* Promo Code */}
        {renderPromoCodeSection()}

        {/* Shipping */}
        {renderShippingSection()}

        {/* Order Summary */}
        {renderOrderSummary()}

        {/* Security Info */}
        <View className="flex-row items-center justify-center p-4 gap-2">
          <Shield size={20} color="#4ECDC4" />
          <Text className="text-[#888888] text-xs mx-1">
            Your payment is secure and encrypted
          </Text>
          <Lock size={16} color="#888888" />
        </View>
      </ScrollView>

      {/* Checkout Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#1A1A1A] rounded-t-2xl flex-row items-center justify-between px-4 py-4 pb-9 border-t border-[#333333]">
        <View className="flex-1">
          <Text className="text-[#888888] text-xs mb-0.5">Total:</Text>
          <Text className="text-white text-xl font-bold">
            ${total.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          className={`flex-row items-center px-6 py-3.5 rounded-full gap-2 ${
            isCheckingOut ? "bg-[#2A2A2A]" : "bg-[#4ECDC4]"
          }`}
          onPress={handleCheckout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? (
            <Text className="text-black text-base font-semibold">
              Processing...
            </Text>
          ) : (
            <>
              <Text className="text-black text-base font-semibold">
                Checkout
              </Text>
              <ChevronRight size={20} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}