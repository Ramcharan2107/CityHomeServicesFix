import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getDashboard } from "../../services/dashboardService";

import DashboardCard from "../../components/ui/DashboardCard";
import PageToolbar from "../../components/ui/PageToolbar";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import PrimaryButton from "../../components/ui/PrimaryButton";
import AccentButton from "../../components/ui/AccentButton";

import { colors } from "../../theme/colors";

function Dashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        setLoading(true);

        setError("");

        try {

            const response = await getDashboard();

            setDashboard(response);

        }
        catch (err) {

            console.error(err);

            setError(

                err.response

                    ? `API Error : ${err.response.status}`

                    : "Unable to connect to backend."

            );

        }
        finally {

            setLoading(false);

        }

    };

    if (loading)

        return (

            <LoadingSpinner

                text="Loading Dashboard..."

            />

        );

    if (error)

        return (

            <div className="container mt-5">

                <div className="alert alert-danger">

                    {error}

                </div>

            </div>

        );

    const technicianPercentage =

        dashboard.totalTechnicians === 0

            ? 0

            : Math.round(

                dashboard.availableTechnicians *

                100 /

                dashboard.totalTechnicians

            );

    const busyPercentage =

        100 - technicianPercentage;

    const quickActions = [

        {

            title: "Customers",

            icon: "bi bi-people-fill",

            color: colors.primary,

            path: "/customers"

        },

        {

            title: "Technicians",

            icon: "bi bi-person-workspace",

            color: colors.success,

            path: "/technicians"

        },

        {

            title: "Services",

            icon: "bi bi-tools",

            color: colors.accent,

            path: "/services"

        },

        {

            title: "Assignments",

            icon: "bi bi-diagram-3-fill",

            color: colors.warning,

            path: "/job-assignments"

        },

        {

            title: "Reports",

            icon: "bi bi-file-earmark-text",

            color: colors.primaryDark,

            path: "/final-reports"

        },

        {

            title: "Notifications",

            icon: "bi bi-bell-fill",

            color: colors.danger,

            path: "/notifications"

        }

    ];

    return (

        <>

            <PageToolbar

                title="Dashboard"

                subtitle="Manage your City Home Services platform."

                onRefresh={loadDashboard}

                onAdd={() => navigate("/customers")}

                addText="New Customer"

            />

            <div

                className="card mb-5"

                style={{

                    background:

                        "linear-gradient(135deg,#0B2E4F,#153F68,#F7941D)",

                    color: "#fff",

                    overflow: "hidden"

                }}

            >

                <div className="card-body p-5">

                    <div className="row align-items-center">

                        <div className="col-lg-8">

                            <span

                                className="badge mb-3"

                                style={{

                                    background: "#ffffff22",

                                    color: "#fff",

                                    padding: "10px 18px"

                                }}

                            >

                                Administrator Panel

                            </span>

                            <h1

                                className="fw-bold mb-3"

                                style={{

                                    fontSize: "44px"

                                }}

                            >

                                Welcome Back 👋

                            </h1>

                            <p

                                className="mb-4"

                                style={{

                                    fontSize: "18px",

                                    opacity: .9

                                }}

                            >

                                Manage customers,

                                technicians,

                                service requests,

                                reports,

                                and notifications

                                from one modern dashboard.

                            </p>

                            <div className="d-flex flex-wrap gap-3">

                                <AccentButton

                                    icon="bi bi-speedometer2"

                                    onClick={() =>

                                        navigate("/dashboard")

                                    }

                                >

                                    Dashboard

                                </AccentButton>

                                <PrimaryButton

                                    icon="bi bi-file-earmark-text"

                                    onClick={() =>

                                        navigate("/final-reports")

                                    }

                                >

                                    Reports

                                </PrimaryButton>

                            </div>

                        </div>

                        <div className="col-lg-4 text-center">

                            <i

                                className="bi bi-buildings"

                                style={{

                                    fontSize: "170px",

                                    opacity: .15

                                }}

                            ></i>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row g-4 mb-5">

                <div className="col-xl-3 col-md-6">

                    <DashboardCard

                        title="Customers"

                        value={dashboard.totalCustomers}

                        icon="bi bi-people-fill"

                        color={colors.primary}

                        subtitle="Registered Users"

                    />

                </div>

                <div className="col-xl-3 col-md-6">

                    <DashboardCard

                        title="Technicians"

                        value={dashboard.totalTechnicians}

                        icon="bi bi-person-workspace"

                        color={colors.success}

                        subtitle="Workforce"

                    />

                </div>

                <div className="col-xl-3 col-md-6">

                    <DashboardCard

                        title="Requests"

                        value={dashboard.totalRequests}

                        icon="bi bi-tools"

                        color={colors.accent}

                        subtitle="Service Requests"

                    />

                </div>

                <div className="col-xl-3 col-md-6">

                    <DashboardCard

                        title="Notifications"

                        value={dashboard.totalNotifications}

                        icon="bi bi-bell-fill"

                        color={colors.danger}

                        subtitle="System Alerts"

                    />

                </div>

            </div>
                        <div className="row g-4 mb-5">

                <div className="col-lg-8">

                    <div className="card h-100">

                        <div className="card-body p-4">

                            <h4
                                className="fw-bold mb-4"
                                style={{
                                    color: colors.primary
                                }}
                            >

                                Service Request Overview

                            </h4>

                            <div className="row g-4">

                                <div className="col-md-4">

                                    <DashboardCard

                                        title="Pending"

                                        value={dashboard.pendingRequests}

                                        icon="bi bi-hourglass-split"

                                        color={colors.warning}

                                        subtitle="Waiting"

                                    />

                                </div>

                                <div className="col-md-4">

                                    <DashboardCard

                                        title="Assigned"

                                        value={dashboard.assignedRequests}

                                        icon="bi bi-person-check-fill"

                                        color={colors.primary}

                                        subtitle="In Progress"

                                    />

                                </div>

                                <div className="col-md-4">

                                    <DashboardCard

                                        title="Completed"

                                        value={dashboard.completedRequests}

                                        icon="bi bi-check-circle-fill"

                                        color={colors.success}

                                        subtitle="Finished"

                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="card h-100">

                        <div className="card-body p-4">

                            <h4
                                className="fw-bold mb-4"
                                style={{
                                    color: colors.primary
                                }}
                            >

                                System Summary

                            </h4>

                            <div className="d-flex justify-content-between mb-3">

                                <span>Total Services</span>

                                <strong>

                                    {dashboard.totalServices}

                                </strong>

                            </div>

                            <div className="d-flex justify-content-between mb-3">

                                <span>Categories</span>

                                <strong>

                                    {dashboard.totalCategories}

                                </strong>

                            </div>

                            <div className="d-flex justify-content-between mb-3">

                                <span>Final Reports</span>

                                <strong>

                                    {dashboard.totalReports}

                                </strong>

                            </div>

                            <div className="d-flex justify-content-between">

                                <span>Unread Notifications</span>

                                <strong
                                    style={{
                                        color: colors.danger
                                    }}
                                >

                                    {dashboard.unreadNotifications}

                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card mb-5">

                <div className="card-body p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h4
                                className="fw-bold mb-1"
                                style={{
                                    color: colors.primary
                                }}
                            >

                                Quick Actions

                            </h4>

                            <small
                                style={{
                                    color: colors.muted
                                }}
                            >

                                Jump directly to any module

                            </small>

                        </div>

                    </div>

                    <div className="row g-4">

                        {quickActions.map((item) => (

                            <div
                                key={item.title}
                                className="col-xl-2 col-lg-4 col-md-6"
                            >

                                <div

                                    className="card h-100"

                                    role="button"

                                    onClick={() => navigate(item.path)}

                                    style={{

                                        cursor: "pointer",

                                        transition: ".3s"

                                    }}

                                >

                                    <div className="card-body text-center py-4">

                                        <div

                                            className="mx-auto mb-3 d-flex align-items-center justify-content-center"

                                            style={{

                                                width: 70,

                                                height: 70,

                                                borderRadius: "50%",

                                                background: item.color,

                                                color: "#fff",

                                                fontSize: 28

                                            }}

                                        >

                                            <i className={item.icon}></i>

                                        </div>

                                        <h6
                                            className="fw-bold mb-0"
                                            style={{
                                                color: colors.primary
                                            }}
                                        >

                                            {item.title}

                                        </h6>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>
                        <div className="row g-4">

                <div className="col-lg-5">

                    <div className="card h-100">

                        <div className="card-body p-4">

                            <h4
                                className="fw-bold mb-4"
                                style={{
                                    color: colors.primary
                                }}
                            >

                                Technician Availability

                            </h4>

                            <div className="mb-4">

                                <div className="d-flex justify-content-between mb-2">

                                    <span>Available</span>

                                    <strong>

                                        {dashboard.availableTechnicians}

                                        {" / "}

                                        {dashboard.totalTechnicians}

                                    </strong>

                                </div>

                                <div
                                    className="progress"
                                    style={{
                                        height: 12,
                                        borderRadius: 20
                                    }}
                                >

                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: `${technicianPercentage}%`,
                                            background: colors.success
                                        }}
                                    ></div>

                                </div>

                                <small
                                    style={{
                                        color: colors.muted
                                    }}
                                >

                                    {technicianPercentage}% Available

                                </small>

                            </div>

                            <div>

                                <div className="d-flex justify-content-between mb-2">

                                    <span>Busy</span>

                                    <strong>

                                        {dashboard.totalTechnicians -

                                            dashboard.availableTechnicians}

                                    </strong>

                                </div>

                                <div
                                    className="progress"
                                    style={{
                                        height: 12,
                                        borderRadius: 20
                                    }}
                                >

                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: `${busyPercentage}%`,
                                            background: colors.accent
                                        }}
                                    ></div>

                                </div>

                                <small
                                    style={{
                                        color: colors.muted
                                    }}
                                >

                                    {busyPercentage}% Busy

                                </small>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-7">

                    <div className="card h-100">

                        <div className="card-body p-4">

                            <h4
                                className="fw-bold mb-4"
                                style={{
                                    color: colors.primary
                                }}
                            >

                                Recent Activity

                            </h4>

                            <div className="d-flex align-items-start mb-4">

                                <div
                                    className="me-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: "50%",
                                        background: colors.primary,
                                        color: "#fff"
                                    }}
                                >

                                    <i className="bi bi-person-plus-fill"></i>

                                </div>

                                <div>

                                    <h6 className="fw-bold mb-1">

                                        Customer registrations

                                    </h6>

                                    <small
                                        style={{
                                            color: colors.muted
                                        }}
                                    >

                                        Total Customers :

                                        {" "}

                                        {dashboard.totalCustomers}

                                    </small>

                                </div>

                            </div>

                            <div className="d-flex align-items-start mb-4">

                                <div
                                    className="me-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: "50%",
                                        background: colors.warning,
                                        color: "#fff"
                                    }}
                                >

                                    <i className="bi bi-tools"></i>

                                </div>

                                <div>

                                    <h6 className="fw-bold mb-1">

                                        Service Requests

                                    </h6>

                                    <small
                                        style={{
                                            color: colors.muted
                                        }}
                                    >

                                        Pending :

                                        {" "}

                                        {dashboard.pendingRequests}

                                        {" | "}

                                        Completed :

                                        {" "}

                                        {dashboard.completedRequests}

                                    </small>

                                </div>

                            </div>

                            <div className="d-flex align-items-start mb-4">

                                <div
                                    className="me-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: "50%",
                                        background: colors.success,
                                        color: "#fff"
                                    }}
                                >

                                    <i className="bi bi-file-earmark-check-fill"></i>

                                </div>

                                <div>

                                    <h6 className="fw-bold mb-1">

                                        Final Reports

                                    </h6>

                                    <small
                                        style={{
                                            color: colors.muted
                                        }}
                                    >

                                        Reports Generated :

                                        {" "}

                                        {dashboard.totalReports}

                                    </small>

                                </div>

                            </div>

                            <div className="d-flex align-items-start">

                                <div
                                    className="me-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: "50%",
                                        background: colors.danger,
                                        color: "#fff"
                                    }}
                                >

                                    <i className="bi bi-bell-fill"></i>

                                </div>

                                <div>

                                    <h6 className="fw-bold mb-1">

                                        Notifications

                                    </h6>

                                    <small
                                        style={{
                                            color: colors.muted
                                        }}
                                    >

                                        Unread Notifications :

                                        {" "}

                                        {dashboard.unreadNotifications}

                                    </small>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Dashboard;