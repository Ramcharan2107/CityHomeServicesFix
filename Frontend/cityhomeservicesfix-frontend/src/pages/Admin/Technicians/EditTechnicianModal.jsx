import { useEffect, useState } from "react";
import technicianService from "../../../services/technicianService";

function EditTechnicianModal({
    show,
    technician,
    onClose,
    onSuccess
}) {
    const [form, setForm] = useState({
        employeeCode: "",
        department: "",
        designation: "",
        experienceYears: "",
        hourlyRate: "",
        isAvailable: true,
        currentStatus: "Available"
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!show || !technician) return;

        setForm({
            employeeCode:
                technician.employeeCode ??
                technician.EmployeeCode ??
                "",

            department:
                technician.department ??
                technician.Department ??
                "",

            designation:
                technician.designation ??
                technician.Designation ??
                "",

            experienceYears:
                technician.experienceYears ??
                technician.ExperienceYears ??
                "",

            hourlyRate:
                technician.hourlyRate ??
                technician.HourlyRate ??
                "",

            isAvailable:
                technician.isAvailable ??
                technician.IsAvailable ??
                true,

            currentStatus:
                technician.currentStatus ??
                technician.CurrentStatus ??
                "Available"
        });

        setError("");
        setSuccess("");

        const handleEscape = (event) => {
            if (event.key === "Escape" && !saving) {
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
    }, [show, technician, onClose]);

    if (!show || !technician) {
        return null;
    }

    const handleChange = (event) => {
        const {
            name,
            value,
            type,
            checked
        } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!form.employeeCode.trim()) {
            setError(
                "Employee code is required."
            );
            return;
        }

        if (!form.department.trim()) {
            setError(
                "Department is required."
            );
            return;
        }

        if (!form.designation.trim()) {
            setError(
                "Designation is required."
            );
            return;
        }

        if (
            form.experienceYears !== "" &&
            Number(form.experienceYears) < 0
        ) {
            setError(
                "Experience cannot be negative."
            );
            return;
        }

        if (
            form.hourlyRate !== "" &&
            Number(form.hourlyRate) < 0
        ) {
            setError(
                "Hourly rate cannot be negative."
            );
            return;
        }

        const technicianId =
            technician.technicianId ??
            technician.TechnicianId;

        if (!technicianId) {
            setError(
                "Technician ID is missing. Unable to update this technician."
            );
            return;
        }

        setSaving(true);

        try {
            const payload = {
                employeeCode:
                    form.employeeCode.trim(),

                department:
                    form.department.trim(),

                designation:
                    form.designation.trim(),

                experienceYears:
                    form.experienceYears === ""
                        ? 0
                        : Number(
                            form.experienceYears
                        ),

                hourlyRate:
                    form.hourlyRate === ""
                        ? 0
                        : Number(
                            form.hourlyRate
                        ),

                isAvailable:
                    Boolean(form.isAvailable),

                currentStatus:
                    form.isAvailable
                        ? form.currentStatus
                        : "Inactive"
            };

            if (
                typeof technicianService.update !==
                "function"
            ) {
                throw new Error(
                    "Update operation is not available in technicianService."
                );
            }

            await technicianService.update(
                technicianId,
                payload
            );

            setSuccess(
                "Technician updated successfully."
            );

            if (onSuccess) {
                await onSuccess();
            }

            setTimeout(() => {
                onClose();
            }, 700);

        } catch (error) {
            console.error(
                "UPDATE TECHNICIAN ERROR:",
                error
            );

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.Message ||
                error?.response?.data?.error ||
                error?.message ||
                "Unable to update technician.";

            setError(message);

        } finally {
            setSaving(false);
        }
    };

    const handleBackdropClick = (event) => {
        if (
            event.target ===
            event.currentTarget &&
            !saving
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
                className="technician-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-technician-title"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                {/* HEADER */}

                <div className="technician-modal-header">

                    <div className="technician-modal-heading">

                        <div className="technician-modal-icon">
                            <i className="bi bi-pencil-square"></i>
                        </div>

                        <div>
                            <h3 id="edit-technician-title">
                                Edit Technician
                            </h3>

                            <p>
                                Update technician
                                information and status
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="technician-modal-close"
                        onClick={onClose}
                        disabled={saving}
                        aria-label="Close"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>

                </div>

                {/* BODY */}

                <form
                    onSubmit={handleSubmit}
                    className="technician-modal-body"
                >

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

                    {/* CURRENT TECHNICIAN */}

                    <div className="technician-edit-identity">

                        <div className="technician-edit-avatar">
                            {(
                                technician.firstName ||
                                technician.FirstName ||
                                technician.user?.firstName ||
                                technician.user?.FirstName ||
                                technician.employeeCode ||
                                technician.EmployeeCode ||
                                "T"
                            )
                                .toString()
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div>
                            <strong>
                                {[
                                    technician.firstName ??
                                        technician.FirstName ??
                                        technician.user?.firstName ??
                                        technician.user?.FirstName ??
                                        "",
                                    technician.lastName ??
                                        technician.LastName ??
                                        technician.user?.lastName ??
                                        technician.user?.LastName ??
                                        ""
                                ]
                                    .join(" ")
                                    .trim() ||
                                    "Technician"}
                            </strong>

                            <span>
                                {technician.employeeCode ??
                                    technician.EmployeeCode ??
                                    "No employee code"}
                            </span>
                        </div>

                    </div>

                    <div className="technician-form-grid">

                        {/* EMPLOYEE CODE */}

                        <div className="technician-form-group">

                            <label htmlFor="editEmployeeCode">
                                Employee Code
                                <span className="required">
                                    *
                                </span>
                            </label>

                            <input
                                id="editEmployeeCode"
                                name="employeeCode"
                                type="text"
                                className="technician-form-control"
                                value={
                                    form.employeeCode
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={saving}
                                autoComplete="off"
                            />

                        </div>

                        {/* DEPARTMENT */}

                        <div className="technician-form-group">

                            <label htmlFor="editDepartment">
                                Department
                                <span className="required">
                                    *
                                </span>
                            </label>

                            <input
                                id="editDepartment"
                                name="department"
                                type="text"
                                className="technician-form-control"
                                value={
                                    form.department
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={saving}
                            />

                        </div>

                        {/* DESIGNATION */}

                        <div className="technician-form-group">

                            <label htmlFor="editDesignation">
                                Designation
                                <span className="required">
                                    *
                                </span>
                            </label>

                            <input
                                id="editDesignation"
                                name="designation"
                                type="text"
                                className="technician-form-control"
                                value={
                                    form.designation
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={saving}
                            />

                        </div>

                        {/* EXPERIENCE */}

                        <div className="technician-form-group">

                            <label htmlFor="editExperience">
                                Experience
                            </label>

                            <div className="technician-input-with-suffix">

                                <input
                                    id="editExperience"
                                    name="experienceYears"
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    className="technician-form-control"
                                    value={
                                        form.experienceYears
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={saving}
                                />

                                <span>
                                    Years
                                </span>

                            </div>

                        </div>

                        {/* HOURLY RATE */}

                        <div className="technician-form-group">

                            <label htmlFor="editHourlyRate">
                                Hourly Rate
                            </label>

                            <div className="technician-input-with-prefix">

                                <span>
                                    ₹
                                </span>

                                <input
                                    id="editHourlyRate"
                                    name="hourlyRate"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="technician-form-control"
                                    value={
                                        form.hourlyRate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={saving}
                                />

                            </div>

                        </div>

                        {/* CURRENT STATUS */}

                        <div className="technician-form-group">

                            <label htmlFor="editCurrentStatus">
                                Current Status
                            </label>

                            <select
                                id="editCurrentStatus"
                                name="currentStatus"
                                className="technician-form-control"
                                value={
                                    form.isAvailable
                                        ? form.currentStatus
                                        : "Inactive"
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={
                                    saving ||
                                    !form.isAvailable
                                }
                            >

                                <option value="Available">
                                    Available
                                </option>

                                <option value="Busy">
                                    Busy
                                </option>

                                <option value="On Leave">
                                    On Leave
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* ACTIVE / INACTIVE */}

                    <div className="technician-edit-status-section">

                        <div>
                            <strong>
                                Technician Status
                            </strong>

                            <span>
                                Control whether this
                                technician is active.
                            </span>
                        </div>

                        <label
                            className="technician-switch-row"
                            htmlFor="editIsAvailable"
                        >

                            <input
                                id="editIsAvailable"
                                name="isAvailable"
                                type="checkbox"
                                checked={
                                    Boolean(
                                        form.isAvailable
                                    )
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={saving}
                            />

                            <span className="technician-switch"></span>

                            <span>
                                {form.isAvailable
                                    ? "Active"
                                    : "Inactive"}
                            </span>

                        </label>

                    </div>

                    {/* FOOTER */}

                    <div className="technician-modal-footer">

                        <button
                            type="button"
                            className="technician-btn secondary"
                            onClick={onClose}
                            disabled={saving}
                        >
                            <i className="bi bi-x-lg"></i>
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="technician-btn primary"
                            disabled={
                                saving ||
                                Boolean(success)
                            }
                        >

                            {saving ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>

                                    Updating...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-lg"></i>
                                    Save Changes
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default EditTechnicianModal;