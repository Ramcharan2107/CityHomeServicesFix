import { useEffect, useState } from "react";
import serviceService from "../../../services/serviceService";
import "./ServiceModal.css";

function DeleteServiceModal({
    show,
    service,
    onClose,
    onSuccess
}) {

    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!show) {
            setError("");
            setDeleting(false);
            return undefined;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        const handleKeyDown = (event) => {

            if (
                event.key === "Escape" &&
                !deleting
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

    }, [show, deleting, onClose]);


    if (!show || !service) {
        return null;
    }


    const serviceId =
        service?.serviceId ??
        service?.ServiceId ??
        service?.id;


    const serviceName =
        service?.serviceName ??
        service?.ServiceName ??
        service?.name ??
        "this service";


    const serviceCode =
        service?.serviceCode ??
        service?.ServiceCode ??
        service?.code ??
        "";


    const getErrorMessage = (err) =>
        err?.response?.data?.message ||
        err?.response?.data?.Message ||
        err?.response?.data?.title ||
        err?.message ||
        "Unable to delete service.";


    const handleDelete = async () => {

        if (
            serviceId === null ||
            serviceId === undefined ||
            serviceId === ""
        ) {
            setError(
                "Service ID is missing."
            );
            return;
        }

        try {

            setDeleting(true);
            setError("");

            await serviceService.remove(
                serviceId
            );

            onSuccess?.();

        } catch (err) {

            console.error(
                "DELETE SERVICE ERROR:",
                err
            );

            setError(
                getErrorMessage(err)
            );

        } finally {

            setDeleting(false);

        }

    };


    const handleBackdrop = (event) => {

        if (
            event.target ===
                event.currentTarget &&
            !deleting
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
                className="service-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-service-title"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                <div className="service-modal-header">

                    <div className="service-modal-title">

                        <div
                            className="service-modal-title-icon"
                            style={{
                                background: "#FEF2F2",
                                color: "#DC2626"
                            }}
                        >

                            <i className="bi bi-trash3"></i>

                        </div>

                        <div className="service-modal-title-content">

                            <span
                                className="service-modal-eyebrow"
                                style={{
                                    color: "#DC2626"
                                }}
                            >
                                SERVICE MANAGEMENT
                            </span>

                            <h2 id="delete-service-title">
                                Delete Service
                            </h2>

                            <p>
                                Confirm this permanent action.
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="service-modal-close"
                        onClick={onClose}
                        disabled={deleting}
                        aria-label="Close"
                    >

                        <i className="bi bi-x-lg"></i>

                    </button>

                </div>


                <div className="service-modal-body">

                    <div className="service-delete-icon">

                        <i className="bi bi-exclamation-triangle-fill"></i>

                    </div>


                    <div className="service-delete-content">

                        <h3>
                            Are you sure?
                        </h3>

                        <p>
                            You are about to delete this service.
                            This action cannot be undone.
                        </p>


                        <div className="service-delete-service-name">

                            {serviceName}

                            {serviceCode && (
                                <div
                                    style={{
                                        marginTop: "3px",
                                        color: "#64748B",
                                        fontSize: "11px",
                                        fontWeight: 600
                                    }}
                                >
                                    {serviceCode}
                                </div>
                            )}

                        </div>


                        {error && (

                            <div
                                className="service-modal-error"
                                style={{
                                    marginTop: "14px",
                                    textAlign: "left"
                                }}
                            >

                                <i className="bi bi-exclamation-triangle-fill me-2"></i>

                                {error}

                            </div>

                        )}

                    </div>

                </div>


                <div className="service-modal-footer">

                    <button
                        type="button"
                        className="service-modal-btn service-modal-btn-secondary"
                        onClick={onClose}
                        disabled={deleting}
                    >
                        Cancel
                    </button>


                    <button
                        type="button"
                        className="service-modal-btn service-modal-btn-danger"
                        onClick={handleDelete}
                        disabled={deleting}
                    >

                        {deleting ? (

                            <>
                                <span className="service-modal-spinner"></span>
                                Deleting...
                            </>

                        ) : (

                            <>
                                <i className="bi bi-trash3"></i>
                                Delete Service
                            </>

                        )}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteServiceModal;
