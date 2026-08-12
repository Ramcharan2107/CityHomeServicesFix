import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import bookingService from "../../services/bookingService";
import PageContainer from "../../components/common/PageContainer";

import "./BookingDetails.css";


function BookingDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [cancelling, setCancelling] = useState(false);


    /* =====================================================
       LOAD BOOKING
    ===================================================== */

    useEffect(() => {

        loadBooking();

    }, [id]);


    const loadBooking = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await bookingService.getBooking(id);

            setBooking(data);

        }
        catch (error) {

            console.error(
                "Booking details error:",
                error
            );

            console.error(
                "Response:",
                error.response
            );

            setError(
                error.response?.data?.message ||
                `Unable to load booking details. Status: ${
                    error.response?.status || "Unknown"
                }`
            );

        }
        finally {

            setLoading(false);

        }

    };


    /* =====================================================
       CANCEL BOOKING
    ===================================================== */

    const cancelBooking = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmed) {
            return;
        }


        try {

            setCancelling(true);

            await bookingService.cancelBooking(id);

            alert(
                "Booking cancelled successfully."
            );

            navigate(
                "/customer/bookings"
            );

        }
        catch (error) {

            console.error(error);

            alert(
                "Unable to cancel booking."
            );

        }
        finally {

            setCancelling(false);

        }

    };


    /* =====================================================
       PRINT / DOWNLOAD INVOICE
       FRONTEND ONLY
    ===================================================== */

    const downloadInvoice = () => {

        window.print();

    };


    /* =====================================================
       STATUS CONFIG
    ===================================================== */

    const getStatusConfig = (status) => {

        switch (status) {

            case "Pending":

                return {
                    className: "status-pending",
                    icon: "bi-hourglass-split",
                    text: "Pending"
                };

            case "Assigned":

                return {
                    className: "status-assigned",
                    icon: "bi-person-check-fill",
                    text: "Technician Assigned"
                };

            case "In Progress":

                return {
                    className: "status-progress",
                    icon: "bi-tools",
                    text: "Service In Progress"
                };

            case "Completed":

                return {
                    className: "status-completed",
                    icon: "bi-check-circle-fill",
                    text: "Completed"
                };

            case "Cancelled":

                return {
                    className: "status-cancelled",
                    icon: "bi-x-circle-fill",
                    text: "Cancelled"
                };

            default:

                return {
                    className: "status-default",
                    icon: "bi-info-circle-fill",
                    text: status || "Unknown"
                };

        }

    };


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    const formatTime = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


    const statusConfig =
        getStatusConfig(
            booking?.status
        );


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <div className="booking-details-page">

                <PageContainer>

                    <div className="booking-loading">

                        <div className="booking-loading-icon">

                            <i className="bi bi-calendar-check-fill"></i>

                        </div>

                        <div className="spinner-border text-warning"></div>

                        <h4>
                            Loading booking details
                        </h4>

                        <p>
                            Please wait while we retrieve your booking.
                        </p>

                    </div>

                </PageContainer>

            </div>

        );

    }


    /* =====================================================
       ERROR
    ===================================================== */

    if (error || !booking) {

        return (

            <div className="booking-details-page">

                <PageContainer>

                    <div className="booking-error">

                        <div className="booking-error-icon">

                            <i className="bi bi-exclamation-triangle-fill"></i>

                        </div>

                        <h3>
                            Unable to load booking
                        </h3>

                        <p>
                            {error ||
                                "Booking details could not be found."}
                        </p>

                        <div className="booking-error-actions">

                            <button
                                type="button"
                                className="booking-primary-btn"
                                onClick={loadBooking}
                            >

                                <i className="bi bi-arrow-clockwise"></i>

                                Try Again

                            </button>

                            <Link
                                to="/customer/bookings"
                                className="booking-secondary-btn"
                            >

                                <i className="bi bi-arrow-left"></i>

                                Back to Bookings

                            </Link>

                        </div>

                    </div>

                </PageContainer>

            </div>

        );

    }


    return (

        <div className="booking-details-page">

            <PageContainer>

                {/* =================================================
                    TOP HEADER
                ================================================= */}

                <div className="booking-topbar">

                    <div>

                        <Link
                            to="/customer/bookings"
                            className="booking-back-link"
                        >

                            <i className="bi bi-arrow-left"></i>

                            Back to Bookings

                        </Link>

                        <div className="booking-heading">

                            <div className="booking-heading-icon">

                                <i className="bi bi-calendar2-check-fill"></i>

                            </div>

                            <div>

                                <span>
                                    BOOKING DETAILS
                                </span>

                                <h1>
                                    {booking.requestNumber}
                                </h1>

                            </div>

                        </div>

                    </div>


                    <div
                        className={`booking-status ${statusConfig.className}`}
                    >

                        <i
                            className={`bi ${statusConfig.icon}`}
                        ></i>

                        {statusConfig.text}

                    </div>

                </div>


                {/* =================================================
                    QUICK INFO
                ================================================= */}

                <div className="booking-quick-info">

                    <div className="quick-info-item">

                        <div className="quick-info-icon">

                            <i className="bi bi-tools"></i>

                        </div>

                        <div>

                            <span>
                                SERVICE
                            </span>

                            <strong>
                                {booking.serviceName || "-"}
                            </strong>

                        </div>

                    </div>


                    <div className="quick-info-item">

                        <div className="quick-info-icon">

                            <i className="bi bi-calendar-event-fill"></i>

                        </div>

                        <div>

                            <span>
                                VISIT DATE
                            </span>

                            <strong>
                                {formatDate(
                                    booking.preferredVisitDate
                                )}
                            </strong>

                        </div>

                    </div>


                    <div className="quick-info-item">

                        <div className="quick-info-icon">

                            <i className="bi bi-clock-fill"></i>

                        </div>

                        <div>

                            <span>
                                TIME
                            </span>

                            <strong>
                                {formatTime(
                                    booking.preferredVisitDate
                                )}
                            </strong>

                        </div>

                    </div>


                    <div className="quick-info-item">

                        <div className="quick-info-icon price">

                            <i className="bi bi-currency-rupee"></i>

                        </div>

                        <div>

                            <span>
                                ESTIMATED COST
                            </span>

                            <strong className="price-text">
                                ₹ {booking.estimatedCost || "0"}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    MAIN GRID
                ================================================= */}

                <div className="booking-main-grid">

                    {/* =================================================
                        LEFT COLUMN
                    ================================================= */}

                    <div className="booking-left-column">


                        {/* SERVICE SUMMARY */}

                        <section className="booking-panel">

                            <div className="panel-header">

                                <div className="panel-header-icon">

                                    <i className="bi bi-clipboard2-check-fill"></i>

                                </div>

                                <div>

                                    <span>
                                        SERVICE INFORMATION
                                    </span>

                                    <h2>
                                        Booking Summary
                                    </h2>

                                </div>

                            </div>


                            <div className="booking-info-grid">

                                <div className="booking-info-box">

                                    <span>
                                        SERVICE
                                    </span>

                                    <strong>
                                        {booking.serviceName || "-"}
                                    </strong>

                                </div>


                                <div className="booking-info-box">

                                    <span>
                                        PRIORITY
                                    </span>

                                    <strong>
                                        {booking.priority || "-"}
                                    </strong>

                                </div>


                                <div className="booking-info-box">

                                    <span>
                                        REQUEST NUMBER
                                    </span>

                                    <strong>
                                        {booking.requestNumber || "-"}
                                    </strong>

                                </div>


                                <div className="booking-info-box">

                                    <span>
                                        ESTIMATED COST
                                    </span>

                                    <strong className="orange-text">
                                        ₹ {booking.estimatedCost || "0"}
                                    </strong>

                                </div>

                            </div>

                        </section>


                        {/* DESCRIPTION */}

                        <section className="booking-panel">

                            <div className="panel-header">

                                <div className="panel-header-icon">

                                    <i className="bi bi-file-text-fill"></i>

                                </div>

                                <div>

                                    <span>
                                        REQUEST DETAILS
                                    </span>

                                    <h2>
                                        Service Description
                                    </h2>

                                </div>

                            </div>


                            <div className="description-box">

                                <i className="bi bi-quote"></i>

                                <p>
                                    {booking.description ||
                                        "No description was provided for this booking."}
                                </p>

                            </div>

                        </section>


                        {/* ADDRESS */}

                        <section className="booking-panel">

                            <div className="panel-header">

                                <div className="panel-header-icon">

                                    <i className="bi bi-geo-alt-fill"></i>

                                </div>

                                <div>

                                    <span>
                                        SERVICE LOCATION
                                    </span>

                                    <h2>
                                        Service Address
                                    </h2>

                                </div>

                            </div>


                            <div className="service-address-box">

                                <div className="service-address-icon">

                                    <i className="bi bi-house-door-fill"></i>

                                </div>

                                <div>

                                    <span>
                                        VISIT LOCATION
                                    </span>

                                    <p>
                                        {booking.address ||
                                            "No address available."}
                                    </p>

                                </div>

                            </div>

                        </section>


                        {/* TIMELINE */}

                        <section className="booking-panel">

                            <div className="panel-header">

                                <div className="panel-header-icon">

                                    <i className="bi bi-activity"></i>

                                </div>

                                <div>

                                    <span>
                                        SERVICE PROGRESS
                                    </span>

                                    <h2>
                                        Booking Timeline
                                    </h2>

                                </div>

                            </div>


                            <div className="booking-timeline">

                                <div className="timeline-item completed">

                                    <div className="timeline-dot">

                                        <i className="bi bi-check-lg"></i>

                                    </div>

                                    <div>

                                        <strong>
                                            Booking Created
                                        </strong>

                                        <span>
                                            Your service request has been created.
                                        </span>

                                    </div>

                                </div>


                                <div className="timeline-line"></div>


                                <div className="timeline-item completed">

                                    <div className="timeline-dot">

                                        <i className="bi bi-check-lg"></i>

                                    </div>

                                    <div>

                                        <strong>
                                            Request Submitted
                                        </strong>

                                        <span>
                                            Your booking request was submitted successfully.
                                        </span>

                                    </div>

                                </div>


                                <div className="timeline-line"></div>


                                <div
                                    className={`timeline-item ${
                                        [
                                            "Assigned",
                                            "In Progress",
                                            "Completed"
                                        ].includes(booking.status)
                                            ? "completed"
                                            : "current"
                                    }`}
                                >

                                    <div className="timeline-dot">

                                        <i
                                            className={
                                                [
                                                    "Assigned",
                                                    "In Progress",
                                                    "Completed"
                                                ].includes(booking.status)
                                                    ? "bi bi-check-lg"
                                                    : "bi bi-hourglass-split"
                                            }
                                        ></i>

                                    </div>

                                    <div>

                                        <strong>

                                            {booking.status === "Pending"
                                                ? "Waiting for Technician"
                                                : "Technician Assigned"}

                                        </strong>

                                        <span>

                                            {booking.status === "Pending"
                                                ? "We are finding the right professional for you."
                                                : "A technician has been assigned to your booking."}

                                        </span>

                                    </div>

                                </div>


                                <div className="timeline-line"></div>


                                <div
                                    className={`timeline-item ${
                                        booking.status === "Completed"
                                            ? "completed"
                                            : "current"
                                    }`}
                                >

                                    <div className="timeline-dot">

                                        <i
                                            className={
                                                booking.status === "Completed"
                                                    ? "bi bi-check-lg"
                                                    : "bi bi-circle"
                                            }
                                        ></i>

                                    </div>

                                    <div>

                                        <strong>
                                            Service Completion
                                        </strong>

                                        <span>

                                            {booking.status === "Completed"
                                                ? "Your service has been completed."
                                                : "Service will be marked completed after the work is finished."}

                                        </span>

                                    </div>

                                </div>

                            </div>

                        </section>

                    </div>


                    {/* =================================================
                        RIGHT COLUMN
                    ================================================= */}

                    <div className="booking-right-column">


                        {/* PAYMENT */}

                        <section className="booking-panel payment-panel">

                            <div className="panel-header">

                                <div className="panel-header-icon">

                                    <i className="bi bi-wallet2"></i>

                                </div>

                                <div>

                                    <span>
                                        PAYMENT
                                    </span>

                                    <h2>
                                        Payment Summary
                                    </h2>

                                </div>

                            </div>


                            <div className="payment-summary">

                                <div className="payment-row">

                                    <span>
                                        Estimated Cost
                                    </span>

                                    <strong>
                                        ₹ {booking.estimatedCost || "0"}
                                    </strong>

                                </div>


                                <div className="payment-divider"></div>


                                <div className="payment-total">

                                    <span>
                                        Total Estimated
                                    </span>

                                    <strong>
                                        ₹ {booking.estimatedCost || "0"}
                                    </strong>

                                </div>

                            </div>


                            <div className="payment-note">

                                <i className="bi bi-info-circle-fill"></i>

                                <span>
                                    Final charges may vary depending on
                                    the actual service performed.
                                </span>

                            </div>

                        </section>


                        {/* ACTIONS */}

                        <section className="booking-panel action-panel">

                            <div className="panel-header">

                                <div className="panel-header-icon">

                                    <i className="bi bi-lightning-charge-fill"></i>

                                </div>

                                <div>

                                    <span>
                                        QUICK ACTIONS
                                    </span>

                                    <h2>
                                        Manage Booking
                                    </h2>

                                </div>

                            </div>


                            <div className="booking-actions">

                                <button
                                    type="button"
                                    className="booking-action-btn invoice"
                                    onClick={downloadInvoice}
                                >

                                    <span className="action-icon">

                                        <i className="bi bi-printer-fill"></i>

                                    </span>

                                    <span>

                                        <strong>
                                            Download Invoice
                                        </strong>

                                        <small>
                                            Print or save this booking
                                        </small>

                                    </span>

                                    <i className="bi bi-chevron-right action-arrow"></i>

                                </button>


                                <Link
                                    to="/services"
                                    className="booking-action-btn rebook"
                                >

                                    <span className="action-icon">

                                        <i className="bi bi-arrow-repeat"></i>

                                    </span>

                                    <span>

                                        <strong>
                                            Rebook Service
                                        </strong>

                                        <small>
                                            Book another service
                                        </small>

                                    </span>

                                    <i className="bi bi-chevron-right action-arrow"></i>

                                </Link>


                                {booking.status === "Pending" && (

                                    <button
                                        type="button"
                                        className="booking-action-btn cancel"
                                        onClick={cancelBooking}
                                        disabled={cancelling}
                                    >

                                        <span className="action-icon">

                                            {cancelling ? (

                                                <span className="spinner-border spinner-border-sm"></span>

                                            ) : (

                                                <i className="bi bi-x-circle-fill"></i>

                                            )}

                                        </span>

                                        <span>

                                            <strong>
                                                {cancelling
                                                    ? "Cancelling..."
                                                    : "Cancel Booking"}
                                            </strong>

                                            <small>
                                                Cancel this service request
                                            </small>

                                        </span>

                                        {!cancelling && (

                                            <i className="bi bi-chevron-right action-arrow"></i>

                                        )}

                                    </button>

                                )}

                            </div>

                        </section>


                        {/* HELP */}

                        <section className="booking-help-card">

                            <div className="help-icon">

                                <i className="bi bi-headset"></i>

                            </div>

                            <div>

                                <span>
                                    NEED HELP?
                                </span>

                                <strong>
                                    We're here for you
                                </strong>

                                <p>
                                    Contact our support team if you need
                                    assistance with this booking.
                                </p>

                            </div>

                        </section>

                    </div>

                </div>


                {/* =================================================
                    BOTTOM
                ================================================= */}

                <div className="booking-bottom-actions">

                    <Link
                        to="/customer/bookings"
                        className="booking-secondary-btn"
                    >

                        <i className="bi bi-arrow-left"></i>

                        Back to My Bookings

                    </Link>

                    <Link
                        to="/services"
                        className="booking-primary-btn"
                    >

                        <i className="bi bi-plus-lg"></i>

                        Book Another Service

                    </Link>

                </div>

            </PageContainer>

        </div>

    );

}

export default BookingDetails;