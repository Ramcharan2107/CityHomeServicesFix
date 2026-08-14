import { useEffect, useState } from "react";
import serviceService from "../../../services/serviceService";
import "./ServiceModal.css";

const initialForm = {
    categoryId: "",
    serviceName: "",
    serviceCode: "",
    description: "",
    estimatedHours: "",
    basePrice: "",
    isActive: true
};

function AddServiceModal({ show, categories = [], onClose, onSuccess }) {

    const [form, setForm] = useState(initialForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (show) {
            setForm(initialForm);
            setError("");
        }
    }, [show]);

    useEffect(() => {
        if (!show) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape" && !saving) onClose();
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [show, saving, onClose]);

    if (!show) return null;

    const updateField = (event) => {
        const { name, value, type, checked } = event.target;

        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const getErrorMessage = (err) =>
        err?.response?.data?.message ||
        err?.response?.data?.Message ||
        err?.response?.data?.title ||
        err?.message ||
        "Unable to create service.";

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.categoryId) {
            setError("Please select a category.");
            return;
        }

        if (!form.serviceName.trim()) {
            setError("Service name is required.");
            return;
        }

        if (!form.serviceCode.trim()) {
            setError("Service code is required.");
            return;
        }

        const hours = Number(form.estimatedHours);
        const price = Number(form.basePrice);

        if (!Number.isFinite(hours) || hours <= 0) {
            setError("Estimated hours must be greater than 0.");
            return;
        }

        if (!Number.isFinite(price) || price < 0) {
            setError("Base price must be a valid amount.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            await serviceService.create({
                categoryId: Number(form.categoryId),
                serviceName: form.serviceName.trim(),
                serviceCode: form.serviceCode.trim(),
                description: form.description.trim(),
                estimatedHours: hours,
                basePrice: price,
                isActive: Boolean(form.isActive)
            });

            onSuccess?.();
        } catch (err) {
            console.error("CREATE SERVICE ERROR:", err);
            setError(getErrorMessage(err));
        } finally {
            setSaving(false);
        }
    };

    const handleBackdrop = (event) => {
        if (event.target === event.currentTarget && !saving) {
            onClose();
        }
    };

    return (
        <div className="service-modal-backdrop" onMouseDown={handleBackdrop}>
            <div
                className="service-modal service-modal-large"
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-service-title"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="service-modal-header">
                    <div className="service-modal-title">
                        <div className="service-modal-title-icon">
                            <i className="bi bi-plus-lg"></i>
                        </div>

                        <div className="service-modal-title-content">
                            <span className="service-modal-eyebrow">
                                SERVICE MANAGEMENT
                            </span>
                            <h2 id="add-service-title">Add Service</h2>
                            <p>Create a new service for customers.</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="service-modal-close"
                        onClick={onClose}
                        disabled={saving}
                        aria-label="Close"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="service-modal-body">
                        {error && (
                            <div className="service-modal-error">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                {error}
                            </div>
                        )}

                        <div className="service-modal-form">
                            <div className="service-modal-form-grid">

                                <div className="service-modal-form-group">
                                    <label htmlFor="add-category">
                                        Category <span>*</span>
                                    </label>

                                    <select
                                        id="add-category"
                                        name="categoryId"
                                        value={form.categoryId}
                                        onChange={updateField}
                                        disabled={saving}
                                        required
                                    >
                                        <option value="">Select category</option>

                                        {categories.map((category) => {
                                            const id =
                                                category?.categoryId ??
                                                category?.CategoryId ??
                                                category?.id;

                                            const name =
                                                category?.categoryName ??
                                                category?.CategoryName ??
                                                category?.name ??
                                                "Unnamed Category";

                                            return (
                                                <option key={id ?? name} value={id}>
                                                    {name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>

                                <div className="service-modal-form-group">
                                    <label htmlFor="add-service-code">
                                        Service Code <span>*</span>
                                    </label>

                                    <input
                                        id="add-service-code"
                                        name="serviceCode"
                                        value={form.serviceCode}
                                        onChange={updateField}
                                        placeholder="e.g. PLB-001"
                                        maxLength={50}
                                        disabled={saving}
                                        required
                                    />
                                </div>

                                <div className="service-modal-form-group full">
                                    <label htmlFor="add-service-name">
                                        Service Name <span>*</span>
                                    </label>

                                    <input
                                        id="add-service-name"
                                        name="serviceName"
                                        value={form.serviceName}
                                        onChange={updateField}
                                        placeholder="Enter service name"
                                        maxLength={150}
                                        disabled={saving}
                                        required
                                    />
                                </div>

                                <div className="service-modal-form-group">
                                    <label htmlFor="add-hours">
                                        Estimated Hours <span>*</span>
                                    </label>

                                    <input
                                        id="add-hours"
                                        name="estimatedHours"
                                        type="number"
                                        min="0.1"
                                        step="0.1"
                                        value={form.estimatedHours}
                                        onChange={updateField}
                                        placeholder="e.g. 2"
                                        disabled={saving}
                                        required
                                    />
                                </div>

                                <div className="service-modal-form-group">
                                    <label htmlFor="add-price">
                                        Base Price <span>*</span>
                                    </label>

                                    <input
                                        id="add-price"
                                        name="basePrice"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={form.basePrice}
                                        onChange={updateField}
                                        placeholder="e.g. 499"
                                        disabled={saving}
                                        required
                                    />
                                </div>

                                <div className="service-modal-form-group full">
                                    <label htmlFor="add-description">
                                        Description
                                    </label>

                                    <textarea
                                        id="add-description"
                                        name="description"
                                        value={form.description}
                                        onChange={updateField}
                                        placeholder="Describe the service..."
                                        maxLength={1000}
                                        disabled={saving}
                                    />
                                </div>

                                <div className="service-modal-form-group full">
                                    <div className="service-modal-checkbox">
                                        <input
                                            id="add-active"
                                            name="isActive"
                                            type="checkbox"
                                            checked={form.isActive}
                                            onChange={updateField}
                                            disabled={saving}
                                        />

                                        <label htmlFor="add-active">
                                            Service is Active
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="service-modal-footer">
                        <button
                            type="button"
                            className="service-modal-btn service-modal-btn-secondary"
                            onClick={onClose}
                            disabled={saving}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="service-modal-btn service-modal-btn-primary"
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <span className="service-modal-spinner"></span>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-lg"></i>
                                    Create Service
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddServiceModal;
