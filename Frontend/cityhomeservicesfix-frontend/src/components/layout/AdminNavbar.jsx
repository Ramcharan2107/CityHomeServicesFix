import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./AdminNavbar.css";

function AdminNavbar({ toggleSidebar }) {

    const navigate = useNavigate();

    const userName =
        localStorage.getItem("userName") || "Administrator";

    const logout = () => {

        localStorage.clear();

        navigate("/");

        window.location.reload();

    };

    return (

        <header className="admin-navbar">

            {/* Left */}

            <div className="admin-navbar-left">

                <button
                    className="menu-btn"
                    onClick={toggleSidebar}
                >
                    <i className="bi bi-list"></i>
                </button>

                <Link
                    to="/"
                    className="admin-logo text-decoration-none"
                >

                    <img
                        src={logo}
                        alt="City Home Services"
                        className="admin-logo-img"
                    />

                    <div>

                        <h5 className="mb-0 fw-bold">

                            City Home Services

                        </h5>

                        <small>

                            We Care, You Relax

                        </small>

                    </div>

                </Link>

            </div>

            {/* Center */}

            <nav className="admin-navbar-center">

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

            </nav>

            {/* Right */}

            <div className="admin-navbar-right">

                <button className="icon-btn">

                    <i className="bi bi-bell"></i>

                    <span className="badge-dot"></span>

                </button>

                <button className="icon-btn">

                    <i className="bi bi-gear"></i>

                </button>

                <div className="dropdown">

                    <button

                        className="profile-btn dropdown-toggle"

                        data-bs-toggle="dropdown"

                    >

                        <i className="bi bi-person-circle me-2"></i>

                        {userName}

                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">

                        <li>

                            <button

                                className="dropdown-item"

                                onClick={() => navigate("/dashboard")}

                            >

                                Dashboard

                            </button>

                        </li>

                        <li>

                            <button

                                className="dropdown-item"

                            >

                                My Profile

                            </button>

                        </li>

                        <li>

                            <hr className="dropdown-divider" />

                        </li>

                        <li>

                            <button

                                className="dropdown-item text-danger"

                                onClick={logout}

                            >

                                <i className="bi bi-box-arrow-right me-2"></i>

                                Logout

                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </header>

    );

}

export default AdminNavbar;