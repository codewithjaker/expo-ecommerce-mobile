import React, { createContext, useContext, useState, ReactNode } from "react";

interface CheckoutContextType {
  shippingAddress: any;
  setShippingAddress: (address: any) => void;
  paymentMethod: any;
  setPaymentMethod: (method: any) => void;
  shippingMethod: any;
  setShippingMethod: (method: any) => void;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  resetCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [shippingMethod, setShippingMethod] = useState<any>(null);
  const [orderNotes, setOrderNotes] = useState("");

  const resetCheckout = () => {
    setShippingAddress(null);
    setPaymentMethod(null);
    setShippingMethod(null);
    setOrderNotes("");
  };

  return (
    <CheckoutContext.Provider
      value={{
        shippingAddress,
        setShippingAddress,
        paymentMethod,
        setPaymentMethod,
        shippingMethod,
        setShippingMethod,
        orderNotes,
        setOrderNotes,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return context;
};
