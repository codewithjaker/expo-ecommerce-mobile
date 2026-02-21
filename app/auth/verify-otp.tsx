import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeft,
  Lock,
  Clock,
  Mail,
  Smartphone,
  CheckCircle,
} from "lucide-react-native";

// OTP validation schema
const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

type OtpFormData = z.infer<typeof otpSchema>;

export default function VerifyOtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [verified, setVerified] = useState(false);
  const otpInputRef = useRef<TextInput>(null);

  const email = (params.email as string) || "user@example.com";
  const phone = params.phone as string;
  const type = (params.type as "email") || "phone";

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = watch("otp");

  // Auto-submit when OTP is complete
  useEffect(() => {
    if (otpValue.length === 6) {
      handleSubmit(onSubmit)();
    }
  }, [otpValue]);

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const onSubmit = async (data: OtpFormData) => {
    try {
      Keyboard.dismiss();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock verification
      const isValid = data.otp === "123456"; // In real app, verify against API

      if (isValid) {
        setVerified(true);

        Alert.alert("Success", "Email verified successfully!", [
          {
            text: "Continue",
            onPress: () => {
              if (params.reset) {
                router.push("/auth/reset-password");
              } else {
                router.replace("/(tabs)");
              }
            },
          },
        ]);
      } else {
        Alert.alert("Invalid OTP", "Please enter the correct OTP code.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to verify OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTimer(60);
    setIsResending(false);

    Alert.alert("OTP Sent", "A new OTP has been sent to your email/phone.");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOtpChange = (text: string) => {
    // Only allow numbers
    const numbersOnly = text.replace(/[^0-9]/g, "");
    setValue("otp", numbersOnly.slice(0, 6));
  };

  const renderOtpInput = () => {
    const digits = otpValue.split("");
    const emptyDigits = Array(6 - digits.length).fill("");
    const allDigits = [...digits, ...emptyDigits];

    return (
      <View className="flex-row justify-center gap-3 mb-2">
        {allDigits.map((digit, index) => (
          <TouchableOpacity
            key={index}
            className={`w-14 h-14 rounded-xl bg-[#1A1A1A] border-2 border-[#2A2A2A] justify-center items-center relative ${
              index < digits.length ? "bg-[#4ECDC4]/10 border-[#4ECDC4]" : ""
            } ${errors.otp ? "border-[#EF476F]" : ""}`}
            onPress={() => otpInputRef.current?.focus()}
          >
            <Text
              className={`text-2xl font-semibold ${
                index < digits.length ? "text-white" : "text-[#888888]"
              }`}
            >
              {digit || ""}
            </Text>

            {/* Cursor for current position */}
            {index === digits.length && (
              <View className="absolute bottom-2 w-0.5 h-5 bg-[#4ECDC4] animate-pulse" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">Verify OTP</Text>
          <View className="w-10" />
        </View>

        {/* Content */}
        <View className="flex-1 px-6 pt-10">
          {/* Icon */}
          <View className="items-center mb-6">
            <View
              className={`w-24 h-24 rounded-full justify-center items-center ${
                verified ? "bg-[#4ECDC4]/20" : "bg-[#4ECDC4]/10"
              }`}
            >
              {verified ? (
                <CheckCircle size={48} color="#4ECDC4" />
              ) : (
                <Lock size={48} color="#4ECDC4" />
              )}
            </View>
          </View>

          {/* Title */}
          <Text className="text-white text-3xl font-bold text-center mb-2">
            {verified ? "Verified!" : "Enter Verification Code"}
          </Text>

          {/* Description */}
          <Text className="text-[#888888] text-base text-center leading-6 mb-8">
            {verified
              ? "Your email has been verified successfully"
              : `We sent a 6-digit code to your ${
                  type === "email" ? "email address" : "phone number"
                }`}
          </Text>

          {/* Email/Phone Display */}
          <View className="flex-row items-center bg-[#1A1A1A] p-4 rounded-xl mb-8">
            <View className="w-10 h-10 rounded-full bg-[#4ECDC4]/10 justify-center items-center mr-3">
              {type === "email" ? (
                <Mail size={20} color="#4ECDC4" />
              ) : (
                <Smartphone size={20} color="#4ECDC4" />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-[#888888] text-xs mb-0.5">
                {type === "email" ? "Email" : "Phone Number"}
              </Text>
              <Text className="text-white text-base font-semibold">
                {type === "email" ? email : phone}
              </Text>
            </View>
          </View>

          {/* Hidden Input */}
          <Controller
            control={control}
            name="otp"
            render={({ field: { onChange, value } }) => (
              <TextInput
                ref={otpInputRef}
                className="absolute opacity-0 w-0 h-0"
                value={value}
                onChangeText={handleOtpChange}
                keyboardType="number-pad"
                maxLength={6}
                autoFocus={true}
                caretHidden={true}
              />
            )}
          />

          {/* OTP Display */}
          {renderOtpInput()}

          {/* Error Message */}
          {errors.otp && (
            <Text className="text-[#EF476F] text-sm text-center mb-4">
              {errors.otp.message}
            </Text>
          )}

          {/* Timer */}
          <View className="flex-row items-center justify-center gap-2 mb-4">
            <Clock size={16} color="#888888" />
            <Text className="text-[#888888] text-sm">
              {timer > 0
                ? `Resend code in ${formatTime(timer)}`
                : "Code expired"}
            </Text>
          </View>

          {/* Resend Button */}
          <TouchableOpacity
            className={`py-3 items-center ${timer > 0 ? "opacity-50" : ""}`}
            onPress={handleResendOtp}
            disabled={timer > 0 || isResending}
          >
            <Text
              className={`text-base font-semibold ${
                timer > 0 ? "text-[#888888]" : "text-[#4ECDC4]"
              }`}
            >
              {isResending ? "Sending..." : "Resend Code"}
            </Text>
          </TouchableOpacity>

          {/* Verify Button */}
          {!verified && otpValue.length === 6 && (
            <TouchableOpacity
              className={`bg-[#4ECDC4] py-4 rounded-xl items-center mt-2 mb-6 ${
                isSubmitting ? "opacity-70" : ""
              }`}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              <Text className="text-black text-base font-semibold">
                {isSubmitting ? "Verifying..." : "Verify"}
              </Text>
            </TouchableOpacity>
          )}

          {/* Help Text */}
          <Text className="text-[#666666] text-xs text-center leading-4">
            Didn't receive the code? Check your spam folder or request a new
            code.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}