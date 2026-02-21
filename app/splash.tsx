import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { ShoppingBag, Sparkles } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete?: () => void;
  duration?: number;
}

export default function SplashScreen({ 
  onAnimationComplete, 
  duration = 2000 
}: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Parallel animation sequence
    Animated.parallel([
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      
      // Scale up
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      
      // Rotate bag
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.cubic),
      }),
      
      // Slide up text
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();

    // Pulse animation for sparkles
    const pulseAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    // Start pulse after initial animation
    setTimeout(() => {
      pulseAnim.start();
    }, 1000);

    // Complete animation
    const timer = setTimeout(() => {
      onAnimationComplete?.();
    }, duration);

    return () => {
      clearTimeout(timer);
      pulseAnim.stop();
    };
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="flex-1 bg-[#0F0F0F] justify-center items-center">
      {/* Background gradient */}
      <View className="absolute inset-0 overflow-hidden">
        <View className="absolute w-[400] h-[400] bg-[#4ECDC4] opacity-10 rounded-full top-[-200] left-[-100]" />
        <View className="absolute w-[300] h-[300] bg-[#FF6B6B] opacity-10 rounded-full bottom-[-150] right-[-50]" />
        <View className="absolute w-[200] h-[200] bg-[#FFD700] opacity-10 rounded-full top-[60%] left-[70%]" />
      </View>

      {/* Animated Content */}
      <View className="items-center justify-center flex-1">
        {/* Logo/Bag Animation */}
        <Animated.View
          className="mb-10"
          style={[
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { rotate: rotateInterpolate },
              ],
            },
          ]}
        >
          <View className="w-35 h-35 rounded-full bg-[#1A1A1A] justify-center items-center border-2 border-[#2A2A2A] relative">
            <ShoppingBag size={64} color="#4ECDC4" />
            
            {/* Sparkle animations */}
            <Animated.View 
              className="absolute top-5 right-5"
              style={{ opacity: fadeAnim }}
            >
              <Sparkles size={20} color="#FFD700" />
            </Animated.View>
            
            <Animated.View 
              className="absolute bottom-7 left-5"
              style={{ opacity: fadeAnim }}
            >
              <Sparkles size={16} color="#FF6B6B" />
            </Animated.View>
            
            <Animated.View 
              className="absolute top-12 left-2.5"
              style={{ opacity: fadeAnim }}
            >
              <Sparkles size={12} color="#4ECDC4" />
            </Animated.View>
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.View
          className="items-center mb-15"
          style={[
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }],
            },
          ]}
        >
          <Text className="text-white text-4xl font-extrabold tracking-wider mb-2">
            Ecommerce
          </Text>
          <Text className="text-[#888888] text-sm tracking-wide">
            Premium Shopping Experience
          </Text>
        </Animated.View>

        {/* Loading Dots */}
        <View className="flex-row items-center gap-3">
          <View className="w-3 h-3 rounded-full bg-[#4ECDC4]" />
          <View className="w-3 h-3 rounded-full bg-[#4ECDC4]" />
          <View className="w-3 h-3 rounded-full bg-[#4ECDC4]" />
        </View>
      </View>

      {/* Footer */}
      <View className="absolute bottom-10 items-center">
        <Text className="text-[#666666] text-xs mb-1">
          © 2024 Ecommerce App
        </Text>
        <Text className="text-[#888888] text-[10px]">
          v1.0.0
        </Text>
      </View>
    </View>
  );
}