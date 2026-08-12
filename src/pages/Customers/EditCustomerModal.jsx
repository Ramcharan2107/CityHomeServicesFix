import { useEffect, useState } from "react";
import customerService from "../../services/customerService";

function EditCustomerModal({

    show,

    customer,

    onClose,

    onSuccess

}) 
{

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({

        firstName: "",

        lastName: "",

        email: "",

        phoneNumber: "",

        customerType: "Individual",

        gender: "",

        preferredLanguage: "English",

        companyName: "",

        taxNumber: "",

        notes: "",

        isActive: true

    });

    useEffect(() => {

        if (!show || !customer)
            return;

        loadCustomer();

    }, [show, customer]);

    const loadCustomer = async () => {

        setLoading(true);

        setErrors({});

        try {

            const data = await customerService.getById(

                customer.customerId

            );

            setForm({

                firstName: data.firstName || "",

                lastName: data.lastName || "",

                email: data.email || "",

                phoneNumber: data.phoneNumber || "",

                customerType: data.customerType || "Individual",

                gender: data.gender || "",

                preferredLanguage:
                    data.preferredLanguage || "English",

                companyName: data.companyName || "",

                taxNumber: data.taxNumber || "",

                notes: data.notes || "",

                isActive: data.isActive

            });

        }
        catch (err) {

            console.error(err);

            alert("Failed to load customer.");

        }
        finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm(previous => ({

            ...previous,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        }));

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

                            Edit Customer

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
                                <h5 className="mt-3">Loading Customer...</h5>
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
                                                    Personal Information
                                                </h5>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        First Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        className={`form-control ${
                                                            errors.firstName
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        value={form.firstName}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errors.firstName}
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        className={`form-control ${
                                                            errors.lastName
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        value={form.lastName}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errors.lastName}
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Gender
                                                    </label>
                                                    <select
                                                        name="gender"
                                                        className="form-select"
                                                        value={form.gender}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Preferred Language
                                                    </label>
                                                    <select
                                                        name="preferredLanguage"
                                                        className="form-select"
                                                        value={form.preferredLanguage}
                                                        onChange={handleChange}
                                                    >
                                                        <option>English</option>
                                                        <option>Telugu</option>
                                                        <option>Hindi</option>
                                                    </select>
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
                                                    Contact Information
                                                </h5>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className={`form-control ${
                                                            errors.email
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        value={form.email}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errors.email}
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="phoneNumber"
                                                        className={`form-control ${
                                                            errors.phoneNumber
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        value={form.phoneNumber}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errors.phoneNumber}
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Customer Type
                                                    </label>
                                                    <select
                                                        name="customerType"
                                                        className="form-select"
                                                        value={form.customerType}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="Individual">
                                                            Individual
                                                        </option>
                                                        <option value="Business">
                                                            Business
                                                        </option>
                                                        <option value="Premium">
                                                            Premium
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="form-check form-switch mt-4">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="isActive"
                                                        checked={form.isActive}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label fw-semibold">
                                                        Active Customer
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div
                                            className="card border shadow-sm"
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
                                                    Additional Information
                                                </h5>
                                                <div className="row">
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="form-label">
                                                            Company Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="companyName"
                                                            className="form-control"
                                                            value={form.companyName}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="form-label">
                                                            Tax Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="taxNumber"
                                                            className="form-control"
                                                            value={form.taxNumber}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">
                                                            Notes
                                                        </label>
                                                        <textarea
                                                            rows="4"
                                                            name="notes"
                                                            className="form-control"
                                                            value={form.notes}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer bg-light">
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
                                            if (!validate()) return;
                                            setSaving(true);
                                            try {
                                                await customerService.update(
                                                    customer.customerId,
                                                    form
                                                );
                                                alert("Customer updated successfully.");
                                                onSuccess();
                                                onClose();
                                            } catch (err) {
                                                console.error(err);
                                                alert("Failed to update customer.");
                                            } finally {
                                                setSaving(false);
                                            }
                                        }}
                                    >
                                        {saving ? (
                                            <span>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Updating...
                                            </span>
                                        ) : (
                                            <span>
                                                <i className="bi bi-check-circle me-2"></i>
                                                Update Customer
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

        </div>

    );
}

export default EditCustomerModal;