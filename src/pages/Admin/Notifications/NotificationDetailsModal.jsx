import { useEffect, useState } from "react";

import notificationService from "../../../services/notificationService";

function NotificationDetailsModal({

    show,

    notification,

    onClose

}) {

    const [loading, setLoading] = useState(false);

    const [details, setDetails] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!show || !notification)
            return;

        loadNotification();

    }, [show, notification]);

    const loadNotification = async () => {

        setLoading(true);

        setError("");

        try {

            const data = await notificationService.getById(

                notification.notificationId

            );

            setDetails(data);

        }
        catch (err) {

            console.error(err);

            setError("Failed to load notification.");

        }
        finally {

            setLoading(false);

        }

    };

    const formatDate = (date) => {

        if (!date)
            return "-";

        return new Date(date).toLocaleString("en-IN", {

            day: "2-digit",

            month: "short",

            year: "numeric",

            hour: "2-digit",

            minute: "2-digit"

        });

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

            <div className="modal-dialog modal-lg modal-dialog-centered">

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

                            Notification Details

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

                                <h5 className="mt-3">

                                    Loading Notification...

                                </h5>

                            </div>

                        ) : error ? (

                            <div className="alert alert-danger">

                                {error}

                            </div>

                        ) : (

                            <div className="row g-4">

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

                                                Notification Information

                                            </h5>

                                            <table className="table table-borderless mb-0">

                                                <tbody>

                                                    <tr>

                                                        <th width="35%">

                                                            Notification ID

                                                        </th>

                                                        <td>

                                                            #{details.notificationId}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            User

                                                        </th>

                                                        <td>

                                                            {details.user
                                                                ? `${details.user.firstName} ${details.user.lastName}`
                                                                : "-"}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Title

                                                        </th>

                                                        <td>

                                                            {details.title}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Type

                                                        </th>

                                                        <td>

                                                            {details.notificationType}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Status

                                                        </th>

                                                        <td>

                                                            <span
                                                                className={`badge ${
                                                                    details.isRead
                                                                        ? "bg-success"
                                                                        : "bg-warning text-dark"
                                                                }`}
                                                            >

                                                                {details.isRead
                                                                    ? "Read"
                                                                    : "Unread"}

                                                            </span>

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Created At

                                                        </th>

                                                        <td>

                                                            {formatDate(details.createdAt)}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Read At

                                                        </th>

                                                        <td>

                                                            {formatDate(details.readAt)}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Message

                                                        </th>

                                                        <td>

                                                            <div className="border rounded p-3 bg-light">

                                                                {details.message}

                                                            </div>

                                                        </td>

                                                    </tr>

                                                </tbody>

                                            </table>
                                                                                    </div>

                                    </div>

                                </div>

                            </div>

                        )}

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
                        >

                            <i className="bi bi-x-circle me-2"></i>

                            Close

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default NotificationDetailsModal;