// context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { router } from "expo-router";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  membership?: string;
  loyaltyPoints: number;
  createdAt: Date;
  lastLogin: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  refreshToken: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Default user for demo
const defaultUser: User = {
  id: "1",
  name: "Andrew Ainsley",
  email: "andrew.ainsley@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  phone: "+1 (234) 567-8900",
  address: "123 Main St, New York, NY 10001",
  membership: "Gold Member",
  loyaltyPoints: 1540,
  createdAt: new Date("2023-10-01"),
  lastLogin: new Date(),
};

// Storage keys
const STORAGE_KEYS = {
  USER: "ecommerce_user",
  TOKENS: "ecommerce_tokens",
  SESSION: "ecommerce_session",
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API functions (replace with actual API calls)
const mockAPI = {
  login: async (
    credentials: LoginCredentials
  ): Promise<{ user: User; tokens: AuthTokens }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      credentials.email === "demo@example.com" &&
      credentials.password === "password"
    ) {
      return {
        user: defaultUser,
        tokens: {
          accessToken: "mock_access_token",
          refreshToken: "mock_refresh_token",
          expiresIn: 3600,
        },
      };
    }

    throw new Error("Invalid credentials");
  },

  register: async (
    data: RegisterData
  ): Promise<{ user: User; tokens: AuthTokens }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      phone: data.phone,
      loyaltyPoints: 100, // Welcome points
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    return {
      user: newUser,
      tokens: {
        accessToken: "mock_access_token",
        refreshToken: "mock_refresh_token",
        expiresIn: 3600,
      },
    };
  },

  refreshToken: async (refreshToken: string): Promise<AuthTokens> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      accessToken: "mock_new_access_token",
      refreshToken: "mock_new_refresh_token",
      expiresIn: 3600,
    };
  },

  updateProfile: async (
    userId: string,
    userData: Partial<User>
  ): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      ...defaultUser,
      ...userData,
      id: userId,
    };
  },

  resetPassword: async (email: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In real app, this would send reset email
  },
};

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    tokens: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Load stored auth state on mount
  useEffect(() => {
    loadStoredAuth();
  }, []);

  // Auto-refresh token before expiry
  useEffect(() => {
    if (authState.tokens?.expiresIn) {
      const refreshInterval = (authState.tokens.expiresIn - 300) * 1000; // Refresh 5 minutes before expiry
      const timer = setTimeout(() => {
        refreshToken();
      }, refreshInterval);

      return () => clearTimeout(timer);
    }
  }, [authState.tokens]);

  const loadStoredAuth = async () => {
    try {
      const storedUser = await SecureStore.getItemAsync(STORAGE_KEYS.USER);
      const storedTokens = await SecureStore.getItemAsync(STORAGE_KEYS.TOKENS);

      if (storedUser && storedTokens) {
        const user = JSON.parse(storedUser);
        const tokens = JSON.parse(storedTokens);

        setAuthState({
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // For demo, auto-login with demo user
        const demoUser = defaultUser;
        const demoTokens = {
          accessToken: "demo_access_token",
          refreshToken: "demo_refresh_token",
          expiresIn: 3600,
        };

        await SecureStore.setItemAsync(
          STORAGE_KEYS.USER,
          JSON.stringify(demoUser)
        );
        await SecureStore.setItemAsync(
          STORAGE_KEYS.TOKENS,
          JSON.stringify(demoTokens)
        );

        setAuthState({
          user: demoUser,
          tokens: demoTokens,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Failed to load auth state:", error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      const response = await mockAPI.login(credentials);

      // Store auth data
      await Promise.all([
        SecureStore.setItemAsync(
          STORAGE_KEYS.USER,
          JSON.stringify(response.user)
        ),
        SecureStore.setItemAsync(
          STORAGE_KEYS.TOKENS,
          JSON.stringify(response.tokens)
        ),
        SecureStore.setItemAsync(
          STORAGE_KEYS.SESSION,
          new Date().toISOString()
        ),
      ]);

      setAuthState({
        user: response.user,
        tokens: response.tokens,
        isAuthenticated: true,
        isLoading: false,
      });

      // Navigate to home
      router.replace("/(tabs)");

      Alert.alert("Success", "Logged in successfully!");
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      Alert.alert(
        "Login Failed",
        error instanceof Error ? error.message : "Invalid credentials"
      );
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      const response = await mockAPI.register(data);

      // Store auth data
      await Promise.all([
        SecureStore.setItemAsync(
          STORAGE_KEYS.USER,
          JSON.stringify(response.user)
        ),
        SecureStore.setItemAsync(
          STORAGE_KEYS.TOKENS,
          JSON.stringify(response.tokens)
        ),
        SecureStore.setItemAsync(
          STORAGE_KEYS.SESSION,
          new Date().toISOString()
        ),
      ]);

      setAuthState({
        user: response.user,
        tokens: response.tokens,
        isAuthenticated: true,
        isLoading: false,
      });

      // Navigate to home
      router.replace("/(tabs)");

      Alert.alert("Success", "Account created successfully!");
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      Alert.alert(
        "Registration Failed",
        "Could not create account. Please try again."
      );
      throw error;
    }
  };

  const logout = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      // Clear stored auth data
      await Promise.all([
        SecureStore.deleteItemAsync(STORAGE_KEYS.USER),
        SecureStore.deleteItemAsync(STORAGE_KEYS.TOKENS),
        SecureStore.deleteItemAsync(STORAGE_KEYS.SESSION),
      ]);

      setAuthState({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
      });

      // Navigate to login
      router.replace("/auth/login");

      Alert.alert("Logged Out", "You have been logged out successfully.");
    } catch (error) {
      console.error("Logout error:", error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (!authState.user) throw new Error("No user logged in");

      const updatedUser = await mockAPI.updateProfile(
        authState.user.id,
        userData
      );

      // Update stored user
      await SecureStore.setItemAsync(
        STORAGE_KEYS.USER,
        JSON.stringify(updatedUser)
      );

      setAuthState((prev) => ({
        ...prev,
        user: updatedUser,
      }));

      return updatedUser;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      if (!authState.tokens?.refreshToken) {
        throw new Error("No refresh token available");
      }

      const newTokens = await mockAPI.refreshToken(
        authState.tokens.refreshToken
      );

      // Update stored tokens
      await SecureStore.setItemAsync(
        STORAGE_KEYS.TOKENS,
        JSON.stringify(newTokens)
      );

      setAuthState((prev) => ({
        ...prev,
        tokens: newTokens,
      }));

      return newTokens;
    } catch (error) {
      console.error("Token refresh error:", error);
      // If refresh fails, log out user
      logout();
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await mockAPI.resetPassword(email);
      Alert.alert(
        "Success",
        "Password reset email sent. Please check your inbox."
      );
    } catch (error) {
      Alert.alert("Error", "Failed to send reset email. Please try again.");
      throw error;
    }
  };

  const value: AuthContextType = {
    authState,
    login,
    register,
    logout,
    updateProfile,
    refreshToken,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
