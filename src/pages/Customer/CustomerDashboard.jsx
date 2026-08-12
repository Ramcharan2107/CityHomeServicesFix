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

import "./CustomerDashboard.css";


function CustomerDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshing, setRefreshing] = useState(false);


    /* =====================================================
       LOAD DASHBOARD
    ===================================================== */

    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async (isRefresh = false) => {

        try {

            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const data =
                await customerDashboardService.getDashboard();

            setDashboard(data);

        }
        catch (err) {

            console.error(err);

            if (err.response) {

                setError(
                    err.response.data?.message ||
                    "Failed to load dashboard."
                );

            } else {

                setError(
                    "Unable to connect to server."
                );

            }

        }
        finally {

            setLoading(false);
            setRefreshing(false);

        }

    };


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <div className="customer-dashboard-loading">

                <div className="dashboard-loading-orb orb-one"></div>
                <div className="dashboard-loading-orb orb-two"></div>

                <div className="dashboard-loader-card">

                    <div className="dashboard-loader-logo">
                        <i className="bi bi-house-heart-fill"></i>
                    </div>

                    <div className="dashboard-spinner"></div>

                    <h5>
                        Preparing your dashboard
                    </h5>

                    <p>
                        Loading your bookings and services...
                    </p>

                </div>

            </div>

        );

    }


    /* =====================================================
       ERROR
    ===================================================== */

    if (error) {

        return (

            <div className="customer-dashboard-error">

                <div className="dashboard-error-card">

                    <div className="dashboard-error-icon">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                    </div>

                    <span className="dashboard-error-label">
                        SOMETHING WENT WRONG
                    </span>

                    <h2>
                        We couldn't load your dashboard
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        className="dashboard-retry-button"
                        onClick={() => loadDashboard()}
                    >
                        <i className="bi bi-arrow-clockwise"></i>
                        Try Again
                    </button>

                </div>

            </div>

        );

    }


    if (!dashboard) {
        return null;
    }


    return (

        <main className="customer-dashboard">

            {/* =================================================
                ANIMATED BACKGROUND
            ================================================= */}

            <div className="customer-dashboard-background">

                <span className="dashboard-bg-circle circle-one"></span>

                <span className="dashboard-bg-circle circle-two"></span>

                <span className="dashboard-bg-circle circle-three"></span>

                <span className="dashboard-grid-pattern"></span>

            </div>


            <PageContainer>

                {/* =================================================
                    WELCOME HEADER
                ================================================= */}

                <section className="customer-welcome-card">

                    <div className="welcome-content">

                        <div className="welcome-label">
                            CUSTOMER DASHBOARD
                        </div>

                        <h1>
                            Your Home,
                            <span> Your Services.</span>
                        </h1>

                        <p>
                            Manage your bookings, discover trusted
                            professionals and take care of your home
                            from one place.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="dashboard-refresh-button"
                        onClick={() => loadDashboard(true)}
                        disabled={refreshing}
                    >

                        <i
                            className={
                                refreshing
                                    ? "bi bi-arrow-repeat dashboard-refresh-spin"
                                    : "bi bi-arrow-clockwise"
                            }
                        ></i>

                        <span>
                            {refreshing
                                ? "Refreshing..."
                                : "Refresh"
                            }
                        </span>

                    </button>

                </section>


                {/* =================================================
                    CUSTOMER HEADER
                ================================================= */}

                <section className="dashboard-section dashboard-header-section">

                    <div className="dashboard-component-card">

                        <DashboardHeader
                            dashboard={dashboard}
                        />

                    </div>

                </section>


                {/* =================================================
                    OVERVIEW
                ================================================= */}

                <section className="dashboard-section">

                    <div className="dashboard-section-heading">

                        <div>

                            <span>
                                OVERVIEW
                            </span>

                            <h2>
                                Your activity at a glance
                            </h2>

                        </div>

                        <div className="section-line"></div>

                    </div>


                    <div className="dashboard-summary-wrapper">

                        <SummaryCards
                            summary={dashboard}
                        />

                    </div>

                </section>


                {/* =================================================
                    MAIN DASHBOARD
                ================================================= */}

                <section className="dashboard-main-grid">


                    {/* =================================================
                        LEFT COLUMN
                    ================================================= */}

                    <div className="dashboard-main-left">


                        {/* UPCOMING BOOKING */}

                        <div className="dashboard-panel upcoming-panel">

                            <div className="dashboard-panel-header">

                                <div>

                                    <span className="panel-label">
                                        NEXT SERVICE
                                    </span>

                                    <h3>
                                        Upcoming Booking
                                    </h3>

                                    <p>
                                        Your next scheduled service
                                    </p>

                                </div>


                                <div className="dashboard-panel-icon orange-icon">

                                    <i className="bi bi-calendar-check-fill"></i>

                                </div>

                            </div>


                            <div className="dashboard-panel-body">

                                <UpcomingBooking
                                    booking={
                                        dashboard.upcomingBooking
                                    }
                                />

                            </div>

                        </div>


                        {/* RECENT BOOKINGS */}

                        <div className="dashboard-panel">

                            <div className="dashboard-panel-header">

                                <div>

                                    <span className="panel-label">
                                        ACTIVITY
                                    </span>

                                    <h3>
                                        Recent Bookings
                                    </h3>

                                    <p>
                                        Your latest service activity
                                    </p>

                                </div>


                                <div className="dashboard-panel-icon navy-icon">

                                    <i className="bi bi-clock-history"></i>

                                </div>

                            </div>


                            <div className="dashboard-panel-body">

                                <RecentBookings
                                    bookings={
                                        dashboard.recentBookings
                                    }
                                />

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        RIGHT COLUMN
                    ================================================= */}

                    <div className="dashboard-main-right">


                        {/* QUICK ACTIONS */}

                        <div className="dashboard-panel quick-actions-panel">

                            <div className="dashboard-panel-header">

                                <div>

                                    <span className="panel-label">
                                        SHORTCUTS
                                    </span>

                                    <h3>
                                        Quick Actions
                                    </h3>

                                    <p>
                                        Manage your services quickly
                                    </p>

                                </div>


                                <div className="dashboard-panel-icon yellow-icon">

                                    <i className="bi bi-lightning-charge-fill"></i>

                                </div>

                            </div>


                            <div className="dashboard-panel-body">

                                <QuickActions />

                            </div>

                        </div>


                        {/* NOTIFICATIONS */}

                        <div className="dashboard-panel">

                            <div className="dashboard-panel-header">

                                <div>

                                    <span className="panel-label">
                                        UPDATES
                                    </span>

                                    <h3>
                                        Notifications
                                    </h3>

                                    <p>
                                        Latest updates for you
                                    </p>

                                </div>


                                <div className="dashboard-panel-icon notification-icon">

                                    <i className="bi bi-bell-fill"></i>

                                </div>

                            </div>


                            <div className="dashboard-panel-body">

                                <Notifications
                                    notifications={
                                        dashboard.notifications
                                    }
                                />

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    RECOMMENDED SERVICES
                ================================================= */}

                <section className="dashboard-panel recommended-panel">

                    <div className="dashboard-panel-header">

                        <div>

                            <span className="panel-label">
                                DISCOVER
                            </span>

                            <h3>
                                Recommended Services
                            </h3>

                            <p>
                                Services that may be useful for your home
                            </p>

                        </div>


                        <div className="recommended-badge">

                            <i className="bi bi-stars"></i>

                            Recommended

                        </div>

                    </div>


                    <div className="dashboard-panel-body">

                        <RecommendedServices
                            services={
                                dashboard.recommendedServices
                            }
                        />

                    </div>

                </section>


                {/* =================================================
                    BOTTOM CTA
                ================================================= */}

                <section className="dashboard-bottom-cta">

                    <div className="cta-icon">

                        <i className="bi bi-house-heart-fill"></i>

                    </div>


                    <div className="cta-content">

                        <span>
                            NEED SOMETHING FIXED?
                        </span>

                        <h3>
                            Book a professional for your home.
                        </h3>

                        <p>
                            Choose from trusted professionals and
                            schedule your service at your convenience.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="dashboard-cta-button"
                        onClick={() => {
                            window.location.href = "/services";
                        }}
                    >

                        Book a Service

                        <i className="bi bi-arrow-right"></i>

                    </button>

                </section>

            </PageContainer>

        </main>

    );

}


export default CustomerDashboard;