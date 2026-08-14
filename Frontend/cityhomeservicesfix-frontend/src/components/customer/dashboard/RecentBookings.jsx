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

                <div
                    className="table-responsive"
                    style={{
                        overflowX: "auto",
                        WebkitOverflowScrolling: "touch"
                    }}
                >

                    <table
                        className="table align-middle"
                        style={{
                            marginBottom: 0,
                            minWidth: "900px",
                            tableLayout: "auto"
                        }}
                    >

                        <thead
                            style={{
                                background: "#F8FAFC"
                            }}
                        >

                            <tr>

                                <th
                                    className="border-0"
                                    style={{
                                        minWidth: "300px",
                                        whiteSpace: "nowrap",
                                        color: "#164B73",
                                        fontWeight: 800,
                                        fontSize: "14px",
                                        padding: "18px 14px"
                                    }}
                                >
                                    Service
                                </th>

                                <th
                                    className="border-0"
                                    style={{
                                        minWidth: "145px",
                                        whiteSpace: "nowrap",
                                        color: "#164B73",
                                        fontWeight: 800,
                                        fontSize: "14px",
                                        padding: "18px 14px"
                                    }}
                                >
                                    Booking Date
                                </th>

                                <th
                                    className="border-0"
                                    style={{
                                        minWidth: "120px",
                                        whiteSpace: "nowrap",
                                        color: "#164B73",
                                        fontWeight: 800,
                                        fontSize: "14px",
                                        padding: "18px 14px"
                                    }}
                                >
                                    Amount
                                </th>

                                <th
                                    className="border-0"
                                    style={{
                                        minWidth: "125px",
                                        whiteSpace: "nowrap",
                                        color: "#164B73",
                                        fontWeight: 800,
                                        fontSize: "14px",
                                        padding: "18px 14px"
                                    }}
                                >
                                    Status
                                </th>

                                <th
                                    className="border-0 text-center"
                                    style={{
                                        minWidth: "210px",
                                        whiteSpace: "nowrap",
                                        color: "#164B73",
                                        fontWeight: 800,
                                        fontSize: "14px",
                                        padding: "18px 14px"
                                    }}
                                >
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>
                                                        {bookings.map((booking) => (

                                <tr
                                    key={booking.serviceRequestId}
                                    style={{
                                        verticalAlign: "middle",
                                        minHeight: "92px"
                                    }}
                                >

                                    <td
                                        style={{
                                            minWidth: "300px",
                                            padding: "14px"
                                        }}
                                    >

                                        <div
                                            className="d-flex align-items-center"
                                            style={{
                                                minWidth: 0
                                            }}
                                        >

                                            <div
                                                className="d-flex justify-content-center align-items-center me-3"
                                                style={{
                                                    width: "56px",
                                                    height: "56px",
                                                    minWidth: "56px",
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
                                                        color: "#0B2E4F",
                                                        fontSize: "16px",
                                                        lineHeight: 1.35,
                                                        maxWidth: "190px",
                                                        overflowWrap: "break-word"
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

                                    <td
                                        style={{
                                            minWidth: "145px",
                                            padding: "14px"
                                        }}
                                    >

                                        <span
                                            className="fw-semibold"
                                            style={{
                                                whiteSpace: "nowrap",
                                                color: "#16324F",
                                                fontSize: "15px"
                                            }}
                                        >

                                            {formatDate(booking.bookingDate)}

                                        </span>

                                    </td>

                                    <td
                                        style={{
                                            minWidth: "120px",
                                            padding: "14px"
                                        }}
                                    >

                                        <span
                                            className="fw-bold"
                                            style={{
                                                color: "#F7941D",
                                                fontSize: "18px",
                                                whiteSpace: "nowrap"
                                            }}
                                        >

                                            ₹ {booking.estimatedCost}

                                        </span>

                                    </td>

                                    <td
                                        style={{
                                            minWidth: "125px",
                                            padding: "14px"
                                        }}
                                    >

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

                                    <td
                                        className="text-center"
                                        style={{
                                            minWidth: "210px",
                                            padding: "14px"
                                        }}
                                    >

                                        <div
                                            className="d-flex justify-content-center gap-2"
                                            style={{
                                                flexWrap: "nowrap"
                                            }}
                                        >

                                            <Link
                                                to={`/customer/bookings/${booking.serviceRequestId}`}
                                                className="btn btn-sm"
                                                style={{
                                                    minWidth: "96px",
                                                    height: "42px",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    whiteSpace: "nowrap",
                                                    background: "#0B2E4F",
                                                    color: "#fff",
                                                    border: "1px solid #0B2E4F",
                                                    borderRadius: "9px",
                                                    padding: "0 15px",
                                                    fontWeight: 700,
                                                    fontSize: "14px"
                                                }}
                                            >

                                                Details

                                            </Link>

                                            <button
                                                className="btn btn-sm btn-outline-warning"
                                                disabled
                                                style={{
                                                    minWidth: "96px",
                                                    height: "42px",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    whiteSpace: "nowrap",
                                                    borderRadius: "9px",
                                                    padding: "0 15px",
                                                    fontWeight: 700,
                                                    fontSize: "14px"
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