import React from 'react'
import "./PageMenu.scss"
import { NavLink } from 'react-router-dom'

const PageMenu = () => {
  return (
    <div>
        <nav className="--bg-primary --p --mb">
            <ul className="home-links">
                <li>
                    {/* Profile */}
                    <NavLink to="/profile">
                        Trang cá nhân
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/wallet">
                        Ví
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/wishlist">
                        Danh sách yêu thích 
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default PageMenu