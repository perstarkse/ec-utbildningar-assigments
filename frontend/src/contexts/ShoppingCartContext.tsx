import React, { createContext, ReactNode, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { IArticle, ICartItem } from "../interfaces/Interfaces";

interface IShoppingCartProvider {
    children: ReactNode;
}

interface IQuantityFunctions {
    product: IArticle;
    articleNumber: string;
}

interface IShoppingCartContext {
    cartItems: ICartItem[];
    cartQuantity: number;
    getItemQuantity: (articleNumber: string) => number;
    incrementQuantity: (cartItem: IQuantityFunctions) => void;
    decrementQuantity: (cartItem: IQuantityFunctions) => void;
    removeItem: (articleNumber: string) => void;
}

const ShoppingCartContext = createContext<IShoppingCartContext | null>(null);

export const useShoppingCart = () => {
    return React.useContext(ShoppingCartContext) as IShoppingCartContext;
}

export const ShoppingCartProvider: React.FC<IShoppingCartProvider> = ({ children }) => {
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);

    const cartQuantity = cartItems.reduce(
        (quantity: number, item: ICartItem) => item.quantity + quantity, 0
    )

    const getItemQuantity = (articleNumber: string) => {
        return cartItems.find(item => item.articleNumber === articleNumber)?.quantity || 0
    }

    const incrementQuantity = (cartItem: IQuantityFunctions) => {
        const { articleNumber, product } = cartItem

        setCartItems(items => {
            if (items.find(item => item.articleNumber === articleNumber) == null) {
                return [...items, { articleNumber, product, quantity: 1 }]
            } else {
                return items.map(item => {
                    if (item.articleNumber === articleNumber) {
                        return {
                            ...item, quantity: item.quantity + 1
                        }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    const decrementQuantity = (cartItem: IQuantityFunctions) => {
        const { articleNumber } = cartItem

        setCartItems(items => {
            if (items.find(item => item.articleNumber === articleNumber)?.quantity === 1) {
                return items.filter(item => item.articleNumber !== articleNumber)
            } else {
                return items.map(item => {
                    if (item.articleNumber === articleNumber) {
                        return {
                            ...item, quantity: item.quantity - 1
                        }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeItem = (articleNumber: string) => {
        setCartItems(items => {
            return items.filter(item => item.articleNumber !== articleNumber)
        })
    }

    return <ShoppingCartContext.Provider value={{ cartItems, cartQuantity, getItemQuantity, incrementQuantity, decrementQuantity, removeItem }}>
        {children}
        <ShoppingCart />
    </ShoppingCartContext.Provider>
}