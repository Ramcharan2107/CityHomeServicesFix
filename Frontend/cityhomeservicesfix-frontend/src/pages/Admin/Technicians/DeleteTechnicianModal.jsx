import { useEffect, useState } from "react";
import technicianService from "../../../services/technicianService";

function DeleteTechnicianModal({
    show,
    technician,
    onClose,
    onSuccess
}) {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!show) return;

        setDeleting(false);
        setError("");
        setSuccess("");

        const handleEscape = (event) => {
            if (event.key === "Escape" && !deleting) {
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
        technician.TechnicianId;

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

    const technicianName =
        `${firstName} ${lastName}`.trim() ||
        technician.employeeCode ||
        technician.EmployeeCode ||
        "this technician";

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

    const handleDelete = async () => {
        if (!technicianId) {
            setError(
                "Technician ID is missing. Unable to delete this technician."
            );
            return;
        }

        if (
            typeof technicianService.delete !==
            "function"
        ) {
            setError(
                "Delete operation is not available in technicianService."
            );
            return;
        }

        setDeleting(true);
        setError("");
        setSuccess("");

        try {
            await technicianService.delete(
                technicianId
            );

            setSuccess(
                "Technician deleted successfully."
            );

            if (onSuccess) {
                await onSuccess();
            }

            setTimeout(() => {
                onClose();
            }, 700);

        } catch (error) {
            console.error(
                "DELETE TECHNICIAN ERROR:",
                error
            );

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.Message ||
                error?.response?.data?.error ||
                "Unable to delete technician.";

            setError(message);

        } finally {
            setDeleting(false);
        }
    };

    const handleBackdropClick = (event) => {
        if (
            event.target ===
            event.currentTarget &&
            !deleting
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
                className="technician-modal technician-delete-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-technician-title"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                {/* HEADER */}

                <div className="technician-modal-header">

                    <div className="technician-modal-heading">

                        <div className="technician-modal-icon delete">
                            <i className="bi bi-trash3"></i>
                        </div>

                        <div>
                            <h3 id="delete-technician-title">
                                Delete Technician
                            </h3>

                            <p>
                                Confirm technician removal
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="technician-modal-close"
                        onClick={onClose}
                        disabled={deleting}
                        aria-label="Close"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>

                </div>

                {/* BODY */}

                <div className="technician-modal-body">

                    {error && (
                        <div className="technician-alert error">
                            <i className="bi bi-exclamation-triangle-fill"></i>

                            <span>
                                {error}
                            </span>
                        </div>
                    )}

                    {success && (
                        <div className="technician-alert success">
                            <i className="bi bi-check-circle-fill"></i>

                            <span>
                                {success}
                            </span>
                        </div>
                    )}

                    <div className="technician-delete-content">

                        <div className="technician-delete-icon">
                            <i className="bi bi-exclamation-triangle"></i>
                        </div>

                        <h3>
                            Are you sure?
                        </h3>

                        <p>
                            You are about to delete
                            <strong>
                                {" "}
                                {technicianName}
                            </strong>.
                        </p>

                        <p className="technician-delete-warning">
                            This action cannot be undone
                            if the backend allows permanent
                            deletion.
                        </p>

                    </div>

                    {/* TECHNICIAN SUMMARY */}

                    <div className="technician-delete-summary">

                        <div>
                            <span>
                                Employee Code
                            </span>

                            <strong>
                                {employeeCode}
                            </strong>
                        </div>

                        <div>
                            <span>
                                Department
                            </span>

                            <strong>
                                {department}
                            </strong>
                        </div>

                        <div>
                            <span>
                                Designation
                            </span>

                            <strong>
                                {designation}
                            </strong>
                        </div>

                    </div>

                    {/* FOOTER */}

                    <div className="technician-modal-footer">

                        <button
                            type="button"
                            className="technician-btn secondary"
                            onClick={onClose}
                            disabled={deleting}
                        >
                            <i className="bi bi-x-lg"></i>
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="technician-btn danger"
                            onClick={handleDelete}
                            disabled={
                                deleting ||
                                Boolean(success)
                            }
                        >

                            {deleting ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>

                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-trash3"></i>
                                    Delete Technician
                                </>
                            )}

                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default DeleteTechnicianModal;