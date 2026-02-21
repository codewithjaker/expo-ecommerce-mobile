import { Stack } from 'expo-router';
import { CheckoutProvider } from '../../context/CheckoutContext';

export default function CheckoutLayout() {
  return (
    <CheckoutProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0F0F0F',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
          // headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Checkout',
          }}
        />
        <Stack.Screen
          name="shipping"
          options={{
            title: 'Shipping Address',
          }}
        />
        <Stack.Screen
          name="payment"
          options={{
            title: 'Payment Method',
          }}
        />
        <Stack.Screen
          name="confirmation"
          options={{
            title: 'Order Confirmation',
            headerShown: false,
          }}
        />
      </Stack>
    </CheckoutProvider>
  );
}