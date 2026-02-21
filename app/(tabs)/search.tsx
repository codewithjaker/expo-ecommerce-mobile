// app/(tabs)/search.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Search as SearchIcon,
  X,
  Filter,
  Clock,
  TrendingUp,
  Tag,
} from "lucide-react-native";

// Types
interface Product {
  id: string;
  name: string;
  rating: string;
  sold: string;
  price: string;
  image: string;
  category: string;
  description: string;
}

interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: string;
}

interface TrendingSearch {
  id: string;
  term: string;
  count: number;
}

// Mock Data
const searchHistory: SearchHistoryItem[] = [
  { id: "1", query: "Leather Jacket", timestamp: "2 hours ago" },
  { id: "2", query: "Running Shoes", timestamp: "Yesterday" },
  { id: "3", query: "Smart Watch", timestamp: "2 days ago" },
  { id: "4", query: "Wireless Earbuds", timestamp: "3 days ago" },
];

const trendingSearches: TrendingSearch[] = [
  { id: "1", term: "Summer Collection", count: 2456 },
  { id: "2", term: "Wireless Headphones", count: 1890 },
  { id: "3", term: "Designer Bags", count: 1567 },
  { id: "4", term: "Sports Wear", count: 1423 },
  { id: "5", term: "Smart Home", count: 1289 },
];

const categories = [
  { id: "1", name: "Clothes", icon: "👕" },
  { id: "2", name: "Shoes", icon: "👟" },
  { id: "3", name: "Electronics", icon: "📱" },
  { id: "4", name: "Accessories", icon: "👜" },
  { id: "5", name: "Watches", icon: "⌚" },
  { id: "6", name: "Jewelry", icon: "💎" },
  { id: "7", name: "Kitchen", icon: "🍳" },
  { id: "8", name: "Toys", icon: "🧸" },
];

const allProducts: Product[] = [
  {
    id: "1",
    name: "Venesa Long Shirt",
    rating: "+8",
    sold: "1,972 sold",
    price: "$320.00",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=500&fit=crop&crop=center",
    category: "Clothes",
    description: "Premium long sleeve shirt with elegant design",
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
    description: "Handcrafted leather shoes with premium finish",
  },
  {
    id: "3",
    name: "Mini Leather Bag",
    rating: "+6",
    sold: "8,477 sold",
    price: "$540.00",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop&crop=center",
    category: "Accessories",
    description: "Compact leather bag with multiple compartments",
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
    description: "Wireless noise-canceling headphones",
  },
  {
    id: "5",
    name: "Zonio Super Watch",
    rating: "+8",
    sold: "7,884 sold",
    price: "$850.00",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=500&fit=crop&crop=center",
    category: "Watches",
    description: "Smart watch with health tracking features",
  },
  {
    id: "6",
    name: "Red Ruby Rings",
    rating: "+5",
    sold: "7,285 sold",
    price: "$445.00",
    image:
      "https://images.unsplash.com/photo-1599643478518-a783e48dc7d3?w=400&h=500&fit=crop&crop=center",
    category: "Jewelry",
    description: "Elegant ruby ring with diamond accents",
  },
  {
    id: "7",
    name: "Designer Sunglasses",
    rating: "+9",
    sold: "4,258 sold",
    price: "$290.00",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop&crop=center",
    category: "Accessories",
    description: "UV protected designer sunglasses",
  },
  {
    id: "8",
    name: "Running Sneakers",
    rating: "+8",
    sold: "11,235 sold",
    price: "$145.00",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop&crop=center",
    category: "Shoes",
    description: "Lightweight running shoes with cushion",
  },
];

