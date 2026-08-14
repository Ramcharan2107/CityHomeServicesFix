import { useEffect } from "react";
import "./ServiceModal.css";

function ServiceDetailsModal({
    show,
    service,
    onClose
}) {

    useEffect(() => {

        if (!show) return undefined;

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        const handleKeyDown = (event) => {

            if (event.key === "Escape") {
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

    }, [show, onClose]);


    if (!show || !service) {
        return null;
    }


    const serviceId =
        service?.serviceId ??
        service?.ServiceId ??
        service?.id ??
        "—";

    const serviceName =
        service?.serviceName ??
        service?.ServiceName ??
        service?.name ??
        "Unnamed Service";

    const serviceCode =
        service?.serviceCode ??
        service?.ServiceCode ??
        service?.code ??
        "—";

    const categoryName =
        service?._categoryName ??
        service?.categoryName ??
        service?.CategoryName ??
        service?.category?.categoryName ??
        service?.category?.CategoryName ??
        service?.category?.name ??
        "Uncategorized";

    const description =
        service?._description ??
        service?.description ??
        service?.Description ??
        "No description available.";

    const estimatedHours =
        service?._hours ??
        service?.estimatedHours ??
        service?.EstimatedHours ??
        null;

    const basePrice =
        service?._price ??
        service?.basePrice ??
        service?.BasePrice ??
        service?.price ??
        service?.Price ??
        null;

    const isActive =
        service?._active ??
        service?.isActive ??
        service?.IsActive ??
        false;

    const createdAt =
        service?._createdAt ??
        service?.createdAt ??
        service?.CreatedAt ??
        null;

    const updatedAt =
        service?._updatedAt ??
        service?.updatedAt ??
        service?.UpdatedAt ??
        null;


    const safeNumber = (value) => {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return null;
        }

        const number = Number(value);

        return Number.isFinite(number)
            ? number
            : null;

    };


    const formatPrice = (value) => {

        const number = safeNumber(value);

        if (number === null) {
            return "—";
        }

        return `₹ ${number.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }
        )}`;

    };


    const formatHours = (value) => {

        const number = safeNumber(value);

        if (number === null) {
            return "—";
        }

        return `${number} ${
            number === 1
                ? "hour"
                : "hours"
        }`;

    };


    const formatDate = (value) => {

        if (!value) return "—";

        const date = new Date(value);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "—";
        }

        return date.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


    const handleBackdrop = (event) => {

        if (
            event.target ===
            event.currentTarget
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
                aria-labelledby="service-details-title"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                <div className="service-modal-header">

                    <div className="service-modal-title">

                        <div className="service-modal-title-icon">

                            <i className="bi bi-tools"></i>

                        </div>

                        <div className="service-modal-title-content">

                            <span className="service-modal-eyebrow">
                                SERVICE INFORMATION
                            </span>

                            <h2 id="service-details-title">
                                Service Details
                            </h2>

                            <p>
                                Complete information about this service.
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="service-modal-close"
                        onClick={onClose}
                        aria-label="Close"
                    >

                        <i className="bi bi-x-lg"></i>

                    </button>

                </div>


                <div className="service-modal-body">

                    <div className="service-details-summary">

                        <div className="service-details-summary-icon">

                            <i className="bi bi-tools"></i>

                        </div>


                        <div>

                            <h3>
                                {serviceName}
                            </h3>

                            <p>
                                {serviceCode !== "—"
                                    ? `Service Code: ${serviceCode}`
                                    : "Service code not available"
                                }
                            </p>

                        </div>


                        <span
                            className={
                                isActive
                                    ? "service-modal-status active"
                                    : "service-modal-status inactive"
                            }
                        >

                            <span></span>

                            {isActive
                                ? "Active"
                                : "Inactive"
                            }

                        </span>

                    </div>


                    <div className="service-details-grid">

                        <div className="service-detail-card">

                            <span>
                                Service ID
                            </span>

                            <strong>
                                #{serviceId}
                            </strong>

                        </div>


                        <div className="service-detail-card">

                            <span>
                                Service Code
                            </span>

                            <strong>
                                {serviceCode}
                            </strong>

                        </div>


                        <div className="service-detail-card">

                            <span>
                                Category
                            </span>

                            <strong>
                                {categoryName}
                            </strong>

                        </div>


                        <div className="service-detail-card">

                            <span>
                                Base Price
                            </span>

                            <strong>
                                {formatPrice(basePrice)}
                            </strong>

                        </div>


                        <div className="service-detail-card">

                            <span>
                                Estimated Duration
                            </span>

                            <strong>
                                {formatHours(estimatedHours)}
                            </strong>

                        </div>


                        <div className="service-detail-card">

                            <span>
                                Status
                            </span>

                            <strong
                                className={
                                    isActive
                                        ? "service-detail-active"
                                        : "service-detail-inactive"
                                }
                            >
                                {isActive
                                    ? "Active"
                                    : "Inactive"
                                }
                            </strong>

                        </div>


                        <div className="service-detail-card service-detail-card-full">

                            <span>
                                Description
                            </span>

                            <div className="service-detail-description">
                                {description}
                            </div>

                        </div>


                        <div className="service-detail-card">

                            <span>
                                Created
                            </span>

                            <strong>
                                {formatDate(createdAt)}
                            </strong>

                        </div>


                        <div className="service-detail-card">

                            <span>
                                Last Updated
                            </span>

                            <strong>
                                {formatDate(updatedAt)}
                            </strong>

                        </div>

                    </div>

                </div>


                <div className="service-modal-footer">

                    <button
                        type="button"
                        className="service-modal-btn service-modal-btn-secondary"
                        onClick={onClose}
                    >

                        <i className="bi bi-x-lg"></i>

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ServiceDetailsModal;
