import { useEffect, useState } from "react";
import serviceService from "../../../services/serviceService";
import "./ServiceModal.css";

function EditServiceModal({
    show,
    service,
    categories = [],
    onClose,
    onSuccess
}) {

    const [form, setForm] = useState({
        categoryId: "",
        serviceName: "",
        serviceCode: "",
        description: "",
        estimatedHours: "",
        basePrice: "",
        isActive: true
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!show || !service) return;

        const categoryId =
            service?.categoryId ??
            service?.CategoryId ??
            service?.category?.categoryId ??
            service?.category?.CategoryId ??
            "";

        const serviceName =
            service?.serviceName ??
            service?.ServiceName ??
            service?.name ??
            "";

        const serviceCode =
            service?.serviceCode ??
            service?.ServiceCode ??
            service?.code ??
            "";

        const description =
            service?.description ??
            service?.Description ??
            "";

        const estimatedHours =
            service?.estimatedHours ??
            service?.EstimatedHours ??
            service?._hours ??
            "";

        const basePrice =
            service?.basePrice ??
            service?.BasePrice ??
            service?._price ??
            "";

        const isActive =
            service?.isActive ??
            service?.IsActive ??
            service?._active ??
            false;

        setForm({
            categoryId: categoryId ?? "",
            serviceName: serviceName ?? "",
            serviceCode: serviceCode ?? "",
            description: description ?? "",
            estimatedHours: estimatedHours ?? "",
            basePrice: basePrice ?? "",
            isActive: Boolean(isActive)
        });

        setError("");

    }, [show, service]);


    useEffect(() => {

        if (!show) return;

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        const handleKeyDown = (event) => {

            if (
                event.key === "Escape" &&
                !saving
            ) {
                onClose();
            }

        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            document.body.style.overflow =
                previousOverflow;

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, [show, saving, onClose]);


    if (!show || !service) {
        return null;
    }


    const serviceId =
        service?.serviceId ??
        service?.ServiceId ??
        service?.id;


    const updateField = (event) => {

        const {
            name,
            value,
            type,
            checked
        } = event.target;

        setForm(current => ({
            ...current,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));

    };


    const getErrorMessage = (err) =>
        err?.response?.data?.message ||
        err?.response?.data?.Message ||
        err?.response?.data?.title ||
        err?.message ||
        "Unable to update service.";


    const handleSubmit = async (event) => {

        event.preventDefault();

        if (
            serviceId === null ||
            serviceId === undefined ||
            serviceId === ""
        ) {
            setError("Service ID is missing.");
            return;
        }

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

        const hours =
            Number(form.estimatedHours);

        const price =
            Number(form.basePrice);

        if (
            !Number.isFinite(hours) ||
            hours <= 0
        ) {
            setError(
                "Estimated hours must be greater than 0."
            );
            return;
        }

        if (
            !Number.isFinite(price) ||
            price < 0
        ) {
            setError(
                "Base price must be a valid amount."
            );
            return;
        }

        try {

            setSaving(true);
            setError("");

            await serviceService.update(
                serviceId,
                {
                    categoryId:
                        Number(form.categoryId),

                    serviceName:
                        form.serviceName.trim(),

                    serviceCode:
                        form.serviceCode.trim(),

                    description:
                        form.description.trim(),

                    estimatedHours:
                        hours,

                    basePrice:
                        price,

                    isActive:
                        Boolean(form.isActive)
                }
            );

            onSuccess?.();

        } catch (err) {

            console.error(
                "UPDATE SERVICE ERROR:",
                err
            );

            setError(
                getErrorMessage(err)
            );

        } finally {

            setSaving(false);

        }

    };


    const handleBackdrop = (event) => {

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
            className="service-modal-backdrop"
            onMouseDown={handleBackdrop}
        >

            <div
                className="service-modal service-modal-large"
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-service-title"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                <div className="service-modal-header">

                    <div className="service-modal-title">

                        <div className="service-modal-title-icon">

                            <i className="bi bi-pencil-square"></i>

                        </div>

                        <div className="service-modal-title-content">

                            <span className="service-modal-eyebrow">
                                SERVICE MANAGEMENT
                            </span>

                            <h2 id="edit-service-title">
                                Edit Service
                            </h2>

                            <p>
                                Update service information and status.
                            </p>

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

                                    <label htmlFor="edit-category">
                                        Category <span>*</span>
                                    </label>

                                    <select
                                        id="edit-category"
                                        name="categoryId"
                                        value={form.categoryId}
                                        onChange={updateField}
                                        disabled={saving}
                                        required
                                    >

                                        <option value="">
                                            Select category
                                        </option>

                                        {categories.map(
                                            category => {

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

                                                    <option
                                                        key={
                                                            id ??
                                                            name
                                                        }
                                                        value={id}
                                                    >
                                                        {name}
                                                    </option>

                                                );

                                            }
                                        )}

                                    </select>

                                </div>


                                <div className="service-modal-form-group">

                                    <label htmlFor="edit-service-code">
                                        Service Code <span>*</span>
                                    </label>

                                    <input
                                        id="edit-service-code"
                                        name="serviceCode"
                                        value={form.serviceCode}
                                        onChange={updateField}
                                        maxLength={50}
                                        disabled={saving}
                                        required
                                    />

                                </div>


                                <div className="service-modal-form-group full">

                                    <label htmlFor="edit-service-name">
                                        Service Name <span>*</span>
                                    </label>

                                    <input
                                        id="edit-service-name"
                                        name="serviceName"
                                        value={form.serviceName}
                                        onChange={updateField}
                                        maxLength={150}
                                        disabled={saving}
                                        required
                                    />

                                </div>


                                <div className="service-modal-form-group">

                                    <label htmlFor="edit-hours">
                                        Estimated Hours <span>*</span>
                                    </label>

                                    <input
                                        id="edit-hours"
                                        name="estimatedHours"
                                        type="number"
                                        min="0.1"
                                        step="0.1"
                                        value={form.estimatedHours}
                                        onChange={updateField}
                                        disabled={saving}
                                        required
                                    />

                                </div>


                                <div className="service-modal-form-group">

                                    <label htmlFor="edit-price">
                                        Base Price <span>*</span>
                                    </label>

                                    <input
                                        id="edit-price"
                                        name="basePrice"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={form.basePrice}
                                        onChange={updateField}
                                        disabled={saving}
                                        required
                                    />

                                </div>


                                <div className="service-modal-form-group full">

                                    <label htmlFor="edit-description">
                                        Description
                                    </label>

                                    <textarea
                                        id="edit-description"
                                        name="description"
                                        value={form.description}
                                        onChange={updateField}
                                        maxLength={1000}
                                        disabled={saving}
                                    />

                                </div>


                                <div className="service-modal-form-group full">

                                    <div className="service-modal-checkbox">

                                        <input
                                            id="edit-active"
                                            name="isActive"
                                            type="checkbox"
                                            checked={
                                                form.isActive
                                            }
                                            onChange={updateField}
                                            disabled={saving}
                                        />

                                        <label htmlFor="edit-active">
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

export default EditServiceModal;