const filters = [
  { id: "1", label: "All", value: "all" },
  { id: "2", label: "Popular", value: "popular" },
  { id: "3", label: "Newest", value: "newest" },
  { id: "4", label: "Price: Low to High", value: "price-low" },
  { id: "5", label: "Price: High to Low", value: "price-high" },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showResults, setShowResults] = useState(false);

  // Search function
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    // Simulate API delay
    setTimeout(() => {
      const results = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const selectHistoryItem = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const selectTrendingItem = (term: string) => {
    setSearchQuery(term);
    handleSearch(term);
  };

  const selectCategory = (category: string) => {
    setSearchQuery(category);
    handleSearch(category);
  };

  // Filter search results
  const getFilteredResults = () => {
    let filtered = [...searchResults];

    switch (selectedFilter) {
      case "popular":
        filtered.sort((a, b) => {
          const aSold = parseInt(a.sold.replace(",", ""));
          const bSold = parseInt(b.sold.replace(",", ""));
          return bSold - aSold;
        });
        break;
      case "price-low":
        filtered.sort((a, b) => {
          const aPrice = parseFloat(a.price.replace("$", ""));
          const bPrice = parseFloat(b.price.replace("$", ""));
          return aPrice - bPrice;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const aPrice = parseFloat(a.price.replace("$", ""));
          const bPrice = parseFloat(b.price.replace("$", ""));
          return bPrice - aPrice;
        });
        break;
      // 'newest' and 'all' keep original order
    }

    return filtered;
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity className="flex-row bg-[#1A1A1A] rounded-xl p-3 mb-3">
      <Image
        source={{ uri: item.image }}
        className="w-24 h-30 rounded-lg mr-3"
      />
      <View className="flex-1">
        <Text className="text-[#888888] text-xs mb-1">{item.category}</Text>
        <Text className="text-white text-base font-semibold mb-1.5" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-[#AAAAAA] text-xs leading-4 mb-2" numberOfLines={2}>
          {item.description}
        </Text>
        <View className="flex-row items-center mb-2">
          <View className="bg-[#2A2A2A] px-2 py-1 rounded-md mr-3">
            <Text className="text-[#FFD700] text-xs font-semibold">
              {item.rating}
            </Text>
          </View>
          <Text className="text-[#888888] text-xs">{item.sold}</Text>
        </View>
        <Text className="text-white text-lg font-bold">{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center py-24 px-8">
      <SearchIcon size={64} color="#666666" />
      <Text className="text-white text-xl font-semibold mt-6 mb-2">
        Search for products
      </Text>
      <Text className="text-[#888888] text-sm text-center">
        Find clothes, shoes, electronics and more
      </Text>
    </View>
  );

  const renderSearchHistory = () => (
    <View className="mb-6">
      <View className="flex-row justify-between items-center px-4 mb-3">
        <View className="flex-row items-center gap-2">
          <Clock size={20} color="#FFFFFF" />
          <Text className="text-white text-lg font-semibold">Recent Searches</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-[#666666] text-sm">Clear All</Text>
        </TouchableOpacity>
      </View>
      <View className="px-4">
        {searchHistory.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-row items-center py-3 border-b border-[#1A1A1A] gap-3"
            onPress={() => selectHistoryItem(item.query)}
          >
            <Clock size={16} color="#888888" />
            <Text className="flex-1 text-white text-base">{item.query}</Text>
            <Text className="text-[#888888] text-xs">{item.timestamp}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderTrendingSearches = () => (
    <View className="mb-6">
      <View className="flex-row items-center px-4 mb-3 gap-2">
        <TrendingUp size={20} color="#FFFFFF" />
        <Text className="text-white text-lg font-semibold">Trending Now</Text>
      </View>
      <View className="flex-row flex-wrap px-4 gap-2">
        {trendingSearches.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-row items-center bg-[#1A1A1A] rounded-full px-4 py-2.5 gap-1.5 mb-2"
            onPress={() => selectTrendingItem(item.term)}
          >
            <Tag size={14} color="#4ECDC4" />
            <Text className="text-white text-sm font-medium">{item.term}</Text>
            <Text className="text-[#4ECDC4] text-xs font-semibold">
              {item.count}+
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCategories = () => (
    <View className="mb-6">
      <View className="px-4 mb-3">
        <Text className="text-white text-lg font-semibold">Browse Categories</Text>
      </View>
      <View className="flex-row flex-wrap px-4 gap-3">
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            className="w-[30%] items-center bg-[#1A1A1A] rounded-2xl py-5 mb-3"
            onPress={() => selectCategory(category.name)}
          >
            <Text className="text-3xl mb-2">{category.icon}</Text>
            <Text className="text-white text-xs font-medium">{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSearchResults = () => (
    <View className="flex-1 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white text-lg font-semibold flex-1">
          {searchResults.length} Results for "{searchQuery}"
        </Text>
        <TouchableOpacity className="flex-row items-center bg-[#1A1A1A] px-4 py-2 rounded-full gap-1.5">
          <Filter size={20} color="#FFFFFF" />
          <Text className="text-white text-sm font-medium">Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            className={`px-4 py-2 rounded-full mr-2 ${
              selectedFilter === filter.value ? "bg-[#4ECDC4]" : "bg-[#1A1A1A]"
            }`}
            onPress={() => setSelectedFilter(filter.value)}
          >
            <Text
              className={`text-sm font-medium ${
                selectedFilter === filter.value ? "text-black" : "text-white"
              }`}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {isSearching ? (
        <View className="flex-1 justify-center items-center py-16">
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text className="text-white text-sm mt-4">Searching...</Text>
        </View>
      ) : (
        <FlatList
          data={getFilteredResults()}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center py-16">
              <SearchIcon size={48} color="#666666" />
              <Text className="text-white text-lg font-semibold mt-4 mb-2">
                No results found
              </Text>
              <Text className="text-[#888888] text-sm text-center px-8">
                Try different keywords or check spelling
              </Text>
            </View>
          }
        />
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Search Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-[#1A1A1A]">
        <View className="flex-1 flex-row items-center bg-[#1A1A1A] rounded-xl px-3 mr-3">
          <SearchIcon size={20} color="#888888" className="mr-2" />
          <TextInput
            className="flex-1 text-white text-base py-3"
            placeholder="Search products, brands, categories..."
            placeholderTextColor="#666666"
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus={true}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} className="p-1">
              <X size={20} color="#888888" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity className="py-2 px-3">
          <Text className="text-[#4ECDC4] text-base font-medium">Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {showResults ? (
          renderSearchResults()
        ) : (
          <>
            {renderSearchHistory()}
            {renderTrendingSearches()}
            {renderCategories()}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}