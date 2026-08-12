import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/images/logo.png";

function Navbar() {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const token = localStorage.getItem("token");

    let role = "";
    let firstName = "";

    if (token) {

        try {

            const decoded = jwtDecode(token);

            role =
                decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            firstName =
                decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "";

        }
        catch {

            localStorage.removeItem("token");

        }

    }

    const logout = () => {

        localStorage.clear();

        navigate("/");

        window.location.reload();

    };

    const handleSearch = (e) => {

        e.preventDefault();

        if (!search.trim()) return;

        navigate(`/services?search=${encodeURIComponent(search)}`);

        setSearch("");

    };

    return (

        <nav
            className="navbar navbar-expand-lg sticky-top shadow-sm"
            style={{
                backgroundColor: "#FFF8EF",
                borderBottom: "1px solid #ececec"
            }}
        >

            <div className="container">

                {/* Logo */}

                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center"
                >

                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            background: "red"
                        }}
                    ></div>

                    <div className="d-flex flex-column">

                        <span
                            className="fw-bold"
                            style={{
                                color: "#0B2E4F",
                                fontSize: "1.15rem",
                                lineHeight: "1.1"
                            }}
                        >
                            City Home Services
                        </span>

                        <small
                            style={{
                                color: "#777",
                                fontSize: "12px"
                            }}
                        >
                            We Care, You Relax
                        </small>

                    </div>

                </Link>

                {/* Mobile Toggle */}

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
                >
                                        {/* Center Navigation */}

                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link
                                className="nav-link fw-semibold px-3"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link fw-semibold px-3"
                                to="/services"
                            >
                                Services
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link fw-semibold px-3"
                                to="/categories"
                            >
                                Categories
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link fw-semibold px-3"
                                to="/about"
                            >
                                About
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link fw-semibold px-3"
                                to="/contact"
                            >
                                Contact
                            </Link>
                        </li>

                    </ul>

                    {/* Right Side */}

                    <div className="d-flex align-items-center gap-2 flex-wrap">

                        <form
                            className="d-flex"
                            onSubmit={handleSearch}
                        >

                            <input
                                type="search"
                                className="form-control"
                                placeholder="Search services..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    width: "220px"
                                }}
                            />

                        </form>

                        {!token && (

                            <>

                                <Link
                                    to="/login"
                                    className="btn btn-outline-dark"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="btn"
                                    style={{
                                        background: "#F7941D",
                                        color: "#fff",
                                        fontWeight: "600"
                                    }}
                                >
                                    Register
                                </Link>

                                <Link
                                    to="/services"
                                    className="btn"
                                    style={{
                                        background: "#0B2E4F",
                                        color: "#fff",
                                        fontWeight: "600",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    Book Service
                                </Link>

                            </>

                        )}

                        {token && (
                                                        <div className="dropdown">

                                <button
                                    className="btn btn-outline-dark dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                >
                                    <i className="bi bi-person-circle me-2"></i>
                                    {firstName}
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end shadow">

                                    <li>
                                        <span className="dropdown-item-text">
                                            <strong>Role:</strong> {role}
                                        </span>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>

                                    {role === "Customer" && (
                                        <>
                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/customer/dashboard"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/customer/bookings"
                                                >
                                                    My Bookings
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/customer/addresses"
                                                >
                                                    Addresses
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/customer/profile"
                                                >
                                                    Profile
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/services"
                                                >
                                                    Book Service
                                                </Link>
                                            </li>
                                        </>
                                    )}

                                    {role === "Admin" && (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="/dashboard"
                                            >
                                                Admin Dashboard
                                            </Link>
                                        </li>
                                    )}

                                    {role === "Technician" && (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="/technician"
                                            >
                                                My Jobs
                                            </Link>
                                        </li>
                                    )}

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

                        )}

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;