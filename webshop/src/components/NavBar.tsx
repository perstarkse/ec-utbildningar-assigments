import React, { useEffect, useState } from 'react'
import MenuIcon from './components/MenuIcon'
import { NavLink } from 'react-router-dom'
import { useShoppingCart } from '../contexts/ShoppingCartContext'
import { useUserContext } from '../contexts/UserContext'

const NavBar = () => {

    const { cartQuantity } = useShoppingCart();

    const [showMenu, setShowMenu] = useState(false);

    const [showSearchBar, setSearchBar] = useState(true);

    const { user, getUser } = useUserContext()


    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const toggleSearchBar = () => {
        setSearchBar(!showSearchBar)
    }
    const loggedIn = () => {
        if (user._id.length > 0) {
            return true
        }
        else return false
    }

    useEffect(() => {
        if (loggedIn()) { getUser(); }
    }, [])

    return (
        <header className="header-bar container">
            <div className="logo">
                <NavLink to="/" end><h1>Fixxo.</h1></NavLink>
            </div>
            <div className={`links ${!showMenu ? "d-none" : ""}`}>
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/categories" end>Categories</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/contacts" end>Contact</NavLink>
                <NavLink to="/user" end>
                    {
                        loggedIn() ? (<>Account</>) : (<>Login</>)
                    }
                </NavLink>
            </div>
            <div className="icons">
                <button onClick={toggleSearchBar} className="circle searchIcon"><i className="fa-regular fa-magnifying-glass"></i></button>
                <MenuIcon link={"/compare"} hideOnMobile={true} icon="fa-regular fa-code-compare" />
                <MenuIcon link={"/wishlist"} hideOnMobile={true} icon="fa-regular fa-heart" quantity="3" />
                <button className='circle' type="button" data-bs-toggle="offcanvas" data-bs-target="#shoppingCart" aria-controls="shoppingCart">
                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-theme'>{cartQuantity}</span>
                    <i className='fa-regular fa-bag-shopping'></i>
                </button>
                <button onClick={toggleMenu} className="circle menuIcon"><i className="fa-regular fa-bars"></i></button>
            </div>
            <div className={`searchBar ${!showSearchBar ? "active" : ""}`}>
                <input type="text" placeholder="Search on the site" name="" id="" />
                <button onClick={toggleSearchBar} className="searchIconClose"><i className="fa-regular fa-xmark"></i></button>
                <button className="searchIconSearch"><i className="fa-regular fa-magnifying-glass"></i></button>
            </div>
        </header>
    )
}



export default NavBar