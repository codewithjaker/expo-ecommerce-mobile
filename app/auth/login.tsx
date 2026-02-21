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
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowLeft,
  Smartphone,
  Fingerprint,
  AlertCircle,
} from "lucide-react-native";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useBiometric, setUseBiometric] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Welcome Back!", "You have successfully logged in.", [
        {
          text: "Continue",
          onPress: () => router.replace("/(tabs)"),
        },
      ]);
    }, 1500);
  };

  const handleBiometricLogin = () => {
    setUseBiometric(true);
    setTimeout(() => {
      router.replace("/(tabs)");
    }, 1000);
  };

  const handleForgotPassword = () => {
    router.push("/auth/forgot-password");
  };

  const handleRegister = () => {
    router.push("/auth/register");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerClassName="flex-grow pb-10">
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

          {/* Welcome Section */}
          <View className="px-4 py-8 items-center">
            <Text className="text-white text-3xl font-bold mb-2">
              Welcome Back
            </Text>
            <Text className="text-[#888888] text-base text-center">
              Sign in to your account to continue
            </Text>
          </View>

          {/* Form */}
          <View className="px-4">
            {/* Email */}
            <View className="mb-5">
              <View className="flex-row items-center mb-2 gap-2">
                <Mail size={16} color="#888888" />
                <Text className="text-[#888888] text-sm">Email Address</Text>
              </View>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`bg-[#1A1A1A] text-white text-base px-4 py-3.5 rounded-xl border ${
                      errors.email ? "border-[#EF476F]" : "border-[#333333]"
                    }`}
                    placeholder="Enter your email"
                    placeholderTextColor="#666666"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="email"
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

            {/* Password */}
            <View className="mb-5">
              <View className="flex-row items-center mb-2 gap-2">
                <Lock size={16} color="#888888" />
                <Text className="text-[#888888] text-sm">Password</Text>
              </View>
              <View className="relative">
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className={`bg-[#1A1A1A] text-white text-base px-4 py-3.5 rounded-xl border pr-12 ${
                        errors.password
                          ? "border-[#EF476F]"
                          : "border-[#333333]"
                      }`}
                      placeholder="Enter your password"
                      placeholderTextColor="#666666"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showPassword}
                      autoComplete="password"
                    />
                  )}
                />
                <TouchableOpacity
                  className="absolute right-4 top-0 bottom-0 justify-center"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#888888" />
                  ) : (
                    <Eye size={20} color="#888888" />
                  )}
                </TouchableOpacity>
              </View>
              {errors.password && (
                <View className="flex-row items-center mt-2 gap-1.5">
                  <AlertCircle size={14} color="#EF476F" />
                  <Text className="text-[#EF476F] text-xs">
                    {errors.password.message}
                  </Text>
                </View>
              )}
            </View>

            {/* Remember Me & Forgot Password */}
            <View className="flex-row justify-between items-center mb-6">
              <Controller
                control={control}
                name="rememberMe"
                render={({ field: { onChange, value } }) => (
                  <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => onChange(!value)}
                  >
                    <View
                      className={`w-5 h-5 rounded-md border-2 mr-2 justify-center items-center ${
                        value
                          ? "bg-[#4ECDC4] border-[#4ECDC4]"
                          : "border-[#666666]"
                      }`}
                    >
                      {value && (
                        <Text className="text-black text-xs font-bold">✓</Text>
                      )}
                    </View>
                    <Text className="text-[#888888] text-sm">Remember me</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text className="text-[#4ECDC4] text-sm font-medium">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className={`py-4 rounded-xl items-center mb-4 ${
                isLoading ? "bg-[#666666]" : "bg-[#4ECDC4]"
              }`}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              <Text className="text-black text-base font-semibold">
                {isLoading ? "Signing in..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            {/* Biometric Login */}
            <TouchableOpacity
              className="flex-row items-center justify-center bg-[#4ECDC4]/10 py-3.5 rounded-xl border border-[#4ECDC4] gap-2 mb-6"
              onPress={handleBiometricLogin}
            >
              <Fingerprint size={20} color="#4ECDC4" />
              <Text className="text-[#4ECDC4] text-sm font-medium">
                {useBiometric ? "Authenticating..." : "Use Face ID / Touch ID"}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-[1px] bg-[#333333]" />
              <Text className="text-[#666666] text-xs mx-3">
                or continue with
              </Text>
              <View className="flex-1 h-[1px] bg-[#333333]" />
            </View>

            {/* Social Login */}
            <View className="flex-row justify-center gap-3 mb-8">
              <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-[#1A1A1A] py-3 rounded-xl gap-2">
                <Image
                  source={{
                    uri: "https://img.icons8.com/color/48/000000/google-logo.png",
                  }}
                  className="w-6 h-6"
                />
                <Text className="text-white text-sm font-medium">Google</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-[#1A1A1A] py-3 rounded-xl gap-2">
                <Image
                  source={{
                    uri: "https://img.icons8.com/ios-filled/50/000000/facebook.png",
                  }}
                  className="w-6 h-6"
                />
                <Text className="text-white text-sm font-medium">Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-[#1A1A1A] py-3 rounded-xl gap-2">
                <Smartphone size={24} color="#FFFFFF" />
                <Text className="text-white text-sm font-medium">Phone</Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View className="flex-row justify-center items-center mb-6">
              <Text className="text-[#888888] text-sm">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text className="text-[#4ECDC4] text-sm font-semibold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms & Privacy */}
          <Text className="text-[#666666] text-xs text-center px-4 leading-4">
            By signing in, you agree to our{" "}
            <Text
              className="text-[#4ECDC4]"
              onPress={() => router.push("/terms")}
            >
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text
              className="text-[#4ECDC4]"
              onPress={() => router.push("/privacy-policy")}
            >
              Privacy Policy
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
