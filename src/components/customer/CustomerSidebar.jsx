import { NavLink } from "react-router-dom";

function CustomerSidebar() {

    return (

        <div
            className="bg-dark text-white p-3"
            style={{
                width: "250px",
                minHeight: "100vh"
            }}
        >

            <h4 className="mb-4">
                Customer
            </h4>

            <NavLink
                to="/customer/dashboard"
                className="nav-link text-white mb-3"
            >
                🏠 Dashboard
            </NavLink>

            <NavLink
                to="/services"
                className="nav-link text-white mb-3"
            >
                🛠 Book Service
            </NavLink>

            <NavLink
                to="/customer/bookings"
                className="nav-link text-white mb-3"
            >
                📋 My Bookings
            </NavLink>

            <NavLink
                to="/customer/addresses"
                className="nav-link text-white mb-3"
            >
                📍 Addresses
            </NavLink>

            <NavLink
                to="/customer/profile"
                className="nav-link text-white mb-3"
            >
                👤 Profile
            </NavLink>

        </div>

    );

}

export default CustomerSidebar;