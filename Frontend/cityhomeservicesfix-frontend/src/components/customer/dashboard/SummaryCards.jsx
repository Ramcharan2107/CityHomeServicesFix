import { Link } from "react-router-dom";

function SummaryCards({ summary }) {

    const cards = [
        {
            title: "Total Bookings",
            value: summary?.totalBookings ?? 0,
            icon: "bi-calendar-check",
            color: "#0B2E4F",
            bg: "#EAF3FB",
            link: "/customer/bookings"
        },
        {
            title: "Pending",
            value: summary?.pendingBookings ?? 0,
            icon: "bi-clock-history",
            color: "#F7941D",
            bg: "#FFF4E5",
            link: "/customer/bookings"
        },
        {
            title: "Completed",
            value: summary?.completedBookings ?? 0,
            icon: "bi-check-circle",
            color: "#28A745",
            bg: "#EAF8EE",
            link: "/customer/bookings"
        },
        {
            title: "Saved Addresses",
            value: summary?.totalAddresses ?? 0,
            icon: "bi-geo-alt",
            color: "#DC3545",
            bg: "#FDECEC",
            link: "/customer/addresses"
        }
    ];

    return (

        <div className="row g-4">

            {cards.map((card, index) => (

                <div
                    className="col-lg-3 col-md-6"
                    key={index}
                >

                    <Link
                        to={card.link}
                        className="text-decoration-none"
                    >

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{
                                borderRadius: "18px",
                                transition: "all .3s ease",
                                cursor: "pointer"
                            }}
                            onMouseEnter={(e) => {

                                e.currentTarget.style.transform = "translateY(-6px)";
                                e.currentTarget.style.boxShadow =
                                    "0 15px 35px rgba(0,0,0,.12)";

                            }}
                            onMouseLeave={(e) => {

                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "";

                            }}
                        >

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <small className="text-muted">
                                            {card.title}
                                        </small>

                                        <h2
                                            className="fw-bold mt-2"
                                            style={{
                                                color: "#0B2E4F"
                                            }}
                                        >
                                            {card.value}
                                        </h2>

                                    </div>

                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{
                                            width: "65px",
                                            height: "65px",
                                            borderRadius: "16px",
                                            background: card.bg
                                        }}
                                    >

                                        <i
                                            className={`bi ${card.icon}`}
                                            style={{
                                                fontSize: "30px",
                                                color: card.color
                                            }}
                                        ></i>

                                    </div>

                                </div>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center">

                                    <small className="text-muted">
                                        View Details
                                    </small>

                                    <i
                                        className="bi bi-arrow-right"
                                        style={{
                                            color: card.color
                                        }}
                                    ></i>

                                </div>

                            </div>

                        </div>

                    </Link>

                </div>

            ))}

        </div>

    );

}

export default SummaryCards;