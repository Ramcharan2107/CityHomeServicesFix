import { useEffect, useState } from "react";
import notificationService from "../../services/notificationService";
import PageContainer from "../../components/common/PageContainer";

function CustomerNotifications() {

    const [notifications, setNotifications] = useState([]);

    const [unreadCount, setUnreadCount] = useState(0);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        loadNotifications();

    }, []);


    const loadNotifications = async () => {

        try {

            setLoading(true);
            setError("");

            const [notificationData, countData] =
                await Promise.all([
                    notificationService.getAll(),
                    notificationService.getUnreadCount()
                ]);

            setNotifications(
                Array.isArray(notificationData)
                    ? notificationData
                    : []
            );

            setUnreadCount(
                countData?.unreadCount ??
                countData?.UnreadCount ??
                0
            );

        }
        catch (err) {

            console.error(err);

            setError(
                err?.response?.data?.message ||
                "Unable to load notifications."
            );

        }
        finally {

            setLoading(false);

        }

    };


    const handleMarkAsRead = async (notificationId) => {

        try {

            await notificationService.markAsRead(
                notificationId
            );

            setNotifications(prev =>
                prev.map(notification =>
                    notification.notificationId === notificationId
                        ? {
                            ...notification,
                            isRead: true
                        }
                        : notification
                )
            );

            setUnreadCount(prev =>
                Math.max(prev - 1, 0)
            );

        }
        catch (err) {

            console.error(err);

        }

    };


    return (

        <section
            style={{
                background: "#FFF8EF",
                minHeight: "calc(100vh - 80px)"
            }}
            className="py-4"
        >

            <PageContainer>

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2
                            className="fw-bold mb-1"
                            style={{
                                color: "#0B2E4F"
                            }}
                        >
                            Notifications
                        </h2>

                        <p className="text-muted mb-0">
                            Stay updated with your service activity.
                        </p>

                    </div>


                    <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                            background: "#F4B400",
                            color: "#0B2E4F",
                            fontSize: "14px"
                        }}
                    >
                        {unreadCount} Unread
                    </span>

                </div>


                {loading && (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border"
                            style={{
                                color: "#F7941D"
                            }}
                        />

                        <p className="mt-3 text-muted">
                            Loading notifications...
                        </p>

                    </div>

                )}


                {!loading && error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}


                {!loading &&
                    !error &&
                    notifications.length === 0 && (

                        <div
                            className="card border-0 shadow-sm text-center"
                            style={{
                                borderRadius: "18px"
                            }}
                        >

                            <div className="card-body py-5">

                                <i
                                    className="bi bi-bell-slash"
                                    style={{
                                        fontSize: "55px",
                                        color: "#F7941D"
                                    }}
                                />

                                <h5
                                    className="fw-bold mt-3"
                                    style={{
                                        color: "#0B2E4F"
                                    }}
                                >
                                    No Notifications
                                </h5>

                                <p className="text-muted mb-0">
                                    You're all caught up.
                                </p>

                            </div>

                        </div>

                    )}


                {!loading &&
                    !error &&
                    notifications.length > 0 && (

                        <div className="d-flex flex-column gap-3">

                            {notifications.map(notification => (

                                <div
                                    key={notification.notificationId}
                                    className="card border-0 shadow-sm"
                                    style={{
                                        borderRadius: "16px",
                                        background:
                                            notification.isRead
                                                ? "#FFFFFF"
                                                : "#FFF7E0",
                                        borderLeft:
                                            notification.isRead
                                                ? "4px solid transparent"
                                                : "4px solid #F7941D"
                                    }}
                                >

                                    <div className="card-body">

                                        <div className="d-flex">

                                            <div
                                                className="me-3 d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: "45px",
                                                    height: "45px",
                                                    minWidth: "45px",
                                                    borderRadius: "12px",
                                                    background: "#FFF1D6",
                                                    color: "#F7941D"
                                                }}
                                            >
                                                <i className="bi bi-bell-fill"></i>
                                            </div>


                                            <div className="flex-grow-1">

                                                <div className="d-flex justify-content-between align-items-start">

                                                    <div>

                                                        <h6
                                                            className="fw-bold mb-1"
                                                            style={{
                                                                color: "#0B2E4F"
                                                            }}
                                                        >
                                                            {notification.title}
                                                        </h6>

                                                        <p className="mb-2 text-muted">
                                                            {notification.message}
                                                        </p>

                                                    </div>

                                                    {!notification.isRead && (

                                                        <span
                                                            className="badge"
                                                            style={{
                                                                background: "#F7941D",
                                                                color: "#FFFFFF"
                                                            }}
                                                        >
                                                            New
                                                        </span>

                                                    )}

                                                </div>


                                                <div className="d-flex justify-content-between align-items-center">

                                                    <small className="text-muted">

                                                        {notification.createdAt
                                                            ? new Date(
                                                                notification.createdAt
                                                            ).toLocaleString("en-IN")
                                                            : ""}

                                                    </small>


                                                    {!notification.isRead && (

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm"
                                                            style={{
                                                                background: "#0B2E4F",
                                                                color: "#FFFFFF"
                                                            }}
                                                            onClick={() =>
                                                                handleMarkAsRead(
                                                                    notification.notificationId
                                                                )
                                                            }
                                                        >
                                                            Mark as read
                                                        </button>

                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

            </PageContainer>

        </section>

    );

}

export default CustomerNotifications;