import { useState } from "react";
import technicianService from "../../../services/technicianService";

function AddTechnicianModal({

    show,

    onClose,

    onSuccess

}) {

    const [saving, setSaving] = useState(false);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({

        firstName: "",

        lastName: "",

        email: "",

        phoneNumber: "",

        password: "",

        employeeCode: "",

        department: "",

        designation: "",

        experienceYears: "",

        joiningDate: "",

        hourlyRate: ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const validate = () => {

        const validationErrors = {};

        if (!form.firstName.trim())
            validationErrors.firstName = "First Name is required.";

        if (!form.lastName.trim())
            validationErrors.lastName = "Last Name is required.";

        if (!form.email.trim())
            validationErrors.email = "Email is required.";

        if (!form.phoneNumber.trim())
            validationErrors.phoneNumber = "Phone Number is required.";

        if (!form.password.trim())
            validationErrors.password = "Password is required.";

        if (!form.employeeCode.trim())
            validationErrors.employeeCode = "Employee Code is required.";

        if (!form.department.trim())
            validationErrors.department = "Department is required.";

        if (!form.designation.trim())
            validationErrors.designation = "Designation is required.";

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;

    };

    const handleSave = async () => {

        if (!validate())
            return;

        setSaving(true);

        try {

            await technicianService.create({

                firstName: form.firstName,

                lastName: form.lastName,

                email: form.email,

                phoneNumber: form.phoneNumber,

                password: form.password,

                employeeCode: form.employeeCode,

                department: form.department,

                designation: form.designation,

                experienceYears: form.experienceYears
                    ? Number(form.experienceYears)
                    : null,

                joiningDate: form.joiningDate || null,

                hourlyRate: form.hourlyRate
                    ? Number(form.hourlyRate)
                    : null

            });

            alert("Technician created successfully.");

            onSuccess();

            onClose();

        }
        catch (err) {

            console.error(err);

            alert("Failed to create technician.");

        }
        finally {

            setSaving(false);

        }

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

                            Add Technician

                        </h4>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body p-4">
                                            <form>

                        <div className="row g-4">

                            {/* ================= Personal Information ================= */}

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

                                            Personal Information

                                        </h5>

                                        <div className="row">

                                            <div className="col-md-6 mb-3">

                                                <label className="form-label fw-semibold">

                                                    First Name

                                                </label>

                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                                    value={form.firstName}
                                                    onChange={handleChange}
                                                />

                                                <div className="invalid-feedback">

                                                    {errors.firstName}

                                                </div>

                                            </div>

                                            <div className="col-md-6 mb-3">

                                                <label className="form-label fw-semibold">

                                                    Last Name

                                                </label>

                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                                    value={form.lastName}
                                                    onChange={handleChange}
                                                />

                                                <div className="invalid-feedback">

                                                    {errors.lastName}

                                                </div>

                                            </div>

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">

                                                Email Address

                                            </label>

                                            <input
                                                type="email"
                                                name="email"
                                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                value={form.email}
                                                onChange={handleChange}
                                            />

                                            <div className="invalid-feedback">

                                                {errors.email}

                                            </div>

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">

                                                Phone Number

                                            </label>

                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                                                value={form.phoneNumber}
                                                onChange={handleChange}
                                            />

                                            <div className="invalid-feedback">

                                                {errors.phoneNumber}

                                            </div>

                                        </div>

                                        <div>

                                            <label className="form-label fw-semibold">

                                                Password

                                            </label>

                                            <input
                                                type="password"
                                                name="password"
                                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                                value={form.password}
                                                onChange={handleChange}
                                            />

                                            <div className="invalid-feedback">

                                                {errors.password}

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* ================= Employment Information ================= */}

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

                                            Employment Information

                                        </h5>

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">

                                                Employee Code

                                            </label>

                                            <input
                                                type="text"
                                                name="employeeCode"
                                                className={`form-control ${errors.employeeCode ? "is-invalid" : ""}`}
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
                                                className={`form-control ${errors.department ? "is-invalid" : ""}`}
                                                value={form.department}
                                                onChange={handleChange}
                                            />

                                            <div className="invalid-feedback">

                                                {errors.department}

                                            </div>

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">

                                                Designation

                                            </label>

                                            <input
                                                type="text"
                                                name="designation"
                                                className={`form-control ${errors.designation ? "is-invalid" : ""}`}
                                                value={form.designation}
                                                onChange={handleChange}
                                            />

                                            <div className="invalid-feedback">

                                                {errors.designation}

                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6 mb-3">

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

                                            <div className="col-md-6 mb-3">

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

                                        <div>

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

                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>
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
                                background: "#F7941D",
                                color: "#fff"
                            }}
                            onClick={handleSave}
                            disabled={saving}
                        >

                            {saving ? (

                                <>

                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                    ></span>

                                    Saving...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-check-circle me-2"></i>

                                    Save Technician

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>);

}

export default AddTechnicianModal;