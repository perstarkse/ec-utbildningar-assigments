import { render, screen, fireEvent, getByTestId, getByRole, getByAltText, getAllByTestId, getAllByRole } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import ShoppingCart from '../components/ShoppingCart';
import { ShoppingCartProvider } from '../contexts/ShoppingCartContext'
import ProductCard from '../components/components/ProductCard';
import { BrowserRouter } from 'react-router-dom';

interface IproviderProps {
    providerProps: ImockProduct
}
interface ImockProduct { tag: string, articleNumber: string, name: string, description: string | null, category: string, price: number, rating: number, imageName: string };

const mockProduct = { "tag": "default", "articleNumber": "d3984cd9 - f121 - 4981 - 8d03- 83198d441379", "name": "Black coat", "description": "", "category": "Coats", "price": 95, "rating": 4, "imageName": "https://win22imgstorage.blob.core.windows.net/images/black-coat.png" };

describe(ProductCard, () => {
    const customRender = (ui: any, { providerProps, ...renderOptions }: IproviderProps) => {
        return render(
            <BrowserRouter>
                <ShoppingCartProvider {...providerProps}>
                    {ui}
                </ShoppingCartProvider>
            </BrowserRouter>,
            renderOptions,
        )
    }
    test("can display mockproduct properly", () => {
        const providerProps = mockProduct;
        customRender(<ProductCard item={mockProduct} />, { providerProps })
        expect(screen.getByRole<HTMLImageElement>("img").alt).toContain(mockProduct.name);
    });
    test("can add product to shoppingcart from ProductCard", () => {
        const providerProps = mockProduct;
        // render both card and shoppingcart.
        customRender(<ProductCard item={mockProduct} />, { providerProps });
        customRender(<ShoppingCart />, { providerProps });
        // find button to add to cart and press it.
        const addToCartButton = screen.getByTestId('addToCart');
        fireEvent.click(addToCartButton);
        // verify that the mockproduct is added to shoppingcart.
        const itemInShoppingCart = screen.getByTestId('itemNameInShoppingCart').textContent;
        expect(itemInShoppingCart).toContain(mockProduct.name);
    })
});