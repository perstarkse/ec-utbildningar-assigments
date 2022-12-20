import { NavLink } from 'react-router-dom'
import { useShoppingCart } from '../../contexts/ShoppingCartContext'
import { currencyFormatter } from '../../utilities/CurrencyFormatter';
import { ArticleProps } from '../../interfaces/Interfaces';
import React from 'react';

const ProductCard: React.FC<ArticleProps> = ({ item }) => {

    const { incrementQuantity } = useShoppingCart();

    // const addToWishlist = (e) => {
    //     console.log(` ${e.target}" added to wishlist"`);
    // }
    // const addToCompare = (e) => {
    //     console.log("added to compare");
    // }

    return (
        <div className="card">
            <div className="product-image">
                <img src={item.imageName} alt={item.name} />
                <ul className="menu">
                    <li className="icons">
                        {/* <button onClick={addToWishlist} className="circle"><i className="fa-regular fa-heart"></i></button> */}
                        <button className="circle"><i className="fa-regular fa-heart"></i></button>
                    </li>
                    <li className="icons">
                        <button className="circle"><i className="fa-regular fa-shuffle"></i></button>
                        {/* <button onClick={addToCompare} className="circle"><i className="fa-regular fa-shuffle"></i></button> */}
                    </li>
                    <li className="icons">
                        <button data-testid="addToCart" onClick={() => incrementQuantity({ articleNumber: item.articleNumber, product: item })} className="circle"><i className="fa-regular fa-bag-shopping"></i></button>
                    </li>
                </ul>
                <NavLink to={`/products/${item.articleNumber}`} className={"quick-view btn-themed"}>
                    QUICK VIEW
                </NavLink>
            </div >
            <div className="text-holder">
                <div className="category">{item.category}</div>
                <h5 className="title">{item.name}</h5>
                <div className="rating">
                    {/* {
                    for (var rating in {item.rating}) {console.log(rating)}
                    } */}
                    < i className="fa-sharp fa-solid fa-star"></i>
                    <i className="fa-sharp fa-solid fa-star"></i>
                    <i className="fa-sharp fa-solid fa-star"></i>
                    <i className="fa-sharp fa-solid fa-star"></i>
                    <i className="fa-sharp fa-solid fa-star"></i>
                </div>
                <div className='price-holder'>
                    <div className="salePrice"></div>
                    <div className="price">{currencyFormatter(item.price)}</div>
                </div>
            </div>
        </div >
    )
}

export default ProductCard