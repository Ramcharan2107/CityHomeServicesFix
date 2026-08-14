import { useEffect, useState } from "react";
import technicianService from "../../../services/technicianService";

function AddTechnicianModal({
    show,
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
        if (!show) return;

        setForm({
            employeeCode: "",
            department: "",
            designation: "",
            experienceYears: "",
            hourlyRate: "",
            isAvailable: true,
            currentStatus: "Available"
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
    }, [show, onClose]);

    if (!show) {
        return null;
    }

    const handleChange = (event) => {
        const { name, value, type, checked } =
            event.target;

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
                typeof technicianService.create !==
                "function"
            ) {
                throw new Error(
                    "Create operation is not available in technicianService."
                );
            }

            await technicianService.create(
                payload
            );

            setSuccess(
                "Technician created successfully."
            );

            if (onSuccess) {
                await onSuccess();
            }

            setTimeout(() => {
                onClose();
            }, 700);

        } catch (error) {
            console.error(
                "ADD TECHNICIAN ERROR:",
                error
            );

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.Message ||
                error?.response?.data?.error ||
                error?.message ||
                "Unable to create technician.";

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
                aria-labelledby="add-technician-title"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                {/* HEADER */}

                <div className="technician-modal-header">

                    <div className="technician-modal-heading">

                        <div className="technician-modal-icon">
                            <i className="bi bi-person-plus"></i>
                        </div>

                        <div>
                            <h3 id="add-technician-title">
                                Add Technician
                            </h3>

                            <p>
                                Create a new technician
                                record
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

                    <div className="technician-form-grid">

                        {/* EMPLOYEE CODE */}

                        <div className="technician-form-group">

                            <label htmlFor="employeeCode">
                                Employee Code
                                <span className="required">
                                    *
                                </span>
                            </label>

                            <input
                                id="employeeCode"
                                name="employeeCode"
                                type="text"
                                className="technician-form-control"
                                placeholder="EMP-001"
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

                            <label htmlFor="department">
                                Department
                                <span className="required">
                                    *
                                </span>
                            </label>

                            <input
                                id="department"
                                name="department"
                                type="text"
                                className="technician-form-control"
                                placeholder="Electrical"
                                value={
                                    form.department
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={saving}
                                autoComplete="off"
                            />

                        </div>

                        {/* DESIGNATION */}

                        <div className="technician-form-group">

                            <label htmlFor="designation">
                                Designation
                                <span className="required">
                                    *
                                </span>
                            </label>

                            <input
                                id="designation"
                                name="designation"
                                type="text"
                                className="technician-form-control"
                                placeholder="Senior Technician"
                                value={
                                    form.designation
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={saving}
                                autoComplete="off"
                            />

                        </div>

                        {/* EXPERIENCE */}

                        <div className="technician-form-group">

                            <label htmlFor="experienceYears">
                                Experience
                            </label>

                            <div className="technician-input-with-suffix">

                                <input
                                    id="experienceYears"
                                    name="experienceYears"
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    className="technician-form-control"
                                    placeholder="5"
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

                            <label htmlFor="hourlyRate">
                                Hourly Rate
                            </label>

                            <div className="technician-input-with-prefix">

                                <span>
                                    ₹
                                </span>

                                <input
                                    id="hourlyRate"
                                    name="hourlyRate"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="technician-form-control"
                                    placeholder="500"
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

                        {/* STATUS */}

                        <div className="technician-form-group">

                            <label htmlFor="currentStatus">
                                Current Status
                            </label>

                            <select
                                id="currentStatus"
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

                    {/* ACTIVE SWITCH */}

                    <label
                        className="technician-switch-row"
                        htmlFor="isAvailable"
                    >

                        <input
                            id="isAvailable"
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
                            Technician is active
                        </span>

                    </label>

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

                                    Saving...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-lg"></i>
                                    Add Technician
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default AddTechnicianModal;