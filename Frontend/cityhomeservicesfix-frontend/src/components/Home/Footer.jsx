import { useEffect } from "react";
import {
    Link,
    useLocation
} from "react-router-dom";

import "./Footer.css";
import logo from "../../assets/images/logo.png";


function Footer() {

    const location = useLocation();


    /* =====================================================
       SCROLL TO TOP WHEN PAGE CHANGES
    ===================================================== */

    useEffect(() => {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

    }, [location.pathname]);


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        new Date().getFullYear();


    return (

        <footer className="footer">

            {/* =================================================
                BACKGROUND DECORATION
            ================================================= */}

            <div className="footer-glow footer-glow-one"></div>

            <div className="footer-glow footer-glow-two"></div>


            <div className="footer-container">


                {/* =================================================
                    BRAND
                ================================================= */}

                <div className="footer-brand">

                    <Link
                        to="/"
                        className="footer-brand-link"
                    >

                        <div className="footer-logo-wrapper">

                            <img
                                src={logo}
                                alt="City Home Services"
                                className="footer-logo"
                            />

                        </div>


                        <div>

                            <h3>
                                City Home Services
                            </h3>

                            <span>
                                Professional Home Services
                            </span>

                        </div>

                    </Link>


                    <p className="footer-description">

                        Professional home services delivered by
                        trusted and verified experts. From repairs
                        to maintenance, we make taking care of your
                        home simple and reliable.

                    </p>


                    {/* TRUST BADGES */}

                    <div className="footer-trust">

                        <div>

                            <i className="bi bi-shield-check"></i>

                            <span>
                                Verified Professionals
                            </span>

                        </div>


                        <div>

                            <i className="bi bi-clock-history"></i>

                            <span>
                                Reliable Service
                            </span>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    COMPANY
                ================================================= */}

                <div className="footer-column">

                    <h4>
                        Company
                    </h4>


                    <Link to="/">
                        <i className="bi bi-chevron-right"></i>
                        Home
                    </Link>


                    <Link to="/services">
                        <i className="bi bi-chevron-right"></i>
                        Services
                    </Link>


                    <Link to="/categories">
                        <i className="bi bi-chevron-right"></i>
                        Categories
                    </Link>


                    <Link to="/about">
                        <i className="bi bi-chevron-right"></i>
                        About Us
                    </Link>


                    <Link to="/contact">
                        <i className="bi bi-chevron-right"></i>
                        Contact Us
                    </Link>

                </div>


                {/* =================================================
                    SERVICES
                ================================================= */}

                <div className="footer-column">

                    <h4>
                        Popular Services
                    </h4>


                    <Link to="/categories/appliances">
                        <i className="bi bi-chevron-right"></i>
                        Appliances
                    </Link>


                    <Link to="/categories/carpentry">
                        <i className="bi bi-chevron-right"></i>
                        Carpentry
                    </Link>


                    <Link to="/categories/cleaning">
                        <i className="bi bi-chevron-right"></i>
                        Cleaning
                    </Link>


                    <Link to="/categories/electrical">
                        <i className="bi bi-chevron-right"></i>
                        Electrical
                    </Link>


                    <Link to="/categories/painting">
                        <i className="bi bi-chevron-right"></i>
                        Painting
                    </Link>


                    <Link to="/categories/pest-control">
                        <i className="bi bi-chevron-right"></i>
                        Pest Control
                    </Link>


                    <Link to="/categories/plumbing">
                        <i className="bi bi-chevron-right"></i>
                        Plumbing
                    </Link>

                </div>


                {/* =================================================
                    CONTACT / SOCIAL
                ================================================= */}

                <div className="footer-column footer-connect">

                    <h4>
                        Stay Connected
                    </h4>


                    <p className="footer-social-text">

                        Follow us for home service tips,
                        updates and special offers.

                    </p>


                    {/* CONTACT */}

                    <div className="footer-contact-item">

                        <i className="bi bi-telephone-fill"></i>

                        <span>
                            +91 98765 43210
                        </span>

                    </div>


                    <div className="footer-contact-item">

                        <i className="bi bi-envelope-fill"></i>

                        <span>
                            support@cityhomeservices.com
                        </span>

                    </div>


                    {/* SOCIAL */}

                    <div className="social-icons">

                        <a
                            href="#"
                            aria-label="Facebook"
                            onClick={(e) =>
                                e.preventDefault()
                            }
                        >
                            <i className="bi bi-facebook"></i>
                        </a>


                        <a
                            href="#"
                            aria-label="Instagram"
                            onClick={(e) =>
                                e.preventDefault()
                            }
                        >
                            <i className="bi bi-instagram"></i>
                        </a>


                        <a
                            href="#"
                            aria-label="LinkedIn"
                            onClick={(e) =>
                                e.preventDefault()
                            }
                        >
                            <i className="bi bi-linkedin"></i>
                        </a>


                        <a
                            href="#"
                            aria-label="Twitter"
                            onClick={(e) =>
                                e.preventDefault()
                            }
                        >
                            <i className="bi bi-twitter-x"></i>
                        </a>

                    </div>

                </div>

            </div>


            {/* =================================================
                FOOTER BOTTOM
            ================================================= */}

            <div className="footer-bottom">

                <div className="footer-bottom-inner">

                    <p>
                        © {currentYear} City Home Services.
                        All Rights Reserved.
                    </p>


                    <div className="footer-bottom-links">

                        <Link to="/privacy">
                            Privacy Policy
                        </Link>

                        <span></span>

                        <Link to="/terms">
                            Terms & Conditions
                        </Link>

                    </div>

                </div>

            </div>

        </footer>

    );

}


export default Footer;