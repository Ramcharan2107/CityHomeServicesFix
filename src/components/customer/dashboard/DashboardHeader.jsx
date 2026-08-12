import { Link, useNavigate } from "react-router-dom";

function DashboardHeader({ dashboard }) {

    const navigate = useNavigate();

    const hour = new Date().getHours();

    let greeting = "Welcome";

    if (hour < 12) {

        greeting = "Good Morning";

    }
    else if (hour < 17) {

        greeting = "Good Afternoon";

    }
    else {

        greeting = "Good Evening";

    }

    const customerName =
        dashboard?.customerName || "Customer";

    const notificationCount =
        dashboard?.notifications?.length || 0;

    return (

        <div
            className="card border-0 shadow-sm mb-4"
            style={{
                borderRadius: "20px",
                background:
                    "linear-gradient(135deg,#0B2E4F,#134A75)"
            }}
        >

            <div className="card-body p-4">

                <div className="row align-items-center">

                    <div className="col-lg-8">

                        <span
                            className="badge mb-3"
                            style={{
                                background: "#F7941D",
                                color: "#fff",
                                fontSize: "14px"
                            }}
                        >
                            Customer Dashboard
                        </span>

                        <h2
                            className="fw-bold text-white mb-2"
                        >
                            👋 {greeting}, {customerName}
                        </h2>

                        <p
                            className="text-light mb-3"
                        >
                            Manage your bookings, addresses,
                            profile and upcoming home services
                            from one place.
                        </p>

                        <div className="d-flex flex-wrap gap-3">

                            <small className="text-white">

                                <i className="bi bi-calendar-check me-2"></i>

                                {dashboard?.totalBookings || 0}
                                {" "}Total Bookings

                            </small>

                            <small className="text-white">

                                <i className="bi bi-clock-history me-2"></i>

                                {dashboard?.pendingBookings || 0}
                                {" "}Pending

                            </small>

                            <small className="text-white">

                                <i className="bi bi-check-circle me-2"></i>

                                {dashboard?.completedBookings || 0}
                                {" "}Completed

                            </small>

                        </div>

                    </div>

                    <div className="col-lg-4 mt-4 mt-lg-0">

                        <div
                            className="d-flex justify-content-lg-end gap-3 flex-wrap"
                        >

                            <Link
                                to="/services"
                                className="btn"
                                style={{
                                    background: "#F7941D",
                                    color: "#fff",
                                    fontWeight: "600",
                                    borderRadius: "12px"
                                }}
                            >
                                <i className="bi bi-plus-circle me-2"></i>

                                Book Service

                            </Link>

                            <button
                                className="btn btn-light position-relative"
                                style={{
                                    borderRadius: "12px"
                                }}
                                onClick={() =>
                                    navigate("/customer/notifications")
                                }
                            >

                                <i className="bi bi-bell fs-5"></i>

                                {notificationCount > 0 && (

                                    <span
                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                        {notificationCount}
                                    </span>

                                )}

                            </button>

                            <button
                                className="btn btn-light"
                                style={{
                                    borderRadius: "12px"
                                }}
                                onClick={() =>
                                    navigate("/customer/profile")
                                }
                            >

                                <i className="bi bi-person-circle fs-5 me-2"></i>

                                Profile

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardHeader;