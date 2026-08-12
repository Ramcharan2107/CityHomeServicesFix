import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Home/Navbar";
import "./CustomerLayout.css";

function CustomerLayout() {

    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const handleLogout = () => {

        localStorage.clear();

        navigate("/", {
            replace: true
        });

        window.location.reload();
    };

    return (

        <div className="customer-app">

            {/* =================================================
                MAIN WEBSITE NAVBAR
                Uses the exact same navbar and logo
                as the main website
            ================================================= */}

            <Navbar />


            <div className="customer-dashboard-wrapper">


                {/* =================================================
                    MOBILE OVERLAY
                ================================================= */}

                {sidebarOpen && (

                    <div
                        className="customer-sidebar-overlay"
                        onClick={closeSidebar}
                    />

                )}


                {/* =================================================
                    CUSTOMER SIDEBAR
                ================================================= */}

                <aside
                    className={`customer-sidebar ${
                        sidebarOpen
                            ? "customer-sidebar-open"
                            : ""
                    }`}
                >


                    {/* SIDEBAR HEADER */}

                    <div className="customer-sidebar-header">

                        <div className="customer-sidebar-icon">

                            <i className="bi bi-person-circle"></i>

                        </div>

                        <div>

                            <h6>
                                Customer Portal
                            </h6>

                            <small>
                                Manage your services
                            </small>

                        </div>

                    </div>


                    {/* =================================================
                        MAIN NAVIGATION
                    ================================================= */}

                    <div className="customer-sidebar-section">

                        <div className="customer-sidebar-title">
                            DASHBOARD
                        </div>


                        {/* Dashboard */}

                        <NavLink
                            to="/customer/dashboard"
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                `customer-sidebar-link ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`
                            }
                        >

                            <i className="bi bi-grid-1x2-fill"></i>

                            <span>
                                Dashboard
                            </span>

                        </NavLink>


                        {/* My Bookings */}

                        <NavLink
                            to="/customer/bookings"
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                `customer-sidebar-link ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`
                            }
                        >

                            <i className="bi bi-calendar-check-fill"></i>

                            <span>
                                My Bookings
                            </span>

                        </NavLink>


                        {/* Services */}

                        <NavLink
                            to="/services"
                            onClick={closeSidebar}
                            className="customer-sidebar-link"
                        >

                            <i className="bi bi-tools"></i>

                            <span>
                                Services
                            </span>

                        </NavLink>


                        {/* Addresses */}

                        <NavLink
                            to="/customer/addresses"
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                `customer-sidebar-link ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`
                            }
                        >

                            <i className="bi bi-geo-alt-fill"></i>

                            <span>
                                My Addresses
                            </span>

                        </NavLink>

                    </div>


                    {/* =================================================
                        ACCOUNT
                    ================================================= */}

                    <div className="customer-sidebar-section">

                        <div className="customer-sidebar-title">
                            ACCOUNT
                        </div>


                        {/* Profile */}

                        <NavLink
                            to="/customer/profile"
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                `customer-sidebar-link ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`
                            }
                        >

                            <i className="bi bi-person-fill"></i>

                            <span>
                                My Profile
                            </span>

                        </NavLink>


                        {/* Book Service */}

                        <NavLink
                            to="/services"
                            onClick={closeSidebar}
                            className="customer-sidebar-link"
                        >

                            <i className="bi bi-plus-circle-fill"></i>

                            <span>
                                Book a Service
                            </span>

                        </NavLink>


                        {/* Notifications */}

                        <NavLink
                            to="/customer/notifications"
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                `customer-sidebar-link ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`
                            }
                        >

                            <i className="bi bi-bell-fill"></i>

                            <span>
                                Notifications
                            </span>

                        </NavLink>

                    </div>


                    {/* =================================================
                        LOGOUT
                    ================================================= */}

                    <div className="customer-sidebar-bottom">

                        <button
                            type="button"
                            className="customer-logout"
                            onClick={handleLogout}
                        >

                            <i className="bi bi-box-arrow-right"></i>

                            <span>
                                Logout
                            </span>

                        </button>

                    </div>

                </aside>


                {/* =================================================
                    MAIN DASHBOARD CONTENT
                ================================================= */}

                <div className="customer-dashboard-main">


                    {/* MOBILE HEADER */}

                    <div className="customer-mobile-header">

                        <button
                            type="button"
                            className="customer-mobile-menu"
                            onClick={() =>
                                setSidebarOpen(true)
                            }
                        >

                            <i className="bi bi-list"></i>

                        </button>


                        <div>

                            <strong>
                                Customer Dashboard
                            </strong>

                        </div>

                    </div>


                    {/* PAGE CONTENT */}

                    <main className="customer-dashboard-content">

                        <Outlet />

                    </main>

                </div>

            </div>

        </div>

    );
}

export default CustomerLayout;