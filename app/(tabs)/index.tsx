// app/(tabs)/index.tsx
import { useRouter } from "expo-router";
import { Bell, ChevronRight, Search, Star } from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

// Types
interface Product {
  id: string;
  name: string;
  rating: string;
  sold: string;
  price: string;
  image: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

// Mock Data
const categories: Category[] = [
  { id: "1", name: "Clothes", icon: "👕" },
  { id: "2", name: "Shoes", icon: "👟" },
  { id: "3", name: "Bags", icon: "👜" },
  { id: "4", name: "Electronics", icon: "📱" },
  { id: "5", name: "Watch", icon: "⌚" },
  { id: "6", name: "Jewelry", icon: "💎" },
  { id: "7", name: "Kitchen", icon: "🍳" },
  { id: "8", name: "Toys", icon: "🧸" },
];

const productData: Product[] = [
  {
    id: "1",
    name: "Venesa Long Shirt",
    rating: "+8",
    sold: "1,972.63 sold",
    price: "$320.00",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=500&fit=crop&crop=center",
    category: "Clothes",
  },
  {
    id: "2",
    name: "Suga Leather Shoes",
    rating: "+7",
    sold: "7,483 sold",
    price: "$375.00",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=center",
    category: "Shoes",
  },
  {
    id: "3",
    name: "Mini Leather Bag",
    rating: "+6",
    sold: "8,477 sold",
    price: "$540.00",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop&crop=center",
    category: "Bags",
  },
  {
    id: "4",
    name: "Vinia Headphones",
    rating: "+9",
    sold: "2,474 sold",
    price: "$360.00",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop&crop=center",
    category: "Electronics",
  },
  {
    id: "5",
    name: "Zonio Super Watch",
    rating: "+8",
    sold: "7,884 sold",
    price: "$850.00",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=500&fit=crop&crop=center",
    category: "Watch",
  },

  {
    id: "6",
    name: "Emerald Stone Ring",
    rating: "+4.9",
    sold: "5,120 sold",
    price: "$389.00",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop&crop=center",
    category: "Jewelry",
  },
  {
    id: "7",
    name: "Classic White Shirt",
    rating: "4.6",
    price: "280.0",
    sold: "2,843 sold",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop&crop=center",
    category: "Shirts",
  },
  {
    id: "8",
    name: "Casual Blue Shirt",
    rating: "4.7",
    sold: "1,456 sold",
    price: "295.0",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop&crop=center",
    category: "Shirts",
  },
  {
    id: "9",
    name: "Formal Black Shirt",
    rating: "4.9",
    sold: "3,128 sold",
    price: "350.0",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&crop=center",
    category: "Shirts",
  },
  {
    id: "10",
    name: "Denim Jacket",
    rating: "4.5",
    price: "420.0",
    sold: "892 sold",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop&crop=center",
    category: "Jackets",
  },
  {
    id: "11",
    name: "Slim Fit Jeans",
    rating: "4.3",
    sold: "4,572 sold",
    price: "189.0",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop&crop=center",
    category: "Jeans",
  },
  {
    id: "12",
    name: "Cotton T-Shirt",
    rating: "4.4",
    sold: "8,945 sold",
    price: "49.99",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=center",
    category: "T-Shirts",
  },
  {
    id: "13",
    name: "Leather Jacket",
    rating: "4.8",
    sold: "724 sold",
    price: "650.0",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop&crop=center",
    category: "Jackets",
  },
  {
    id: "14",
    name: "Elegant Gold Diamond Ring",
    rating: "+4.8",
    sold: "5,120 sold",
    price: "$389.00",
    image:
      "https://images.pexels.com/photos/30541188/pexels-photo-30541188.jpeg?w=400&h=500&fit=crop&crop=center",
    category: "Jewelry",
  },
  {
    id: "15",
    name: "Aura Wireless Earbuds",
    rating: "+8.7",
    sold: "3,120 sold",
    price: "$129.00",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=500&fit=crop&crop=center",
    category: "Electronics",
  },
  {
    id: "16",
    name: "Nova Smart Watch",
    rating: "+9.2",
    sold: "4,865 sold",
    price: "$249.00",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&crop=center",
    category: "Electronics",
  },
  {
    id: "17",
    name: "Zen Portable Speaker",
    rating: "+8.9",
    sold: "1,940 sold",
    price: "$179.00",
    image:
      "https://images.pexels.com/photos/4294954/pexels-photo-4294954.jpeg?w=400&h=500&fit=crop&crop=center",
    category: "Electronics",
  },
  {
    id: "18",
    name: "Vision Pro Camera",
    rating: "+9.4",
    sold: "980 sold",
    price: "$799.00",
    image:
      "https://images.pexels.com/photos/30169978/pexels-photo-30169978.jpeg?w=400&h=500&fit=crop&crop=center",
    category: "Electronics",
  },
  {
    id: "19",
    name: "Urban Fashion Sneakers",
    rating: "+8.5",
    sold: "3,900 sold",
    price: "$99.00",
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?w=400&h=500&fit=crop&crop=center",
    category: "Shoes",
  },
  {
    id: "20",
    name: "Classic White Sneakers",
    rating: "+8.7",
    sold: "5,310 sold",
    price: "$105.00",
    image:
      "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?w=400&h=500&fit=crop&crop=center",
    category: "Shoes",
  },
  {
    id: "21",
    name: "Leather Boots",
    rating: "+8.3",
    sold: "3,150 sold",
    price: "$129.00",
    image:
      "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?w=400&h=500&fit=crop&crop=center",
    category: "Shoes",
  },
  {
    id: "5b",
    name: "Sports Wear Set",
    rating: "+8.3",
    sold: "2,150 sold",
    price: "$89.99",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop&crop=center",
    category: "Clothes",
  },
];

const filters = ["All", "Clothes", "Shoes", "Bags", "Electronics"];

// Components
const HomeHeader = () => {
  return (
    <View className="flex-row justify-between items-center px-4 pt-2 pb-6">
      <View>
        <Text className="text-[#888888] text-sm font-normal">Good Morning</Text>
        <Text className="text-white text-2xl font-semibold mt-1">Andrew Ainsley</Text>
      </View>
      <View className="flex-row gap-4">
        <TouchableOpacity className="p-2">
          <Search size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2">
          <Bell size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BannerCarousel = () => {
  const banners = [
    {
      id: "1",
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop&crop=center",
    },
    {
      id: "2",
      title: "New Collection",
      subtitle: "Just Dropped",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=300&fit=crop&crop=center",
    },
  ];

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      className="mb-6"
    >
      {banners.map((banner) => (
        <View
          key={banner.id}
          style={{ width: width - 32 }}
          className="mx-4 rounded-2xl overflow-hidden"
        >
          <Image
            source={{ uri: banner.image }}
            className="w-full h-35"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/60">
            <Text className="text-white text-xl font-semibold">{banner.title}</Text>
            <Text className="text-white text-sm opacity-80 mt-1">{banner.subtitle}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const CategoryGrid = () => {
  const router = useRouter();
  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-white text-lg font-semibold">Categories</Text>
        <TouchableOpacity className="flex-row items-center gap-1">
          <Text className="text-[#666666] text-sm">See All</Text>
          <ChevronRight size={16} color="#666666" />
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap px-2">
        {categories.map((category, index) => (
          <TouchableOpacity
            key={category.id}
            className="w-1/4 items-center mb-4"
            onPress={() => router.push(`/product/category/${category.id}`)}
          >
            <Text className="text-4xl mb-2">{category.icon}</Text>
            <Text className="text-white text-xs font-medium">{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const ProductGrid = () => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={{ width: CARD_WIDTH }}
      className="bg-[#1A1A1A] rounded-2xl p-3"
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <View className="w-full h-35 rounded-xl overflow-hidden mb-3 relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-full">
          <Text className="text-white text-xs font-semibold">NEW</Text>
        </View>
      </View>
      <Text className="text-white text-sm font-semibold mb-2" numberOfLines={1}>
        {item.name}
      </Text>
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center gap-1">
          <Star size={12} color="#FFD700" fill="#FFD700" />
          <Text className="text-yellow-400 text-xs">{item.rating}</Text>
        </View>
        <Text className="text-[#888888] text-xs">{item.sold}</Text>
      </View>
      <Text className="text-white text-base font-bold">{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="mb-24">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-white text-lg font-semibold">Most Popular</Text>
        <TouchableOpacity className="flex-row items-center gap-1">
          <Text className="text-[#666666] text-sm">See All</Text>
          <ChevronRight size={16} color="#666666" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4 px-4"
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            className={`px-4 py-2 rounded-full mr-2 ${
              selectedFilter === filter ? "bg-white" : "bg-[#1A1A1A]"
            }`}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              className={`text-sm font-medium ${
                selectedFilter === filter ? "text-black" : "text-white"
              }`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={productData}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperClassName="justify-between mb-4"
        contentContainerClassName="px-4"
      />
    </View>
  );
};

// Main Component
export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <HomeHeader />
        <BannerCarousel />
        <CategoryGrid />
        <ProductGrid />
      </ScrollView>
    </SafeAreaView>
  );
}