import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Star,
  Edit,
  Trash2,
  Filter,
  MessageCircle,
  ThumbsUp,
} from "lucide-react-native";

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  rating: number;
  date: string;
  reviewText: string;
  likes: number;
  isHelpful?: boolean;
}

export default function ReviewsScreen() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      productId: "1",
      productName: "Venesa Long Shirt",
      productImage:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=500&fit=crop&crop=center",
      rating: 5,
      date: "Oct 18, 2024",
      reviewText:
        "Amazing quality and perfect fit! The material feels premium and the design is exactly as shown.",
      likes: 24,
      isHelpful: true,
    },
    {
      id: "2",
      productId: "2",
      productName: "Suga Leather Shoes",
      productImage:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=center",
      rating: 4,
      date: "Oct 15, 2024",
      reviewText:
        "Very comfortable and stylish. The leather quality is good but took some time to break in.",
      likes: 12,
    },
    {
      id: "3",
      productId: "3",
      productName: "Mini Leather Bag",
      productImage:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop&crop=center",
      rating: 3,
      date: "Oct 10, 2024",
      reviewText:
        "Looks beautiful but smaller than expected. The quality is decent for the price.",
      likes: 5,
    },
    {
      id: "4",
      productId: "4",
      productName: "Zonio Super Watch",
      productImage:
        "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 2,
      date: "Nov 5, 2024",
      reviewText:
        "The battery life is very disappointing. It barely lasts half a day, and the sync with my phone is quite buggy.",
      likes: 42,
    },
    {
      id: "5",
      productId: "5",
      productName: "Arctic Winter Jacket",
      productImage:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop&crop=center",
      rating: 1,
      date: "Nov 12, 2024",
      reviewText:
        "Extremely poor quality for the price. The zipper broke on the first day, and the sizing is way off—runs much smaller than advertised.",
      likes: 18,
      isHelpful: false,
    },
  ]);

  const [filter, setFilter] = useState<"all" | "5" | "4" | "3" | "2" | "1">(
    "all"
  );
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const filteredReviews =
    filter === "all"
      ? reviews
      : reviews.filter((review) => review.rating === parseInt(filter));

  const handleLike = (id: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, likes: review.likes + 1 } : review
      )
    );
  };

  const handleDelete = (id: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== id));
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review.id);
    setEditText(review.reviewText);
  };

  const saveEdit = (id: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, reviewText: editText } : review
      )
    );
    setEditingReview(null);
  };

  const renderStars = (rating: number) => (
    <View className="flex-row gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          color={star <= rating ? "#FFD700" : "#666666"}
          fill={star <= rating ? "#FFD700" : "transparent"}
        />
      ))}
    </View>
  );

  const renderReview = (review: Review) => (
    <View key={review.id} className="bg-[#1A1A1A] rounded-2xl p-4 mb-3">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-row items-center flex-1">
          <Image
            source={{ uri: review.productImage }}
            className="w-15 h-15 rounded-lg mr-3"
          />
          <View className="flex-1">
            <Text className="text-white text-base font-semibold mb-1" numberOfLines={1}>
              {review.productName}
            </Text>
            <Text className="text-[#888888] text-xs">{review.date}</Text>
          </View>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity className="p-1.5" onPress={() => handleEdit(review)}>
            <Edit size={18} color="#888888" />
          </TouchableOpacity>
          <TouchableOpacity className="p-1.5" onPress={() => handleDelete(review.id)}>
            <Trash2 size={18} color="#EF476F" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row items-center mb-3 gap-2">
        {renderStars(review.rating)}
        <Text className="text-[#FFD700] text-sm font-semibold">
          {review.rating}/5
        </Text>
      </View>

      {editingReview === review.id ? (
        <View className="mb-3">
          <TextInput
            className="bg-[#2A2A2A] text-white text-sm px-3 py-2 rounded-lg min-h-20 text-top mb-2"
            value={editText}
            onChangeText={setEditText}
            multiline
            numberOfLines={3}
            placeholderTextColor="#666666"
          />
          <View className="flex-row justify-end gap-2">
            <TouchableOpacity
              className="px-3 py-1.5"
              onPress={() => setEditingReview(null)}
            >
              <Text className="text-[#888888] text-sm">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#4ECDC4] px-4 py-1.5 rounded-md"
              onPress={() => saveEdit(review.id)}
            >
              <Text className="text-black text-sm font-semibold">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text className="text-[#AAAAAA] text-sm leading-5 mb-3">
          {review.reviewText}
        </Text>
      )}

      <View className="flex-row justify-end">
        <TouchableOpacity
          className="flex-row items-center gap-1.5 py-1.5 px-3 bg-[#2A2A2A] rounded-full"
          onPress={() => handleLike(review.id)}
        >
          <ThumbsUp
            size={16}
            color={review.isHelpful ? "#4ECDC4" : "#888888"}
          />
          <Text
            className={`text-xs ${
              review.isHelpful ? "text-[#4ECDC4]" : "text-[#888888]"
            }`}
          >
            Helpful ({review.likes})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">My Reviews</Text>
        <View className="min-w-15 items-end">
          <Text className="text-[#888888] text-xs">{reviews.length} reviews</Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Filter Section */}
        <View className="px-4 py-5 border-b border-[#1A1A1A]">
          <Text className="text-white text-base font-semibold mb-3">
            Filter by Rating
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              <TouchableOpacity
                className={`px-4 py-2 rounded-full ${
                  filter === "all" ? "bg-[#4ECDC4]" : "bg-[#1A1A1A]"
                }`}
                onPress={() => setFilter("all")}
              >
                <Text
                  className={`text-sm font-medium ${
                    filter === "all" ? "text-black" : "text-white"
                  }`}
                >
                  All
                </Text>
              </TouchableOpacity>
              {[5, 4, 3, 2, 1].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  className={`px-4 py-2 rounded-full ${
                    filter === rating.toString() ? "bg-[#4ECDC4]" : "bg-[#1A1A1A]"
                  }`}
                  onPress={() => setFilter(rating.toString() as any)}
                >
                  <View className="flex-row items-center gap-1">
                    <Star size={12} color="#FFD700" fill="#FFD700" />
                    <Text
                      className={`text-sm font-medium ${
                        filter === rating.toString() ? "text-black" : "text-white"
                      }`}
                    >
                      {rating} Stars
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Reviews List */}
        <View className="p-4">
          {filteredReviews.length > 0 ? (
            filteredReviews.map(renderReview)
          ) : (
            <View className="items-center justify-center py-16 px-8">
              <MessageCircle size={64} color="#666666" />
              <Text className="text-white text-xl font-semibold mt-6 mb-2">
                No Reviews Yet
              </Text>
              <Text className="text-[#888888] text-sm text-center leading-5 mb-8">
                You haven't written any reviews. Share your thoughts on purchased
                items!
              </Text>
              <TouchableOpacity
                className="bg-[#4ECDC4] px-6 py-3 rounded-full"
                onPress={() => router.push("/(tabs)")}
              >
                <Text className="text-black text-base font-semibold">
                  Browse Products
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Stats */}
        <View className="p-4 border-t border-[#1A1A1A]">
          <Text className="text-white text-base font-semibold mb-4">
            Review Stats
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-1 bg-[#1A1A1A] rounded-xl p-4 items-center">
              <Text className="text-white text-xl font-bold mb-1">
                {reviews.length}
              </Text>
              <Text className="text-[#888888] text-xs">Total Reviews</Text>
            </View>
            <View className="flex-1 bg-[#1A1A1A] rounded-xl p-4 items-center">
              <Text className="text-white text-xl font-bold mb-1">
                {reviews.length > 0
                  ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                  : 0}
              </Text>
              <Text className="text-[#888888] text-xs">Avg Rating</Text>
            </View>
            <View className="flex-1 bg-[#1A1A1A] rounded-xl p-4 items-center">
              <Text className="text-white text-xl font-bold mb-1">
                {reviews.reduce((sum, r) => sum + r.likes, 0)}
              </Text>
              <Text className="text-[#888888] text-xs">Total Likes</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}