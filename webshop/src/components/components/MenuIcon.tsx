import React from 'react'
import { NavLink } from 'react-router-dom'
import { MenuIconProps } from '../../interfaces/Interfaces'

const MenuIcon: React.FC<MenuIconProps> = ({ link, icon, quantity, hideOnMobile }) => {
    return (
        <NavLink className={`circle ${hideOnMobile ? "d-none d-md-flex" : ""}`} to={link} >
            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-theme'>{quantity}</span>
            <i className={icon}> </i>
        </NavLink >
    )
}

export default MenuIcon