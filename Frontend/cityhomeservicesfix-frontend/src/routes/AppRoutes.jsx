import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Customers from "../pages/Customers/Customers";

import MainLayout from "../layouts/MainLayout";
import PublicLayout from "../layouts/PublicLayout";
import CustomerLayout from "../layouts/CustomerLayout";

import ProtectedRoute from "./ProtectedRoute";

import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/Booking/ServiceDetails";
import BookService from "../pages/Booking/BookService";
import SelectAddress from "../pages/Booking/SelectAddress";
import ScheduleBooking from "../pages/Booking/ScheduleBooking";
import BookingSummary from "../pages/Booking/BookingSummary";
import PaymentPage from "../pages/Booking/PaymentPage";
import BookingSuccess from "../pages/Booking/BookingSuccess";

import Categories from "../pages/Categories/Categories";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

import CustomerDashboard from "../pages/Customer/CustomerDashboard";
import MyBookings from "../pages/Customer/MyBookings";
import BookingDetails from "../pages/Customer/BookingDetails";
import Addresses from "../pages/Customer/Addresses";
import CustomerProfile from "../pages/Customer/CustomerProfile";

import ServiceRequests from "../pages/ServiceRequests/ServiceRequests";
import ServiceRequestDetails from "../pages/ServiceRequests/ServiceRequestDetails";

import AdminCategories from "../pages/Admin/Categories/Categories";
import AdminServices from "../pages/Admin/Services/Services";
import Technicians from "../pages/Admin/Technicians/Technicians";
import JobAssignments from "../pages/Admin/JobAssignments/JobAssignments";
import JobProgress from "../pages/Admin/JobProgress/JobProgress";
import FinalReports from "../pages/Admin/FinalReports/FinalReports";
import Notifications from "../pages/Admin/Notifications/Notifications";
import Profiles from "../pages/Profiles/Profiles";
import CustomerNotifications from "../pages/Customer/CustomerNotifications";
import CategoryDetails from "../pages/Categories/CategoryDetails";
function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                {/* ================= PUBLIC WEBSITE ================= */}

                <Route element={<PublicLayout />}>

                    <Route
                        path="/"
                        element={<HomePage />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/services"
                        element={<Services />}
                    />

                    <Route
                        path="/categories/:category"
                        element={<CategoryDetails />}
                    />

                    <Route
                        path="/service/:id"
                        element={<ServiceDetails />}
                    />

                    <Route
                        path="/book-service/:id"
                        element={<BookService />}
                    />

                    <Route
                        path="/booking/address/:id"
                        element={<SelectAddress />}
                    />

                    <Route
                        path="/booking/schedule/:id"
                        element={<ScheduleBooking />}
                    />

                    <Route
                        path="/booking/summary/:id"
                        element={<BookingSummary />}
                    />

                    <Route
                        path="/booking/payment/:id"
                        element={<PaymentPage />}
                    />

                    <Route
                        path="/booking/success"
                        element={<BookingSuccess />}
                    />

                    <Route
                        path="/categories"
                        element={<Categories />}
                    />

                    <Route
                        path="/about"
                        element={<About />}
                    />

                    <Route
                        path="/contact"
                        element={<Contact />}
                    />

                </Route>

                {/* ================= CUSTOMER ================= */}

                <Route
                    element={
                        <ProtectedRoute allowedRoles={["Customer"]}>
                            <CustomerLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/customer/dashboard"
                        element={<CustomerDashboard />}
                    />

                    <Route
                        path="/customer/bookings"
                        element={<MyBookings />}
                    />

                    <Route
                        path="/customer/bookings/:id"
                        element={<BookingDetails />}
                    />

                    <Route
                        path="/customer/addresses"
                        element={<Addresses />}
                    />

                    <Route
                        path="/customer/profile"
                        element={<CustomerProfile />}
                    />
                    <Route
                        path="/customer/notifications"
                        element={<CustomerNotifications />}
                    />

                </Route>

                {/* ================= ADMIN ================= */}

                <Route
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/admin/profiles"
                        element={<Profiles />}
                    />

                    <Route
                        path="/customers"
                        element={<Customers />}
                    />

                    <Route
                        path="/service-requests"
                        element={<ServiceRequests />}
                    />

                    <Route
                        path="/service-requests/:id"
                        element={<ServiceRequestDetails />}
                    />
                    <Route
                        path="/admin/categories"
                        element={<AdminCategories />}
                    />
                    <Route
                        path="/admin/services"
                        element={<AdminServices />}
                    />
                    <Route
                        path="/admin/technicians"
                        element={<Technicians />}
                    />
                    <Route
                        path="/admin/job-assignments"
                        element={<JobAssignments />}
                    />
                    <Route
                        path="/admin/job-progress"
                        element={<JobProgress />}
                    />
                    <Route
                        path="/admin/final-reports"
                        element={<FinalReports />}
                    />
                    <Route
                        path="/admin/notifications"
                        element={<Notifications />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;