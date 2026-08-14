import { useEffect } from "react";

function TechnicianDetailsModal({
    show,
    technician,
    onClose
}) {
    useEffect(() => {
        if (!show) return;

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener(
            "keydown",
            handleEscape
        );

        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );

            document.body.style.overflow = "";
        };
    }, [show, onClose]);

    if (!show || !technician) {
        return null;
    }

    const technicianId =
        technician.technicianId ??
        technician.TechnicianId ??
        "—";

    const firstName =
        technician.firstName ??
        technician.FirstName ??
        technician.user?.firstName ??
        technician.user?.FirstName ??
        "";

    const lastName =
        technician.lastName ??
        technician.LastName ??
        technician.user?.lastName ??
        technician.user?.LastName ??
        "";

    const fullName =
        `${firstName} ${lastName}`.trim() ||
        technician.employeeCode ||
        technician.EmployeeCode ||
        "Unnamed Technician";

    const employeeCode =
        technician.employeeCode ??
        technician.EmployeeCode ??
        "—";

    const department =
        technician.department ??
        technician.Department ??
        "—";

    const designation =
        technician.designation ??
        technician.Designation ??
        "—";

    const experience =
        technician.experienceYears ??
        technician.ExperienceYears;

    const hourlyRate =
        technician.hourlyRate ??
        technician.HourlyRate;

    const isAvailable =
        technician.isAvailable ??
        technician.IsAvailable ??
        false;

    const currentStatus =
        technician.currentStatus ??
        technician.CurrentStatus ??
        (isAvailable
            ? "Available"
            : "Inactive");

    const email =
        technician.email ??
        technician.Email ??
        technician.user?.email ??
        technician.user?.Email ??
        "—";

    const phone =
        technician.phoneNumber ??
        technician.PhoneNumber ??
        technician.user?.phoneNumber ??
        technician.user?.PhoneNumber ??
        "—";

    const createdAt =
        technician.createdAt ??
        technician.CreatedAt;

    const updatedAt =
        technician.updatedAt ??
        technician.UpdatedAt;

    const formatDate = (value) => {
        if (!value) return "—";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "—";
        }

        return date.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    };

    const getStatusClass = () => {
        if (!isAvailable) {
            return "inactive";
        }

        if (
            String(currentStatus)
                .toLowerCase()
                .includes("busy")
        ) {
            return "busy";
        }

        if (
            String(currentStatus)
                .toLowerCase()
                .includes("leave")
        ) {
            return "leave";
        }

        return "available";
    };

    const handleBackdropClick = (event) => {
        if (
            event.target ===
            event.currentTarget
        ) {
            onClose();
        }
    };

    return (
        <div
            className="technician-modal-overlay"
            onMouseDown={handleBackdropClick}
        >
            <div
                className="technician-modal large"
                role="dialog"
                aria-modal="true"
                aria-labelledby="technician-details-title"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                {/* HEADER */}

                <div className="technician-modal-header">

                    <div className="technician-modal-heading">

                        <div className="technician-modal-icon">
                            <i className="bi bi-person-vcard"></i>
                        </div>

                        <div>
                            <h3 id="technician-details-title">
                                Technician Details
                            </h3>

                            <p>
                                Complete information about
                                this technician
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="technician-modal-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>

                </div>

                {/* BODY */}

                <div className="technician-modal-body">

                    {/* PROFILE */}

                    <div className="technician-profile-banner">

                        <div className="technician-avatar">
                            {fullName
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div className="technician-profile-info">

                            <h2>
                                {fullName}
                            </h2>

                            <p>
                                {designation}
                            </p>

                            <div className="technician-profile-meta">

                                <span>
                                    <i className="bi bi-hash"></i>
                                    {employeeCode}
                                </span>

                                <span>
                                    <i className="bi bi-building"></i>
                                    {department}
                                </span>

                            </div>

                        </div>

                        <span
                            className={`technician-status ${getStatusClass()}`}
                        >
                            <span></span>
                            {isAvailable
                                ? currentStatus
                                : "Inactive"}
                        </span>

                    </div>

                    {/* BASIC INFORMATION */}

                    <div className="technician-details-section">

                        <div className="technician-details-section-title">
                            <i className="bi bi-person"></i>

                            <span>
                                Personal Information
                            </span>
                        </div>

                        <div className="technician-detail-grid">

                            <DetailItem
                                label="Technician ID"
                                value={`#${technicianId}`}
                            />

                            <DetailItem
                                label="Employee Code"
                                value={employeeCode}
                            />

                            <DetailItem
                                label="First Name"
                                value={
                                    firstName || "—"
                                }
                            />

                            <DetailItem
                                label="Last Name"
                                value={
                                    lastName || "—"
                                }
                            />

                            <DetailItem
                                label="Email"
                                value={email}
                            />

                            <DetailItem
                                label="Phone Number"
                                value={phone}
                            />

                        </div>

                    </div>

                    {/* PROFESSIONAL INFORMATION */}

                    <div className="technician-details-section">

                        <div className="technician-details-section-title">
                            <i className="bi bi-briefcase"></i>

                            <span>
                                Professional Information
                            </span>
                        </div>

                        <div className="technician-detail-grid">

                            <DetailItem
                                label="Department"
                                value={department}
                            />

                            <DetailItem
                                label="Designation"
                                value={designation}
                            />

                            <DetailItem
                                label="Experience"
                                value={
                                    experience !==
                                    null &&
                                    experience !==
                                    undefined
                                        ? `${experience} Years`
                                        : "—"
                                }
                            />

                            <DetailItem
                                label="Hourly Rate"
                                value={
                                    hourlyRate !==
                                    null &&
                                    hourlyRate !==
                                    undefined
                                        ? `₹ ${Number(
                                            hourlyRate
                                        ).toLocaleString(
                                            "en-IN"
                                        )}`
                                        : "—"
                                }
                            />

                            <DetailItem
                                label="Availability"
                                value={
                                    isAvailable
                                        ? "Available"
                                        : "Inactive"
                                }
                            />

                            <DetailItem
                                label="Current Status"
                                value={currentStatus}
                            />

                        </div>

                    </div>

                    {/* ACCOUNT / RECORD INFORMATION */}

                    <div className="technician-details-section">

                        <div className="technician-details-section-title">
                            <i className="bi bi-clock-history"></i>

                            <span>
                                Record Information
                            </span>
                        </div>

                        <div className="technician-detail-grid">

                            <DetailItem
                                label="Created At"
                                value={formatDate(
                                    createdAt
                                )}
                            />

                            <DetailItem
                                label="Last Updated"
                                value={formatDate(
                                    updatedAt
                                )}
                            />

                        </div>

                    </div>

                </div>

                {/* FOOTER */}

                <div className="technician-modal-footer">

                    <button
                        type="button"
                        className="technician-btn secondary"
                        onClick={onClose}
                    >
                        <i className="bi bi-x-lg"></i>
                        Close
                    </button>

                </div>

            </div>
        </div>
    );
}

function DetailItem({
    label,
    value
}) {
    return (
        <div className="technician-detail-item">

            <span>
                {label}
            </span>

            <strong>
                {value}
            </strong>

        </div>
    );
}

export default TechnicianDetailsModal;