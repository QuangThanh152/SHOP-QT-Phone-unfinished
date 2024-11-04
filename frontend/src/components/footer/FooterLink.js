import React from 'react'
import "./FooterLink.scss";
import logoImg from "../../assets/lologo.png"

//icon 
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const FooterLink = () => {
  return (
    <>
        <section className="contact-section">
            <div className="container contact">
                <div className="contact-icon">
                    <FaFacebookF className="i" />
                    <FaTiktok className="i"  />
                    <FaInstagram className="i" />
                    <FaYoutube className="i" />
                </div>
                <h2>Connect Me?</h2>
                <a href="#home" className="btn btn-dark">Ask for me!</a>
            </div>
        </section>

        <section className="footer-section">
            <div className="container footer"> 
                <div className="footer-logo">
                    <img src={logoImg} alt='logo'/>
                </div>

                {/* Menu footer */}
                {/* 1 */}
                <div className="footer-menu">
                    <p className="link-heading">Features</p>
                    <ul className="nav-ul footer-links">
                        <li>
                            <a href="#home">Link Shortening</a>
                        </li>
                        <li>
                            <a href="#home">Branded Links</a>
                        </li>
                        <li>
                            <a href="#home">Analytics</a>
                        </li>
                        <li>
                            <a href="#home">Blog</a>
                        </li>
                    </ul>
                </div>

                {/* 2 */}
                <div className="footer-menu">
                    <p className="link-heading">Resources</p>
                    <ul className="nav-ul footer-links">
                        <li>
                            <a href="#home">Link Shortening</a>
                        </li>
                        <li>
                            <a href="#home">Branded Links</a>
                        </li>
                        <li>
                            <a href="#home">Analytics</a>
                        </li>
                        <li>
                            <a href="#home">Blog</a>
                        </li>
                    </ul>
                </div>

                {/* 3 */}
                <div className="footer-menu">
                    <p className="link-heading">Company</p>
                    <ul className="nav-ul footer-links">
                        <li>
                            <a href="#home">Link Shortening</a>
                        </li>
                        <li>
                            <a href="#home">Branded Links</a>
                        </li>
                        <li>
                            <a href="#home">Analytics</a>
                        </li>
                        <li>
                            <a href="#home">Blog</a>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    </>
  )
}

export default FooterLink