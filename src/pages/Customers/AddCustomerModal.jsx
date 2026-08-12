import React, { useState } from "react";
import customerService from "../../services/customerService";

const AddCustomerModal = ({ onClose, onSuccess }) => {
    const [form, setForm] = useState({
        userId: "",
        customerCode: "",
        customerType: "",
        companyName: "",
        taxNumber: "",
        dateOfBirth: "",
        gender: "",
        preferredLanguage: "",
        notes: "",
        isActive: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.userId) return alert("Please enter User Id.");
        if (!form.customerCode) return alert("Customer Code is required.");
        if (!form.customerType) return alert("Select Customer Type.");

        try {
            await customerService.create(form);

            alert("Customer created successfully.");

            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to create customer.");
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.45)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}
        >
            <div
                className="card shadow"
                style={{
                    width: "750px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    borderRadius: "15px"
                }}
            >
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Add Customer</h4>

                    <button
                        className="btn-close"
                        onClick={onClose}
                    ></button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="card-body">

                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label">User Id</label>
                                <input
                                    className="form-control"
                                    name="userId"
                                    value={form.userId}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Customer Code</label>
                                <input
                                    className="form-control"
                                    name="customerCode"
                                    value={form.customerCode}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Customer Type</label>
                                <select
                                    className="form-select"
                                    name="customerType"
                                    value={form.customerType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="Individual">Individual</option>
                                    <option value="Business">Business</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Company Name</label>
                                <input
                                    className="form-control"
                                    name="companyName"
                                    value={form.companyName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Tax Number</label>
                                <input
                                    className="form-control"
                                    name="taxNumber"
                                    value={form.taxNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Date of Birth</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dateOfBirth"
                                    value={form.dateOfBirth}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Gender</label>
                                <select
                                    className="form-select"
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Preferred Language</label>
                                <input
                                    className="form-control"
                                    name="preferredLanguage"
                                    value={form.preferredLanguage}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Notes</label>
                                <textarea
                                    rows="3"
                                    className="form-control"
                                    name="notes"
                                    value={form.notes}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-12">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="isActive"
                                        checked={form.isActive}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">
                                        Active Customer
                                    </label>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="card-footer d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Save Customer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomerModal;