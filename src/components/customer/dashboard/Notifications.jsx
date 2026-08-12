function Notifications({ notifications = [] }) {

    const getIcon = (title) => {

        const text = title?.toLowerCase() || "";

        if (text.includes("booking"))
            return {
                icon: "bi-calendar-check-fill",
                color: "#0B5ED7"
            };

        if (text.includes("technician"))
            return {
                icon: "bi-person-check-fill",
                color: "#198754"
            };

        if (text.includes("payment"))
            return {
                icon: "bi-credit-card-fill",
                color: "#F7941D"
            };

        if (text.includes("completed"))
            return {
                icon: "bi-check-circle-fill",
                color: "#6F42C1"
            };

        return {
            icon: "bi-bell-fill",
            color: "#0B2E4F"
        };

    };

    const formatTime = (date) => {

        if (!date)
            return "";

        const created = new Date(date);

        const now = new Date();

        const diff = Math.floor((now - created) / 60000);

        if (diff < 1)
            return "Just now";

        if (diff < 60)
            return `${diff} min ago`;

        if (diff < 1440)
            return `${Math.floor(diff / 60)} hr ago`;

        return created.toLocaleDateString("en-IN");

    };

    return (

        <div
            className="card border-0 shadow-sm h-100"
            style={{
                borderRadius: "20px"
            }}
        >

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <span className="badge bg-primary">

                        {notifications.length}

                    </span>

                </div>

                {notifications.length === 0 ? (

                    <div className="text-center py-5">

                        <i
                            className="bi bi-bell-slash"
                            style={{
                                fontSize: "55px",
                                color: "#CED4DA"
                            }}
                        ></i>

                        <h6 className="mt-3">

                            No Notifications

                        </h6>

                        <p className="text-muted mb-0">

                            You're all caught up.

                        </p>

                    </div>

                ) : (

                    notifications.map((item) => {

                        const details = getIcon(item.title);

                        return (

                            <div
                                key={item.notificationId}
                                className="d-flex mb-4"
                            >

                                <div
                                    className="me-3 d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        borderRadius: "12px",
                                        background: `${details.color}20`
                                    }}
                                >

                                    <i
                                        className={`bi ${details.icon}`}
                                        style={{
                                            color: details.color,
                                            fontSize: "22px"
                                        }}
                                    ></i>

                                </div>

                                <div>

                                    <h6 className="fw-bold mb-1">

                                        {item.title}

                                    </h6>

                                    <small className="text-muted">

                                        {item.message}

                                    </small>

                                    <br />

                                    <small className="text-secondary">

                                        {formatTime(item.createdAt)}

                                    </small>

                                </div>

                            </div>

                        );

                    })

                )}

            </div>

        </div>

    );

}

export default Notifications;