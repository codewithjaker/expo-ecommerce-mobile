// app/reviews/add/page.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  Star,
  Camera,
  X,
  Image as ImageIcon,
} from "lucide-react-native";

export default function AddReviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { productId, productName } = params;

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleRatingPress = (selected: number) => {
    setRating(selected);
  };

  const handleAddImage = () => {
    // In a real app, you'd open image picker here
    Alert.alert("Coming Soon", "Image upload feature coming soon!");
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Error", "Please select a rating");
      return;
    }
    if (!reviewText.trim()) {
      Alert.alert("Error", "Please write a review");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Review Submitted",
        "Thank you for your review! It will be published after moderation.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    }, 1500);
  };

  const renderStars = () => (
    <View className="flex-row justify-center gap-2 mb-6">
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => handleRatingPress(star)}
          activeOpacity={0.7}
        >
          <Star
            size={40}
            color={star <= rating ? "#FFD700" : "#666666"}
            fill={star <= rating ? "#FFD700" : "transparent"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Write a Review</Text>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting}
          className="px-4 py-2 bg-[#4ECDC4] rounded-xl"
        >
          <Text className="text-black text-sm font-semibold">
            {isSubmitting ? "Posting..." : "Post"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Product Info (if available) */}
        {productName && (
          <View className="bg-[#1A1A1A] rounded-2xl p-4 mt-4 flex-row items-center">
            <View className="w-16 h-16 bg-[#2A2A2A] rounded-xl items-center justify-center">
              <ImageIcon size={24} color="#666666" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-white text-base font-semibold">
                {productName}
              </Text>
              <Text className="text-[#888888] text-xs mt-1">
                Tap stars to rate
              </Text>
            </View>
          </View>
        )}

        {/* Rating Section */}
        <View className="mt-8 items-center">
          <Text className="text-white text-xl font-semibold mb-2">
            How would you rate this product?
          </Text>
          {renderStars()}
          <Text className="text-[#888888] text-sm">
            {rating === 0
              ? "Tap a star to rate"
              : `You selected ${rating} star${rating > 1 ? "s" : ""}`}
          </Text>
        </View>

        {/* Review Text */}
        <View className="mt-8">
          <Text className="text-white text-base font-semibold mb-2">
            Your Review
          </Text>
          <TextInput
            className="bg-[#1A1A1A] text-white text-base p-4 rounded-xl border border-[#333333] min-h-[120px] text-top"
            value={reviewText}
            onChangeText={setReviewText}
            placeholder="Share your experience with this product... What did you like or dislike?"
            placeholderTextColor="#666666"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        {/* Image Upload (Optional) */}
        <View className="mt-6">
          <Text className="text-white text-base font-semibold mb-2">
            Add Photos (Optional)
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              {selectedImages.map((_, index) => (
                <View key={index} className="relative">
                  <View className="w-20 h-20 bg-[#2A2A2A] rounded-xl items-center justify-center">
                    <ImageIcon size={24} color="#666666" />
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-[#EF476F] rounded-full p-1"
                  >
                    <X size={12} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                onPress={handleAddImage}
                className="w-20 h-20 bg-[#1A1A1A] rounded-xl border border-dashed border-[#4ECDC4] items-center justify-center"
              >
                <Camera size={24} color="#4ECDC4" />
              </TouchableOpacity>
            </View>
          </ScrollView>
          <Text className="text-[#888888] text-xs mt-2">
            Upload clear photos to help other shoppers
          </Text>
        </View>

        {/* Tips */}
        <View className="mt-8 mb-8 bg-[#1A1A1A] rounded-xl p-4">
          <Text className="text-white text-sm font-semibold mb-2">
            Review Tips
          </Text>
          <View className="flex-row items-start mb-2">
            <View className="w-1.5 h-1.5 rounded-full bg-[#4ECDC4] mt-1.5 mr-2" />
            <Text className="text-[#888888] text-xs flex-1">
              Be specific about what you liked or disliked
            </Text>
          </View>
          <View className="flex-row items-start mb-2">
            <View className="w-1.5 h-1.5 rounded-full bg-[#4ECDC4] mt-1.5 mr-2" />
            <Text className="text-[#888888] text-xs flex-1">
              Mention the product quality, fit, durability, etc.
            </Text>
          </View>
          <View className="flex-row items-start">
            <View className="w-1.5 h-1.5 rounded-full bg-[#4ECDC4] mt-1.5 mr-2" />
            <Text className="text-[#888888] text-xs flex-1">
              Avoid offensive language or personal information
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}