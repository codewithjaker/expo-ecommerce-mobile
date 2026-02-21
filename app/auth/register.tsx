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
  User,
  ArrowLeft,
  Check,
  AlertCircle,
} from "lucide-react-native";

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const password = watch("password");

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  React.useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Account Created!",
        "Your account has been successfully created.",
        [
          {
            text: "Continue",
            onPress: () => router.replace("/(tabs)"),
          },
        ]
      );
    }, 1500);

  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "#EF476F";
    if (passwordStrength < 75) return "#FFD166";
    return "#4ECDC4";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 50) return "Weak";
    if (passwordStrength < 75) return "Medium";
    return "Strong";
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
              Create Account
            </Text>
            <Text className="text-[#888888] text-base text-center">
              Join our community today
            </Text>
          </View>

          {/* Form */}
          <View className="px-4">
            {/* Name Fields */}
            <View className="flex-row mb-5">
              <View className="flex-1 mr-2">
                <View className="flex-row items-center mb-2 gap-2">
                  <User size={16} color="#888888" />
                  <Text className="text-[#888888] text-sm">First Name</Text>
                </View>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className={`bg-[#1A1A1A] text-white text-base px-4 py-3.5 rounded-xl border ${
                        errors.firstName ? "border-[#EF476F]" : "border-[#333333]"
                      }`}
                      placeholder="John"
                      placeholderTextColor="#666666"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="words"
                      autoComplete="name-given"
                    />
                  )}
                />
                {errors.firstName && (
                  <View className="flex-row items-center mt-2 gap-1.5">
                    <AlertCircle size={14} color="#EF476F" />
                    <Text className="text-[#EF476F] text-xs">
                      {errors.firstName.message}
                    </Text>
                  </View>
                )}
              </View>

              <View className="flex-1 ml-2">
                <View className="flex-row items-center mb-2 gap-2">
                  <User size={16} color="#888888" />
                  <Text className="text-[#888888] text-sm">Last Name</Text>
                </View>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className={`bg-[#1A1A1A] text-white text-base px-4 py-3.5 rounded-xl border ${
                        errors.lastName ? "border-[#EF476F]" : "border-[#333333]"
                      }`}
                      placeholder="Doe"
                      placeholderTextColor="#666666"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="words"
                      autoComplete="name-family"
                    />
                  )}
                />
                {errors.lastName && (
                  <View className="flex-row items-center mt-2 gap-1.5">
                    <AlertCircle size={14} color="#EF476F" />
                    <Text className="text-[#EF476F] text-xs">
                      {errors.lastName.message}
                    </Text>
                  </View>
                )}
              </View>
            </View>

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
                    placeholder="john.doe@example.com"
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
                        errors.password ? "border-[#EF476F]" : "border-[#333333]"
                      }`}
                      placeholder="Create a strong password"
                      placeholderTextColor="#666666"
                      value={value}
                      onChangeText={(text) => {
                        onChange(text);
                        setPasswordStrength(calculatePasswordStrength(text));
                      }}
                      onBlur={onBlur}
                      secureTextEntry={!showPassword}
                      autoComplete="new-password"
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

              {/* Password Strength */}
              {password ? (
                <View className="flex-row items-center mt-3 gap-3">
                  <View className="flex-1 h-1 bg-[#333333] rounded-full overflow-hidden">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${passwordStrength}%`,
                        backgroundColor: getPasswordStrengthColor(),
                      }}
                    />
                  </View>
                  <Text
                    className="text-xs font-semibold min-w-[50px]"
                    style={{ color: getPasswordStrengthColor() }}
                  >
                    {getPasswordStrengthText()}
                  </Text>
                </View>
              ) : null}

              {/* Password Requirements */}
              <View className="bg-[#1A1A1A] rounded-lg p-3 mt-3">
                <Text className="text-[#888888] text-xs mb-2">
                  Password must contain:
                </Text>
                <View className="flex-row items-center mb-1.5 gap-2">
                  <Check
                    size={12}
                    color={/[A-Z]/.test(password) ? "#4ECDC4" : "#666666"}
                  />
                  <Text
                    className={`text-xs ${
                      /[A-Z]/.test(password)
                        ? "text-[#4ECDC4]"
                        : "text-[#666666]"
                    }`}
                  >
                    At least one uppercase letter
                  </Text>
                </View>
                <View className="flex-row items-center mb-1.5 gap-2">
                  <Check
                    size={12}
                    color={/[a-z]/.test(password) ? "#4ECDC4" : "#666666"}
                  />
                  <Text
                    className={`text-xs ${
                      /[a-z]/.test(password)
                        ? "text-[#4ECDC4]"
                        : "text-[#666666]"
                    }`}
                  >
                    At least one lowercase letter
                  </Text>
                </View>
                <View className="flex-row items-center mb-1.5 gap-2">
                  <Check
                    size={12}
                    color={/\d/.test(password) ? "#4ECDC4" : "#666666"}
                  />
                  <Text
                    className={`text-xs ${
                      /\d/.test(password) ? "text-[#4ECDC4]" : "text-[#666666]"
                    }`}
                  >
                    At least one number
                  </Text>
                </View>
                <View className="flex-row items-center mb-1.5 gap-2">
                  <Check
                    size={12}
                    color={/[@$!%*?&]/.test(password) ? "#4ECDC4" : "#666666"}
                  />
                  <Text
                    className={`text-xs ${
                      /[@$!%*?&]/.test(password)
                        ? "text-[#4ECDC4]"
                        : "text-[#666666]"
                    }`}
                  >
                    At least one special character
                  </Text>
                </View>
                <View className="flex-row items-center mb-1.5 gap-2">
                  <Check
                    size={12}
                    color={password.length >= 8 ? "#4ECDC4" : "#666666"}
                  />
                  <Text
                    className={`text-xs ${
                      password.length >= 8
                        ? "text-[#4ECDC4]"
                        : "text-[#666666]"
                    }`}
                  >
                    Minimum 8 characters
                  </Text>
                </View>
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

            {/* Confirm Password */}
            <View className="mb-5">
              <View className="flex-row items-center mb-2 gap-2">
                <Lock size={16} color="#888888" />
                <Text className="text-[#888888] text-sm">Confirm Password</Text>
              </View>
              <View className="relative">
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className={`bg-[#1A1A1A] text-white text-base px-4 py-3.5 rounded-xl border pr-12 ${
                        errors.confirmPassword
                          ? "border-[#EF476F]"
                          : "border-[#333333]"
                      }`}
                      placeholder="Confirm your password"
                      placeholderTextColor="#666666"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showConfirmPassword}
                      autoComplete="new-password"
                    />
                  )}
                />
                <TouchableOpacity
                  className="absolute right-4 top-0 bottom-0 justify-center"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="#888888" />
                  ) : (
                    <Eye size={20} color="#888888" />
                  )}
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <View className="flex-row items-center mt-2 gap-1.5">
                  <AlertCircle size={14} color="#EF476F" />
                  <Text className="text-[#EF476F] text-xs">
                    {errors.confirmPassword.message}
                  </Text>
                </View>
              )}
            </View>

            {/* Terms Agreement */}
            <View className="mb-6">
              <Controller
                control={control}
                name="agreeToTerms"
                render={({ field: { onChange, value } }) => (
                  <TouchableOpacity
                    className="flex-row items-start"
                    onPress={() => onChange(!value)}
                  >
                    <View
                      className={`w-5 h-5 rounded border-2 mr-2 mt-0.5 justify-center items-center ${
                        value
                          ? "bg-[#4ECDC4] border-[#4ECDC4]"
                          : "border-[#666666]"
                      }`}
                    >
                      {value && <Check size={12} color="#000000" />}
                    </View>
                    <Text className="text-[#888888] text-sm flex-1 leading-5">
                      I agree to the{" "}
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
                  </TouchableOpacity>
                )}
              />
              {errors.agreeToTerms && (
                <View className="flex-row items-center mt-2 gap-1.5">
                  <AlertCircle size={14} color="#EF476F" />
                  <Text className="text-[#EF476F] text-xs">
                    {errors.agreeToTerms.message}
                  </Text>
                </View>
              )}
            </View>

            {/* Register Button */}
            <TouchableOpacity
              className={`py-4 rounded-xl items-center mb-6 ${
                isLoading ? "bg-[#666666]" : "bg-[#4ECDC4]"
              }`}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              <Text className="text-black text-base font-semibold">
                {isLoading ? "Creating Account..." : "Create Account"}
              </Text>
            </TouchableOpacity>

            {/* Already have account */}
            <View className="flex-row justify-center items-center mb-6">
              <Text className="text-[#888888] text-sm">
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text className="text-[#4ECDC4] text-sm font-semibold">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-[#333333]" />
              <Text className="text-[#666666] text-xs mx-3">
                or sign up with
              </Text>
              <View className="flex-1 h-px bg-[#333333]" />
            </View>

            {/* Social Sign Up */}
            <View className="flex-row justify-center gap-3">
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
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}