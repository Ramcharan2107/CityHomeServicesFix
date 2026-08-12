import { Link, useNavigate } from "react-router-dom";

function QuickActions() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userName");

        navigate("/");

    };

    const actions = [
        {
            title: "Dashboard",
            icon: "bi-speedometer2",
            color: "#0B2E4F",
            bg: "#EAF3FB",
            link: "/customer/dashboard"
        },
        {
            title: "My Bookings",
            icon: "bi-calendar-check",
            color: "#198754",
            bg: "#EAF8EE",
            link: "/customer/bookings"
        },
        {
            title: "Addresses",
            icon: "bi-geo-alt",
            color: "#DC3545",
            bg: "#FDECEC",
            link: "/customer/addresses"
        },
        {
            title: "Notifications",
            icon: "bi-bell",
            color: "#F7941D",
            bg: "#FFF4E5",
            link: "/customer/notifications"
        },
        {
            title: "Browse Services",
            icon: "bi-tools",
            color: "#6F42C1",
            bg: "#F3ECFF",
            link: "/services"
        }
    ];

    return (

        <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: "20px" }}
        >

            <div className="card-body">

                <h4
                    className="fw-bold mb-4"
                    style={{ color: "#0B2E4F" }}
                >
                    Quick Actions
                </h4>

                <div className="d-grid gap-3">

                    {actions.map((item) => (

                        <Link
                            key={item.title}
                            to={item.link}
                            className="text-decoration-none"
                        >

                            <div
                                className="d-flex align-items-center p-3 rounded"
                                style={{
                                    background: item.bg,
                                    transition: ".3s"
                                }}
                            >

                                <div
                                    className="d-flex justify-content-center align-items-center me-3"
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        borderRadius: "12px",
                                        background: "#fff"
                                    }}
                                >

                                    <i
                                        className={`bi ${item.icon}`}
                                        style={{
                                            color: item.color,
                                            fontSize: "22px"
                                        }}
                                    ></i>

                                </div>

                                <div className="flex-grow-1">

                                    <h6
                                        className="mb-0 fw-bold"
                                        style={{ color: "#0B2E4F" }}
                                    >
                                        {item.title}
                                    </h6>

                                </div>

                                <i className="bi bi-chevron-right"></i>

                            </div>

                        </Link>

                    ))}

                    <button
                        className="btn btn-danger mt-2"
                        onClick={logout}
                    >

                        <i className="bi bi-box-arrow-right me-2"></i>

                        Logout

                    </button>

                </div>

            </div>

        </div>

    );

}

export default QuickActions;