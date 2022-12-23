import React from 'react';
import { useShoppingCart } from '../contexts/ShoppingCartContext'
import { IShoppingCart } from '../interfaces/Interfaces';
import ShoppingCartItem from './components/ShoppingCartItem';


const ShoppingCart: React.FC = () => {

    const { cartItems }: IShoppingCart = useShoppingCart();

    return (
        <div className="shoppingCart offcanvas offcanvas-end" tabIndex={-1} id="shoppingCart" aria-labelledby="shoppingCartLabel">
            <div className="offcanvas-header">
                <h4 id="shoppingCartLabel"><i className='fa-regular fa-bag-shopping me-3'></i>Shopping Cart</h4>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div data-testid="cartItemsMap" className="offcanvas-body">
                {
                    cartItems.map(item => (<ShoppingCartItem key={item.articleNumber} item={item} />))}
            </div>
        </div >
    )
}

export default ShoppingCart