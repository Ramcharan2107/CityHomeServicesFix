import { Link } from "react-router-dom";

function RecentBookings({ bookings = [] }) {

    const getBadge = (status) => {

        switch (status?.toLowerCase()) {

            case "completed":
                return "success";

            case "pending":
                return "warning";

            case "assigned":
                return "primary";

            case "in progress":
                return "info";

            case "cancelled":
                return "danger";

            default:
                return "secondary";

        }

    };

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    };

    return (

        <>

            {bookings.length === 0 ? (

                <div
                    className="text-center py-5"
                    style={{
                        minHeight: "320px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >

                    <div
                        className="d-flex justify-content-center align-items-center mb-4"
                        style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            background: "#FFF4E8"
                        }}
                    >

                        <i
                            className="bi bi-calendar-x"
                            style={{
                                fontSize: "52px",
                                color: "#F7941D"
                            }}
                        ></i>

                    </div>

                    <h3
                        className="fw-bold mb-2"
                        style={{
                            color: "#0B2E4F"
                        }}
                    >
                        No Recent Bookings
                    </h3>

                    <p
                        className="text-muted mb-4"
                        style={{
                            maxWidth: "420px"
                        }}
                    >
                        You haven't booked any home services yet.
                        Start by exploring our professional services.
                    </p>

                    <Link
                        to="/services"
                        className="btn px-4 py-2"
                        style={{
                            background: "#F7941D",
                            color: "#fff",
                            borderRadius: "10px",
                            fontWeight: "600"
                        }}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Book Your First Service
                    </Link>

                </div>

            ) : (

                <div className="table-responsive">

                    <table
                        className="table align-middle"
                        style={{
                            marginBottom: 0
                        }}
                    >

                        <thead
                            style={{
                                background: "#F8FAFC"
                            }}
                        >

                            <tr>

                                <th className="border-0">Service</th>

                                <th className="border-0">Booking Date</th>

                                <th className="border-0">Amount</th>

                                <th className="border-0">Status</th>

                                <th className="border-0 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>
                                                        {bookings.map((booking) => (

                                <tr
                                    key={booking.serviceRequestId}
                                    style={{
                                        verticalAlign: "middle"
                                    }}
                                >

                                    <td>

                                        <div className="d-flex align-items-center">

                                            <div
                                                className="d-flex justify-content-center align-items-center me-3"
                                                style={{
                                                    width: "52px",
                                                    height: "52px",
                                                    borderRadius: "12px",
                                                    background: "#FFF4E8"
                                                }}
                                            >

                                                <i
                                                    className="bi bi-tools"
                                                    style={{
                                                        fontSize: "22px",
                                                        color: "#F7941D"
                                                    }}
                                                ></i>

                                            </div>

                                            <div>

                                                <div
                                                    className="fw-bold"
                                                    style={{
                                                        color: "#0B2E4F"
                                                    }}
                                                >
                                                    {booking.serviceName}
                                                </div>

                                                <small className="text-muted">

                                                    Booking ID :
                                                    {" "}
                                                    #{booking.serviceRequestId}

                                                </small>

                                            </div>

                                        </div>

                                    </td>

                                    <td>

                                        <span className="fw-semibold">

                                            {formatDate(booking.bookingDate)}

                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className="fw-bold"
                                            style={{
                                                color: "#F7941D",
                                                fontSize: "18px"
                                            }}
                                        >

                                            ₹ {booking.estimatedCost}

                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={`badge bg-${getBadge(
                                                booking.status
                                            )}`}
                                            style={{
                                                fontSize: "13px",
                                                padding: "8px 14px",
                                                borderRadius: "20px"
                                            }}
                                        >

                                            {booking.status}

                                        </span>

                                    </td>

                                    <td className="text-center">

                                        <div className="d-flex justify-content-center gap-2">

                                            <Link
                                                to={`/customer/bookings/${booking.serviceRequestId}`}
                                                className="btn btn-sm"
                                                style={{
                                                    background: "#0B2E4F",
                                                    color: "#fff",
                                                    borderRadius: "8px",
                                                    padding: "6px 16px"
                                                }}
                                            >

                                                Details

                                            </Link>

                                            <button
                                                className="btn btn-sm btn-outline-warning"
                                                disabled
                                                style={{
                                                    borderRadius: "8px"
                                                }}
                                            >

                                                Invoice

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}
                                                    </tbody>

                    </table>

                </div>

            )}

        </>

    );

}

export default RecentBookings;