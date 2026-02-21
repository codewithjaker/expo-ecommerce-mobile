import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import {
  ChevronLeft,
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
} from 'lucide-react-native';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: string;
  address: string;
  bio: string;
};

export default function EditProfileScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: 'Andrew',
      lastName: 'Ainsley',
      email: 'andrew.ainsley@example.com',
      phone: '+1 (234) 567-8900',
      birthday: '1990-05-15',
      address: '123 Main St, New York, NY 10001',
      bio: 'Fashion enthusiast and tech lover. Always looking for the latest trends.',
    },
  });

  const onSubmit = (data: FormData) => {
    Alert.alert('Success', 'Profile updated successfully!');
    console.log('Form data:', data);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F0F]" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Edit Profile</Text>
        <TouchableOpacity
          className="p-2 bg-[#4ECDC4]/10 rounded-xl"
          onPress={handleSubmit(onSubmit)}
        >
          <Save size={20} color="#4ECDC4" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Picture */}
        <View className="items-center py-8">
          <View className="relative mb-3">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face' }}
              className="w-[120px] h-[120px] rounded-full"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-[#4ECDC4] w-9 h-9 rounded-full justify-center items-center border-[3px] border-[#0F0F0F]">
              <Camera size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text className="text-[#888888] text-xs">Tap to change photo</Text>
        </View>

        {/* Form */}
        <View className="px-4 pb-8">
          {/* First & Last Name */}
          <View className="mb-5">
            <View className="flex-row items-center mb-2 gap-2">
              <User size={16} color="#888888" />
              <Text className="text-[#888888] text-sm">Full Name</Text>
            </View>
            <View className="flex-row gap-3">
              <Controller
                control={control}
                name="firstName"
                rules={{ required: 'First name is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="flex-1 bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                    value={value}
                    onChangeText={onChange}
                    placeholder="First Name"
                    placeholderTextColor="#666666"
                  />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                rules={{ required: 'Last name is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="flex-1 bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Last Name"
                    placeholderTextColor="#666666"
                  />
                )}
              />
            </View>
            {(errors.firstName || errors.lastName) && (
              <Text className="text-[#EF476F] text-xs mt-1">
                {errors.firstName?.message || errors.lastName?.message}
              </Text>
            )}
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
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your email"
                  placeholderTextColor="#666666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.email && (
              <Text className="text-[#EF476F] text-xs mt-1">{errors.email.message}</Text>
            )}
          </View>

          {/* Phone */}
          <View className="mb-5">
            <View className="flex-row items-center mb-2 gap-2">
              <Phone size={16} color="#888888" />
              <Text className="text-[#888888] text-sm">Phone Number</Text>
            </View>
            <Controller
              control={control}
              name="phone"
              rules={{ required: 'Phone number is required' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#666666"
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.phone && (
              <Text className="text-[#EF476F] text-xs mt-1">{errors.phone.message}</Text>
            )}
          </View>

          {/* Birthday */}
          <View className="mb-5">
            <View className="flex-row items-center mb-2 gap-2">
              <Calendar size={16} color="#888888" />
              <Text className="text-[#888888] text-sm">Date of Birth</Text>
            </View>
            <Controller
              control={control}
              name="birthday"
              rules={{ required: 'Birthday is required' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border border-[#333333]"
                  value={value}
                  onChangeText={onChange}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#666666"
                />
              )}
            />
            {errors.birthday && (
              <Text className="text-[#EF476F] text-xs mt-1">{errors.birthday.message}</Text>
            )}
          </View>

          {/* Address */}
          <View className="mb-5">
            <View className="flex-row items-center mb-2 gap-2">
              <MapPin size={16} color="#888888" />
              <Text className="text-[#888888] text-sm">Address</Text>
            </View>
            <Controller
              control={control}
              name="address"
              rules={{ required: 'Address is required' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border border-[#333333] min-h-[80px]"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your address"
                  placeholderTextColor="#666666"
                  multiline
                  numberOfLines={3}
                  style={{ textAlignVertical: 'top' }}
                />
              )}
            />
            {errors.address && (
              <Text className="text-[#EF476F] text-xs mt-1">{errors.address.message}</Text>
            )}
          </View>

          {/* Bio */}
          <View className="mb-5">
            <Text className="text-[#888888] text-sm mb-2">Bio</Text>
            <Controller
              control={control}
              name="bio"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-[#1A1A1A] text-white text-base px-4 py-3 rounded-xl border border-[#333333] min-h-[100px]"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Tell us about yourself"
                  placeholderTextColor="#666666"
                  multiline
                  numberOfLines={4}
                  maxLength={200}
                  style={{ textAlignVertical: 'top' }}
                />
              )}
            />
            <Controller
              control={control}
              name="bio"
              render={({ field: { value } }) => (
                <Text className="text-[#666666] text-xs text-right mt-1">
                  {value?.length || 0}/200 characters
                </Text>
              )}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            className="bg-[#4ECDC4] py-4 rounded-xl items-center mt-6"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-black text-base font-semibold">Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}