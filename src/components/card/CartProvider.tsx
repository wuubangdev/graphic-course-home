"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { AddToCartPayload, CartItem } from "./cartTypes";

type CartState = { items: CartItem[] };

type CartActions = {
    addItem: (p: AddToCartPayload) => void;
    removeItem: (id: string) => void;
    setQty: (id: string, qty: number) => void;
    clear: () => void;
};

type CartContextValue = CartState & {
    totalQty: number;
    totalPrice: number;
} & CartActions;

const STORAGE_KEY = "khdh_cart_v1";

type Action =
    | { type: "INIT"; payload: CartItem[] }
    | { type: "ADD"; payload: AddToCartPayload }
    | { type: "REMOVE"; payload: { id: string } }
    | { type: "SET_QTY"; payload: { id: string; qty: number } }
    | { type: "CLEAR" };

function clampQty(qty: number) {
    if (!Number.isFinite(qty)) return 1;
    return Math.max(1, Math.min(999, Math.floor(qty)));
}

function reducer(state: CartState, action: Action): CartState {
    switch (action.type) {
        case "INIT":
            return { items: action.payload ?? [] };

        case "ADD": {
            const qty = clampQty(action.payload.qty ?? 1);
            const idx = state.items.findIndex((x) => x.id === action.payload.id);

            if (idx >= 0) {
                const next = [...state.items];
                next[idx] = { ...next[idx], qty: clampQty(next[idx].qty + qty) };
                return { items: next };
            }

            return {
                items: [
                    ...state.items,
                    {
                        id: action.payload.id,
                        title: action.payload.title,
                        price: action.payload.price,
                        image: action.payload.image,
                        qty,
                    },
                ],
            };
        }

        case "REMOVE":
            return { items: state.items.filter((x) => x.id !== action.payload.id) };

        case "SET_QTY": {
            const qty = clampQty(action.payload.qty);
            return {
                items: state.items.map((x) => (x.id === action.payload.id ? { ...x, qty } : x)),
            };
        }

        case "CLEAR":
            return { items: [] };

        default:
            return state;
    }
}

const CartCtx = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, { items: [] });

    // init from localStorage
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw) as CartItem[];
            if (Array.isArray(parsed)) dispatch({ type: "INIT", payload: parsed });
        } catch {
            // ignore
        }
    }, []);

    // persist to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
        } catch {
            // ignore
        }
    }, [state.items]);

    const totalQty = useMemo(
        () => state.items.reduce((sum, x) => sum + (x.qty || 0), 0),
        [state.items]
    );

    const totalPrice = useMemo(
        () => state.items.reduce((sum, x) => sum + (x.qty || 0) * (x.price || 0), 0),
        [state.items]
    );

    const value: CartContextValue = useMemo(
        () => ({
            items: state.items,
            totalQty,
            totalPrice,
            addItem: (p) => dispatch({ type: "ADD", payload: p }),
            removeItem: (id) => dispatch({ type: "REMOVE", payload: { id } }),
            setQty: (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } }),
            clear: () => dispatch({ type: "CLEAR" }),
        }),
        [state.items, totalQty, totalPrice]
    );

    return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
    const ctx = useContext(CartCtx);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
