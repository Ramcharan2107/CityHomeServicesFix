import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import "./AdminNavbar.css";

function AdminNavbar({ toggleSidebar }) {

    const navigate = useNavigate();

    const [isScrolled, setIsScrolled] = useState(false);

    const userName =
        localStorage.getItem("userName") || "Administrator";


    /* ==========================================
       SCROLL DETECTION
    ========================================== */

    useEffect(() => {

        const handleScroll = () => {

            if (window.scrollY > 20) {

                setIsScrolled(true);

            } else {

                setIsScrolled(false);

            }

        };

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        handleScroll();

        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );

        };

    }, []);


    const logout = () => {

        localStorage.clear();

        navigate("/");

        window.location.reload();

    };


    return (

        <header
            className={
                `admin-navbar-shell ${
                    isScrolled
                        ? "admin-navbar-shell-scrolled"
                        : ""
                }`
            }
        >

            <nav
                className={
                    `admin-navbar ${
                        isScrolled
                            ? "admin-navbar-scrolled"
                            : ""
                    }`
                }
            >

                <div className="admin-navbar-container">

                    {/* =========================
                        LEFT
                    ========================= */}

                    <div className="admin-navbar-left">

                        <button
                            type="button"
                            className="admin-sidebar-toggle"
                            onClick={toggleSidebar}
                            aria-label="Toggle admin sidebar"
                        >

                            <i className="bi bi-list"></i>

                        </button>


                        <Link
                            to="/"
                            className="admin-navbar-brand"
                        >

                            <img
                                src={logo}
                                alt="City Home Services"
                                className="admin-navbar-logo"
                            />


                            <div className="admin-navbar-brand-text">

                                <h3>
                                    City Home Services
                                </h3>

                                <small>
                                    We Care, You Relax
                                </small>

                            </div>

                        </Link>

                    </div>


                    {/* =========================
                        CENTER NAVIGATION
                    ========================= */}

                    <div className="admin-navbar-links">

                        <Link
                            to="/"
                            className="admin-nav-link"
                        >
                            Home
                        </Link>

                        <Link
                            to="/services"
                            className="admin-nav-link"
                        >
                            Services
                        </Link>

                        <Link
                            to="/categories"
                            className="admin-nav-link"
                        >
                            Categories
                        </Link>

                        <Link
                            to="/about"
                            className="admin-nav-link"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className="admin-nav-link"
                        >
                            Contact
                        </Link>

                    </div>


                    {/* =========================
                        ADMIN ACTIONS
                    ========================= */}

                    <div className="admin-navbar-actions">

                        <button
                            type="button"
                            className="admin-icon-button"
                            aria-label="Notifications"
                        >

                            <i className="bi bi-bell"></i>

                            <span className="admin-notification-dot"></span>

                        </button>


                        <button
                            type="button"
                            className="admin-icon-button"
                            aria-label="Settings"
                        >

                            <i className="bi bi-gear"></i>

                        </button>


                        {/* ADMIN PROFILE */}

                        <div className="admin-user-dropdown">

                            <button
                                type="button"
                                className="admin-user-button"
                            >

                                <i className="bi bi-person-circle"></i>

                                <span className="admin-user-name">
                                    {userName}
                                </span>

                                <i className="bi bi-chevron-down admin-user-chevron"></i>

                            </button>


                            <div className="admin-user-menu">

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/dashboard")
                                    }
                                >

                                    <i className="bi bi-grid"></i>

                                    Dashboard

                                </button>


                                <button
                                    type="button"
                                >

                                    <i className="bi bi-person"></i>

                                    My Profile

                                </button>


                                <button
                                    type="button"
                                >

                                    <i className="bi bi-gear"></i>

                                    Settings

                                </button>


                                <div className="admin-menu-divider"></div>


                                <button
                                    type="button"
                                    className="admin-logout-button"
                                    onClick={logout}
                                >

                                    <i className="bi bi-box-arrow-right"></i>

                                    Logout

                                </button>

                            </div>

                        </div>

                    </div>


                    {/* MOBILE */}

                    <button
                        type="button"
                        className="admin-mobile-toggle"
                        onClick={toggleSidebar}
                        aria-label="Open admin menu"
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>

                </div>

            </nav>

        </header>

    );

}

export default AdminNavbar;