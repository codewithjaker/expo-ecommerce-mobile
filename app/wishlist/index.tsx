import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Heart,
  ShoppingBag,
  Share2,
  Filter,
  X,
} from 'lucide-react-native';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  category: string;
}

export default function WishlistScreen() {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: '1',
      name: 'Venesa Long Shirt',
      price: 320.00,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=500&fit=crop&crop=center',
      rating: 4.8,
      reviewCount: 1972,
      inStock: true,
      category: 'Clothes',
    },
    {
      id: '2',
      name: 'Suga Leather Shoes',
      price: 375.00,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=center',
      rating: 4.7,
      reviewCount: 7483,
      inStock: true,
      category: 'Shoes',
    },
    {
      id: '3',
      name: 'Mini Leather Bag',
      price: 540.00,
      originalPrice: 650.00,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop&crop=center',
      rating: 4.6,
      reviewCount: 8477,
      inStock: false,
      category: 'Bags',
    },
    {
      id: '4',
      name: 'Vinia Headphones',
      price: 360.00,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop&crop=center',
      rating: 4.9,
      reviewCount: 2474,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: '5',
      name: 'Zonio Super Watch',
      price: 850.00,
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=500&fit=crop&crop=center',
      rating: 4.8,
      reviewCount: 7884,
      inStock: true,
      category: 'Watches',
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    } else {
      setSelectedItems(prev => [...prev, id]);
    }
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  const removeSelected = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setIsSelecting(false);
  };

  const moveToCart = (id: string) => {
    // Move item to cart logic here
    router.push('/(tabs)/cart');
  };

  const moveSelectedToCart = () => {
    // Move selected items to cart logic here
    router.push('/(tabs)/cart');
    setSelectedItems([]);
    setIsSelecting(false);
  };

  const shareWishlist = () => {
    // Share wishlist logic here
    alert('Share feature coming soon!');
  };

  const renderWishlistItem = ({ item }: { item: WishlistItem }) => {
    const isSelected = selectedItems.includes(item.id);
    
    return (
      <TouchableOpacity
        className="w-[48%] bg-[#1A1A1A] rounded-xl overflow-hidden mb-2 relative"
        onLongPress={() => {
          setIsSelecting(true);
          toggleSelectItem(item.id);
        }}
        delayLongPress={500}
      >
        {isSelecting && (
          <TouchableOpacity
            className="absolute top-2 left-2 z-10 p-1"
            onPress={() => toggleSelectItem(item.id)}
          >
            <View
              className={`w-6 h-6 rounded-full border-2 justify-center items-center ${
                isSelected
                  ? 'bg-[#FF6B6B] border-[#FF6B6B]'
                  : 'border-white'
              }`}
            >
              {isSelected && <Heart size={12} color="#FFFFFF" />}
            </View>
          </TouchableOpacity>
        )}

        <Image source={{ uri: item.image }} className="w-full h-40" />
        
        {!item.inStock && (
          <View className="absolute top-2 right-2 bg-[#EF476F]/90 px-2 py-1 rounded-full">
            <Text className="text-white text-[10px] font-semibold">
              Out of Stock
            </Text>
          </View>
        )}

        <View className="p-3">
          <Text className="text-[#888888] text-[10px] mb-1">{item.category}</Text>
          <Text className="text-white text-sm font-semibold mb-2 min-h-[36px]" numberOfLines={2}>
            {item.name}
          </Text>
          
          <View className="flex-row items-center mb-2 gap-1">
            <Heart size={12} color="#FF6B6B" fill="#FF6B6B" />
            <Text className="text-white text-xs font-semibold">{item.rating}</Text>
            <Text className="text-[#888888] text-[10px]">({item.reviewCount})</Text>
          </View>

          <View className="flex-row items-center gap-2 mb-3">
            {item.originalPrice && (
              <Text className="text-[#888888] text-xs line-through">
                ${item.originalPrice.toFixed(2)}
              </Text>
            )}
            <Text className="text-white text-base font-bold">
              ${item.price.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row gap-2">
            <TouchableOpacity
              className={`flex-row items-center justify-center py-2 rounded-lg flex-1 gap-1.5 ${
                item.inStock ? 'bg-[#4ECDC4]' : 'bg-[#666666]'
              }`}
              onPress={() => moveToCart(item.id)}
              disabled={!item.inStock}
            >
              <ShoppingBag size={16} color="#000000" />
              <Text className="text-black text-xs font-semibold">
                {item.inStock ? 'Add to Cart' : 'Notify Me'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-[#EF476F]/10 py-2 px-2 rounded-lg"
              onPress={() => removeFromWishlist(item.id)}
            >
              <X size={16} color="#EF476F" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        {isSelecting ? (
          <View className="flex-1 px-4">
            <Text className="text-white text-lg font-semibold">
              {selectedItems.length} selected
            </Text>
          </View>
        ) : (
          <Text className="text-white text-lg font-semibold flex-1 text-center">
            Wishlist ({wishlistItems.length})
          </Text>
        )}

        <View className="flex-row items-center gap-3">
          {isSelecting ? (
            <>
              <TouchableOpacity className="p-2" onPress={removeSelected}>
                <X size={24} color="#EF476F" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2" onPress={moveSelectedToCart}>
                <ShoppingBag size={24} color="#4ECDC4" />
              </TouchableOpacity>
              <TouchableOpacity
                className="p-2"
                onPress={() => setIsSelecting(false)}
              >
                <Text className="text-[#888888] text-base font-medium">Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity className="p-2" onPress={shareWishlist}>
                <Share2 size={24} color="#FFFFFF" />
              </TouchableOpacity>
              {wishlistItems.length > 0 && (
                <TouchableOpacity
                  className="p-2"
                  onPress={() => setIsSelecting(true)}
                >
                  <Text className="text-[#4ECDC4] text-base font-medium">Select</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>

      {wishlistItems.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Heart size={64} color="#666666" />
          <Text className="text-white text-2xl font-semibold mt-6 mb-2">
            Your wishlist is empty
          </Text>
          <Text className="text-[#888888] text-sm text-center mb-8 leading-5">
            Save items you love to your wishlist. Review them anytime and easily move them to your cart.
          </Text>
          <TouchableOpacity
            className="bg-[#4ECDC4] px-6 py-3 rounded-full"
            onPress={() => router.push('/(tabs)')}
          >
            <Text className="text-black text-base font-semibold">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Stats */}
          <View className="flex-row justify-around py-5 border-b border-[#1A1A1A]">
            <View className="items-center">
              <Heart size={20} color="#FF6B6B" />
              <Text className="text-white text-xl font-bold mt-1 mb-0.5">
                {wishlistItems.length}
              </Text>
              <Text className="text-[#888888] text-xs">Items</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-xl font-bold mt-1 mb-0.5">
                ${wishlistItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </Text>
              <Text className="text-[#888888] text-xs">Total Value</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-xl font-bold mt-1 mb-0.5">
                {wishlistItems.filter(item => item.inStock).length}
              </Text>
              <Text className="text-[#888888] text-xs">In Stock</Text>
            </View>
          </View>

          {/* Wishlist Grid */}
          <FlatList
            data={wishlistItems}
            renderItem={renderWishlistItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerClassName="p-2 pb-24"
            columnWrapperClassName="justify-between mb-2"
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
}