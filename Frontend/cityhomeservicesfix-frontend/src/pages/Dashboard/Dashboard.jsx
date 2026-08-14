import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDashboard } from "../../services/dashboardService";

import DashboardCard from "../../components/ui/DashboardCard";
import PageToolbar from "../../components/ui/PageToolbar";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import PrimaryButton from "../../components/ui/PrimaryButton";
import AccentButton from "../../components/ui/AccentButton";

import { colors } from "../../theme/colors";
import "./Dashboard.css";
const getLoggedInUserName = () => {
    try {
        const possibleTokenKeys = ["token", "authToken", "accessToken", "jwt", "userToken"];
        let token = null;

        for (const key of possibleTokenKeys) {
            token = localStorage.getItem(key);
            if (token) break;
        }

        if (!token) {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                if (value && value.split(".").length === 3) {
                    token = value;
                    break;
                }
            }
        }

        if (!token) return "Administrator";

        const payloadPart = token.split(".")[1];
        const normalized = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
        const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
        const payload = JSON.parse(atob(padded));

        return (
            payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
            payload.name ||
            payload.unique_name ||
            payload.userName ||
            payload.username ||
            "Administrator"
        );
    } catch (error) {
        console.error("Unable to read logged-in administrator:", error);
        return "Administrator";
    }
};



