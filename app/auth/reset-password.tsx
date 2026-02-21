import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChevronLeft,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Key,
} from 'lucide-react-native';

// Password validation schema
const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ResetPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const email = params.email as string || '';
  const token = params.token as string || '';

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  // Calculate password strength
  React.useEffect(() => {
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    
    setPasswordStrength(strength);
  }, [password]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 75) return '#4ECDC4';
    if (passwordStrength >= 50) return '#FFD166';
    if (passwordStrength >= 25) return '#FF9E00';
    return '#EF476F';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength >= 75) return 'Strong';
    if (passwordStrength >= 50) return 'Good';
    if (passwordStrength >= 25) return 'Weak';
    return 'Very Weak';
  };

  const onSubmit = async (data: PasswordFormData) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful password reset
      Alert.alert(
        'Password Reset Successful',
        'Your password has been reset successfully. You can now login with your new password.',
        [
          {
            text: 'Login Now',
            onPress: () => {
              router.replace('/auth/login');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPasswordRequirement = (text: string, isValid: boolean) => (
    <View key={text} className="flex-row items-center gap-2">
      <View
        className={`w-4 h-4 rounded-full justify-center items-center ${
          isValid ? 'bg-[#4ECDC4]/10' : 'bg-[#2A2A2A]'
        }`}
      >
        {isValid ? (
          <CheckCircle size={12} color="#4ECDC4" />
        ) : (
          <View className="w-1.5 h-1.5 rounded-full bg-[#666666]" />
        )}
      </View>
      <Text className={`text-xs ${isValid ? 'text-[#4ECDC4]' : 'text-[#888888]'}`}>
        {text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">Reset Password</Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 px-6 pt-10"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Icon */}
          <View className="items-center mb-6">
            <View className="w-24 h-24 rounded-full bg-[#4ECDC4]/10 justify-center items-center">
              <Key size={48} color="#4ECDC4" />
            </View>
          </View>

          {/* Title */}
          <Text className="text-white text-3xl font-bold text-center mb-2">
            Create New Password
          </Text>
          <Text className="text-[#888888] text-base text-center leading-6 mb-8">
            Your new password must be different from previously used passwords
          </Text>

          {/* Email Display (if available) */}
          {email && (
            <View className="bg-[#1A1A1A] p-4 rounded-xl mb-6">
              <Text className="text-[#888888] text-xs mb-1">
                Resetting password for:
              </Text>
              <Text className="text-white text-base font-semibold">{email}</Text>
            </View>
          )}

          {/* Password Field */}
          <View className="mb-5">
            <Text className="text-white text-sm font-semibold mb-2">
              New Password
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, onBlur } }) => (
                <View
                  className={`flex-row items-center bg-[#1A1A1A] rounded-xl px-4 border ${
                    errors.password ? 'border-[#EF476F]' : 'border-[#2A2A2A]'
                  }`}
                >
                  <Lock size={20} color="#666666" className="mr-3" />
                  <TextInput
                    className="flex-1 text-white text-base py-4"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter new password"
                    placeholderTextColor="#666666"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    className="p-2"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#888888" />
                    ) : (
                      <Eye size={20} color="#888888" />
                    )}
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <Text className="text-[#EF476F] text-xs mt-1">
                {errors.password.message}
              </Text>
            )}

            {/* Password Strength */}
            {password.length > 0 && (
              <View className="flex-row items-center gap-3 mt-3">
                <View className="flex-1 h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${passwordStrength}%`,
                      backgroundColor: getPasswordStrengthColor(),
                    }}
                  />
                </View>
                <Text
                  className="text-xs font-semibold min-w-[60px]"
                  style={{ color: getPasswordStrengthColor() }}
                >
                  {getPasswordStrengthText()}
                </Text>
              </View>
            )}
          </View>

          {/* Confirm Password Field */}
          <View className="mb-5">
            <Text className="text-white text-sm font-semibold mb-2">
              Confirm Password
            </Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value, onBlur } }) => (
                <View
                  className={`flex-row items-center bg-[#1A1A1A] rounded-xl px-4 border ${
                    errors.confirmPassword ? 'border-[#EF476F]' : 'border-[#2A2A2A]'
                  }`}
                >
                  <Lock size={20} color="#666666" className="mr-3" />
                  <TextInput
                    className="flex-1 text-white text-base py-4"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Confirm new password"
                    placeholderTextColor="#666666"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    className="p-2"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color="#888888" />
                    ) : (
                      <Eye size={20} color="#888888" />
                    )}
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.confirmPassword && (
              <Text className="text-[#EF476F] text-xs mt-1">
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          {/* Password Requirements */}
          <View className="bg-[#1A1A1A] rounded-xl p-5 mb-6">
            <Text className="text-white text-sm font-semibold mb-3">
              Password must contain:
            </Text>
            <View className="gap-2">
              {renderPasswordRequirement(
                'At least 8 characters',
                password.length >= 8
              )}
              {renderPasswordRequirement(
                'One uppercase letter',
                /[A-Z]/.test(password)
              )}
              {renderPasswordRequirement(
                'One lowercase letter',
                /[a-z]/.test(password)
              )}
              {renderPasswordRequirement(
                'One number',
                /[0-9]/.test(password)
              )}
              {renderPasswordRequirement(
                'One special character',
                /[^A-Za-z0-9]/.test(password)
              )}
              {renderPasswordRequirement(
                'Passwords match',
                watch('password') === watch('confirmPassword') && watch('confirmPassword').length > 0
              )}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className={`bg-[#4ECDC4] py-4 rounded-xl items-center mb-4 ${
              (!isValid || isSubmitting) ? 'opacity-50' : ''
            }`}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
          >
            <Text className="text-black text-base font-semibold">
              {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
            </Text>
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity
            className="py-4 items-center mb-8"
            onPress={() => router.push('/auth/login')}
          >
            <Text className="text-[#888888] text-sm">
              Remember your password?{' '}
              <Text className="text-[#4ECDC4] font-semibold">Login</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}