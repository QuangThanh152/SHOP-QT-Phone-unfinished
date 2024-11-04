import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, RESET_AUTH } from "../../redux/features/auth/authSlice";
import ShowOnLogin from "../hiddenLink/hiddenLink";
import { ShowOnLogout } from "../hiddenLink/hiddenLink";

// Import icons
import { FaShopify } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { UserName } from "../../pages/profile/Profile";


export const logo = (
    <div className={styles.logo}>
    <Link to="/">
      <h2>
        Shop<span>QT.</span>
      </h2>
    </Link>
  </div>
);

const activeLink = ({isActive}) => (isActive ? `${styles.active}` : "")
const Header = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [scrollPage, setScrollPage] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fixNavbar = () => {
        if (window.scrollY > 0) {
            setScrollPage(true);
        } else {
            setScrollPage(false);
        }
    };
    window.addEventListener("scroll", fixNavbar)
    // xử lý ẩn hiện Menu
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }
    const hideMenu = () => {
        setShowMenu(false)
    }

    // xử lý nút Logout
    const logoutUser = async() => {
        await dispatch(logout())
        await dispatch(RESET_AUTH())
        navigate("/login");
    }
    // Cart item 
    const cart = (
        <span className={styles.cart}>
            <Link to="/cart">
                Cart <IoMdCart size={20}/>
                <p>0</p>
            </Link>
        </span>
    )
  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}

        {/* mở và tắt navbar */}
        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}` }>
            {/* Nếu showMenu được active thì sẽ hiện menu và ngược lại */}
            <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["hide-menu"]}` } onClick={hideMenu}>
            </div>

            <ul>
                <li className={styles["logo-mobile"]}>
                    {logo}
                    <FaTimes size={22} color="#fff" onClick={hideMenu} />
                </li>
                <li>
                    <NavLink to="/shop" className= {activeLink}> 
                    Shop
                    <FaShopify size={28} />
                    </NavLink>
                </li>
            </ul>

            {/* Header Right */}
            <div className={styles["header-right"]}>
                <span className={styles.links}>
                    {/* Name Profile */}
                    <ShowOnLogin>
                    {/* Nút đăng nhập */}
                    <NavLink to={"profile"} className= {activeLink}>
                        <FaUserGear size={18} color="#ff7722" />
                        <UserName />
                    </NavLink>
                    </ShowOnLogin>

                    <ShowOnLogout>
                    {/* Nút đăng nhập */}
                    <NavLink to={"login"} className= {activeLink}>
                        Đăng Nhập
                    </NavLink>
                    </ShowOnLogout>

                    <ShowOnLogout>
                    {/* Nút đăng ký */}
                    <NavLink to={"register"} className= {activeLink}>
                        Đăng Ký
                    </NavLink>
                    </ShowOnLogout>

                    <ShowOnLogin>    
                    {/* Giỏ hàng */}
                    <NavLink to={"oder-history"} className= {activeLink}>
                        My oder
                    </NavLink>
                    </ShowOnLogin>

                    <ShowOnLogin>
                    <Link to={"/"} onClick={logoutUser}>
                        Logout
                    </Link>
                    </ShowOnLogin>
                </span>
                {cart}
            </div>
        </nav>

        {/* icon Menu */}
        <div className={styles["menu-icon"]}>
            {cart}
            <HiOutlineMenuAlt3 size={30} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
