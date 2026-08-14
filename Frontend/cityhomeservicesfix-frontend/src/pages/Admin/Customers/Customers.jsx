import React, { useEffect, useMemo, useState } from "react";
import customerService from "../../../services/customerService";
import api from "../../../services/api";
import "./Customers.css";

function Customers() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [detailsLoading, setDetailsLoading] = useState(false);

    const [error, setError] = useState("");
    const [detailsError, setDetailsError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [showDetails, setShowDetails] = useState(false);

    /*
    ============================================================
    LOAD CUSTOMERS FROM USERS API
    ============================================================
    Customer roleId = 4
    Technician roleId = 3
    Admin roleId = 1
    */

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await customerService.getAll();

            console.log("USERS API RESPONSE:", data);

            const customerUsers = Array.isArray(data)
                ? data.filter(
                    user =>
                        Number(user.roleId) === 4 &&
                        user.isDeleted !== true
                )
                : [];

            console.log(
                "CUSTOMER USERS:",
                customerUsers
            );

            setUsers(customerUsers);

        } catch (error) {

            console.error(
                "Failed to load customers:",
                error
            );

            setUsers([]);

            setError(
                error?.response?.data?.message ||
                error?.response?.data?.Message ||
                `Unable to load customers. API status: ${
                    error?.response?.status || "Unknown"
                }`
            );

        } finally {

            setLoading(false);

        }
    };


    /*
    ============================================================
    HELPERS
    ============================================================
    */

    const getName = (user) => {

        const firstName =
            user?.firstName || "";

        const lastName =
            user?.lastName || "";

        const name =
            `${firstName} ${lastName}`.trim();

        return name || "Customer";

    };


    const getInitials = (user) => {

        const name = getName(user);

        return name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(
                part =>
                    part.charAt(0).toUpperCase()
            )
            .join("");

    };


    const getEmail = (user) => {

        return user?.email || "—";

    };


    const getPhone = (user) => {

        return user?.phoneNumber || "—";

    };


    const getUsername = (user) => {

        return user?.userName || "—";

    };


    const getUserId = (user) => {

        return user?.userId ?? null;

    };


    const isActive = (user) => {

        return (
            user?.isActive === true &&
            user?.isDeleted !== true
        );

    };


    const formatDate = (date) => {

        if (!date) {
            return "—";
        }

        const parsedDate =
            new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "—";
        }

        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    const formatDateTime = (date) => {

        if (!date) {
            return "Never";
        }

        const parsedDate =
            new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Never";
        }

        return parsedDate.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


    /*
    ============================================================
    SEARCH + STATUS FILTER
    ============================================================
    */

    const filteredCustomers = useMemo(() => {

        const keyword =
            search.trim().toLowerCase();

        return users.filter(user => {

            const name =
                getName(user).toLowerCase();

            const email =
                getEmail(user).toLowerCase();

            const username =
                getUsername(user).toLowerCase();

            const phone =
                getPhone(user).toLowerCase();

            const userId =
                String(
                    getUserId(user) || ""
                );

            const matchesSearch =
                !keyword ||
                name.includes(keyword) ||
                email.includes(keyword) ||
                username.includes(keyword) ||
                phone.includes(keyword) ||
                userId.includes(keyword);

            const active =
                isActive(user);

            const matchesStatus =
                statusFilter === "All" ||
                (
                    statusFilter === "Active" &&
                    active
                ) ||
                (
                    statusFilter === "Inactive" &&
                    !active
                );

            return (
                matchesSearch &&
                matchesStatus
            );

        });

    }, [
        users,
        search,
        statusFilter
    ]);


    /*
    ============================================================
    STATISTICS
    ============================================================
    */

    const totalCustomers =
        users.length;

    const activeCustomers =
        users.filter(
            user => isActive(user)
        ).length;

    const inactiveCustomers =
        users.filter(
            user => !isActive(user)
        ).length;


    /*
    ============================================================
    VIEW CUSTOMER DETAILS
    ============================================================
    */

    const handleViewCustomer = async (user) => {

        const userId =
            getUserId(user);

        if (!userId) {

            setDetailsError(
                "User ID is missing."
            );

            return;

        }

        setSelectedUser(user);
        setShowDetails(true);
        setDetailsError("");
        setDetailsLoading(true);

        try {

            console.log(
                "Loading user details:",
                userId
            );

            const response =
                await customerService.getById(
                    userId
                );

            console.log(
                "USER DETAILS RESPONSE:",
                response.data || response
            );

            const details =
                response?.data || response;

            setSelectedUser({
                ...user,
                ...details
            });

        } catch (error) {

            console.error(
                "Failed to load user details:",
                error
            );

            /*
            Keep the information already
            available from GET /api/Users.
            */

            setSelectedUser(user);

            setDetailsError(
                error?.response?.data?.message ||
                error?.response?.data?.Message ||
                "Additional user details could not be loaded."
            );

        } finally {

            setDetailsLoading(false);

        }

    };


    /*
    ============================================================
    CLOSE DETAILS
    ============================================================
    */

    const closeDetails = () => {

        setShowDetails(false);
        setSelectedUser(null);
        setDetailsError("");

    };


    /*
    ============================================================
    DELETE USER ACCOUNT
    ============================================================
    */

    const handleDelete = async (user) => {

        const userId =
            getUserId(user);

        if (!userId) {

            window.alert(
                "User ID is missing."
            );

            return;

        }

        const name =
            getName(user);

        const confirmed =
            window.confirm(
                `Are you sure you want to delete the account of ${name}?`
            );

        if (!confirmed) {
            return;
        }

        try {

            await customerService.delete(
                userId
            );

            /*
            Remove immediately from UI.
            */

            setUsers(
                previous =>
                    previous.filter(
                        item =>
                            getUserId(item) !==
                            userId
                    )
            );

            if (
                selectedUser &&
                getUserId(selectedUser) === userId
            ) {
                closeDetails();
            }

            window.alert(
                "Customer account deleted successfully."
            );

        } catch (error) {

            console.error(
                "Delete customer error:",
                error
            );

            window.alert(
                error?.response?.data?.message ||
                error?.response?.data?.Message ||
                "Unable to delete customer account."
            );

        }

    };


    /*
    ============================================================
    TOGGLE ACCOUNT STATUS
    ============================================================
    
    NOTE:
    The current Users API has PUT /api/Users/{userId},
    so status changes can be sent through the user update
    endpoint when the backend accepts UpdateUserDto.
    */

    const handleToggleStatus = async (user) => {

        const userId =
            getUserId(user);

        if (!userId) {
            return;
        }

        const currentStatus =
            isActive(user);

        const newStatus =
            !currentStatus;

        const name =
            getName(user);

        const confirmed =
            window.confirm(
                `Are you sure you want to ${
                    newStatus
                        ? "activate"
                        : "deactivate"
                } ${name}'s account?`
            );

        if (!confirmed) {
            return;
        }

        try {

            await customerService.update(
                userId,
                {
                    userId: userId,
                    firstName:
                        user.firstName || "",
                    lastName:
                        user.lastName || "",
                    userName:
                        user.userName || "",
                    email:
                        user.email || "",
                    phoneNumber:
                        user.phoneNumber || null,
                    isActive:
                        newStatus
                }
            );

            setUsers(
                previous =>
                    previous.map(item =>
                        getUserId(item) === userId
                            ? {
                                ...item,
                                isActive:
                                    newStatus
                            }
                            : item
                    )
            );

            if (
                selectedUser &&
                getUserId(selectedUser) === userId
            ) {
                setSelectedUser(
                    previous => ({
                        ...previous,
                        isActive:
                            newStatus
                    })
                );
            }

        } catch (error) {

            console.error(
                "Update customer status error:",
                error
            );

            window.alert(
                error?.response?.data?.message ||
                error?.response?.data?.Message ||
                "Unable to update customer status."
            );

        }

    };


    /*
    ============================================================
    REFRESH
    ============================================================
    */

    const handleRefresh = () => {

        loadCustomers();

    };


    /*
    ============================================================
    RENDER
    ============================================================
    */

    return (

        <div className="admin-customers-page">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="customers-header">

                <div>

                    <h2>
                        Customers
                    </h2>

                    <p>
                        View and manage registered
                        customer accounts.
                    </p>

                </div>

                <button
                    type="button"
                    className="customers-refresh-btn"
                    onClick={handleRefresh}
                    disabled={loading}
                >

                    <i className="bi bi-arrow-clockwise me-2"></i>

                    Refresh

                </button>

            </div>


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (

                <div className="customers-error">

                    <div>

                        <i className="bi bi-exclamation-triangle-fill me-2"></i>

                        {error}

                    </div>

                    <button
                        type="button"
                        onClick={loadCustomers}
                    >
                        Retry
                    </button>

                </div>

            )}


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <div className="customers-stats">

                <div className="customer-stat-card">

                    <div>

                        <span>
                            Total Customers
                        </span>

                        <strong>
                            {totalCustomers}
                        </strong>

                    </div>

                    <div className="customer-stat-icon blue">
                        <i className="bi bi-people-fill"></i>
                    </div>

                </div>


                <div className="customer-stat-card">

                    <div>

                        <span>
                            Active
                        </span>

                        <strong className="green">
                            {activeCustomers}
                        </strong>

                    </div>

                    <div className="customer-stat-icon green-bg">
                        <i className="bi bi-person-check-fill"></i>
                    </div>

                </div>


                <div className="customer-stat-card">

                    <div>

                        <span>
                            Inactive
                        </span>

                        <strong className="red">
                            {inactiveCustomers}
                        </strong>

                    </div>

                    <div className="customer-stat-icon red-bg">
                        <i className="bi bi-person-x-fill"></i>
                    </div>

                </div>

            </div>


            {/* ==================================================
                SEARCH + FILTER
            ================================================== */}

            <div className="customers-filter-card">

                <div className="customers-search">

                    <i className="bi bi-search"></i>

                    <input
                        type="text"
                        placeholder="Search name, username, email, phone..."
                        value={search}
                        onChange={event =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                    {search && (

                        <button
                            type="button"
                            onClick={() =>
                                setSearch("")
                            }
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>

                    )}

                </div>


                <select
                    value={statusFilter}
                    onChange={event =>
                        setStatusFilter(
                            event.target.value
                        )
                    }
                >

                    <option value="All">
                        All Customers
                    </option>

                    <option value="Active">
                        Active
                    </option>

                    <option value="Inactive">
                        Inactive
                    </option>

                </select>

            </div>


            {/* ==================================================
                CUSTOMER TABLE
            ================================================== */}

            <div className="customers-table-card">

                {loading ? (

                    <div className="customers-loading">

                        <div className="spinner-border"></div>

                        <h5>
                            Loading Customers...
                        </h5>

                        <p>
                            Fetching registered customers
                            from the backend.
                        </p>

                    </div>

                ) : filteredCustomers.length === 0 ? (

                    <div className="customers-empty">

                        <i className="bi bi-people"></i>

                        <h4>
                            No Customers Found
                        </h4>

                        <p>
                            There are no registered
                            customer accounts matching
                            your search.
                        </p>

                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="customers-table">

                            <thead>

                                <tr>

                                    <th>
                                        Customer
                                    </th>

                                    <th>
                                        Username
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Last Login
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredCustomers.map(
                                    user => {

                                        const userId =
                                            getUserId(user);

                                        const active =
                                            isActive(user);

                                        return (

                                            <tr
                                                key={
                                                    userId
                                                }
                                            >

                                                {/* CUSTOMER */}

                                                <td>

                                                    <div className="customer-name-cell">

                                                        <div className="customer-avatar">

                                                            {getInitials(
                                                                user
                                                            )}

                                                        </div>

                                                        <div>

                                                            <strong>
                                                                {getName(
                                                                    user
                                                                )}
                                                            </strong>

                                                            <small>
                                                                User ID: {
                                                                    userId ??
                                                                    "—"
                                                                }
                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* USERNAME */}

                                                <td>

                                                    {getUsername(
                                                        user
                                                    )}

                                                </td>


                                                {/* EMAIL */}

                                                <td>

                                                    {getEmail(
                                                        user
                                                    )}

                                                </td>


                                                {/* PHONE */}

                                                <td>

                                                    {getPhone(
                                                        user
                                                    )}

                                                </td>


                                                {/* LAST LOGIN */}

                                                <td>

                                                    {formatDateTime(
                                                        user.lastLogin
                                                    )}

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    <span
                                                        className={
                                                            active
                                                                ? "status-badge active"
                                                                : "status-badge inactive"
                                                        }
                                                    >

                                                        {active
                                                            ? "Active"
                                                            : "Inactive"}

                                                    </span>

                                                </td>


                                                {/* ACTIONS */}

                                                <td>

                                                    <div className="customer-actions">

                                                        <button
                                                            type="button"
                                                            className="view-btn"
                                                            title="View Customer Details"
                                                            onClick={() =>
                                                                handleViewCustomer(
                                                                    user
                                                                )
                                                            }
                                                        >

                                                            <i className="bi bi-eye"></i>

                                                        </button>


                                                        <button
                                                            type="button"
                                                            className={
                                                                active
                                                                    ? "status-btn deactivate"
                                                                    : "status-btn activate"
                                                            }
                                                            title={
                                                                active
                                                                    ? "Deactivate Account"
                                                                    : "Activate Account"
                                                            }
                                                            onClick={() =>
                                                                handleToggleStatus(
                                                                    user
                                                                )
                                                            }
                                                        >

                                                            <i
                                                                className={
                                                                    active
                                                                        ? "bi bi-person-dash"
                                                                        : "bi bi-person-check"
                                                                }
                                                            ></i>

                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="delete-btn"
                                                            title="Delete Account"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user
                                                                )
                                                            }
                                                        >

                                                            <i className="bi bi-trash"></i>

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        );

                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* ==================================================
                CUSTOMER DETAILS MODAL
            ================================================== */}

            {showDetails && selectedUser && (

                <div
                    className="customer-modal-overlay"
                    onClick={closeDetails}
                >

                    <div
                        className="customer-details-modal"
                        onClick={event =>
                            event.stopPropagation()
                        }
                    >

                        {/* MODAL HEADER */}

                        <div className="customer-modal-header">

                            <div>

                                <h3>
                                    Customer Details
                                </h3>

                                <p>
                                    Complete account information
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={closeDetails}
                            >

                                <i className="bi bi-x-lg"></i>

                            </button>

                        </div>


                        {/* MODAL BODY */}

                        <div className="customer-modal-body">

                            {detailsLoading && (

                                <div className="details-loading">

                                    <div className="spinner-border"></div>

                                    <p>
                                        Loading customer details...
                                    </p>

                                </div>

                            )}


                            {detailsError && (

                                <div className="details-warning">

                                    <i className="bi bi-info-circle me-2"></i>

                                    {detailsError}

                                </div>

                            )}


                            {/* PROFILE HEADER */}

                            <div className="customer-profile-summary">

                                <div className="customer-large-avatar">

                                    {getInitials(
                                        selectedUser
                                    )}

                                </div>

                                <div>

                                    <h4>
                                        {getName(
                                            selectedUser
                                        )}
                                    </h4>

                                    <p>
                                        {getUsername(
                                            selectedUser
                                        )}
                                    </p>

                                    <span
                                        className={
                                            isActive(
                                                selectedUser
                                            )
                                                ? "status-badge active"
                                                : "status-badge inactive"
                                        }
                                    >
                                        {isActive(
                                            selectedUser
                                        )
                                            ? "Active Account"
                                            : "Inactive Account"}
                                    </span>

                                </div>

                            </div>


                            {/* ACCOUNT DETAILS */}

                            <div className="details-section">

                                <h5>
                                    <i className="bi bi-person-vcard me-2"></i>
                                    Account Information
                                </h5>

                                <div className="details-grid">

                                    <div>
                                        <label>
                                            User ID
                                        </label>
                                        <strong>
                                            {
                                                selectedUser.userId ??
                                                "—"
                                            }
                                        </strong>
                                    </div>

                                    <div>
                                        <label>
                                            Username
                                        </label>
                                        <strong>
                                            {
                                                selectedUser.userName ||
                                                "—"
                                            }
                                        </strong>
                                    </div>

                                    <div>
                                        <label>
                                            First Name
                                        </label>
                                        <strong>
                                            {
                                                selectedUser.firstName ||
                                                "—"
                                            }
                                        </strong>
                                    </div>

                                    <div>
                                        <label>
                                            Last Name
                                        </label>
                                        <strong>
                                            {
                                                selectedUser.lastName ||
                                                "—"
                                            }
                                        </strong>
                                    </div>

                                </div>

                            </div>


                            {/* CONTACT DETAILS */}

                            <div className="details-section">

                                <h5>
                                    <i className="bi bi-telephone me-2"></i>
                                    Contact Information
                                </h5>

                                <div className="details-grid">

                                    <div>
                                        <label>
                                            Email
                                        </label>
                                        <strong>
                                            {
                                                selectedUser.email ||
                                                "—"
                                            }
                                        </strong>
                                    </div>

                                    <div>
                                        <label>
                                            Phone Number
                                        </label>
                                        <strong>
                                            {
                                                selectedUser.phoneNumber ||
                                                "—"
                                            }
                                        </strong>
                                    </div>

                                </div>

                            </div>


                            {/* ACCOUNT STATUS */}

                            <div className="details-section">

                                <h5>
                                    <i className="bi bi-shield-check me-2"></i>
                                    Account Status
                                </h5>

                                <div className="details-grid">

                                    <div>
                                        <label>
                                            Account Status
                                        </label>

                                        <strong
                                            className={
                                                isActive(
                                                    selectedUser
                                                )
                                                    ? "text-success"
                                                    : "text-danger"
                                            }
                                        >
                                            {
                                                isActive(
                                                    selectedUser
                                                )
                                                    ? "Active"
                                                    : "Inactive"
                                            }
                                        </strong>

                                    </div>

                                    <div>
                                        <label>
                                            Email Verified
                                        </label>

                                        <strong>
                                            {
                                                selectedUser.emailVerified
                                                    ? "Verified"
                                                    : "Not Verified"
                                            }
                                        </strong>

                                    </div>

                                    <div>
                                        <label>
                                            Registered On
                                        </label>

                                        <strong>
                                            {
                                                formatDate(
                                                    selectedUser.createdAt
                                                )
                                            }
                                        </strong>

                                    </div>

                                    <div>
                                        <label>
                                            Last Login
                                        </label>

                                        <strong>
                                            {
                                                formatDateTime(
                                                    selectedUser.lastLogin
                                                )
                                            }
                                        </strong>

                                    </div>

                                </div>

                            </div>


                            {/* ACCOUNT ACTIONS */}

                            <div className="details-section">

                                <h5>
                                    <i className="bi bi-gear me-2"></i>
                                    Account Actions
                                </h5>

                                <div className="modal-actions">

                                    <button
                                        type="button"
                                        className={
                                            isActive(
                                                selectedUser
                                            )
                                                ? "modal-status-btn deactivate"
                                                : "modal-status-btn activate"
                                        }
                                        onClick={() =>
                                            handleToggleStatus(
                                                selectedUser
                                            )
                                        }
                                    >

                                        <i
                                            className={
                                                isActive(
                                                    selectedUser
                                                )
                                                    ? "bi bi-person-dash me-2"
                                                    : "bi bi-person-check me-2"
                                            }
                                        ></i>

                                        {
                                            isActive(
                                                selectedUser
                                            )
                                                ? "Deactivate Account"
                                                : "Activate Account"
                                        }

                                    </button>


                                    <button
                                        type="button"
                                        className="modal-delete-btn"
                                        onClick={() =>
                                            handleDelete(
                                                selectedUser
                                            )
                                        }
                                    >

                                        <i className="bi bi-trash me-2"></i>

                                        Delete Account

                                    </button>

                                </div>

                            </div>

                        </div>


                        {/* MODAL FOOTER */}

                        <div className="customer-modal-footer">

                            <button
                                type="button"
                                onClick={closeDetails}
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

export default Customers;