function Dashboard() {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modal, setModal] = useState(null);
    const [adminName] = useState(getLoggedInUserName());

    useEffect(() => {
        loadDashboard();
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setModal(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        document.body.style.overflow = modal ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [modal]);

    const loadDashboard = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getDashboard();
            setDashboard(response);
        } catch (err) {
            console.error(err);

            setError(
                err?.response
                    ? `API Error : ${err.response.status}`
                    : "Unable to connect to backend."
            );
        } finally {
            setLoading(false);
        }
    };

    const openModal = ({
        title,
        subtitle = "",
        icon = "bi bi-info-circle-fill",
        color = colors.primary,
        content
    }) => {
        setModal({
            title,
            subtitle,
            icon,
            color,
            content
        });
    };

    const closeModal = () => setModal(null);

    const technicianPercentage =
        dashboard?.totalTechnicians === 0
            ? 0
            : Math.round(
                  (dashboard?.availableTechnicians * 100) /
                      dashboard?.totalTechnicians
              );

    const busyPercentage = 100 - technicianPercentage;

    const quickActions = [
        {
            title: "Customers",
            description: "Manage customer accounts",
            icon: "bi bi-people-fill",
            color: colors.primary,
            path: "/customers"
        },
        {
            title: "Technicians",
            description: "Manage service workforce",
            icon: "bi bi-person-workspace",
            color: colors.success,
            path: "/technicians"
        },
        {
            title: "Services",
            description: "Manage available services",
            icon: "bi bi-tools",
            color: colors.accent,
            path: "/services"
        },
        {
            title: "Assignments",
            description: "Manage job assignments",
            icon: "bi bi-diagram-3-fill",
            color: colors.warning,
            path: "/job-assignments"
        },
        {
            title: "Reports",
            description: "View final reports",
            icon: "bi bi-file-earmark-text",
            color: colors.primaryDark,
            path: "/final-reports"
        },
        {
            title: "Notifications",
            description: "Review system alerts",
            icon: "bi bi-bell-fill",
            color: colors.danger,
            path: "/notifications"
        }
    ];

    const showMetricDetails = (title, value, description, icon, color) => {
        openModal({
            title,
            icon,
            color,
            subtitle: "Current dashboard information",
            content: (
                <div className="admin-modal-stat">
                    <div
                        className="admin-modal-stat-icon"
                        style={{ background: color }}
                    >
                        <i className={icon}></i>
                    </div>

                    <div>
                        <span>{description}</span>
                        <strong>{value}</strong>
                    </div>
                </div>
            )
        });
    };

    if (loading) {
        return <LoadingSpinner text="Loading Dashboard..." />;
    }

    if (error) {
        return (
            <div className="admin-dashboard-page">
                <div className="admin-error-card">
                    <div className="admin-error-icon">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                    </div>

                    <h3>Dashboard unavailable</h3>
                    <p>{error}</p>

                    <button
                        type="button"
                        className="admin-action-button admin-action-primary"
                        onClick={loadDashboard}
                    >
                        <i className="bi bi-arrow-clockwise"></i>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-page">
            {/* PAGE TOOLBAR */}
            <PageToolbar
                title="Dashboard"
                subtitle="Manage your City Home Services platform."
                onRefresh={loadDashboard}
            />

            {/* HERO */}
            <section className="admin-hero">
                <div className="admin-hero-content">
                    <span className="admin-hero-badge">
                        <i className="bi bi-shield-check"></i>
                        Administrator Panel
                    </span>

                    <h1>{adminName} 👋</h1>

                    <p>
                        Manage customers, technicians, service requests,
                        reports, and notifications from one modern dashboard.
                    </p>

                    <div className="admin-hero-actions">
                        <AccentButton
                            icon="bi bi-speedometer2"
                            onClick={() =>
                                openModal({
                                    title: "Dashboard Overview",
                                    subtitle:
                                        "Your platform at a glance",
                                    icon: "bi bi-speedometer2",
                                    color: colors.accent,
                                    content: (
                                        <div className="admin-overview-grid">
                                            <div>
                                                <span>Customers</span>
                                                <strong>
                                                    {dashboard.totalCustomers}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>Technicians</span>
                                                <strong>
                                                    {dashboard.totalTechnicians}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>Requests</span>
                                                <strong>
                                                    {dashboard.totalRequests}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>Services</span>
                                                <strong>
                                                    {dashboard.totalServices}
                                                </strong>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        >
                            Dashboard Overview
                        </AccentButton>

                        <PrimaryButton
                            icon="bi bi-file-earmark-text"
                            onClick={() => navigate("/final-reports")}
                        >
                            Reports
                        </PrimaryButton>
                    </div>
                </div>

                <div className="admin-hero-art" aria-hidden="true">
                    <i className="bi bi-buildings"></i>
                </div>
            </section>

            {/* MAIN STATS */}
            <section className="admin-stats-grid">
                <button
                    type="button"
                    className="admin-stat-button"
                    onClick={() =>
                        openModal({
                            title: "Customers",
                            subtitle: "Customer account information",
                            icon: "bi bi-people-fill",
                            color: colors.primary,
                            content: (
                                <div className="admin-detail-grid">
                                    <div className="admin-detail-card">
                                        <span>Total Customers</span>
                                        <strong>{dashboard.totalCustomers}</strong>
                                        <small>Registered customer accounts</small>
                                    </div>
                                    <div className="admin-detail-card">
                                        <span>Account Type</span>
                                        <strong>Customer</strong>
                                        <small>Platform users</small>
                                    </div>
                                    <div className="admin-detail-card">
                                        <span>Service Requests</span>
                                        <strong>{dashboard.totalRequests}</strong>
                                        <small>Requests created on the platform</small>
                                    </div>
                                    <div className="admin-detail-card">
                                        <span>Account Management</span>
                                        <strong>Available</strong>
                                        <small>Manage accounts from Profiles</small>
                                    </div>
                                </div>
                            )
                        })
                    }
                >
                    <DashboardCard
                        title="Customers"
                        value={dashboard.totalCustomers}
                        icon="bi bi-people-fill"
                        color={colors.primary}
                        subtitle="Registered Users"
                    />
                </button>

                <button
                    type="button"
                    className="admin-stat-button"
                    onClick={() =>
                        openModal({
                            title: "Technicians",
                            subtitle: "Technician workforce information",
                            icon: "bi bi-person-workspace",
                            color: colors.success,
                            content: (
                                <div className="admin-detail-grid">
                                    <div className="admin-detail-card">
                                        <span>Total Technicians</span>
                                        <strong>{dashboard.totalTechnicians}</strong>
                                        <small>Registered service technicians</small>
                                    </div>
                                    <div className="admin-detail-card">
                                        <span>Available</span>
                                        <strong>{dashboard.availableTechnicians}</strong>
                                        <small>Currently available technicians</small>
                                    </div>
                                    <div className="admin-detail-card">
                                        <span>Busy</span>
                                        <strong>{dashboard.totalTechnicians - dashboard.availableTechnicians}</strong>
                                        <small>Currently unavailable or assigned</small>
                                    </div>
                                    <div className="admin-detail-card">
                                        <span>Availability</span>
                                        <strong>{technicianPercentage}%</strong>
                                        <small>Current workforce availability</small>
                                    </div>
                                </div>
                            )
                        })
                    }
                >
                    <DashboardCard
                        title="Technicians"
                        value={dashboard.totalTechnicians}
                        icon="bi bi-person-workspace"
                        color={colors.success}
                        subtitle="Workforce"
                    />
                </button>

                <button
                    type="button"
                    className="admin-stat-button"
                    onClick={() =>
                        openModal({
                            title: "Service Requests",
                            subtitle: "Complete service request overview",
                            icon: "bi bi-tools",
                            color: colors.accent,
                            content: (
                                <div className="admin-detail-grid">
                                    <div className="admin-detail-card request-pending">
                                        <span>Pending</span>
                                        <strong>{dashboard.pendingRequests}</strong>
                                        <small>Waiting for action</small>
                                    </div>
                                    <div className="admin-detail-card request-assigned">
                                        <span>Assigned</span>
                                        <strong>{dashboard.assignedRequests}</strong>
                                        <small>Currently assigned</small>
                                    </div>
                                    <div className="admin-detail-card request-completed">
                                        <span>Completed</span>
                                        <strong>{dashboard.completedRequests}</strong>
                                        <small>Successfully completed</small>
                                    </div>
                                    <div className="admin-detail-card request-total">
                                        <span>Total Requests</span>
                                        <strong>{dashboard.totalRequests}</strong>
                                        <small>All service requests</small>
                                    </div>
                                </div>
                            )
                        })
                    }
                >
                    <DashboardCard
                        title="Requests"
                        value={dashboard.totalRequests}
                        icon="bi bi-tools"
                        color={colors.accent}
                        subtitle="Service Requests"
                    />
                </button>

                <button
                    type="button"
                    className="admin-stat-button"
                    onClick={() =>
                        showMetricDetails(
                            "Notifications",
                            dashboard.totalNotifications,
                            "Total system notifications",
                            "bi bi-bell-fill",
                            colors.danger
                        )
                    }
                >
                    <DashboardCard
                        title="Notifications"
                        value={dashboard.totalNotifications}
                        icon="bi bi-bell-fill"
                        color={colors.danger}
                        subtitle="System Alerts"
                    />
                </button>
            </section>

            {/* REQUEST OVERVIEW + SYSTEM SUMMARY */}
            <section className="admin-content-grid admin-content-grid-main">
                <div className="admin-panel">
                    <div className="admin-panel-header">
                        <div>
                            <span className="admin-section-eyebrow">
                                SERVICE MANAGEMENT
                            </span>
                            <h2>Service Request Overview</h2>
                        </div>

                        <button
                            type="button"
                            className="admin-icon-button"
                            title="View request summary"
                            onClick={() =>
                                openModal({
                                    title: "Service Request Overview",
                                    subtitle:
                                        "Current request distribution",
                                    icon: "bi bi-tools",
                                    color: colors.accent,
                                    content: (
                                        <div className="admin-overview-grid">
                                            <div>
                                                <span>Pending</span>
                                                <strong>
                                                    {dashboard.pendingRequests}
                                                </strong>
                                            </div>
                                            <div>
                                                <span>Assigned</span>
                                                <strong>
                                                    {dashboard.assignedRequests}
                                                </strong>
                                            </div>
                                            <div>
                                                <span>Completed</span>
                                                <strong>
                                                    {dashboard.completedRequests}
                                                </strong>
                                            </div>
                                            <div>
                                                <span>Total</span>
                                                <strong>
                                                    {dashboard.totalRequests}
                                                </strong>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        >
                            <i className="bi bi-arrow-up-right"></i>
                        </button>
                    </div>

                    <div className="admin-mini-stats">
                        <button
                            type="button"
                            className="admin-mini-stat"
                            onClick={() =>
                                showMetricDetails(
                                    "Pending Requests",
                                    dashboard.pendingRequests,
                                    "Requests waiting for action",
                                    "bi bi-hourglass-split",
                                    colors.warning
                                )
                            }
                        >
                            <span
                                className="admin-mini-stat-icon"
                                style={{
                                    background: `${colors.warning}18`,
                                    color: colors.warning
                                }}
                            >
                                <i className="bi bi-hourglass-split"></i>
                            </span>
                            <span>
                                <small>Pending</small>
                                <strong>{dashboard.pendingRequests}</strong>
                                <em>Waiting</em>
                            </span>
                            <i className="bi bi-chevron-right"></i>
                        </button>

                        <button
                            type="button"
                            className="admin-mini-stat"
                            onClick={() =>
                                showMetricDetails(
                                    "Assigned Requests",
                                    dashboard.assignedRequests,
                                    "Requests currently in progress",
                                    "bi bi-person-check-fill",
                                    colors.primary
                                )
                            }
                        >
                            <span
                                className="admin-mini-stat-icon"
                                style={{
                                    background: `${colors.primary}18`,
                                    color: colors.primary
                                }}
                            >
                                <i className="bi bi-person-check-fill"></i>
                            </span>
                            <span>
                                <small>Assigned</small>
                                <strong>{dashboard.assignedRequests}</strong>
                                <em>In Progress</em>
                            </span>
                            <i className="bi bi-chevron-right"></i>
                        </button>

                        <button
                            type="button"
                            className="admin-mini-stat"
                            onClick={() =>
                                showMetricDetails(
                                    "Completed Requests",
                                    dashboard.completedRequests,
                                    "Finished service requests",
                                    "bi bi-check-circle-fill",
                                    colors.success
                                )
                            }
                        >
                            <span
                                className="admin-mini-stat-icon"
                                style={{
                                    background: `${colors.success}18`,
                                    color: colors.success
                                }}
                            >
                                <i className="bi bi-check-circle-fill"></i>
                            </span>
                            <span>
                                <small>Completed</small>
                                <strong>{dashboard.completedRequests}</strong>
                                <em>Finished</em>
                            </span>
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>
                </div>

                <div className="admin-panel">
                    <div className="admin-panel-header">
                        <div>
                            <span className="admin-section-eyebrow">
                                PLATFORM
                            </span>
                            <h2>System Summary</h2>
                        </div>
                    </div>

                    <div className="admin-summary-list">
                        {[
                            {
                                label: "Total Services",
                                value: dashboard.totalServices,
                                icon: "bi bi-tools",
                                color: colors.accent
                            },
                            {
                                label: "Categories",
                                value: dashboard.totalCategories,
                                icon: "bi bi-grid-fill",
                                color: colors.primary
                            },
                            {
                                label: "Final Reports",
                                value: dashboard.totalReports,
                                icon: "bi bi-file-earmark-check-fill",
                                color: colors.success
                            },
                            {
                                label: "Unread Notifications",
                                value: dashboard.unreadNotifications,
                                icon: "bi bi-bell-fill",
                                color: colors.danger
                            }
                        ].map((item) => (
                            <button
                                key={item.label}
                                type="button"
                                className="admin-summary-row"
                                onClick={() =>
                                    showMetricDetails(
                                        item.label,
                                        item.value,
                                        item.label,
                                        item.icon,
                                        item.color
                                    )
                                }
                            >
                                <span
                                    className="admin-summary-icon"
                                    style={{
                                        background: `${item.color}15`,
                                        color: item.color
                                    }}
                                >
                                    <i className={item.icon}></i>
                                </span>

                                <span className="admin-summary-label">
                                    {item.label}
                                </span>

                                <strong
                                    style={{
                                        color:
                                            item.label ===
                                            "Unread Notifications"
                                                ? colors.danger
                                                : colors.primary
                                    }}
                                >
                                    {item.value}
                                </strong>

                                <i className="bi bi-chevron-right"></i>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* QUICK ACTIONS */}
            <section className="admin-panel admin-quick-actions">
                <div className="admin-panel-header">
                    <div>
                        <span className="admin-section-eyebrow">
                            ADMINISTRATION
                        </span>
                        <h2>Quick Actions</h2>
                        <p>Open any administration module.</p>
                    </div>
                </div>

                <div className="admin-quick-grid">
                    {quickActions.map((item) => (
                        <button
                            type="button"
                            key={item.title}
                            className="admin-quick-card"
                            onClick={() => navigate(item.path)}
                        >
                            <span
                                className="admin-quick-icon"
                                style={{
                                    background: item.color
                                }}
                            >
                                <i className={item.icon}></i>
                            </span>

                            <span className="admin-quick-copy">
                                <strong>{item.title}</strong>
                                <small>{item.description}</small>
                            </span>

                            <i className="bi bi-arrow-up-right admin-quick-arrow"></i>
                        </button>
                    ))}
                </div>
            </section>

            {/* TECHNICIAN AVAILABILITY + ACTIVITY */}
            <section className="admin-content-grid admin-content-grid-bottom">
                <div className="admin-panel">
                    <div className="admin-panel-header">
                        <div>
                            <span className="admin-section-eyebrow">
                                WORKFORCE
                            </span>
                            <h2>Technician Availability</h2>
                        </div>

                        <button
                            type="button"
                            className="admin-icon-button"
                            title="View technician availability"
                            onClick={() =>
                                openModal({
                                    title: "Technician Availability",
                                    subtitle: "Current workforce status",
                                    icon: "bi bi-person-workspace",
                                    color: colors.success,
                                    content: (
                                        <>
                                            <div className="admin-availability-large">
                                                <div>
                                                    <span>Available</span>
                                                    <strong>
                                                        {
                                                            dashboard.availableTechnicians
                                                        }
                                                    </strong>
                                                </div>

                                                <div>
                                                    <span>Busy</span>
                                                    <strong>
                                                        {dashboard.totalTechnicians -
                                                            dashboard.availableTechnicians}
                                                    </strong>
                                                </div>

                                                <div>
                                                    <span>Total</span>
                                                    <strong>
                                                        {
                                                            dashboard.totalTechnicians
                                                        }
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="admin-progress">
                                                <span
                                                    style={{
                                                        width: `${technicianPercentage}%`,
                                                        background:
                                                            colors.success
                                                    }}
                                                ></span>
                                            </div>

                                            <div className="admin-progress-labels">
                                                <span>
                                                    {technicianPercentage}%
                                                    Available
                                                </span>
                                                <span>
                                                    {busyPercentage}% Busy
                                                </span>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        >
                            <i className="bi bi-arrow-up-right"></i>
                        </button>
                    </div>

                    <button
                        type="button"
                        className="admin-availability-row"
                        onClick={() =>
                            showMetricDetails(
                                "Available Technicians",
                                dashboard.availableTechnicians,
                                "Technicians currently available",
                                "bi bi-person-check-fill",
                                colors.success
                            )
                        }
                    >
                        <div>
                            <span
                                className="admin-availability-icon"
                                style={{
                                    background: `${colors.success}15`,
                                    color: colors.success
                                }}
                            >
                                <i className="bi bi-person-check-fill"></i>
                            </span>

                            <span>
                                <small>Available</small>
                                <strong>
                                    {dashboard.availableTechnicians} /{" "}
                                    {dashboard.totalTechnicians}
                                </strong>
                            </span>
                        </div>

                        <span className="admin-status-pill available">
                            {technicianPercentage}%
                        </span>
                    </button>

                    <div className="admin-progress">
                        <span
                            style={{
                                width: `${technicianPercentage}%`,
                                background: colors.success
                            }}
                        ></span>
                    </div>

                    <button
                        type="button"
                        className="admin-availability-row"
                        onClick={() =>
                            showMetricDetails(
                                "Busy Technicians",
                                dashboard.totalTechnicians -
                                    dashboard.availableTechnicians,
                                "Technicians currently unavailable",
                                "bi bi-person-fill-exclamation",
                                colors.accent
                            )
                        }
                    >
                        <div>
                            <span
                                className="admin-availability-icon"
                                style={{
                                    background: `${colors.accent}15`,
                                    color: colors.accent
                                }}
                            >
                                <i className="bi bi-person-fill-exclamation"></i>
                            </span>

                            <span>
                                <small>Busy</small>
                                <strong>
                                    {dashboard.totalTechnicians -
                                        dashboard.availableTechnicians}
                                </strong>
                            </span>
                        </div>

                        <span className="admin-status-pill busy">
                            {busyPercentage}%
                        </span>
                    </button>
                </div>

                <div className="admin-panel">
                    <div className="admin-panel-header">
                        <div>
                            <span className="admin-section-eyebrow">
                                PLATFORM ACTIVITY
                            </span>
                            <h2>Recent Activity</h2>
                        </div>
                    </div>

                    <div className="admin-activity-list">
                        <button
                            type="button"
                            className="admin-activity-item"
                            onClick={() => navigate("/customers")}
                        >
                            <span
                                className="admin-activity-icon"
                                style={{
                                    background: colors.primary
                                }}
                            >
                                <i className="bi bi-person-plus-fill"></i>
                            </span>

                            <span className="admin-activity-copy">
                                <strong>Customer registrations</strong>
                                <small>
                                    Total Customers:{" "}
                                    {dashboard.totalCustomers}
                                </small>
                            </span>

                            <i className="bi bi-arrow-up-right"></i>
                        </button>

                        <button
                            type="button"
                            className="admin-activity-item"
                            onClick={() =>
                                openModal({
                                    title: "Service Requests",
                                    subtitle: "Request activity summary",
                                    icon: "bi bi-tools",
                                    color: colors.warning,
                                    content: (
                                        <div className="admin-overview-grid">
                                            <div>
                                                <span>Pending</span>
                                                <strong>
                                                    {dashboard.pendingRequests}
                                                </strong>
                                            </div>
                                            <div>
                                                <span>Assigned</span>
                                                <strong>
                                                    {dashboard.assignedRequests}
                                                </strong>
                                            </div>
                                            <div>
                                                <span>Completed</span>
                                                <strong>
                                                    {dashboard.completedRequests}
                                                </strong>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        >
                            <span
                                className="admin-activity-icon"
                                style={{
                                    background: colors.warning
                                }}
                            >
                                <i className="bi bi-tools"></i>
                            </span>

                            <span className="admin-activity-copy">
                                <strong>Service Requests</strong>
                                <small>
                                    Pending: {dashboard.pendingRequests}{" "}
                                    · Completed:{" "}
                                    {dashboard.completedRequests}
                                </small>
                            </span>

                            <i className="bi bi-chevron-right"></i>
                        </button>

                        <button
                            type="button"
                            className="admin-activity-item"
                            onClick={() => navigate("/final-reports")}
                        >
                            <span
                                className="admin-activity-icon"
                                style={{
                                    background: colors.success
                                }}
                            >
                                <i className="bi bi-file-earmark-check-fill"></i>
                            </span>

                            <span className="admin-activity-copy">
                                <strong>Final Reports</strong>
                                <small>
                                    Reports Generated:{" "}
                                    {dashboard.totalReports}
                                </small>
                            </span>

                            <i className="bi bi-arrow-up-right"></i>
                        </button>

                        <button
                            type="button"
                            className="admin-activity-item"
                            onClick={() => navigate("/notifications")}
                        >
                            <span
                                className="admin-activity-icon"
                                style={{
                                    background: colors.danger
                                }}
                            >
                                <i className="bi bi-bell-fill"></i>
                            </span>

                            <span className="admin-activity-copy">
                                <strong>Notifications</strong>
                                <small>
                                    Unread Notifications:{" "}
                                    {dashboard.unreadNotifications}
                                </small>
                            </span>

                            <i className="bi bi-arrow-up-right"></i>
                        </button>
                    </div>
                </div>
            </section>

            {/* MODAL */}
            {modal && (
                <div
                    className="admin-modal-backdrop"
                    onMouseDown={closeModal}
                >
                    <div
                        className="admin-modal"
                        role="dialog"
                        aria-modal="true"
                        onMouseDown={(event) => event.stopPropagation()}
                    >
                        <div className="admin-modal-header">
                            <div className="admin-modal-title">
                                <span
                                    style={{
                                        background: modal.color
                                    }}
                                >
                                    <i className={modal.icon}></i>
                                </span>

                                <div>
                                    <h3>{modal.title}</h3>
                                    {modal.subtitle && (
                                        <p>{modal.subtitle}</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="admin-modal-close"
                                onClick={closeModal}
                                aria-label="Close popup"
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>

                        <div className="admin-modal-body">
                            {modal.content}
                        </div>

                        <div className="admin-modal-footer">
                            <button
                                type="button"
                                className="admin-action-button admin-action-secondary"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;