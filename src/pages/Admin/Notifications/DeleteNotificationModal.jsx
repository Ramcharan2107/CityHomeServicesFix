import { useState } from "react";

import notificationService from "../../../services/notificationService";

function DeleteNotificationModal({

    show,

    notification,

    onClose,

    onSuccess

}) {

    const [deleting, setDeleting] = useState(false);

    if (!show || !notification)
        return null;

    const handleDelete = async () => {

        setDeleting(true);

        try {

            await notificationService.delete(

                notification.notificationId

            );

            alert("Notification deleted successfully.");

            onSuccess();

            onClose();

        }
        catch (err) {

            console.error(err);

            alert("Failed to delete notification.");

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

            <div className="modal-dialog modal-dialog-centered modal-lg">

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

                            Delete Notification

                        </h4>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                            disabled={deleting}
                        ></button>

                    </div>

                    <div className="modal-body p-4">

                        <div
                            className="mx-auto mb-4 d-flex justify-content-center align-items-center rounded-circle"
                            style={{
                                width: "100px",
                                height: "100px",
                                background: "#FDECEC"
                            }}
                        >

                            <i
                                className="bi bi-bell-fill"
                                style={{
                                    fontSize: "48px",
                                    color: "#DC3545"
                                }}
                            ></i>

                        </div>

                        <h3
                            className="fw-bold text-center mb-3"
                            style={{
                                color: "#0B2E4F"
                            }}
                        >

                            Delete Notification?

                        </h3>

                        <p className="text-center text-muted mb-4">

                            This notification will be permanently removed.

                        </p>

                        <div
                            className="card border shadow-sm"
                            style={{
                                borderRadius: "15px"
                            }}
                        >

                            <div className="card-body">

                                <div className="row mb-3">

                                    <div className="col-4 fw-semibold">

                                        Title

                                    </div>

                                    <div className="col-8">

                                        {notification.title}

                                    </div>

                                </div>

                                <hr />

                                <div className="row mb-3">

                                    <div className="col-4 fw-semibold">

                                        User

                                    </div>

                                    <div className="col-8">

                                        {notification.user
                                            ? `${notification.user.firstName} ${notification.user.lastName}`
                                            : "-"}

                                    </div>

                                </div>

                                <hr />

                                <div className="row mb-3">

                                    <div className="col-4 fw-semibold">

                                        Type

                                    </div>

                                    <div className="col-8">

                                        {notification.notificationType}

                                    </div>

                                </div>

                                <hr />

                                <div className="row mb-3">

                                    <div className="col-4 fw-semibold">

                                        Status

                                    </div>

                                    <div className="col-8">

                                        <span
                                            className={`badge ${
                                                notification.isRead
                                                    ? "bg-success"
                                                    : "bg-warning text-dark"
                                            }`}
                                        >

                                            {notification.isRead
                                                ? "Read"
                                                : "Unread"}

                                        </span>

                                    </div>

                                </div>

                                <hr />

                                <div className="row">

                                    <div className="col-4 fw-semibold">

                                        Message

                                    </div>

                                    <div className="col-8">

                                        {notification.message}

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="alert alert-warning mt-4 mb-0">

                            <i className="bi bi-exclamation-triangle me-2"></i>

                            This action cannot be undone. The notification will
                            be permanently removed from the system.

                        </div>
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

                                    Delete Notification

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DeleteNotificationModal;