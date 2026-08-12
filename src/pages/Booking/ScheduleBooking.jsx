import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import PageContainer from "../../components/common/PageContainer";
function ScheduleBooking() {

    const navigate = useNavigate();
    const { id } = useParams();

    const today = new Date().toISOString().split("T")[0];

    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState("");
    const { booking, setBooking } = useBooking();

    const slots = [
        "09:00 AM",
        "11:00 AM",
        "02:00 PM",
        "05:00 PM",
        "07:00 PM"
    ];

    const handleContinue = () => {

        if (!selectedTime) {
            alert("Please select a time slot.");
            return;
        }

        setBooking(prev => ({
            ...prev,
            bookingDate: selectedDate,
            bookingTime: selectedTime
        }));

        navigate(`/booking/summary/${id}`);
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
                            <h3>Schedule Service</h3>
                        </div>

                        <div className="card-body">

                            <div className="mb-4">

                                <label className="form-label fw-bold">
                                    Select Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    value={selectedDate}
                                    min={today}
                                    onChange={(e) =>
                                        setSelectedDate(e.target.value)
                                    }
                                />

                            </div>

                            <div>

                                <label className="form-label fw-bold">
                                    Available Time Slots
                                </label>

                                <div className="row">

                                    {slots.map(slot => (

                                        <div
                                            className="col-md-4 mb-3"
                                            key={slot}
                                        >

                                            <button
                                                className={`btn w-100 ${
                                                    selectedTime === slot
                                                        ? "btn-warning"
                                                        : "btn-outline-secondary"
                                                }`}
                                                onClick={() =>
                                                    setSelectedTime(slot)
                                                }
                                            >
                                                {slot}
                                            </button>

                                        </div>

                                    ))}

                                </div>

                            </div>

                            <button
                                className="btn w-100 mt-4"
                                style={{
                                    background: "#0B1F3A",
                                    color: "#fff"
                                }}
                                onClick={handleContinue}
                            >
                                Continue
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </PageContainer>

    );
}

export default ScheduleBooking;