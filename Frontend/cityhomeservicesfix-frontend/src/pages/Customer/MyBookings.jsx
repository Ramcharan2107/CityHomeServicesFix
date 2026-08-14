import { useEffect, useState } from "react";
import bookingService from "../../services/bookingService";
import PageContainer from "../../components/common/PageContainer";

import "./MyBookings.css";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [popupType, setPopupType] = useState(null);
    const [visibleBookingCount, setVisibleBookingCount] = useState(4);

    useEffect(() => {
        loadBookings();
    }, []);

    useEffect(() => {
        if (!selectedBooking) return;

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                closePopup();
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [selectedBooking]);

    const loadBookings = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await bookingService.getMyBookings();

            const list = Array.isArray(data)
                ? data
                : Array.isArray(data?.bookings)
                    ? data.bookings
                    : [];

            setBookings(list);
            setVisibleBookingCount(4);
        } catch (err) {
            console.error("My bookings error:", err);
            setError(
                err.response?.data?.message ||
                "Unable to load your bookings."
            );
        } finally {
            setLoading(false);
        }
    };

    const openPopup = (booking, type) => {
        setSelectedBooking(booking);
        setPopupType(type);
    };

    const closePopup = () => {
        setSelectedBooking(null);
        setPopupType(null);
    };

    const normalizeStatus = (status) =>
        String(status || "").trim().toLowerCase();

    const getStatusClass = (status) => {
        switch (normalizeStatus(status)) {
            case "pending":
                return "status-pending";
            case "assigned":
                return "status-assigned";
            case "in progress":
                return "status-progress";
            case "completed":
                return "status-completed";
            case "cancelled":
                return "status-cancelled";
            default:
                return "status-default";
        }
    };

    const getBookingId = (booking) =>
        booking?.requestNumber ??
        booking?.bookingId ??
        booking?.bookingID ??
        booking?.id ??
        booking?.Id ??
        "-";

    const getServiceName = (booking) =>
        booking?.serviceName ||
        booking?.service?.name ||
        booking?.service ||
        "-";

    const getCategoryName = (booking) =>
        booking?.categoryName ||
        booking?.category?.name ||
        booking?.category ||
        "-";

    const getTechnicianName = (booking) =>
        booking?.technicianName ||
        booking?.technician?.name ||
        booking?.technician ||
        booking?.assignedTechnician ||
        booking?.assignedTechnicianName ||
        "Not Assigned";

    const getAddress = (booking) =>
        booking?.address ||
        booking?.serviceAddress ||
        booking?.serviceLocation ||
        "-";

    const getAmount = (booking) =>
        booking?.estimatedCost ??
        booking?.totalAmount ??
        booking?.amount ??
        0;

    const getBookingDate = (booking) =>
        booking?.preferredVisitDate ||
        booking?.bookingDate ||
        booking?.scheduledDate ||
        booking?.createdAt ||
        null;

    const formatDate = (value) => {
        if (!value) return "-";

        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return String(value);

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const formatDateTime = (value) => {
        if (!value) return "-";

        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return String(value);

        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const formatTime = (value) => {
        if (!value) return "-";

        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return String(value);

        return date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const getDescription = (booking) =>
        booking?.description ||
        booking?.serviceDescription ||
        "No description provided.";

    const totalBookings = bookings.length;

    const completedBookings = bookings.filter(
        (booking) => normalizeStatus(booking.status) === "completed"
    ).length;

    const pendingBookings = bookings.filter(
        (booking) => normalizeStatus(booking.status) === "pending"
    ).length;

    const activeBookings = bookings.filter((booking) =>
        ["assigned", "in progress"].includes(normalizeStatus(booking.status))
    ).length;

    const uniqueServices = new Set(
        bookings
            .map(getServiceName)
            .filter((service) => service !== "-")
            .map((service) => String(service).trim().toLowerCase())
    ).size;

    if (loading) {
        return (
            <div className="my-bookings-page">
                <PageContainer>
                    <div className="my-bookings-loading">
                        <div className="booking-loading-icon">
                            <i className="bi bi-calendar-check-fill"></i>
                        </div>
                        <div className="spinner-border text-warning"></div>
                        <h2>Loading Your Bookings</h2>
                        <p>Retrieving your booking details...</p>
                    </div>
                </PageContainer>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-bookings-page">
                <PageContainer>
                    <div className="my-bookings-error">
                        <i className="bi bi-exclamation-circle-fill"></i>
                        <h2>Unable to Load Bookings</h2>
                        <p>{error}</p>
                        <button
                            type="button"
                            className="booking-primary-btn"
                            onClick={loadBookings}
                        >
                            <i className="bi bi-arrow-clockwise"></i>
                            Try Again
                        </button>
                    </div>
                </PageContainer>
            </div>
        );
    }

    return (
        <div className="my-bookings-page">
            <PageContainer>

                {/* Hero */}
                <div className="my-bookings-header booking-page-hero">
                    <div>
                        <span className="page-label">My Bookings</span>
                        <p>
                            View, track and manage all your service bookings.
                        </p>
                    </div>

                    <div className="my-bookings-header-icon">
                        <i className="bi bi-calendar2-check-fill"></i>
                    </div>
                </div>

                {/* Statistics */}
                <div className="booking-stat-grid">
                    <div className="booking-stat-card">
                        <div className="booking-stat-icon">
                            <i className="bi bi-calendar-check-fill"></i>
                        </div>
                        <div>
                            <span>TOTAL BOOKINGS</span>
                            <strong>{totalBookings}</strong>
                        </div>
                    </div>

                    <div className="booking-stat-card">
                        <div className="booking-stat-icon completed">
                            <i className="bi bi-check-circle-fill"></i>
                        </div>
                        <div>
                            <span>SERVICES DONE</span>
                            <strong>{completedBookings}</strong>
                        </div>
                    </div>

                    <div className="booking-stat-card">
                        <div className="booking-stat-icon pending">
                            <i className="bi bi-hourglass-split"></i>
                        </div>
                        <div>
                            <span>PENDING</span>
                            <strong>{pendingBookings}</strong>
                        </div>
                    </div>

                    <div className="booking-stat-card">
                        <div className="booking-stat-icon active">
                            <i className="bi bi-tools"></i>
                        </div>
                        <div>
                            <span>ACTIVE SERVICES</span>
                            <strong>{activeBookings}</strong>
                        </div>
                    </div>

                    <div className="booking-stat-card">
                        <div className="booking-stat-icon services">
                            <i className="bi bi-grid-fill"></i>
                        </div>
                        <div>
                            <span>SERVICE TYPES</span>
                            <strong>{uniqueServices}</strong>
                        </div>
                    </div>
                </div>

                {bookings.length === 0 ? (
                    <div className="no-bookings">
                        <div className="no-bookings-icon">
                            <i className="bi bi-calendar-x"></i>
                        </div>
                        <h2>No Bookings Found</h2>
                        <p>You do not have any service bookings yet.</p>
                    </div>
                ) : (
                    <>
                        <div className="booking-list-heading">
                            <div>
                                <span>BOOKING HISTORY</span>
                                <p><b>All Your Bookings</b></p>
                            </div>
                            <strong>{totalBookings} bookings</strong>
                        </div>

                        <div className="my-bookings-list">
                            {bookings.slice(0, visibleBookingCount).map((booking, index) => (
                                <article
                                    className="my-booking-card"
                                    key={
                                        getBookingId(booking) !== "-"
                                            ? getBookingId(booking)
                                            : `booking-${index}`
                                    }
                                >
                                    {/* Service + Status */}
                                    <div className="my-booking-card-header">
                                        <div className="booking-service-title">
                                            <div className="booking-service-icon">
                                                <i className="bi bi-tools"></i>
                                            </div>

                                            <div>
                                                <span>SERVICE</span>
                                                <h3>{getServiceName(booking)}</h3>
                                                <small>
                                                    {getBookingId(booking) !== "-"
                                                        ? getBookingId(booking)
                                                        : "No booking number"}
                                                </small>
                                            </div>
                                        </div>

                                        <div
                                            className={`booking-status ${getStatusClass(
                                                booking.status
                                            )}`}
                                        >
                                            <i className="bi bi-circle-fill"></i>
                                            {booking.status || "Unknown"}
                                        </div>
                                    </div>

                                    {/* Requested booking details */}
                                    <div className="booking-history-summary">

                                        <div className="booking-summary-row">
                                            <div className="booking-summary-field">
                                                <span>Service Name</span>
                                                <p>{getServiceName(booking)}</p>
                                            </div>

                                            <div className="booking-summary-field">
                                                <span>Booking ID</span>
                                                <p>{getBookingId(booking)}</p>
                                            </div>
                                        </div>

                                        <div className="booking-summary-row">
                                            <div className="booking-summary-field">
                                                <span>Category Name</span>
                                                <p>{getCategoryName(booking)}</p>
                                            </div>

                                            <div className="booking-summary-field">
                                                <span>Booking Date</span>
                                                <p>{formatDate(getBookingDate(booking))}</p>
                                            </div>
                                        </div>

                                        <div className="booking-summary-row">
                                            <div className="booking-summary-field">
                                                <span>Technician Allotted</span>
                                                <p>{getTechnicianName(booking)}</p>
                                            </div>

                                            <div className="booking-summary-field booking-action-field">
                                                <span>Reschedule</span>
                                                <button
                                                    type="button"
                                                    className="booking-inline-action"
                                                    onClick={() =>
                                                        openPopup(
                                                            booking,
                                                            "reschedule"
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-calendar2-event"></i>
                                                    Reschedule
                                                </button>
                                            </div>
                                        </div>

                                        <div className="booking-summary-row">
                                            <div className="booking-summary-field booking-action-field">
                                                <span>Track</span>
                                                <button
                                                    type="button"
                                                    className="booking-inline-action"
                                                    onClick={() =>
                                                        openPopup(
                                                            booking,
                                                            "track"
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-geo-alt"></i>
                                                    Track
                                                </button>
                                            </div>

                                            <div className="booking-summary-field">
                                                <span>Estimated Cost</span>
                                                <p>₹ {getAmount(booking)}</p>
                                            </div>
                                        </div>

                                        <div className="booking-summary-address">
                                            <span>Address</span>
                                            <p>{getAddress(booking)}</p>
                                        </div>
                                    </div>

                                    <div className="my-booking-footer">
                                        <button
                                            type="button"
                                            className="booking-details-btn"
                                            onClick={() =>
                                                openPopup(
                                                    booking,
                                                    "details"
                                                )
                                            }
                                        >
                                            <i className="bi bi-eye-fill"></i>
                                            View Details
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {bookings.length > 4 && (
                            <div className="booking-history-view-more">
                                {visibleBookingCount < bookings.length ? (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setVisibleBookingCount(bookings.length)
                                        }
                                    >
                                        View More
                                        <i className="bi bi-chevron-down"></i>
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setVisibleBookingCount(4)
                                        }
                                    >
                                        Show Less
                                        <i className="bi bi-chevron-up"></i>
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* Popup */}
                {selectedBooking && (
                    <div
                        className="booking-modal-backdrop"
                        role="presentation"
                        onClick={(event) => {
                            if (event.target === event.currentTarget) {
                                closePopup();
                            }
                        }}
                    >
                        <div
                            className="booking-modal"
                            role="dialog"
                            aria-modal="true"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="booking-modal-header">
                                <div>
                                    <span>
                                        {popupType === "details"
                                            ? "COMPLETE BOOKING DETAILS"
                                            : popupType === "reschedule"
                                                ? "RESCHEDULE BOOKING"
                                                : "TRACK BOOKING"}
                                    </span>

                                    <h2>
                                        {getServiceName(selectedBooking)}
                                    </h2>

                                    <small>
                                        Booking ID: {getBookingId(selectedBooking)}
                                    </small>
                                </div>

                                <button
                                    type="button"
                                    className="booking-modal-close"
                                    onClick={closePopup}
                                    aria-label="Close popup"
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>

                            <div className="booking-modal-status-row">
                                <span
                                    className={`booking-status ${getStatusClass(
                                        selectedBooking.status
                                    )}`}
                                >
                                    <i className="bi bi-circle-fill"></i>
                                    {selectedBooking.status || "Unknown"}
                                </span>
                            </div>

                            {popupType === "details" && (
                                <div className="booking-modal-grid">
                                    <div className="modal-detail">
                                        <span>Service Name</span>
                                        <p>{getServiceName(selectedBooking)}</p>
                                    </div>

                                    <div className="modal-detail">
                                        <span>Booking ID</span>
                                        <p>{getBookingId(selectedBooking)}</p>
                                    </div>

                                    <div className="modal-detail">
                                        <span>Category Name</span>
                                        <p>{getCategoryName(selectedBooking)}</p>
                                    </div>

                                    <div className="modal-detail">
                                        <span>Booking Date</span>
                                        <p>
                                            {formatDateTime(
                                                getBookingDate(selectedBooking)
                                            )}
                                        </p>
                                    </div>

                                    <div className="modal-detail">
                                        <span>Technician Allotted</span>
                                        <p>{getTechnicianName(selectedBooking)}</p>
                                    </div>

                                    <div className="modal-detail">
                                        <span>Estimated Cost</span>
                                        <p>₹ {getAmount(selectedBooking)}</p>
                                    </div>

                                    <div className="modal-detail modal-detail-full">
                                        <span>Address</span>
                                        <p>{getAddress(selectedBooking)}</p>
                                    </div>

                                    <div className="modal-detail modal-detail-full">
                                        <span>Service Description</span>
                                        <p>{getDescription(selectedBooking)}</p>
                                    </div>

                                    {selectedBooking.createdAt && (
                                        <div className="modal-detail">
                                            <span>Created At</span>
                                            <p>
                                                {formatDateTime(
                                                    selectedBooking.createdAt
                                                )}
                                            </p>
                                        </div>
                                    )}

                                    {selectedBooking.updatedAt && (
                                        <div className="modal-detail">
                                            <span>Updated At</span>
                                            <p>
                                                {formatDateTime(
                                                    selectedBooking.updatedAt
                                                )}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {popupType === "reschedule" && (
                                <div className="booking-action-popup-content">
                                    <div className="action-popup-icon">
                                        <i className="bi bi-calendar2-event"></i>
                                    </div>

                                    <h3>Reschedule Booking</h3>

                                    <p>
                                        Choose a new preferred date and time
                                        for this booking.
                                    </p>

                                    <div className="reschedule-fields">
                                        <label>
                                            New Date
                                            <input
                                                type="date"
                                                defaultValue={
                                                    getBookingDate(
                                                        selectedBooking
                                                    )
                                                        ? new Date(
                                                            getBookingDate(
                                                                selectedBooking
                                                            )
                                                        )
                                                            .toISOString()
                                                            .split("T")[0]
                                                        : ""
                                                }
                                            />
                                        </label>

                                        <label>
                                            New Time
                                            <input
                                                type="time"
                                                defaultValue={
                                                    getBookingDate(
                                                        selectedBooking
                                                    )
                                                        ? new Date(
                                                            getBookingDate(
                                                                selectedBooking
                                                            )
                                                        )
                                                            .toTimeString()
                                                            .slice(0, 5)
                                                        : ""
                                                }
                                            />
                                        </label>
                                    </div>

                                    <p className="action-popup-note">
                                        The reschedule form is ready. Connect
                                        your backend reschedule API to save
                                        the selected date and time.
                                    </p>
                                </div>
                            )}

                            {popupType === "track" && (
                                <div className="booking-action-popup-content">
                                    <div className="action-popup-icon track">
                                        <i className="bi bi-geo-alt-fill"></i>
                                    </div>

                                    <h3>Track Booking</h3>

                                    <div className="tracking-status">
                                        <i className="bi bi-circle-fill"></i>
                                        <span>
                                            {selectedBooking.status ||
                                                "Unknown"}
                                        </span>
                                    </div>

                                    <div className="tracking-info">
                                        <div>
                                            <span>Technician</span>
                                            <p>{getTechnicianName(selectedBooking)}</p>
                                        </div>

                                        <div>
                                            <span>Service Address</span>
                                            <p>{getAddress(selectedBooking)}</p>
                                        </div>

                                        <div>
                                            <span>Booking Date</span>
                                            <p>
                                                {formatDateTime(
                                                    getBookingDate(
                                                        selectedBooking
                                                    )
                                                )}
                                            </p>
                                        </div>

                                        <div>
                                            <span>Booking ID</span>
                                            <p>{getBookingId(selectedBooking)}</p>
                                        </div>
                                    </div>

                                    <p className="action-popup-note">
                                        Live technician location will appear
                                        here when location tracking is
                                        provided by the backend.
                                    </p>
                                </div>
                            )}

                            <div className="booking-modal-footer">
                                <button
                                    type="button"
                                    className="booking-modal-close-btn"
                                    onClick={closePopup}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </PageContainer>
        </div>
    );
}

export default MyBookings;