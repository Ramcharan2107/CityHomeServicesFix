import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./UpcomingBooking.css";


function UpcomingBooking({ booking }) {

    const [showTrack, setShowTrack] = useState(false);

    const [showReschedule, setShowReschedule] = useState(false);

    const [selectedDate, setSelectedDate] = useState("");

    const [selectedTime, setSelectedTime] = useState("");


    /* =====================================================
       LOCAL RESCHEDULED DATE
    ===================================================== */

    const storageKey =
        booking?.serviceRequestId
            ? `cityhome_reschedule_${booking.serviceRequestId}`
            : null;


    const [displayDate, setDisplayDate] = useState(
        booking?.bookingDate
    );


    useEffect(() => {

        if (!booking) {
            return;
        }

        const savedDate =
            storageKey
                ? localStorage.getItem(storageKey)
                : null;

        if (savedDate) {

            setDisplayDate(savedDate);

        }
        else {

            setDisplayDate(
                booking.bookingDate
            );

        }

    }, [
        booking,
        storageKey
    ]);


    /* =====================================================
       DATE FORMAT
    ===================================================== */

    const formatDate = (value) => {

        if (!value) {
            return "-";
        }

        const date =
            new Date(value);

        if (Number.isNaN(date.getTime())) {
            return value;
        }

        return date.toLocaleDateString(
            "en-IN",
            {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    /* =====================================================
       STATUS
    ===================================================== */

    const getStatus = () => {

        switch (
            booking?.status?.toLowerCase()
        ) {

            case "completed":

                return {
                    label: "Completed",
                    className: "upcoming-status-completed",
                    icon: "bi-check-circle-fill"
                };

            case "assigned":

                return {
                    label: "Technician Assigned",
                    className: "upcoming-status-assigned",
                    icon: "bi-person-check-fill"
                };

            case "in progress":

                return {
                    label: "Service In Progress",
                    className: "upcoming-status-progress",
                    icon: "bi-tools"
                };

            case "cancelled":

                return {
                    label: "Cancelled",
                    className: "upcoming-status-cancelled",
                    icon: "bi-x-circle-fill"
                };

            default:

                return {
                    label: "Booking Confirmed",
                    className: "upcoming-status-pending",
                    icon: "bi-clock-fill"
                };

        }

    };


    const status =
        getStatus();


    /* =====================================================
       TRACKING STEPS
    ===================================================== */

    const getTrackingSteps = () => {

        const current =
            booking?.status?.toLowerCase();


        const steps = [
            {
                title: "Booking Confirmed",
                description:
                    "Your service request has been successfully created.",
                icon: "bi-check-circle-fill"
            },
            {
                title: "Technician Assignment",
                description:
                    "We are assigning a verified professional.",
                icon: "bi-person-check-fill"
            },
            {
                title: "Technician On The Way",
                description:
                    "Your technician will arrive at the scheduled time.",
                icon: "bi-truck"
            },
            {
                title: "Service Completion",
                description:
                    "The service will be completed at your doorstep.",
                icon: "bi-house-check-fill"
            }
        ];


        let activeIndex = 0;


        if (current === "assigned") {
            activeIndex = 1;
        }

        if (current === "in progress") {
            activeIndex = 2;
        }

        if (current === "completed") {
            activeIndex = 3;
        }


        if (current === "cancelled") {

            return steps.map(
                (step, index) => ({
                    ...step,
                    completed: index === 0,
                    active: false
                })
            );

        }


        return steps.map(
            (step, index) => ({
                ...step,
                completed:
                    index < activeIndex,
                active:
                    index === activeIndex
            })
        );

    };


    /* =====================================================
       OPEN RESCHEDULE
    ===================================================== */

    const openReschedule = () => {

        const existing =
            displayDate
                ? new Date(displayDate)
                : null;


        if (
            existing &&
            !Number.isNaN(existing.getTime())
        ) {

            const year =
                existing.getFullYear();

            const month =
                String(
                    existing.getMonth() + 1
                ).padStart(2, "0");

            const day =
                String(
                    existing.getDate()
                ).padStart(2, "0");


            setSelectedDate(
                `${year}-${month}-${day}`
            );

        }
        else {

            setSelectedDate("");

        }


        setSelectedTime("10:00");

        setShowReschedule(true);

    };


    /* =====================================================
       CONFIRM RESCHEDULE
    ===================================================== */

    const confirmReschedule = () => {

        if (!selectedDate) {

            alert(
                "Please select a new service date."
            );

            return;

        }


        if (!selectedTime) {

            alert(
                "Please select a preferred time."
            );

            return;

        }


        const newDate =
            new Date(
                `${selectedDate}T${selectedTime}`
            );


        if (
            Number.isNaN(
                newDate.getTime()
            )
        ) {

            alert(
                "Please select a valid date and time."
            );

            return;

        }


        const formatted =
            newDate.toISOString();


        if (storageKey) {

            localStorage.setItem(
                storageKey,
                formatted
            );

        }


        setDisplayDate(
            formatted
        );


        setShowReschedule(false);


        alert(
            "Your new preferred date and time has been updated on this device."
        );

    };


    /* =====================================================
       NO BOOKING
    ===================================================== */

    if (!booking) {

        return (

            <div className="upcoming-empty">

                <div className="upcoming-empty-icon">

                    <i className="bi bi-calendar-x"></i>

                </div>

                <h4>
                    No Upcoming Booking
                </h4>

                <p>
                    You don't have any upcoming
                    services scheduled.
                </p>

                <Link
                    to="/services"
                    className="upcoming-primary-btn"
                >

                    <i className="bi bi-plus-circle"></i>

                    Book a Service

                </Link>

            </div>

        );

    }


    const trackingSteps =
        getTrackingSteps();


    return (

        <>

            {/* =================================================
                MAIN BOOKING CARD
            ================================================= */}

            <div className="upcoming-booking-card">


                {/* TOP */}

                <div className="upcoming-booking-top">

                    <div className="upcoming-service-icon">

                        <i className="bi bi-tools"></i>

                    </div>


                    <div className="upcoming-service-title">

                        <div className="upcoming-service-label">

                            UPCOMING SERVICE

                        </div>

                        <h3>
                            {booking.serviceName ||
                                "Home Service"}
                        </h3>

                        <span>
                            Booking #
                            {booking.serviceRequestId}
                        </span>

                    </div>


                    <div
                        className={`upcoming-status ${status.className}`}
                    >

                        <i
                            className={`bi ${status.icon}`}
                        ></i>

                        {status.label}

                    </div>

                </div>


                {/* DETAILS */}

                <div className="upcoming-details-grid">


                    <div className="upcoming-detail">

                        <div className="upcoming-detail-icon">

                            <i className="bi bi-calendar-event"></i>

                        </div>

                        <div>

                            <small>
                                SERVICE DATE
                            </small>

                            <strong>
                                {formatDate(
                                    displayDate
                                )}
                            </strong>

                        </div>

                    </div>


                    <div className="upcoming-detail">

                        <div className="upcoming-detail-icon">

                            <i className="bi bi-person-workspace"></i>

                        </div>

                        <div>

                            <small>
                                TECHNICIAN
                            </small>

                            <strong>
                                {booking.technicianName ||
                                    "Not Assigned"}
                            </strong>

                        </div>

                    </div>


                    <div className="upcoming-detail">

                        <div className="upcoming-detail-icon">

                            <i className="bi bi-currency-rupee"></i>

                        </div>

                        <div>

                            <small>
                                ESTIMATED COST
                            </small>

                            <strong className="upcoming-price">

                                ₹{" "}
                                {Number(
                                    booking.estimatedCost || 0
                                ).toLocaleString(
                                    "en-IN"
                                )}

                            </strong>

                        </div>

                    </div>


                    <div className="upcoming-detail">

                        <div className="upcoming-detail-icon">

                            <i className="bi bi-shield-check"></i>

                        </div>

                        <div>

                            <small>
                                SERVICE TYPE
                            </small>

                            <strong>
                                Professional Service
                            </strong>

                        </div>

                    </div>

                </div>


                {/* ACTIONS */}

                <div className="upcoming-actions">


                    <Link
                        to={`/customer/bookings/${booking.serviceRequestId}`}
                        className="upcoming-action primary"
                    >

                        <i className="bi bi-eye-fill"></i>

                        <span>
                            View Details
                        </span>

                        <i className="bi bi-arrow-up-right action-arrow"></i>

                    </Link>


                    <button
                        type="button"
                        className="upcoming-action track"
                        onClick={() =>
                            setShowTrack(true)
                        }
                    >

                        <i className="bi bi-geo-alt-fill"></i>

                        <span>
                            Track Service
                        </span>

                        <i className="bi bi-chevron-right action-arrow"></i>

                    </button>


                    {booking.status?.toLowerCase() !==
                        "completed" &&
                        booking.status?.toLowerCase() !==
                        "cancelled" && (

                            <button
                                type="button"
                                className="upcoming-action reschedule"
                                onClick={openReschedule}
                            >

                                <i className="bi bi-calendar2-event-fill"></i>

                                <span>
                                    Reschedule
                                </span>

                                <i className="bi bi-chevron-right action-arrow"></i>

                            </button>

                        )}

                </div>


                {/* FOOTER */}

                <div className="upcoming-footer">

                    <div>

                        <i className="bi bi-info-circle-fill"></i>

                        <span>
                            Need help with this booking?
                        </span>

                    </div>

                    <Link to="/contact">
                        Contact Support
                    </Link>

                </div>

            </div>


            {/* =================================================
                TRACKING MODAL
            ================================================= */}

            {showTrack && (

                <div
                    className="upcoming-modal-overlay"
                    onClick={() =>
                        setShowTrack(false)
                    }
                >

                    <div
                        className="upcoming-modal tracking-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="upcoming-modal-header">

                            <div>

                                <span>
                                    SERVICE TRACKING
                                </span>

                                <h3>
                                    Track Your Service
                                </h3>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowTrack(false)
                                }
                                aria-label="Close"
                            >

                                <i className="bi bi-x-lg"></i>

                            </button>

                        </div>


                        <div className="tracking-summary">

                            <div className="tracking-summary-icon">

                                <i className="bi bi-tools"></i>

                            </div>

                            <div>

                                <strong>
                                    {booking.serviceName}
                                </strong>

                                <span>
                                    Booking #
                                    {booking.serviceRequestId}
                                </span>

                            </div>

                            <div
                                className={`upcoming-status ${status.className}`}
                            >
                                {status.label}
                            </div>

                        </div>


                        <div className="tracking-timeline">

                            {trackingSteps.map(
                                (step, index) => (

                                    <div
                                        className={`tracking-step ${
                                            step.completed
                                                ? "completed"
                                                : ""
                                        } ${
                                            step.active
                                                ? "active"
                                                : ""
                                        }`}
                                        key={step.title}
                                    >

                                        <div className="tracking-step-marker">

                                            <i
                                                className={`bi ${
                                                    step.completed
                                                        ? "bi-check-lg"
                                                        : step.icon
                                                }`}
                                            ></i>

                                        </div>

                                        {index <
                                            trackingSteps.length -
                                            1 && (

                                            <div
                                                className={`tracking-step-line ${
                                                    step.completed
                                                        ? "completed"
                                                        : ""
                                                }`}
                                            ></div>

                                        )}

                                        <div className="tracking-step-content">

                                            <strong>
                                                {step.title}
                                            </strong>

                                            <span>
                                                {step.description}
                                            </span>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>


                        <div className="tracking-note">

                            <i className="bi bi-shield-check"></i>

                            <div>

                                <strong>
                                    Verified Professional Service
                                </strong>

                                <p>
                                    Your booking is being handled
                                    through City Home Services.
                                </p>

                            </div>

                        </div>


                        <div className="upcoming-modal-footer">

                            <button
                                type="button"
                                className="upcoming-modal-secondary"
                                onClick={() =>
                                    setShowTrack(false)
                                }
                            >
                                Close
                            </button>

                            <Link
                                to={`/customer/bookings/${booking.serviceRequestId}`}
                                className="upcoming-modal-primary"
                                onClick={() =>
                                    setShowTrack(false)
                                }
                            >

                                <i className="bi bi-eye"></i>

                                Full Booking Details

                            </Link>

                        </div>

                    </div>

                </div>

            )}


            {/* =================================================
                RESCHEDULE MODAL
            ================================================= */}

            {showReschedule && (

                <div
                    className="upcoming-modal-overlay"
                    onClick={() =>
                        setShowReschedule(false)
                    }
                >

                    <div
                        className="upcoming-modal reschedule-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="upcoming-modal-header">

                            <div>

                                <span>
                                    CHANGE APPOINTMENT
                                </span>

                                <h3>
                                    Reschedule Service
                                </h3>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowReschedule(false)
                                }
                                aria-label="Close"
                            >

                                <i className="bi bi-x-lg"></i>

                            </button>

                        </div>


                        <div className="reschedule-service">

                            <div className="reschedule-icon">

                                <i className="bi bi-calendar2-check-fill"></i>

                            </div>

                            <div>

                                <strong>
                                    {booking.serviceName}
                                </strong>

                                <span>
                                    Current date:
                                    {" "}
                                    {formatDate(
                                        displayDate
                                    )}
                                </span>

                            </div>

                        </div>


                        <div className="reschedule-form">

                            <div className="reschedule-field">

                                <label htmlFor="newServiceDate">

                                    New Service Date

                                </label>

                                <div className="reschedule-input">

                                    <i className="bi bi-calendar-event"></i>

                                    <input
                                        id="newServiceDate"
                                        type="date"
                                        value={selectedDate}
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        onChange={(e) =>
                                            setSelectedDate(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>


                            <div className="reschedule-field">

                                <label htmlFor="newServiceTime">

                                    Preferred Time

                                </label>

                                <div className="reschedule-input">

                                    <i className="bi bi-clock"></i>

                                    <select
                                        id="newServiceTime"
                                        value={selectedTime}
                                        onChange={(e) =>
                                            setSelectedTime(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select time
                                        </option>

                                        <option value="09:00">
                                            09:00 AM
                                        </option>

                                        <option value="10:00">
                                            10:00 AM
                                        </option>

                                        <option value="11:00">
                                            11:00 AM
                                        </option>

                                        <option value="12:00">
                                            12:00 PM
                                        </option>

                                        <option value="14:00">
                                            02:00 PM
                                        </option>

                                        <option value="15:00">
                                            03:00 PM
                                        </option>

                                        <option value="16:00">
                                            04:00 PM
                                        </option>

                                        <option value="17:00">
                                            05:00 PM
                                        </option>

                                        <option value="18:00">
                                            06:00 PM
                                        </option>

                                    </select>

                                </div>

                            </div>

                        </div>


                        <div className="reschedule-warning">

                            <i className="bi bi-info-circle-fill"></i>

                            <p>
                                The selected date and time will be
                                saved on this device. Your booking
                                database will not be changed until
                                a reschedule API is connected.
                            </p>

                        </div>


                        <div className="upcoming-modal-footer">

                            <button
                                type="button"
                                className="upcoming-modal-secondary"
                                onClick={() =>
                                    setShowReschedule(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="upcoming-modal-primary"
                                onClick={
                                    confirmReschedule
                                }
                            >

                                <i className="bi bi-check2-circle"></i>

                                Confirm Date

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>

    );

}


export default UpcomingBooking;