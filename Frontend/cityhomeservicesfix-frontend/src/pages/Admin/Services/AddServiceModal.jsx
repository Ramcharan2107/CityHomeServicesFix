import { useState } from "react";
import serviceService from "../../../services/serviceService";

function AddServiceModal({

    show,

    categories,

    onClose,

    onSuccess

}) {

    const [saving, setSaving] = useState(false);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({

        categoryId: "",

        serviceName: "",

        serviceCode: "",

        description: "",

        estimatedHours: "",

        basePrice: "",

        isActive: true

    });

    if (!show)
        return null;

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

        if (!form.categoryId)
            validationErrors.categoryId =
                "Category is required.";

        if (!form.serviceName.trim())
            validationErrors.serviceName =
                "Service Name is required.";

        if (!form.serviceCode.trim())
            validationErrors.serviceCode =
                "Service Code is required.";

        if (!form.basePrice)
            validationErrors.basePrice =
                "Base Price is required.";

        if (!form.estimatedHours)
            validationErrors.estimatedHours =
                "Estimated Hours is required.";

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;

    };

    const handleSave = async () => {

        if (!validate())
            return;

        setSaving(true);

        try {

            await serviceService.create({

                ...form,

                categoryId: Number(form.categoryId),

                estimatedHours: Number(form.estimatedHours),

                basePrice: Number(form.basePrice)

            });

            setForm({

                categoryId: "",

                serviceName: "",

                serviceCode: "",

                description: "",

                estimatedHours: "",

                basePrice: "",

                isActive: true

            });

            onSuccess();

            onClose();

        }
        catch (err) {

            console.error(err);

            alert("Failed to create service.");

        }
        finally {

            setSaving(false);

        }

    };

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

                            Add New Service

                        </h4>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body p-4">
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

                                            Basic Information

                                        </h5>

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">

                                                Category

                                            </label>

                                            <select
                                                name="categoryId"
                                                className={`form-select ${
                                                    errors.categoryId ? "is-invalid" : ""
                                                }`}
                                                value={form.categoryId}
                                                onChange={handleChange}
                                            >

                                                <option value="">

                                                    Select Category

                                                </option>

                                                {categories.map(category => (

                                                    <option
                                                        key={category.categoryId}
                                                        value={category.categoryId}
                                                    >

                                                        {category.categoryName}

                                                    </option>

                                                ))}

                                            </select>

                                            <div className="invalid-feedback">

                                                {errors.categoryId}

                                            </div>

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">

                                                Service Name

                                            </label>

                                            <input
                                                type="text"
                                                name="serviceName"
                                                className={`form-control ${
                                                    errors.serviceName ? "is-invalid" : ""
                                                }`}
                                                value={form.serviceName}
                                                onChange={handleChange}
                                                placeholder="Enter Service Name"
                                            />

                                            <div className="invalid-feedback">

                                                {errors.serviceName}

                                            </div>

                                        </div>

                                        <div>

                                            <label className="form-label fw-semibold">

                                                Service Code

                                            </label>

                                            <input
                                                type="text"
                                                name="serviceCode"
                                                className={`form-control ${
                                                    errors.serviceCode ? "is-invalid" : ""
                                                }`}
                                                value={form.serviceCode}
                                                onChange={handleChange}
                                                placeholder="Ex: ELE001"

                                            />

                                            <div className="invalid-feedback">

                                                {errors.serviceCode}

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

                                            Pricing & Duration

                                        </h5>

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">

                                                Base Price (₹)

                                            </label>

                                            <input
                                                type="number"
                                                name="basePrice"
                                                className={`form-control ${
                                                    errors.basePrice ? "is-invalid" : ""
                                                }`}
                                                value={form.basePrice}
                                                onChange={handleChange}
                                                placeholder="Enter Base Price"
                                            />

                                            <div className="invalid-feedback">

                                                {errors.basePrice}

                                            </div>

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">

                                                Estimated Hours

                                            </label>

                                            <input
                                                type="number"
                                                step="0.5"
                                                name="estimatedHours"
                                                className={`form-control ${
                                                    errors.estimatedHours ? "is-invalid" : ""
                                                }`}
                                                value={form.estimatedHours}
                                                onChange={handleChange}
                                                placeholder="Ex: 2"

                                            />

                                            <div className="invalid-feedback">

                                                {errors.estimatedHours}

                                            </div>

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

                                                Active Service

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
                                            className="fw-bold mb-3"
                                            style={{
                                                color: "#0B2E4F"
                                            }}
                                        >

                                            Service Description

                                        </h5>

                                        <textarea
                                            rows="5"
                                            name="description"
                                            className="form-control"
                                            value={form.description}
                                            onChange={handleChange}
                                            placeholder="Enter Service Description..."
                                        ></textarea>

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
                            disabled={saving}
                            onClick={handleSave}
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

                                    Save Service

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>
    );

}

export default AddServiceModal;