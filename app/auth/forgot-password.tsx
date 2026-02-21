import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Smartphone,
  MessageCircle,
} from "lucide-react-native";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  method: z.enum(["email", "sms"]).optional(),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"email" | "sms">(
    "email"
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      method: "email",
    },
  });

  const email = watch("email");

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setResetSent(true);
      Alert.alert(
        "Reset Link Sent!",
        selectedMethod === "email"
          ? `We've sent password reset instructions to ${data.email}. Please check your email.`
          : `We've sent an SMS with reset instructions to your phone.`
      );
    }, 1500);
  };

  const handleBackToLogin = () => {
    router.push("/auth/login");
  };

  const handleResend = () => {
    Alert.alert("Resent", "Reset instructions have been resent.");
  };

  const handleTryAnotherMethod = () => {
    setSelectedMethod(selectedMethod === "email" ? "sms" : "email");
    setResetSent(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow pb-10"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 py-3">
            <TouchableOpacity className="p-2" onPress={() => router.back()}>
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1612837017391-4b6b7b0b0b0b?w=400&h=100&fit=crop&crop=center",
              }}
              className="w-30 h-10"
              resizeMode="contain"
            />
            <View className="w-10" />
          </View>

          {/* Title Section */}
          <View className="px-4 py-8 items-center">
            <Text className="text-white text-3xl font-bold mb-2 text-center">
              {resetSent ? "Reset Link Sent" : "Forgot Your Password?"}
            </Text>
            <Text className="text-[#888888] text-base text-center leading-6">
              {resetSent
                ? selectedMethod === "email"
                  ? `We’ve sent reset instructions to ${email}. Please check your inbox.`
                  : "We've sent an SMS to your phone"
                : "Enter your email or phone number and we’ll send you a link to reset your password."}
            </Text>
          </View>

          {!resetSent ? (
            <>
              {/* Recovery Method Selection */}
              <View className="px-4 mb-6">
                <Text className="text-white text-base font-semibold mb-4">
                  Choose Recovery Method
                </Text>
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    className={`flex-1 bg-[#1A1A1A] rounded-xl p-5 items-center border ${
                      selectedMethod === "email"
                        ? "border-[#4ECDC4] bg-[#4ECDC4]/10"
                        : "border-[#333333]"
                    }`}
                    onPress={() => setSelectedMethod("email")}
                  >
                    <Mail
                      size={24}
                      color={selectedMethod === "email" ? "#4ECDC4" : "#888888"}
                    />
                    <Text
                      className={`text-sm font-semibold mt-2 ${
                        selectedMethod === "email"
                          ? "text-[#4ECDC4]"
                          : "text-[#888888]"
                      }`}
                    >
                      Email
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={`flex-1 bg-[#1A1A1A] rounded-xl p-5 items-center border ${
                      selectedMethod === "sms"
                        ? "border-[#4ECDC4] bg-[#4ECDC4]/10"
                        : "border-[#333333]"
                    }`}
                    onPress={() => setSelectedMethod("sms")}
                  >
                    <Smartphone
                      size={24}
                      color={selectedMethod === "sms" ? "#4ECDC4" : "#888888"}
                    />
                    <Text
                      className={`text-sm font-semibold mt-2 ${
                        selectedMethod === "sms"
                          ? "text-[#4ECDC4]"
                          : "text-[#888888]"
                      }`}
                    >
                      SMS
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Form */}
              <View className="px-4 mb-8">
                <View className="mb-6">
                  <View className="flex-row items-center mb-2 gap-2">
                    {selectedMethod === "email" ? (
                      <Mail size={16} color="#888888" />
                    ) : (
                      <Smartphone size={16} color="#888888" />
                    )}
                    <Text className="text-[#888888] text-sm">
                      {selectedMethod === "email" ? "Email Address" : "Phone Number"}
                    </Text>
                  </View>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className={`bg-[#1A1A1A] text-white text-base px-4 py-3.5 rounded-xl border ${
                          errors.email ? "border-[#EF476F]" : "border-[#333333]"
                        }`}
                        placeholder={
                          selectedMethod === "email"
                            ? "Enter your email address"
                            : "Enter your phone number"
                        }
                        placeholderTextColor="#666666"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="none"
                        keyboardType={
                          selectedMethod === "email"
                            ? "email-address"
                            : "phone-pad"
                        }
                        autoComplete={
                          selectedMethod === "email" ? "email" : "tel"
                        }
                      />
                    )}
                  />
                  {errors.email && (
                    <View className="flex-row items-center mt-2 gap-1.5">
                      <AlertCircle size={14} color="#EF476F" />
                      <Text className="text-[#EF476F] text-xs">
                        {errors.email.message}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  className={`py-4 rounded-xl items-center ${
                    isLoading ? "bg-[#666666]" : "bg-[#4ECDC4]"
                  }`}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isLoading}
                >
                  <Text className="text-black text-base font-semibold">
                    {isLoading
                      ? "Sending..."
                      : selectedMethod === "email"
                      ? "Send Reset Email"
                      : "Send SMS"}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            /* Success State */
            <View className="px-4 mb-8">
              <View className="items-center mb-8">
                <CheckCircle size={64} color="#4ECDC4" />
              </View>

              <View className="bg-[#1A1A1A] rounded-2xl p-5 mb-6">
                <Text className="text-white text-lg font-semibold mb-4">
                  Next Steps:
                </Text>

                <View className="flex-row mb-4">
                  <View className="w-7 h-7 rounded-full bg-[#4ECDC4] justify-center items-center mr-3">
                    <Text className="text-black text-sm font-bold">1</Text>
                  </View>
                  <Text className="text-[#AAAAAA] text-sm flex-1 leading-5 pt-1">
                    {selectedMethod === "email"
                      ? "Check your email inbox (and spam folder)"
                      : "Check your phone messages"}
                  </Text>
                </View>

                <View className="flex-row mb-4">
                  <View className="w-7 h-7 rounded-full bg-[#4ECDC4] justify-center items-center mr-3">
                    <Text className="text-black text-sm font-bold">2</Text>
                  </View>
                  <Text className="text-[#AAAAAA] text-sm flex-1 leading-5 pt-1">
                    Click the reset link or enter the code provided
                  </Text>
                </View>

                <View className="flex-row mb-4">
                  <View className="w-7 h-7 rounded-full bg-[#4ECDC4] justify-center items-center mr-3">
                    <Text className="text-black text-sm font-bold">3</Text>
                  </View>
                  <Text className="text-[#AAAAAA] text-sm flex-1 leading-5 pt-1">
                    Create a new strong password
                  </Text>
                </View>
              </View>

              <View className="gap-3">
                <TouchableOpacity
                  className="bg-[#4ECDC4] py-4 rounded-xl items-center"
                  onPress={handleResend}
                >
                  <Text className="text-black text-base font-semibold">
                    Resend Instructions
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-[#4ECDC4]/10 py-4 rounded-xl items-center border border-[#4ECDC4]"
                  onPress={handleTryAnotherMethod}
                >
                  <Text className="text-[#4ECDC4] text-base font-semibold">
                    Try Another Method
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Help Section */}
          <View className="flex-row items-center bg-[#4ECDC4]/10 mx-4 p-4 rounded-xl gap-3 mb-6">
            <MessageCircle size={20} color="#4ECDC4" />
            <Text className="text-[#4ECDC4] text-xs flex-1 leading-4">
              Need help? Contact our support team at support@ecommerceapp.com
            </Text>
          </View>

          {/* Back to Login */}
          <TouchableOpacity
            className="flex-row items-center justify-center mx-4 py-4 gap-2"
            onPress={handleBackToLogin}
          >
            <ArrowLeft size={20} color="#FFFFFF" />
            <Text className="text-white text-base font-medium">
              Back to Sign In
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}