import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import PageContainer from "../../components/common/PageContainer";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
function BookingSummary() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { booking, setBooking } = useBooking();

    const gst = Math.round(booking.servicePrice * 0.18);
    const total = booking.servicePrice + gst;

    const handleContinue = () => {

        setBooking(prev => ({
            ...prev,
            total
        }));

        navigate(`/booking/payment/${id}`);
    };

    return (

        <PageContainer>

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow border-0">

                        <div
                            className="card-header"
                            style={{
                                background: "#F4B400",
                                color: "#0B1F3A"
                            }}
                        >
                            <h3 className="mb-0">
                                Booking Summary
                            </h3>
                        </div>

                        <div className="card-body">

                            <table className="table">

                                <tbody>

                                    <tr>
                                        <th>Service</th>
                                        <td>{booking.serviceName}</td>
                                    </tr>

                                    <tr>
                                        <th>Date</th>
                                        <td>{booking.bookingDate}</td>
                                    </tr>

                                    <tr>
                                        <th>Time</th>
                                        <td>{booking.bookingTime}</td>
                                    </tr>

                                    <tr>
                                        <th>Service Charge</th>
                                        <td>₹ {booking.servicePrice}</td>
                                    </tr>

                                    <tr>
                                        <th>GST (18%)</th>
                                        <td>₹ {gst}</td>
                                    </tr>

                                    <tr className="table-warning">
                                        <th>Total Amount</th>
                                        <th>₹ {total}</th>
                                    </tr>

                                </tbody>

                            </table>

                            <button
                                className="btn w-100 mt-3"
                                style={{
                                    background: "#0B1F3A",
                                    color: "#fff"
                                }}
                                onClick={handleContinue}
                            >
                                Continue to Payment
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </PageContainer>

    );
}

export default BookingSummary;