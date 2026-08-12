import { Link } from "react-router-dom";

function QuickActions() {

    const actions = [
        {
            title: "Book Service",
            description: "Book a new home service",
            icon: "bi-plus-circle-fill",
            color: "#F7941D",
            link: "/services"
        },
        {
            title: "My Bookings",
            description: "View all your bookings",
            icon: "bi-calendar-check-fill",
            color: "#0B2E4F",
            link: "/customer/bookings"
        },
        {
            title: "Addresses",
            description: "Manage saved addresses",
            icon: "bi-geo-alt-fill",
            color: "#DC3545",
            link: "/customer/addresses"
        },
        {
            title: "My Profile",
            description: "Update your profile",
            icon: "bi-person-fill",
            color: "#198754",
            link: "/customer/profile"
        },
        {
            title: "Support",
            description: "Need help? Contact us",
            icon: "bi-headset",
            color: "#6F42C1",
            link: "/contact"
        }
    ];

    return (

        <div
            className="card border-0 shadow-sm h-100"
            style={{
                borderRadius: "20px"
            }}
        >

            <div className="card-body">

                {actions.map((action, index) => (

                    <Link
                        key={index}
                        to={action.link}
                        className="text-decoration-none"
                    >

                        <div
                            className="d-flex align-items-center justify-content-between mb-3 p-3"
                            style={{
                                borderRadius: "14px",
                                background: "#F8F9FA",
                                transition: ".3s",
                                cursor: "pointer"
                            }}
                            onMouseEnter={(e) => {

                                e.currentTarget.style.background = "#EEF5FF";
                                e.currentTarget.style.transform = "translateX(6px)";

                            }}
                            onMouseLeave={(e) => {

                                e.currentTarget.style.background = "#F8F9FA";
                                e.currentTarget.style.transform = "translateX(0px)";

                            }}
                        >

                            <div className="d-flex align-items-center">

                                <div
                                    className="d-flex justify-content-center align-items-center me-3"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "14px",
                                        background: `${action.color}15`
                                    }}
                                >

                                    <i
                                        className={`bi ${action.icon}`}
                                        style={{
                                            color: action.color,
                                            fontSize: "24px"
                                        }}
                                    ></i>

                                </div>

                                <div>

                                    <h6
                                        className="mb-1 fw-bold"
                                        style={{ color: "#0B2E4F" }}
                                    >
                                        {action.title}
                                    </h6>

                                    <small className="text-muted">
                                        {action.description}
                                    </small>

                                </div>

                            </div>

                            <i
                                className="bi bi-chevron-right"
                                style={{
                                    color: "#999"
                                }}
                            ></i>

                        </div>

                    </Link>

                ))}

            </div>

        </div>

    );

}

export default QuickActions;