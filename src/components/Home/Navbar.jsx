import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import logo from "../../assets/images/logo.png";
import "./HomeNavbar.css";

function Navbar() {
    const navigate = useNavigate();

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [role, setRole] = useState("");
    const [userName, setUserName] = useState("");

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    /* =====================================================
       SCROLL DETECTION
    ===================================================== */

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /* =====================================================
       READ JWT
    ===================================================== */

    const loadUserFromToken = () => {
        const currentToken =
            localStorage.getItem("token");

        setToken(currentToken);

        if (!currentToken) {
            setRole("");
            setUserName("");
            return;
        }

        try {
            const decoded = jwtDecode(currentToken);

            const decodedRole =
                decoded[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ] ||
                decoded.role ||
                "";

            const decodedName =
                decoded[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                ] ||
                decoded.name ||
                decoded.unique_name ||
                decoded.email ||
                "";

            setRole(decodedRole);
            setUserName(decodedName);

        } catch (error) {
            console.error(
                "Invalid authentication token"
            );

            localStorage.removeItem("token");

            setToken(null);
            setRole("");
            setUserName("");
        }
    };

    useEffect(() => {
        loadUserFromToken();
    }, []);

    /* =====================================================
       UPDATE NAVBAR AFTER LOGIN / LOGOUT
    ===================================================== */

    useEffect(() => {
        const handleAuthChange = () => {
            loadUserFromToken();
        };

        window.addEventListener(
            "authChanged",
            handleAuthChange
        );

        window.addEventListener(
            "storage",
            handleAuthChange
        );

        return () => {
            window.removeEventListener(
                "authChanged",
                handleAuthChange
            );

            window.removeEventListener(
                "storage",
                handleAuthChange
            );
        };
    }, []);

    /* =====================================================
       LOGOUT
    ===================================================== */

    const handleLogout = () => {
        localStorage.removeItem("token");

        setToken(null);
        setRole("");
        setUserName("");

        setMobileMenuOpen(false);

        window.dispatchEvent(
            new Event("authChanged")
        );

        navigate("/login");
    };

    /* =====================================================
       CLOSE MOBILE MENU
    ===================================================== */

    const handleNavigation = () => {
        setMobileMenuOpen(false);
    };

    return (
        /*
         * navbar-shell keeps the original navbar height
         * when the navbar becomes fixed.
         * This prevents the page from jumping.
         */
        <div
            className={`navbar-shell ${
                scrolled ? "navbar-shell-scrolled" : ""
            }`}
        >

            <nav
                className={`custom-navbar ${
                    scrolled
                        ? "navbar-scrolled"
                        : ""
                }`}
            >

                <div className="navbar-container">

                    {/* =================================================
                        BRAND
                    ================================================= */}

                    <Link
                        to="/"
                        className="navbar-brand-custom"
                        onClick={handleNavigation}
                    >

                        <img
                            src={logo}
                            alt="City Home Services"
                            className="navbar-logo"
                        />

                        <div className="navbar-brand-text">

                            <h3>
                                City Home Services
                            </h3>

                            <small>
                                We Care, You Relax
                            </small>

                        </div>

                    </Link>


                    {/* =================================================
                        DESKTOP NAVIGATION
                    ================================================= */}

                    <div className="navbar-links">

                        <Link
                            to="/"
                            className="nav-link-custom"
                        >
                            Home
                        </Link>

                        <Link
                            to="/services"
                            className="nav-link-custom"
                        >
                            Services
                        </Link>

                        <Link
                            to="/categories"
                            className="nav-link-custom"
                        >
                            Categories
                        </Link>

                        <Link
                            to="/about"
                            className="nav-link-custom"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className="nav-link-custom"
                        >
                            Contact
                        </Link>

                    </div>


                    {/* =================================================
                        RIGHT ACTIONS
                    ================================================= */}

                    <div className="navbar-actions">

                        <Link
                            to="/services"
                            className="btn-book-service"
                        >
                            <span>
                                Book Service
                            </span>

                            <span className="book-arrow">
                                ↗
                            </span>
                        </Link>


                        {token ? (

                            <div className="user-dropdown">

                                <button
                                    type="button"
                                    className="user-button"
                                    aria-label="User menu"
                                >

                                    <i className="bi bi-person-circle"></i>

                                    <span className="user-name">
                                        {userName ||
                                            "Account"}
                                    </span>

                                    <i className="bi bi-chevron-down user-chevron"></i>

                                </button>


                                <div className="user-menu">

                                    {role === "Customer" && (
                                        <Link
                                            to="/customer/dashboard"
                                        >
                                            <i className="bi bi-grid"></i>

                                            <span>
                                                Dashboard
                                            </span>
                                        </Link>
                                    )}


                                    {role === "Admin" && (
                                        <Link
                                            to="/dashboard"
                                        >
                                            <i className="bi bi-grid"></i>

                                            <span>
                                                Admin Dashboard
                                            </span>
                                        </Link>
                                    )}


                                    <Link to="/customer/profile">

                                        <i className="bi bi-person"></i>

                                        <span>
                                            Profile
                                        </span>

                                    </Link>


                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                    >

                                        <i className="bi bi-box-arrow-right"></i>

                                        <span>
                                            Logout
                                        </span>

                                    </button>

                                </div>

                            </div>

                        ) : (

                            <Link
                                to="/login"
                                className="btn-login"
                            >
                                Login
                            </Link>

                        )}

                    </div>


                    {/* =================================================
                        MOBILE TOGGLE
                    ================================================= */}

                    <button
                        type="button"
                        className={`navbar-mobile-toggle ${
                            mobileMenuOpen
                                ? "mobile-toggle-open"
                                : ""
                        }`}
                        onClick={() =>
                            setMobileMenuOpen(
                                !mobileMenuOpen
                            )
                        }
                        aria-label="Toggle navigation"
                        aria-expanded={
                            mobileMenuOpen
                        }
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>

                </div>


                {/* =================================================
                    MOBILE MENU
                ================================================= */}

                <div
                    className={`mobile-navbar-menu ${
                        mobileMenuOpen
                            ? "mobile-menu-open"
                            : ""
                    }`}
                >

                    <Link
                        to="/"
                        onClick={handleNavigation}
                    >
                        Home
                    </Link>

                    <Link
                        to="/services"
                        onClick={handleNavigation}
                    >
                        Services
                    </Link>

                    <Link
                        to="/categories"
                        onClick={handleNavigation}
                    >
                        Categories
                    </Link>

                    <Link
                        to="/about"
                        onClick={handleNavigation}
                    >
                        About
                    </Link>

                    <Link
                        to="/contact"
                        onClick={handleNavigation}
                    >
                        Contact
                    </Link>


                    <Link
                        to="/services"
                        className="mobile-book-button"
                        onClick={handleNavigation}
                    >
                        Book Service
                    </Link>


                    {token ? (

                        <button
                            type="button"
                            className="mobile-logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    ) : (

                        <Link
                            to="/login"
                            className="mobile-login"
                            onClick={handleNavigation}
                        >
                            Login
                        </Link>

                    )}

                </div>

            </nav>

        </div>
    );
}

export default Navbar;