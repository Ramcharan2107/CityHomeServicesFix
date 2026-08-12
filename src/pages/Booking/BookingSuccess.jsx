import { useLocation, useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";

function BookingSuccess() {

    const navigate = useNavigate();
    const location = useLocation();

    const booking = location.state;

    return (

        <div
            className="container py-5 text-center"
            style={{ minHeight: "80vh" }}
        >

            <div className="card shadow border-0 mx-auto"
                style={{ maxWidth: "650px" }}
            >

                <div className="card-body p-5">

                    <div
                        className="display-1"
                        style={{ color: "#28a745" }}
                    >
                        ✓
                    </div>

                    <h2
                        className="fw-bold mt-3"
                        style={{ color: "#0B1F3A" }}
                    >
                        Booking Confirmed
                    </h2>

                    <p className="text-muted">

                        Thank you for choosing

                        <strong> City Home Services</strong>.

                    </p>

                    <hr />

                    <table className="table">

                        <tbody>

                            <tr>

                                <th>Booking ID</th>

                                <td>
                                    {booking?.bookingId}
                                </td>

                            </tr>

                            <tr>

                                <th>Payment Method</th>

                                <td>
                                    {booking?.paymentMethod}
                                </td>

                            </tr>

                            <tr>

                                <th>Amount Paid</th>

                                <td>
                                    ₹ {booking?.amount}
                                </td>

                            </tr>

                        </tbody>

                    </table>

                    <div className="mt-4">

                        <button
                            className="btn me-3"
                            style={{
                                background: "#0B1F3A",
                                color: "#fff"
                            }}
                            onClick={() =>
                                navigate("/customer/bookings")
                            }
                        >
                            My Bookings
                        </button>

                        <button
                            className="btn btn-warning"
                            onClick={() =>
                                navigate("/")
                            }
                        >
                            Back to Home
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default BookingSuccess;