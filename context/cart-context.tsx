"use client";

import React, { createContext, useContext, useReducer, useEffect, Context } from "react";
import { CartState, CartItem } from "@/types/cart";

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartState };

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
      const newTotal: number = newItems.reduce((sum: number, item: CartItem): number => sum + item.price, 0);
      return { ...state, items: newItems, total: newTotal };
    }
    case "REMOVE_ITEM": {
      const newItems: CartItem[] = state.items.filter((item: CartItem): boolean => item.id !== action.payload);
      const newTotal: number = newItems.reduce((sum: number, item: CartItem): number => sum + item.price, 0);
      return { ...state, items: newItems, total: newTotal };
    }
    case "CLEAR_CART": {
      return { id: crypto.randomUUID(), items: [], total: 0 };
    }
    case "LOAD_CART": {
      return action.payload;
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { id: crypto.randomUUID(), items: [], total: 0 });

  // load cart from localStorage on mount
  useEffect((): void => {
    const savedCart: string | null = localStorage.getItem("cart-state");
    if (!savedCart) return;
    try {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // save cart to localStorage whenever it changes
  useEffect((): void => {
    localStorage.setItem("cart-state", JSON.stringify(state));
  }, [state]);

  const addToCart: (item: Omit<CartItem, "id">) => void = (item: Omit<CartItem, "id">): void => {
    const id = `${state.id}--${item.courtId}-${item.date}-${item.time}`;
    dispatch({ type: "ADD_ITEM", payload: { id, ...item } });
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
