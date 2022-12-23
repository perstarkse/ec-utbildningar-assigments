import { NavLink } from 'react-router-dom'
import { TopNavProps } from '../interfaces/Interfaces'

const TopNav = ({ subPage }: TopNavProps) => {
    return (
        <section className="top-nav container">
            <div className="holder">
                <i className="fa-solid fa-home"></i>
                <NavLink to="/" className="base-page" end>Home</NavLink>
                <i className="fa-regular fa-angle-right"></i>
                <NavLink to="" className="sub-page">{subPage}</NavLink>
            </div>
        </section >
    )
}

export default TopNav