import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../../services/authService";
import customerService from "../../services/customerService";
import technicianService from "../../services/technicianService";
import userService from "../../services/userService";

import AddTechnicianModal from "../Admin/Technicians/AddTechnicianModal";
import EditCustomerModal from "../Customers/EditCustomerModal";
import EditTechnicianModal from "../Admin/Technicians/EditTechnicianModal";

import PageContainer from "../../components/common/PageContainer";

import "./Profiles.css";

const generateUserId = (prefix) =>
    `${prefix}@${Math.floor(100 + Math.random() * 900)}`;

function Profiles() {
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [adminProfile, setAdminProfile] = useState(null);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedAccount, setSelectedAccount] = useState(null);

    const [showAdminCreate, setShowAdminCreate] = useState(false);
    const [showTechnicianCreate, setShowTechnicianCreate] = useState(false);
    const [showCustomerEdit, setShowCustomerEdit] = useState(false);
    const [showTechnicianEdit, setShowTechnicianEdit] = useState(false);

    const [adminForm, setAdminForm] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });

    const [adminSaving, setAdminSaving] = useState(false);
    const [adminError, setAdminError] = useState("");
    const [adminSuccess, setAdminSuccess] = useState("");

    useEffect(() => {
        loadProfiles();
    }, []);

    const loadProfiles = async () => {
        setError("");

        try {
            setLoading(true);

            const [customerData, technicianData, profileData] =
                await Promise.all([
                    customerService.getAll(),
                    technicianService.getAll(),
                    userService.getMyProfile()
                ]);

            setCustomers(Array.isArray(customerData) ? customerData : []);
            setTechnicians(
                Array.isArray(technicianData) ? technicianData : []
            );
            setAdminProfile(profileData);
        } catch (err) {
            console.error(err);
            setError(
                "Some account information could not be loaded. Please refresh and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const refreshProfiles = async () => {
        setRefreshing(true);
        await loadProfiles();
        setRefreshing(false);
    };

    const customerAccounts = useMemo(
        () =>
            customers.map((customer) => ({
                id: `customer-${customer.customerId}`,
                type: "Customer",
                role: "Customer",
                name:
                    `${customer.firstName || ""} ${
                        customer.lastName || ""
                    }`.trim() || "Customer",
                userId: customer.userName || customer.user?.userName || "—",
                email: customer.email || customer.user?.email || "—",
                phone:
                    customer.phoneNumber ||
                    customer.user?.phoneNumber ||
                    "—",
                status: customer.isActive ? "Active" : "Inactive",
                raw: customer
            })),
        [customers]
    );

    const technicianAccounts = useMemo(
        () =>
            technicians.map((technician) => ({
                id: `technician-${technician.technicianId}`,
                type: "Technician",
                role: "Technician",
                name:
                    `${technician.user?.firstName || ""} ${
                        technician.user?.lastName || ""
                    }`.trim() || "Technician",
                userId:
                    technician.user?.userName ||
                    technician.userName ||
                    technician.employeeCode ||
                    "—",
                email: technician.user?.email || technician.email || "—",
                phone:
                    technician.user?.phoneNumber ||
                    technician.phoneNumber ||
                    "—",
                status:
                    technician.isAvailable === false
                        ? "Inactive"
                        : technician.currentStatus || "Available",
                raw: technician
            })),
        [technicians]
    );

    const adminAccounts = useMemo(() => {
        if (!adminProfile) return [];

        return [
            {
                id: `admin-${adminProfile.userId}`,
                type: "Admin",
                role: adminProfile.roleName || "Admin",
                name:
                    `${adminProfile.firstName || ""} ${
                        adminProfile.lastName || ""
                    }`.trim() || "Administrator",
                userId: adminProfile.userName || "—",
                email: adminProfile.email || "—",
                phone: adminProfile.phoneNumber || "—",
                status: "Active",
                raw: adminProfile
            }
        ];
    }, [adminProfile]);

    const allAccounts = useMemo(
        () => [
            ...adminAccounts,
            ...technicianAccounts,
            ...customerAccounts
        ],
        [adminAccounts, technicianAccounts, customerAccounts]
    );

    const filteredAccounts = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return allAccounts.filter((account) => {
            const matchesTab =
                activeTab === "all" ||
                account.type.toLowerCase() === activeTab;

            const matchesSearch =
                !keyword ||
                account.name.toLowerCase().includes(keyword) ||
                account.userId.toLowerCase().includes(keyword) ||
                account.email.toLowerCase().includes(keyword) ||
                account.phone.toLowerCase().includes(keyword);

            const matchesStatus =
                statusFilter === "All" ||
                account.status.toLowerCase() ===
                    statusFilter.toLowerCase();

            return (
                matchesTab &&
                matchesSearch &&
                matchesStatus
            );
        });
    }, [
        allAccounts,
        activeTab,
        search,
        statusFilter
    ]);

    const openAdminCreate = () => {
        setAdminError("");
        setAdminSuccess("");

        setAdminForm({
            firstName: "",
            lastName: "",
            userName: generateUserId("Admin"),
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: ""
        });

        setShowAdminCreate(true);
    };

    const handleAdminChange = (event) => {
        const { name, value } = event.target;

        setAdminForm((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const createAdmin = async (event) => {
        event.preventDefault();

        setAdminError("");
        setAdminSuccess("");

        if (
            !adminForm.firstName.trim() ||
            !adminForm.lastName.trim() ||
            !adminForm.email.trim() ||
            !adminForm.password
        ) {
            setAdminError("Please complete all required fields.");
            return;
        }

        if (
            adminForm.password !==
            adminForm.confirmPassword
        ) {
            setAdminError("Passwords do not match.");
            return;
        }

        try {
            setAdminSaving(true);

            await authService.register({
                firstName: adminForm.firstName.trim(),
                lastName: adminForm.lastName.trim(),
                userName: adminForm.userName,
                email: adminForm.email.trim(),
                phoneNumber: adminForm.phoneNumber.trim(),
                password: adminForm.password,
                roleId: 1
            });

            setAdminSuccess(
                `Admin account created successfully. User ID: ${adminForm.userName}`
            );

            setAdminForm((previous) => ({
                ...previous,
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: ""
            }));
        } catch (err) {
            console.error(err);

            setAdminError(
                err.response?.data?.message ||
                    err.response?.data?.title ||
                    "Unable to create admin account."
            );
        } finally {
            setAdminSaving(false);
        }
    };

    const handleView = (account) => {
        setSelectedAccount(account);
    };

    const handleEdit = (account) => {
        setSelectedAccount(account);

        if (account.type === "Customer") {
            setShowCustomerEdit(true);
        } else if (account.type === "Technician") {
            setShowTechnicianEdit(true);
        }
    };

    const closeDetails = () => {
        setSelectedAccount(null);
    };

    const accountCounts = {
        all: allAccounts.length,
        admin: adminAccounts.length,
        technician: technicianAccounts.length,
        customer: customerAccounts.length
    };

    if (loading) {
        return (
            <PageContainer>
                <div className="profiles-loading">
                    <div className="spinner-border text-warning"></div>
                    <h5>Loading Profiles...</h5>
                    <p>Preparing account management.</p>
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <div className="profiles-page">

                {/* HEADER */}
                <div className="profiles-header">
                    <div>
                        <span className="profiles-eyebrow">
                            ACCOUNT MANAGEMENT
                        </span>

                        <h2>Profiles</h2>

                        <p>
                            View and manage the accounts available in
                            City Home Services.
                        </p>
                    </div>

                    <div className="profiles-header-actions">
                        <button
                            type="button"
                            className="profiles-btn secondary"
                            onClick={refreshProfiles}
                            disabled={refreshing}
                        >
                            <i className="bi bi-arrow-clockwise"></i>
                            {refreshing ? "Refreshing..." : "Refresh"}
                        </button>

                        <button
                            type="button"
                            className="profiles-btn primary"
                            onClick={openAdminCreate}
                        >
                            <i className="bi bi-shield-plus"></i>
                            Create Admin
                        </button>

                        <button
                            type="button"
                            className="profiles-btn accent"
                            onClick={() =>
                                setShowTechnicianCreate(true)
                            }
                        >
                            <i className="bi bi-person-workspace"></i>
                            Create Technician
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="profiles-alert error">
                        <i className="bi bi-exclamation-circle-fill"></i>
                        {error}
                    </div>
                )}

                {/* SUMMARY */}
                <div className="profiles-summary-grid">
                    <button
                        type="button"
                        className="profiles-summary-card"
                        onClick={() => setActiveTab("all")}
                    >
                        <span className="profiles-summary-icon navy">
                            <i className="bi bi-people-fill"></i>
                        </span>
                        <span>
                            <small>Total Accounts</small>
                            <strong>{accountCounts.all}</strong>
                        </span>
                    </button>

                    <button
                        type="button"
                        className="profiles-summary-card"
                        onClick={() => setActiveTab("admin")}
                    >
                        <span className="profiles-summary-icon purple">
                            <i className="bi bi-shield-lock-fill"></i>
                        </span>
                        <span>
                            <small>Admins</small>
                            <strong>{accountCounts.admin}</strong>
                        </span>
                    </button>

                    <button
                        type="button"
                        className="profiles-summary-card"
                        onClick={() => setActiveTab("technician")}
                    >
                        <span className="profiles-summary-icon green">
                            <i className="bi bi-person-workspace"></i>
                        </span>
                        <span>
                            <small>Technicians</small>
                            <strong>{accountCounts.technician}</strong>
                        </span>
                    </button>

                    <button
                        type="button"
                        className="profiles-summary-card"
                        onClick={() => setActiveTab("customer")}
                    >
                        <span className="profiles-summary-icon orange">
                            <i className="bi bi-person-fill"></i>
                        </span>
                        <span>
                            <small>Customers</small>
                            <strong>{accountCounts.customer}</strong>
                        </span>
                    </button>
                </div>

                {/* SECURITY NOTE */}
                <div className="profiles-security-note">
                    <span>
                        <i className="bi bi-shield-check"></i>
                    </span>

                    <div>
                        <strong>Account creation policy</strong>
                        <p>
                            Customers register from the public website.
                            Admin and Technician accounts are created
                            from this protected Admin area.
                        </p>
                    </div>
                </div>

                {/* TOOLBAR */}
                <div className="profiles-toolbar">
                    <div className="profiles-search">
                        <i className="bi bi-search"></i>

                        <input
                            type="text"
                            placeholder="Search name, User ID, email or phone..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                aria-label="Clear search"
                            >
                                <i className="bi bi-x"></i>
                            </button>
                        )}
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                        className="profiles-filter"
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Available">Available</option>
                        <option value="Busy">Busy</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                {/* TABS */}
                <div className="profiles-tabs">
                    {[
                        ["all", "All Accounts", accountCounts.all],
                        ["admin", "Admins", accountCounts.admin],
                        [
                            "technician",
                            "Technicians",
                            accountCounts.technician
                        ],
                        ["customer", "Customers", accountCounts.customer]
                    ].map(([value, label, count]) => (
                        <button
                            key={value}
                            type="button"
                            className={
                                activeTab === value
                                    ? "active"
                                    : ""
                            }
                            onClick={() => setActiveTab(value)}
                        >
                            {label}
                            <span>{count}</span>
                        </button>
                    ))}
                </div>

                {/* ACCOUNT LIST */}
                <div className="profiles-list-card">

                    <div className="profiles-list-header">
                        <div>
                            <h4>
                                {activeTab === "all"
                                    ? "All Accounts"
                                    : `${activeTab.charAt(0).toUpperCase()}${activeTab.slice(1)} Accounts`}
                            </h4>

                            <p>
                                {filteredAccounts.length} account
                                {filteredAccounts.length === 1
                                    ? ""
                                    : "s"} found
                            </p>
                        </div>
                    </div>

                    {filteredAccounts.length === 0 ? (
                        <div className="profiles-empty">
                            <i className="bi bi-person-x"></i>
                            <h4>No accounts found</h4>
                            <p>
                                Try changing your search or filter.
                            </p>
                        </div>
                    ) : (
                        <div className="profiles-account-list">
                            {filteredAccounts.map((account) => (
                                <div
                                    className="profiles-account-row"
                                    key={account.id}
                                >
                                    <div
                                        className={`profiles-avatar ${account.type.toLowerCase()}`}
                                    >
                                        <i
                                            className={
                                                account.type ===
                                                "Admin"
                                                    ? "bi bi-shield-lock-fill"
                                                    : account.type ===
                                                      "Technician"
                                                    ? "bi bi-person-workspace"
                                                    : "bi bi-person-fill"
                                            }
                                        ></i>
                                    </div>

                                    <div className="profiles-account-main">
                                        <div className="profiles-name-line">
                                            <strong>
                                                {account.name}
                                            </strong>

                                            <span
                                                className={`profiles-role ${account.type.toLowerCase()}`}
                                            >
                                                {account.role}
                                            </span>
                                        </div>

                                        <div className="profiles-meta">
                                            <span>
                                                <i className="bi bi-person-badge"></i>
                                                {account.userId}
                                            </span>

                                            <span>
                                                <i className="bi bi-envelope"></i>
                                                {account.email}
                                            </span>

                                            <span>
                                                <i className="bi bi-telephone"></i>
                                                {account.phone}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profiles-account-status">
                                        <span
                                            className={`profiles-status ${account.status
                                                .toLowerCase()
                                                .replace(" ", "-")}`}
                                        >
                                            <i className="bi bi-circle-fill"></i>
                                            {account.status}
                                        </span>
                                    </div>

                                    <div className="profiles-account-actions">
                                        <button
                                            type="button"
                                            className="view"
                                            onClick={() =>
                                                handleView(account)
                                            }
                                            title="View details"
                                        >
                                            <i className="bi bi-eye"></i>
                                            <span>View</span>
                                        </button>

                                        {account.type !== "Admin" && (
                                            <button
                                                type="button"
                                                className="edit"
                                                onClick={() =>
                                                    handleEdit(account)
                                                }
                                                title="Edit account"
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                                <span>Edit</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* DETAILS MODAL */}
                {selectedAccount && (
                    <div
                        className="profiles-modal-backdrop"
                        onMouseDown={closeDetails}
                    >
                        <div
                            className="profiles-modal"
                            onMouseDown={(event) =>
                                event.stopPropagation()
                            }
                        >
                            <div className="profiles-modal-header">
                                <div>
                                    <span
                                        className={`profiles-modal-icon ${selectedAccount.type.toLowerCase()}`}
                                    >
                                        <i
                                            className={
                                                selectedAccount.type ===
                                                "Admin"
                                                    ? "bi bi-shield-lock-fill"
                                                    : selectedAccount.type ===
                                                      "Technician"
                                                    ? "bi bi-person-workspace"
                                                    : "bi bi-person-fill"
                                            }
                                        ></i>
                                    </span>

                                    <div>
                                        <h3>
                                            {selectedAccount.name}
                                        </h3>
                                        <p>
                                            {
                                                selectedAccount.type
                                            }{" "}
                                            Profile
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={closeDetails}
                                    aria-label="Close details"
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>

                            <div className="profiles-modal-body">
                                <div className="profiles-detail-grid">
                                    <div>
                                        <small>User ID</small>
                                        <strong>
                                            {selectedAccount.userId}
                                        </strong>
                                    </div>

                                    <div>
                                        <small>Role</small>
                                        <strong>
                                            {selectedAccount.role}
                                        </strong>
                                    </div>

                                    <div>
                                        <small>Email</small>
                                        <strong>
                                            {selectedAccount.email}
                                        </strong>
                                    </div>

                                    <div>
                                        <small>Phone</small>
                                        <strong>
                                            {selectedAccount.phone}
                                        </strong>
                                    </div>

                                    <div>
                                        <small>Status</small>
                                        <strong>
                                            {selectedAccount.status}
                                        </strong>
                                    </div>
                                </div>

                                {selectedAccount.type ===
                                    "Technician" && (
                                    <div className="profiles-detail-extra">
                                        <div>
                                            <small>
                                                Employee Code
                                            </small>
                                            <strong>
                                                {selectedAccount.raw
                                                    .employeeCode ||
                                                    "—"}
                                            </strong>
                                        </div>

                                        <div>
                                            <small>
                                                Department
                                            </small>
                                            <strong>
                                                {selectedAccount.raw
                                                    .department ||
                                                    "—"}
                                            </strong>
                                        </div>

                                        <div>
                                            <small>
                                                Designation
                                            </small>
                                            <strong>
                                                {selectedAccount.raw
                                                    .designation ||
                                                    "—"}
                                            </strong>
                                        </div>

                                        <div>
                                            <small>
                                                Current Status
                                            </small>
                                            <strong>
                                                {selectedAccount.raw
                                                    .currentStatus ||
                                                    "—"}
                                            </strong>
                                        </div>
                                    </div>
                                )}

                                {selectedAccount.type ===
                                    "Customer" && (
                                    <div className="profiles-detail-extra">
                                        <div>
                                            <small>
                                                Customer Code
                                            </small>
                                            <strong>
                                                {selectedAccount.raw
                                                    .customerCode ||
                                                    "—"}
                                            </strong>
                                        </div>

                                        <div>
                                            <small>
                                                Customer Type
                                            </small>
                                            <strong>
                                                {selectedAccount.raw
                                                    .customerType ||
                                                    "—"}
                                            </strong>
                                        </div>

                                        <div>
                                            <small>
                                                Preferred Language
                                            </small>
                                            <strong>
                                                {selectedAccount.raw
                                                    .preferredLanguage ||
                                                    "—"}
                                            </strong>
                                        </div>
                                    </div>
                                )}

                                {selectedAccount.type ===
                                    "Admin" && (
                                    <div className="profiles-admin-note">
                                        <i className="bi bi-info-circle-fill"></i>
                                        <p>
                                            This is the currently
                                            authenticated Admin profile.
                                            The existing backend does not
                                            expose an all-admin listing
                                            endpoint, so this page does not
                                            invent one or modify the backend.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="profiles-modal-footer">
                                {selectedAccount.type ===
                                    "Customer" && (
                                    <button
                                        type="button"
                                        className="profiles-btn secondary"
                                        onClick={() =>
                                            navigate("/customers")
                                        }
                                    >
                                        <i className="bi bi-people"></i>
                                        Customer Management
                                    </button>
                                )}

                                {selectedAccount.type ===
                                    "Technician" && (
                                    <button
                                        type="button"
                                        className="profiles-btn secondary"
                                        onClick={() =>
                                            navigate(
                                                "/admin/technicians"
                                            )
                                        }
                                    >
                                        <i className="bi bi-person-workspace"></i>
                                        Technician Management
                                    </button>
                                )}

                                <button
                                    type="button"
                                    className="profiles-btn primary"
                                    onClick={closeDetails}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* CREATE ADMIN MODAL */}
                {showAdminCreate && (
                    <div className="profiles-modal-backdrop">
                        <div className="profiles-modal admin-create-modal">
                            <div className="profiles-modal-header">
                                <div>
                                    <span className="profiles-modal-icon admin">
                                        <i className="bi bi-shield-plus"></i>
                                    </span>

                                    <div>
                                        <h3>
                                            Create Admin Account
                                        </h3>
                                        <p>
                                            Admin-only account creation
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowAdminCreate(false)
                                    }
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>

                            <form
                                className="profiles-create-form"
                                onSubmit={createAdmin}
                            >
                                {adminError && (
                                    <div className="profiles-alert error">
                                        <i className="bi bi-exclamation-circle-fill"></i>
                                        {adminError}
                                    </div>
                                )}

                                {adminSuccess && (
                                    <div className="profiles-alert success">
                                        <i className="bi bi-check-circle-fill"></i>
                                        {adminSuccess}
                                    </div>
                                )}

                                <div className="profiles-generated-id">
                                    <div>
                                        <small>Generated Admin ID</small>
                                        <strong>
                                            {adminForm.userName}
                                        </strong>
                                    </div>

                                    <i className="bi bi-shield-lock-fill"></i>
                                </div>

                                <div className="profiles-form-grid">
                                    <label>
                                        First Name
                                        <input
                                            name="firstName"
                                            value={
                                                adminForm.firstName
                                            }
                                            onChange={
                                                handleAdminChange
                                            }
                                            required
                                        />
                                    </label>

                                    <label>
                                        Last Name
                                        <input
                                            name="lastName"
                                            value={
                                                adminForm.lastName
                                            }
                                            onChange={
                                                handleAdminChange
                                            }
                                            required
                                        />
                                    </label>

                                    <label>
                                        Email
                                        <input
                                            type="email"
                                            name="email"
                                            value={
                                                adminForm.email
                                            }
                                            onChange={
                                                handleAdminChange
                                            }
                                            required
                                        />
                                    </label>

                                    <label>
                                        Phone Number
                                        <input
                                            name="phoneNumber"
                                            value={
                                                adminForm.phoneNumber
                                            }
                                            onChange={
                                                handleAdminChange
                                            }
                                        />
                                    </label>

                                    <label>
                                        Password
                                        <input
                                            type="password"
                                            name="password"
                                            value={
                                                adminForm.password
                                            }
                                            onChange={
                                                handleAdminChange
                                            }
                                            minLength={6}
                                            required
                                        />
                                    </label>

                                    <label>
                                        Confirm Password
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={
                                                adminForm.confirmPassword
                                            }
                                            onChange={
                                                handleAdminChange
                                            }
                                            minLength={6}
                                            required
                                        />
                                    </label>
                                </div>

                                <div className="profiles-create-actions">
                                    <button
                                        type="button"
                                        className="profiles-btn secondary"
                                        onClick={() =>
                                            setShowAdminCreate(false)
                                        }
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="profiles-btn primary"
                                        disabled={adminSaving}
                                    >
                                        {adminSaving ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm"></span>
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-shield-plus"></i>
                                                Create Admin
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* EXISTING TECHNICIAN CREATE / EDIT */}
                <AddTechnicianModal
                    show={showTechnicianCreate}
                    onClose={() =>
                        setShowTechnicianCreate(false)
                    }
                    onSuccess={refreshProfiles}
                />

                <EditCustomerModal
                    show={showCustomerEdit}
                    customer={
                        selectedAccount?.type === "Customer"
                            ? selectedAccount.raw
                            : null
                    }
                    onClose={() =>
                        setShowCustomerEdit(false)
                    }
                    onSuccess={refreshProfiles}
                />

                <EditTechnicianModal
                    show={showTechnicianEdit}
                    technician={
                        selectedAccount?.type === "Technician"
                            ? selectedAccount.raw
                            : null
                    }
                    onClose={() =>
                        setShowTechnicianEdit(false)
                    }
                    onSuccess={refreshProfiles}
                />
            </div>
        </PageContainer>
    );
}

export default Profiles;