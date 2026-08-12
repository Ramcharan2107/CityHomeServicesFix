import { useEffect, useState } from "react";
import technicianService from "../../../services/technicianService";

function EditTechnicianModal({

    show,

    technician,

    onClose,

    onSuccess

}) {

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({

        technicianId: 0,

        employeeCode: "",

        department: "",

        designation: "",

        experienceYears: "",

        joiningDate: "",

        hourlyRate: "",

        isAvailable: true,

        currentStatus: "Available"

    });

    useEffect(() => {

        if (!show || !technician)
            return;

        loadTechnician();

    }, [show, technician]);

    const loadTechnician = async () => {

        setLoading(true);

        try {

            const data = await technicianService.getById(

                technician.technicianId

            );

            setForm({

                technicianId: data.technicianId,

                employeeCode: data.employeeCode || "",

                department: data.department || "",

                designation: data.designation || "",

                experienceYears: data.experienceYears || "",

                joiningDate: data.joiningDate || "",

                hourlyRate: data.hourlyRate || "",

                isAvailable: data.isAvailable,

                currentStatus: data.currentStatus || "Available"

            });

        }
        catch (err) {

            console.error(err);

            alert("Failed to load technician.");

        }
        finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm({

            ...form,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        });

    };

    const validate = () => {

        const validationErrors = {};

        if (!form.employeeCode.trim())
            validationErrors.employeeCode =
                "Employee Code is required.";

        if (!form.department.trim())
            validationErrors.department =
                "Department is required.";

        if (!form.designation.trim())
            validationErrors.designation =
                "Designation is required.";

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;

    };

    if (!show)
        return null;

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                background: "rgba(0,0,0,.45)"
            }}
        >

            <div className="modal-dialog modal-xl modal-dialog-centered">

                <div
                    className="modal-content border-0 shadow-lg"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div
                        className="modal-header"
                        style={{
                            background: "#0B2E4F",
                            color: "#fff"
                        }}
                    >

                        <h4 className="fw-bold mb-0">

                            Edit Technician

                        </h4>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body p-4">
                                            {loading ? (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-warning"
                                style={{
                                    width: "3rem",
                                    height: "3rem"
                                }}
                            ></div>

                            <h5 className="mt-3">

                                Loading Technician...

                            </h5>

                        </div>

                    ) : (

                        <form>

                            <div className="row g-4">

                                <div className="col-lg-6">

                                    <div
                                        className="card border shadow-sm h-100"
                                        style={{
                                            borderRadius: "15px"
                                        }}
                                    >

                                        <div className="card-body">

                                            <h5
                                                className="fw-bold mb-4"
                                                style={{
                                                    color: "#0B2E4F"
                                                }}
                                            >

                                                Technician Information

                                            </h5>

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Employee Code

                                                </label>

                                                <input
                                                    type="text"
                                                    name="employeeCode"
                                                    className={`form-control ${
                                                        errors.employeeCode
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    value={form.employeeCode}
                                                    onChange={handleChange}
                                                />

                                                <div className="invalid-feedback">

                                                    {errors.employeeCode}

                                                </div>

                                            </div>

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Department

                                                </label>

                                                <input
                                                    type="text"
                                                    name="department"
                                                    className={`form-control ${
                                                        errors.department
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    value={form.department}
                                                    onChange={handleChange}
                                                />

                                                <div className="invalid-feedback">

                                                    {errors.department}

                                                </div>

                                            </div>

                                            <div>

                                                <label className="form-label fw-semibold">

                                                    Designation

                                                </label>

                                                <input
                                                    type="text"
                                                    name="designation"
                                                    className={`form-control ${
                                                        errors.designation
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    value={form.designation}
                                                    onChange={handleChange}
                                                />

                                                <div className="invalid-feedback">

                                                    {errors.designation}

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="col-lg-6">

                                    <div
                                        className="card border shadow-sm h-100"
                                        style={{
                                            borderRadius: "15px"
                                        }}
                                    >

                                        <div className="card-body">

                                            <h5
                                                className="fw-bold mb-4"
                                                style={{
                                                    color: "#0B2E4F"
                                                }}
                                            >

                                                Employment Details

                                            </h5>

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Experience (Years)

                                                </label>

                                                <input
                                                    type="number"
                                                    name="experienceYears"
                                                    className="form-control"
                                                    value={form.experienceYears}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div className="row">

                                                <div className="col-md-6">

                                                    <label className="form-label fw-semibold">

                                                        Joining Date

                                                    </label>

                                                    <input
                                                        type="date"
                                                        name="joiningDate"
                                                        className="form-control"
                                                        value={form.joiningDate}
                                                        onChange={handleChange}
                                                    />

                                                </div>

                                                <div className="col-md-6">

                                                    <label className="form-label fw-semibold">

                                                        Hourly Rate (₹)

                                                    </label>

                                                    <input
                                                        type="number"
                                                        name="hourlyRate"
                                                        className="form-control"
                                                        value={form.hourlyRate}
                                                        onChange={handleChange}
                                                    />

                                                </div>

                                            </div>

                                            <hr className="my-4" />

                                            <div className="form-check form-switch mb-3">

                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="isAvailable"
                                                    checked={form.isAvailable}
                                                    onChange={handleChange}
                                                />

                                                <label className="form-check-label fw-semibold">

                                                    Available for Work

                                                </label>

                                            </div>

                                            <div>

                                                <label className="form-label fw-semibold">

                                                    Current Status

                                                </label>

                                                <select
                                                    name="currentStatus"
                                                    className="form-select"
                                                    value={form.currentStatus}
                                                    onChange={handleChange}
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

                                                    <option value="Inactive">

                                                        Inactive

                                                    </option>

                                                </select>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </form>

                    )}
                                        <div
                        className="modal-footer"
                        style={{
                            background: "#F8F9FA"
                        }}
                    >

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={saving}
                        >

                            <i className="bi bi-x-circle me-2"></i>

                            Cancel

                        </button>

                        <button
                            type="button"
                            className="btn"
                            style={{
                                background: "#0B2E4F",
                                color: "#fff"
                            }}
                            disabled={saving}
                            onClick={async () => {

                                if (!validate())
                                    return;

                                setSaving(true);

                                try {

                                    await technicianService.update(

                                        form.technicianId,

                                        {

                                            technicianId: form.technicianId,

                                            employeeCode: form.employeeCode,

                                            department: form.department,

                                            designation: form.designation,

                                            experienceYears: form.experienceYears
                                                ? Number(form.experienceYears)
                                                : null,

                                            joiningDate: form.joiningDate || null,

                                            hourlyRate: form.hourlyRate
                                                ? Number(form.hourlyRate)
                                                : null,

                                            isAvailable: form.isAvailable,

                                            currentStatus: form.currentStatus

                                        }

                                    );

                                    alert("Technician updated successfully.");

                                    onSuccess();

                                    onClose();

                                }
                                catch (err) {

                                    console.error(err);

                                    alert("Failed to update technician.");

                                }
                                finally {

                                    setSaving(false);

                                }

                            }}
                        >

                            {saving ? (

                                <>

                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                    ></span>

                                    Updating...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-check-circle me-2"></i>

                                    Update Technician

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>);

}

export default EditTechnicianModal;