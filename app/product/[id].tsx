import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Share,
  Alert,
} from "react-native";

import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ChevronLeft,
  Heart,
  Share2,
  ShoppingBag,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Minus,
  Plus,
  Check,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  colors: Array<{ name: string; value: string }>;
  sizes: string[];
  images: string[];
  inStock: boolean;
  features: string[];
  shippingInfo: {
    freeShipping: boolean;
    deliveryTime: string;
    returnPolicy: string;
  };
}

// Mock data
const productData: Product = {
  id: "1",
  name: "Venesa Long Shirt",
  price: 320.0,
  originalPrice: 399.99,
  description:
    "Premium long sleeve shirt made from 100% organic cotton. Features a modern slim fit design with elegant button detailing and a comfortable collar. Perfect for both casual and formal occasions.",
  category: "Clothes",
  rating: 4.8,
  reviewCount: 1972,
  colors: [
    { name: "Black", value: "#000000" },
    { name: "Navy Blue", value: "#000080" },
    { name: "Charcoal", value: "#36454F" },
    { name: "White", value: "#FFFFFF" },
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  images: [
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=1000&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&crop=center",
  ],
  inStock: true,
  features: [
    "100% Organic Cotton",
    "Slim Fit Design",
    "Machine Washable",
    "Made in Italy",
    "Eco-friendly Packaging",
    "Breathable Fabric",
  ],
  shippingInfo: {
    freeShipping: true,
    deliveryTime: "3-5 business days",
    returnPolicy: "30-day return policy",
  },
};

const similarProducts = [
  {
    id: "2",
    name: "Classic White Shirt",
    price: 280.0,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop&crop=center",
    category: "Clothes",
  },
  {
    id: "3",
    name: "Casual Blue Shirt",
    price: 295.0,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop&crop=center",
    category: "Clothes",
  },
  {
    id: "4",
    name: "Formal Black Shirt",
    price: 350.0,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&crop=center",
    category: "Clothes",
  },
];

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(2); // Default M
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [product] = useState(productData);

  const handleAddToCart = () => {
    Alert.alert(
      "Added to Cart",
      `${quantity} × ${product.name} added to your cart`,
      [
        { text: "Continue Shopping", style: "cancel" },
        { text: "View Cart", onPress: () => router.push("/(tabs)/cart") },
      ],
    );
  };

  const handleBuyNow = () => {
    router.push("/checkout");
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this ${product.name} on Ecommerce App!`,
        url: `https://ecommerce.app/product/${id}`,
        title: product.name,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share product");
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const renderSimilarProduct = ({
    item,
  }: {
    item: (typeof similarProducts)[0];
  }) => (
    <TouchableOpacity
      className="w-35 mr-3"
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <Image
        source={{ uri: item.image }}
        className="w-35 h-35 rounded-xl mb-2"
      />
      <Text className="text-white text-sm font-semibold mb-1">{item.name}</Text>
      <Text className="text-[#4ECDC4] text-base font-bold">
        ${item.price.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      <ScrollView className="flex-1 pb-24" showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View className="relative">
          <Image
            source={{ uri: product.images[selectedImage] }}
            style={{ width, height: width }}
            resizeMode="cover"
          />

          <View className="flex-row px-4 py-3 gap-2">
            {product.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(index)}
                className={`w-15 h-15 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-[#4ECDC4]"
                    : "border-transparent"
                }`}
              >
                <Image
                  source={{ uri: image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View className="absolute top-0 left-0 right-0 flex-row justify-between px-4 pt-4">
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-black/50 justify-center items-center"
              onPress={() => router.back()}
            >
              <ChevronLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <View className="flex-row gap-2">
              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-black/50 justify-center items-center"
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  size={24}
                  color={isFavorite ? "#FF6B6B" : "#FFFFFF"}
                  fill={isFavorite ? "#FF6B6B" : "transparent"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-black/50 justify-center items-center"
                onPress={handleShare}
              >
                <Share2 size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Product Info */}
        <View className="px-4 py-5 border-b border-[#1A1A1A]">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-[#888888] text-xs font-medium">
              {product.category}
            </Text>
            {product.inStock ? (
              <View className="bg-[#4ECDC4]/10 px-2 py-1 rounded-full">
                <Text className="text-[#4ECDC4] text-[10px] font-semibold">
                  In Stock
                </Text>
              </View>
            ) : (
              <View className="bg-[#EF476F]/10 px-2 py-1 rounded-full">
                <Text className="text-[#EF476F] text-[10px] font-semibold">
                  Out of Stock
                </Text>
              </View>
            )}
          </View>

          <Text className="text-white text-2xl font-semibold mb-3">
            {product.name}
          </Text>

          <View className="flex-row items-center mb-4 gap-2">
            <View className="flex-row gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  color={
                    star <= Math.floor(product.rating) ? "#FFD700" : "#666666"
                  }
                  fill={
                    star <= Math.floor(product.rating)
                      ? "#FFD700"
                      : "transparent"
                  }
                />
              ))}
            </View>
            <Text className="text-[#FFD700] text-sm font-semibold">
              {product.rating}/5
            </Text>
            <Text className="text-[#888888] text-xs">
              ({product.reviewCount} reviews)
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <Text className="text-white text-3xl font-bold">
              ${product.price.toFixed(2)}
            </Text>
            {product.originalPrice && (
              <Text className="text-[#888888] text-base line-through">
                ${product.originalPrice.toFixed(2)}
              </Text>
            )}
            <View className="bg-[#FF6B6B] px-2 py-1 rounded-full">
              <Text className="text-white text-[10px] font-bold">
                {product.originalPrice
                  ? `${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF`
                  : ""}
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View className="px-4 py-5 border-b border-[#1A1A1A]">
          <Text className="text-white text-lg font-semibold mb-3">
            Description
          </Text>
          <Text className="text-[#AAAAAA] text-sm leading-6">
            {product.description}
          </Text>
        </View>

        {/* Color Selection */}
        <View className="px-4 py-5 border-b border-[#1A1A1A]">
          <Text className="text-white text-lg font-semibold mb-3">Color</Text>
          <View className="flex-row flex-wrap gap-3">
            {product.colors.map((color, index) => (
              <TouchableOpacity
                key={color.name}
                className={`items-center p-2 rounded-xl border w-20 relative ${
                  selectedColor === index
                    ? "border-[#4ECDC4] bg-[#4ECDC4]/10"
                    : "border-[#333333]"
                }`}
                onPress={() => setSelectedColor(index)}
              >
                <View
                  className={`w-8 h-8 rounded-full mb-2 ${
                    color.value === "#FFFFFF" ? "border border-[#333333]" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                />
                <Text
                  className={`text-xs ${
                    selectedColor === index
                      ? "text-white font-semibold"
                      : "text-[#888888]"
                  }`}
                >
                  {color.name}
                </Text>
                {selectedColor === index && (
                  <Check
                    size={16}
                    color="#4ECDC4"
                    className="absolute top-1 right-1"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Size Selection */}
        <View className="px-4 py-5 border-b border-[#1A1A1A]">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-lg font-semibold">Size</Text>
            <TouchableOpacity>
              <Text className="text-[#4ECDC4] text-xs font-medium">
                Size Guide
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {product.sizes.map((size, index) => (
              <TouchableOpacity
                key={size}
                className={`min-w-[48px] px-4 py-3 rounded-lg ${
                  selectedSize === index ? "bg-[#4ECDC4]" : "bg-[#1A1A1A]"
                } items-center`}
                onPress={() => setSelectedSize(index)}
              >
                <Text
                  className={`text-sm font-semibold ${
                    selectedSize === index ? "text-black" : "text-white"
                  }`}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quantity */}
        <View className="px-4 py-5 border-b border-[#1A1A1A]">
          <Text className="text-white text-lg font-semibold mb-3">
            Quantity
          </Text>
          <View className="flex-row items-center bg-[#1A1A1A] rounded-xl self-start">
            <TouchableOpacity
              className="w-12 h-12 justify-center items-center"
              onPress={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus size={20} color={quantity <= 1 ? "#666666" : "#FFFFFF"} />
            </TouchableOpacity>

            <Text className="text-white text-lg font-semibold min-w-10 text-center">
              {quantity}
            </Text>

            <TouchableOpacity
              className="w-12 h-12 justify-center items-center"
              onPress={incrementQuantity}
            >
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Features */}
        <View className="px-4 py-5 border-b border-[#1A1A1A]">
          <Text className="text-white text-lg font-semibold mb-3">
            Features
          </Text>
          <View className="gap-3">
            {product.features.map((feature, index) => (
              <View key={index} className="flex-row items-center gap-3">
                <Check size={16} color="#4ECDC4" />
                <Text className="text-[#AAAAAA] text-sm flex-1">{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Shipping Info */}
        <View className="px-4 py-5 border-b border-[#1A1A1A]">
          <View className="flex-row items-center mb-4 gap-3">
            <Truck size={20} color="#4ECDC4" />
            <View className="flex-1">
              <Text className="text-white text-sm font-semibold mb-0.5">
                {product.shippingInfo.freeShipping
                  ? "Free Shipping"
                  : "Shipping"}
              </Text>
              <Text className="text-[#888888] text-xs">
                {product.shippingInfo.deliveryTime}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-4 gap-3">
            <RotateCcw size={20} color="#4ECDC4" />
            <View className="flex-1">
              <Text className="text-white text-sm font-semibold mb-0.5">
                Returns
              </Text>
              <Text className="text-[#888888] text-xs">
                {product.shippingInfo.returnPolicy}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <Shield size={20} color="#4ECDC4" />
            <View className="flex-1">
              <Text className="text-white text-sm font-semibold mb-0.5">
                Secure Payment
              </Text>
              <Text className="text-[#888888] text-xs">SSL encrypted</Text>
            </View>
          </View>
        </View>

        {/* Similar Products */}
        <View className="px-4 py-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-semibold">
              Similar Products
            </Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-[#4ECDC4] text-xs font-medium">
                See All
              </Text>
              <ChevronRight size={16} color="#4ECDC4" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={similarProducts}
            renderItem={renderSimilarProduct}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          />
        </View>
      </ScrollView>

      {/* Fixed Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#333333] px-4 py-4 pb-9 flex-row items-center">
        <View className="flex-1">
          <Text className="text-[#888888] text-xs mb-0.5">Total</Text>
          <Text className="text-white text-xl font-bold">
            ${(product.price * quantity).toFixed(2)}
          </Text>
        </View>

        <View className="flex-row gap-3">
          <TouchableOpacity
            className="flex-row items-center bg-[#2A2A2A] px-5 py-3 rounded-full gap-2"
            onPress={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingBag size={20} color="#FFFFFF" />
            <Text className="text-white text-sm font-semibold">
              Add to Cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#4ECDC4] px-6 py-3 rounded-full"
            onPress={handleBuyNow}
            disabled={!product.inStock}
          >
            <Text className="text-black text-sm font-semibold">Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
