import React from 'react'
import { useShoppingCart } from '../../contexts/ShoppingCartContext';
import { currencyFormatter } from '../../utilities/CurrencyFormatter';
import { ShoppingCartItemProps } from '../../interfaces/Interfaces';


const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({ item }) => {

    const { incrementQuantity, decrementQuantity, removeItem } = useShoppingCart();

    return (
        <div>
            <div className='shoppingCartItem'>
                <div className='itemImage'>
                    <img src={item.product.imageName} alt="product" />
                </div>
                <div className='itemInfo'>
                    <div data-testid="itemNameInShoppingCart" className='itemInfoName'>{item.product.name}</div>
                    <div className='itemInfoQuantity'>
                        <button onClick={() => incrementQuantity(item)}>+</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => decrementQuantity(item)}>-</button>
                    </div>
                </div>
                <div className='itemPrice'>
                    <div>{currencyFormatter(item.product.price * item.quantity)}</div>
                    <button data-testid="remove" onClick={() => removeItem(item.articleNumber)}><i className='fa-solid fa-trash'></i></button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartItem