import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useBooking } from "../../context/BookingContext";
import serviceRequestService from "../../services/serviceRequestService";
import PageContainer from "../../components/common/PageContainer";
function PaymentPage() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { booking } = useBooking();

    const [paymentMethod, setPaymentMethod] = useState("UPI");

    const handlePayment = async () => {
        try {
            if (!booking.serviceId) {
                alert("Service information is missing.");
                return;
            }

            if (!booking.addressId) {
                alert("Please select an address.");
                navigate(`/booking/address/${id}`);
                return;
            }

            if (!booking.bookingDate) {
                alert("Please select a booking date.");
                navigate(`/booking/schedule/${id}`);
                return;
            }

            const estimatedCost = Number(booking.total) || 0;

            const request = {
                serviceId: Number(booking.serviceId),

                priority: "Medium",

                title: `${booking.serviceName} Service Request`,

                description:
                    `${booking.serviceName} booked through City Home Services.`,

                preferredVisitDate:
                    `${booking.bookingDate}T09:00:00`,

                estimatedCost:
                    Number(booking.total),

                addressId:
                    Number(booking.addressId)
            };

            console.log("Booking payload:", request);

            const response =
                await serviceRequestService.create(request);

            console.log("Booking response:", response);

            navigate("/booking/success", {
                state: {
                    bookingId:
                        response.requestId ??
                        "BOOKING",

                    paymentMethod,

                    amount: estimatedCost
                }
            });

        } catch (error) {

            console.error(
                "Booking error:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                "Booking failed. Please try again."
            );
        }
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
                                Payment
                            </h3>
                        </div>

                        <div className="card-body">

                            <h5>Total Amount</h5>

                            <h2
                                className="mb-4"
                                style={{ color: "#0B1F3A" }}
                            >
                                ₹ {booking.total}
                            </h2>

                            <div className="form-check mb-3">

                                <input
                                    type="radio"
                                    className="form-check-input"
                                    checked={paymentMethod === "UPI"}
                                    onChange={() => setPaymentMethod("UPI")}
                                />

                                <label className="form-check-label">
                                    UPI
                                </label>

                            </div>

                            <div className="form-check mb-3">

                                <input
                                    type="radio"
                                    className="form-check-input"
                                    checked={paymentMethod === "Card"}
                                    onChange={() => setPaymentMethod("Card")}
                                />

                                <label className="form-check-label">
                                    Credit / Debit Card
                                </label>

                            </div>

                            <div className="form-check mb-3">

                                <input
                                    type="radio"
                                    className="form-check-input"
                                    checked={paymentMethod === "Cash"}
                                    onChange={() => setPaymentMethod("Cash")}
                                />

                                <label className="form-check-label">
                                    Cash on Service
                                </label>

                            </div>

                            <button
                                className="btn w-100 mt-4"
                                style={{
                                    background: "#0B1F3A",
                                    color: "#fff"
                                }}
                                onClick={handlePayment}
                            >
                                Pay & Confirm Booking
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </PageContainer>

    );
}

export default PaymentPage;