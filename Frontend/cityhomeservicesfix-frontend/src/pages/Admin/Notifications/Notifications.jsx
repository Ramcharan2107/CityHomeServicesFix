import { useEffect, useMemo, useState } from "react";

import notificationService from "../../../services/notificationService";

import NotificationDetailsModal from "./NotificationDetailsModal";
import AddNotificationModal from "./AddNotificationModal";
import EditNotificationModal from "./EditNotificationModal";
import DeleteNotificationModal from "./DeleteNotificationModal";

import PageContainer from "../../../components/common/PageContainer";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");

    const [selectedNotification, setSelectedNotification] = useState(null);

    const [showDetails, setShowDetails] = useState(false);

    const [showAdd, setShowAdd] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

        setLoading(true);

        try {

            const data = await notificationService.getAll();

            setNotifications(data);

        }
        catch (err) {

            console.error(err);

        }
        finally {

            setLoading(false);

        }

    };

    const filteredNotifications = useMemo(() => {

        const keyword = search.toLowerCase();

        return notifications.filter(notification => {

            const matchesSearch =

                notification.title?.toLowerCase().includes(keyword)

                ||

                notification.message?.toLowerCase().includes(keyword)

                ||

                notification.user?.firstName?.toLowerCase().includes(keyword)

                ||

                notification.user?.lastName?.toLowerCase().includes(keyword);

            const matchesFilter =

                filter === "All"

                ||

                (filter === "Read" && notification.isRead)

                ||

                (filter === "Unread" && !notification.isRead);

            return matchesSearch && matchesFilter;

        });

    }, [

        notifications,

        search,

        filter

    ]);

    const totalNotifications = notifications.length;

    const readNotifications = notifications.filter(

        x => x.isRead

    ).length;

    const unreadNotifications = notifications.filter(

        x => !x.isRead

    ).length;

    const handleRefresh = () => {

        loadNotifications();

    };

    const handleView = (notification) => {

        setSelectedNotification(notification);

        setShowDetails(true);

    };

    const handleEdit = (notification) => {

        setSelectedNotification(notification);

        setShowEdit(true);

    };

    const handleDelete = (notification) => {

        setSelectedNotification(notification);

        setShowDelete(true);

    };

    const handleAdd = () => {

        setShowAdd(true);

    };
        return (

        <>

            <PageContainer>

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2
                            className="fw-bold mb-1"
                            style={{
                                color: "#0B2E4F"
                            }}
                        >

                            Notifications Management

                        </h2>

                        <p className="text-muted mb-0">

                            Manage user notifications and notification history.

                        </p>

                    </div>

                    <div className="d-flex gap-2">

                        <button
                            className="btn btn-outline-secondary"
                            onClick={handleRefresh}
                        >

                            <i className="bi bi-arrow-clockwise me-2"></i>

                            Refresh

                        </button>

                        <button
                            className="btn"
                            style={{
                                background: "#F7941D",
                                color: "#fff"
                            }}
                            onClick={handleAdd}
                        >

                            <i className="bi bi-plus-circle me-2"></i>

                            Send Notification

                        </button>

                    </div>

                </div>

                <div className="row g-4 mb-4">

                    <div className="col-md-4">

                        <div className="card border shadow-sm">

                            <div className="card-body">

                                <small className="text-muted">

                                    Total Notifications

                                </small>

                                <h2 className="fw-bold mt-2">

                                    {totalNotifications}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card border shadow-sm">

                            <div className="card-body">

                                <small className="text-muted">

                                    Read

                                </small>

                                <h2 className="fw-bold text-success mt-2">

                                    {readNotifications}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card border shadow-sm">

                            <div className="card-body">

                                <small className="text-muted">

                                    Unread

                                </small>

                                <h2 className="fw-bold text-danger mt-2">

                                    {unreadNotifications}

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card border shadow-sm mb-4">

                    <div className="card-body">

                        <div className="row g-3">

                            <div className="col-md-8">

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <i className="bi bi-search"></i>

                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search notifications..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />

                                </div>

                            </div>

                            <div className="col-md-4">

                                <select
                                    className="form-select"
                                    value={filter}
                                    onChange={(e) =>
                                        setFilter(e.target.value)
                                    }
                                >

                                    <option>All</option>

                                    <option>Read</option>

                                    <option>Unread</option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card border shadow-sm">

                    <div className="card-body">

                        {loading ? (

                            <div className="text-center py-5">

                                <div className="spinner-border text-warning"></div>

                            </div>

                        ) : filteredNotifications.length === 0 ? (

                            <div className="text-center py-5">

                                <i
                                    className="bi bi-bell"
                                    style={{
                                        fontSize: "70px",
                                        color: "#CED4DA"
                                    }}
                                ></i>

                                <h4 className="mt-3">

                                    No Notifications Found

                                </h4>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead className="table-light">

                                        <tr>

                                            <th>Title</th>

                                            <th>User</th>

                                            <th>Type</th>

                                            <th>Status</th>

                                            <th>Date</th>

                                            <th width="170">

                                                Actions

                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filteredNotifications.map(notification => (

                                            <tr key={notification.notificationId}>

                                                <td>

                                                    {notification.title}

                                                </td>

                                                <td>

                                                    {notification.user
                                                        ? `${notification.user.firstName} ${notification.user.lastName}`
                                                        : "-"}

                                                </td>

                                                <td>

                                                    {notification.notificationType}

                                                </td>

                                                <td>

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

                                                </td>

                                                <td>

                                                    {new Date(
                                                        notification.createdAt
                                                    ).toLocaleDateString("en-IN")}

                                                </td>

                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() =>
                                                                handleView(notification)
                                                            }
                                                        >

                                                            <i className="bi bi-eye"></i>

                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-outline-warning"
                                                            onClick={() =>
                                                                handleEdit(notification)
                                                            }
                                                        >

                                                            <i className="bi bi-pencil"></i>

                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() =>
                                                                handleDelete(notification)
                                                            }
                                                        >

                                                            <i className="bi bi-trash"></i>

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </PageContainer>

            <NotificationDetailsModal
                show={showDetails}
                notification={selectedNotification}
                onClose={() => {
                    setShowDetails(false);
                    setSelectedNotification(null);
                }}
            />

            <AddNotificationModal
                show={showAdd}
                onClose={() => setShowAdd(false)}
                onSuccess={loadNotifications}
            />

            <EditNotificationModal
                show={showEdit}
                notification={selectedNotification}
                onClose={() => {
                    setShowEdit(false);
                    setSelectedNotification(null);
                }}
                onSuccess={loadNotifications}
            />

            <DeleteNotificationModal
                show={showDelete}
                notification={selectedNotification}
                onClose={() => {
                    setShowDelete(false);
                    setSelectedNotification(null);
                }}
                onSuccess={loadNotifications}
            />

        </>

    );

}

export default Notifications;