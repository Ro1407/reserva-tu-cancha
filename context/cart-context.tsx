"use client";

import React, { createContext, useContext, useReducer, useEffect, Context } from "react";
import { CartItem } from "@/lib/definitions";

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

const CartContext: Context<CartContextProps | null> = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItems: CartItem[] = [...state.items, action.payload];
      const newTotal: number = newItems.reduce((sum: number, item: CartItem) => sum + item.price, 0);
      return { items: newItems, total: newTotal };
    }
    case "REMOVE_ITEM": {
      const newItems: CartItem[] = state.items.filter((item: CartItem): boolean => item.id !== action.payload);
      const newTotal: number = newItems.reduce((sum: number, item: CartItem): number => sum + item.price, 0);
      return { items: newItems, total: newTotal };
    }
    case "CLEAR_CART": {
      return { items: [], total: 0 };
    }
    case "LOAD_CART": {
      const newTotal: number = action.payload.reduce((sum: number, item: CartItem): number => sum + item.price, 0);
      return { items: action.payload, total: newTotal };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  // load cart from localStorage on mount
  useEffect((): void => {
    const savedCart: string | null = localStorage.getItem("cart-reservation");
    if (!savedCart) return;
    try {
      const cartItems: CartItem[] = JSON.parse(savedCart);
      dispatch({ type: "LOAD_CART", payload: cartItems });
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // save cart to localStorage whenever it changes
  useEffect((): void => {
    localStorage.setItem("cart-reservation", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart: (item: Omit<CartItem, "id">) => void = (item: Omit<CartItem, "id">): void => {
    const id = `${item.courtId}-${item.date}-${item.time}`;
    const cartItem: CartItem = { id, ...item };
    dispatch({ type: "ADD_ITEM", payload: cartItem });
  };

  const removeFromCart: (id: string) => void = (id: string): void => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCart: () => void = (): void => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getItemCount: () => number = (): number => {
    return state.items.length;
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        clearCart,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextProps {
  const context: CartContextProps | null = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
