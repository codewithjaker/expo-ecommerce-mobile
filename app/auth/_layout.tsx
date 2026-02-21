import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0F0F0F" },
          animation: "slide_from_right",
        }}
      >
        {/* Main Entry Points */}
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />

        {/* Password Recovery Flow */}
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="verify-otp" />
        <Stack.Screen name="reset-password" />
      </Stack>
    </>
  );
}
