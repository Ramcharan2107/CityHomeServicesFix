import { useEffect, useState } from "react";

import customerDashboardService from "../../services/customerDashboardService";

import DashboardHeader from "../../components/customer/dashboard/DashboardHeader";
import SummaryCards from "../../components/customer/dashboard/SummaryCards";
import UpcomingBooking from "../../components/customer/dashboard/UpcomingBooking";
import QuickActions from "../../components/customer/dashboard/QuickActions";
import RecentBookings from "../../components/customer/dashboard/RecentBookings";
import Notifications from "../../components/customer/dashboard/Notifications";
import RecommendedServices from "../../components/customer/dashboard/RecommendedServices";

import PageContainer from "../../components/common/PageContainer";

function CustomerDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data =
                await customerDashboardService.getDashboard();

            setDashboard(data);

        }
        catch (err) {

            console.error(err);

            if (err.response) {

                setError(

                    err.response.data?.message ||

                    "Unable to load dashboard."

                );

            }
            else {

                setError(
                    "Unable to connect to server."
                );

            }

        }
        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <section
                className="py-5"
            >

                <PageContainer>

                    <div
                        className="d-flex flex-column justify-content-center align-items-center"
                        style={{
                            minHeight: "80vh"
                        }}
                    >

                        <div
                            className="spinner-border"
                            style={{
                                width: "4rem",
                                height: "4rem",
                                color: "#F7941D"
                            }}
                        ></div>

                        <h2
                            className="fw-bold mt-4"
                            style={{
                                color: "#0B1F3A"
                            }}
                        >
                            Preparing Your Dashboard...
                        </h2>

                        <p className="text-muted">

                            Please wait while we load your bookings.

                        </p>

                    </div>

                </PageContainer>

            </section>

        );

    }

    if (error) {

        return (

            <section
                className="py-5"
                
            >

                <PageContainer>

                    <div
                        className="card border-0"
                        style={{
                            maxWidth: "650px",
                            margin: "60px auto",
                            borderRadius: "22px",
                            boxShadow:
                                "0 15px 40px rgba(0,0,0,.08)"
                        }}
                    >

                        <div className="card-body p-5 text-center">

                            <i
                                className="bi bi-exclamation-circle-fill"
                                style={{
                                    fontSize: "70px",
                                    color: "#dc3545"
                                }}
                            ></i>

                            <h2
                                className="fw-bold mt-4"
                                style={{
                                    color: "#0B1F3A"
                                }}
                            >
                                Something Went Wrong
                            </h2>

                            <p className="text-muted">

                                {error}

                            </p>

                            <button
                                className="btn mt-3"
                                onClick={loadDashboard}
                                style={{
                                    background: "#F7941D",
                                    color: "#fff",
                                    padding: "12px 28px",
                                    borderRadius: "10px",
                                    fontWeight: "600"
                                }}
                            >
                                Reload Dashboard
                            </button>

                        </div>

                    </div>

                </PageContainer>

            </section>

        );

    }

    if (!dashboard) {

        return (

            <PageContainer>

                <div
                    className="alert alert-warning mt-5"
                >

                    Dashboard data not available.

                </div>

            </PageContainer>

        );

    }

    return (

        <section
            className="py-4"
            
        >

            <PageContainer>

                {/* Dashboard Welcome */}

                <div
                    className="card border-0 mb-4"
                    style={{
                        borderRadius: "22px",
                        background:
                            "linear-gradient(135deg,#0B1F3A,#173B63)",
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
                                        background: "#F7941D",
                                        color: "#fff",
                                        padding: "8px 16px"
                                    }}
                                >
                                    CUSTOMER PORTAL
                                </span>

                                <h2 className="fw-bold">

                                    Welcome Back 👋

                                </h2>

                                <p
                                    className="mb-0"
                                    style={{
                                        opacity: ".85"
                                    }}
                                >
                                    Manage your bookings,
                                    track technicians,
                                    view invoices and
                                    discover recommended
                                    home services.
                                </p>

                            </div>

                            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">

                                <div
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        borderRadius: "50%",
                                        background:
                                            "rgba(255,255,255,.15)",
                                        display: "inline-flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "40px"
                                    }}
                                >

                                    <i className="bi bi-person-fill"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                                {/* Summary Cards */}

                <div className="mb-4">

                    <SummaryCards
                        summary={dashboard}
                    />

                </div>

                <div className="row g-4">

                    {/* Left Section */}

                    <div className="col-xl-8">

                        {/* Next Booking */}

                        <div
                            className="card border-0 mb-4"
                            style={{
                                borderRadius: "22px",
                                border: "1.5px solid rgba(11,31,58,.10)",
                                boxShadow: "0 12px 30px rgba(0,0,0,.05)"
                            }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center mb-4">

                                    <div>

                                        <span
                                            className="badge mb-2"
                                            style={{
                                                background: "#F4B400",
                                                color: "#0B1F3A"
                                            }}
                                        >
                                            NEXT SERVICE
                                        </span>

                                        <h3
                                            className="fw-bold mb-0"
                                            style={{
                                                color: "#0B1F3A"
                                            }}
                                        >
                                            Upcoming Booking
                                        </h3>

                                    </div>

                                    <i
                                        className="bi bi-calendar-check-fill"
                                        style={{
                                            fontSize: "45px",
                                            color: "#F7941D"
                                        }}
                                    ></i>

                                </div>

                                <UpcomingBooking
                                    booking={dashboard.upcomingBooking}
                                />

                            </div>

                        </div>

                        {/* Recent Bookings */}

                        <div
                            className="card border-0"
                            style={{
                                borderRadius: "22px",
                                border: "1.5px solid rgba(11,31,58,.10)",
                                boxShadow: "0 12px 30px rgba(0,0,0,.05)"
                            }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center mb-4">

                                    <div>

                                        <h3
                                            className="fw-bold mb-1"
                                            style={{
                                                color: "#0B1F3A"
                                            }}
                                        >
                                            Booking History
                                        </h3>

                                        <small className="text-muted">

                                            View all your recent bookings

                                        </small>

                                    </div>

                                    <button
                                        className="btn btn-outline-warning"
                                    >
                                        View All
                                    </button>

                                </div>

                                <RecentBookings
                                    bookings={dashboard.recentBookings}
                                />

                            </div>

                        </div>

                    </div>

                    {/* Right Section */}

                    <div className="col-xl-4">

                        {/* Quick Actions */}

                        <div
                            className="card border-0 mb-4"
                            style={{
                                borderRadius: "22px",
                                border: "1.5px solid rgba(11,31,58,.10)",
                                boxShadow: "0 12px 30px rgba(0,0,0,.05)"
                            }}
                        >

                            <div className="card-body p-4">

                                <h4
                                    className="fw-bold mb-4"
                                    style={{
                                        color: "#0B1F3A"
                                    }}
                                >
                                    Quick Actions
                                </h4>

                                <QuickActions />

                            </div>

                        </div>

                        {/* Notifications */}

                        <div
                            className="card border-0"
                            style={{
                                borderRadius: "22px",
                                border: "1.5px solid rgba(11,31,58,.10)",
                                boxShadow: "0 12px 30px rgba(0,0,0,.05)"
                            }}
                        >

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center mb-4">

                                    <h4
                                        className="fw-bold mb-0"
                                        style={{
                                            color: "#0B1F3A"
                                        }}
                                    >
                                        Notifications
                                    </h4>

                                    <span
                                        className="badge rounded-pill"
                                        style={{
                                            background: "#F7941D",
                                            color: "#fff"
                                        }}
                                    >
                                        New
                                    </span>

                                </div>

                                <Notifications
                                    notifications={dashboard.notifications}
                                />

                            </div>

                        </div>

                    </div>

                </div>

                {/* Recommended Services */}

                <div className="mt-5">

                    <div
                        className="card border-0"
                        style={{
                            borderRadius: "22px",
                            border: "1.5px solid rgba(11,31,58,.10)",
                            boxShadow: "0 12px 30px rgba(0,0,0,.05)"
                        }}
                    >

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <div>

                                    <span
                                        className="badge mb-2"
                                        style={{
                                            background: "#F4B400",
                                            color: "#0B1F3A"
                                        }}
                                    >
                                        FOR YOU
                                    </span>

                                    <h3
                                        className="fw-bold"
                                        style={{
                                            color: "#0B1F3A"
                                        }}
                                    >
                                        Recommended Services
                                    </h3>

                                </div>

                                <i
                                    className="bi bi-stars"
                                    style={{
                                        fontSize: "38px",
                                        color: "#F7941D"
                                    }}
                                ></i>

                            </div>

                            <RecommendedServices
                                services={dashboard.recommendedServices}
                            />

                        </div>

                    </div>

                </div>
                            </PageContainer>

        </section>

    );

}

export default CustomerDashboard;