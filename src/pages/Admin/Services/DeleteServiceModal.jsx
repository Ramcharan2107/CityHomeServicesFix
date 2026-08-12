import { useState } from "react";
import serviceService from "../../../services/serviceService";

function DeleteServiceModal({

    show,

    service,

    onClose,

    onSuccess

}) {

    const [deleting, setDeleting] = useState(false);

    if (!show || !service)
        return null;

    const handleDelete = async () => {

        setDeleting(true);

        try {

            await serviceService.delete(

                service.serviceId

            );

            onSuccess();

            onClose();

        }
        catch (err) {

            console.error(err);

            alert("Failed to delete service.");

        }
        finally {

            setDeleting(false);

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

            <div className="modal-dialog modal-dialog-centered">

                <div
                    className="modal-content border-0 shadow-lg"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div
                        className="modal-header"
                        style={{
                            background: "#DC3545",
                            color: "#fff"
                        }}
                    >

                        <h4 className="fw-bold mb-0">

                            Delete Service

                        </h4>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                            disabled={deleting}
                        ></button>

                    </div>

                    <div className="modal-body text-center p-4">
                                            <div
                        className="mx-auto mb-4 d-flex justify-content-center align-items-center rounded-circle"
                        style={{
                            width: "100px",
                            height: "100px",
                            background: "#FDECEC"
                        }}
                    >

                        <i
                            className="bi bi-exclamation-triangle-fill"
                            style={{
                                fontSize: "50px",
                                color: "#DC3545"
                            }}
                        ></i>

                    </div>

                    <h3
                        className="fw-bold mb-3"
                        style={{
                            color: "#0B2E4F"
                        }}
                    >

                        Are you sure?

                    </h3>

                    <p
                        className="text-muted mb-4"
                        style={{
                            fontSize: "16px"
                        }}
                    >

                        You are about to permanently delete the following
                        service.

                    </p>

                    <div
                        className="card border shadow-sm text-start"
                        style={{
                            borderRadius: "15px"
                        }}
                    >

                        <div className="card-body">

                            <div className="row">

                                <div className="col-5 fw-semibold">

                                    Service ID

                                </div>

                                <div className="col-7">

                                    #{service.serviceId}

                                </div>

                            </div>

                            <hr />

                            <div className="row">

                                <div className="col-5 fw-semibold">

                                    Service Name

                                </div>

                                <div className="col-7">

                                    {service.serviceName}

                                </div>

                            </div>

                            <hr />

                            <div className="row">

                                <div className="col-5 fw-semibold">

                                    Service Code

                                </div>

                                <div className="col-7">

                                    {service.serviceCode}

                                </div>

                            </div>

                            <hr />

                            <div className="row">

                                <div className="col-5 fw-semibold">

                                    Category

                                </div>

                                <div className="col-7">

                                    {service.categoryName}

                                </div>

                            </div>

                            <hr />

                            <div className="row">

                                <div className="col-5 fw-semibold">

                                    Base Price

                                </div>

                                <div className="col-7">

                                    ₹ {service.basePrice}

                                </div>

                            </div>

                            <hr />

                            <div className="row">

                                <div className="col-5 fw-semibold">

                                    Estimated Hours

                                </div>

                                <div className="col-7">

                                    {service.estimatedHours} hrs

                                </div>

                            </div>

                            <hr />

                            <div className="row">

                                <div className="col-5 fw-semibold">

                                    Status

                                </div>

                                <div className="col-7">

                                    {service.isActive ? (

                                        <span className="badge bg-success">

                                            Active

                                        </span>

                                    ) : (

                                        <span className="badge bg-danger">

                                            Inactive

                                        </span>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="alert alert-warning mt-4 mb-0">

                        <i className="bi bi-exclamation-circle me-2"></i>

                        This action cannot be undone. Deleting this service may
                        affect existing service requests that reference it.

                    </div>
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
                            disabled={deleting}
                        >

                            <i className="bi bi-x-circle me-2"></i>

                            Cancel

                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleDelete}
                            disabled={deleting}
                        >

                            {deleting ? (

                                <>

                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                    ></span>

                                    Deleting...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-trash me-2"></i>

                                    Delete Service

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>);

}

export default DeleteServiceModal;