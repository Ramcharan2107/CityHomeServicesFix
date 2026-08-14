import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import authService from "../../services/authService";
import technicianService from "../../services/technicianService";

import AddTechnicianModal from "../Admin/Technicians/AddTechnicianModal";
import EditCustomerModal from "../Customers/EditCustomerModal";
import EditTechnicianModal from "../Admin/Technicians/EditTechnicianModal";

import PageContainer from "../../components/common/PageContainer";

import "./Profiles.css";


/* ============================================================
   ROLE IDs FROM BACKEND
============================================================ */

const ROLE_ADMIN = 1;
const ROLE_TECHNICIAN = 3;
const ROLE_CUSTOMER = 4;


/* ============================================================
   HELPER FUNCTIONS
============================================================ */

const getValue = (...values) => {

    for (const value of values) {

        if (
            value !== undefined &&
            value !== null &&
            value !== ""
        ) {
            return value;
        }

    }

    return "—";
};


const getDisplayValue = (value) => {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return "—";
    }

    if (typeof value === "object") {

        try {

            return JSON.stringify(value);

        }
        catch {

            return "—";

        }

    }

    return String(value);

};


const formatLabel = (key) => {

    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/[_-]/g, " ")
        .replace(/^./, (character) =>
            character.toUpperCase()
        )
        .trim();

};


/* ============================================================
   COMPONENT
============================================================ */

function Profiles() {

    const navigate = useNavigate();


    /* ==========================================================
       STATE
    ========================================================== */

    const [customers, setCustomers] = useState([]);

    const [technicians, setTechnicians] = useState([]);

    const [adminProfile, setAdminProfile] = useState([]);

    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const [error, setError] = useState("");

    const [activeTab, setActiveTab] = useState("all");

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedAccount, setSelectedAccount] =
        useState(null);

    const [showAdminCreate, setShowAdminCreate] =
        useState(false);

    const [showTechnicianCreate, setShowTechnicianCreate] =
        useState(false);

    const [showCustomerEdit, setShowCustomerEdit] =
        useState(false);

    const [showTechnicianEdit, setShowTechnicianEdit] =
        useState(false);


    /* ==========================================================
       ADMIN FORM
    ========================================================== */

    const [adminForm, setAdminForm] = useState({

        firstName: "",

        lastName: "",

        userName: "",

        email: "",

        phoneNumber: "",

        password: "",

        confirmPassword: ""

    });

    const [adminSaving, setAdminSaving] =
        useState(false);

    const [adminError, setAdminError] =
        useState("");

    const [adminSuccess, setAdminSuccess] =
        useState("");


    /* ==========================================================
       LOAD ON PAGE OPEN
    ========================================================== */

    useEffect(() => {

        loadProfiles();

    }, []);


    /* ==========================================================
       LOAD ALL PROFILES
    ========================================================== */

    const loadProfiles = async () => {

        setError("");

        try {

            setLoading(true);


            /* ======================================================
               USERS
               ------------------------------------------------------
               This is the SAME endpoint already working in
               Customers.jsx:

               GET /api/Users
            ====================================================== */

            const usersResponse =
                await api.get("/Users");


            const usersData =
                Array.isArray(usersResponse.data)

                    ? usersResponse.data

                    : Array.isArray(
                        usersResponse.data?.data
                    )

                        ? usersResponse.data.data

                        : [];


            console.log(
                "PROFILES - USERS API RESPONSE:",
                usersData
            );


            /* ======================================================
               TECHNICIANS
            ====================================================== */

            let technicianData = [];


            try {

                const technicianResponse =
                    await technicianService.getAll();


                if (
                    Array.isArray(
                        technicianResponse
                    )
                ) {

                    technicianData =
                        technicianResponse;

                }
                else if (
                    Array.isArray(
                        technicianResponse?.data
                    )
                ) {

                    technicianData =
                        technicianResponse.data;

                }
                else if (
                    Array.isArray(
                        technicianResponse?.data?.data
                    )
                ) {

                    technicianData =
                        technicianResponse.data.data;

                }

            }
            catch (technicianError) {

                console.warn(
                    "Technician API could not be loaded:",
                    technicianError
                );

                technicianData = [];

            }


            /* ======================================================
               CUSTOMERS
               ------------------------------------------------------
               roleId = 4
            ====================================================== */

            const customerData =
                usersData.filter(
                    (user) =>

                        Number(user?.roleId) ===
                        ROLE_CUSTOMER &&

                        user?.isDeleted !== true
                );


            /* ======================================================
               ADMINS
               ------------------------------------------------------
               roleId = 1
            ====================================================== */

            const adminData =
                usersData.filter(
                    (user) =>

                        Number(user?.roleId) ===
                        ROLE_ADMIN &&

                        user?.isDeleted !== true
                );


            console.log(
                "PROFILES - CUSTOMER USERS:",
                customerData
            );

            console.log(
                "PROFILES - ADMIN USERS:",
                adminData
            );

            console.log(
                "PROFILES - TECHNICIANS:",
                technicianData
            );


            /* ======================================================
               SAVE DATA
            ====================================================== */

            setCustomers(customerData);

            setTechnicians(technicianData);

            setAdminProfile(adminData);


            if (usersData.length === 0) {

                setError(
                    "No users were returned from the backend."
                );

            }

        }
        catch (err) {

            console.error(
                "PROFILE LOADING ERROR:",
                err
            );


            if (
                err?.response?.status === 401
            ) {

                setError(
                    "Your login session has expired. Please login again."
                );

            }
            else if (
                err?.response?.status === 403
            ) {

                setError(
                    "You do not have permission to view profiles."
                );

            }
            else {

                setError(

                    err?.response?.data?.message ||

                    err?.response?.data?.title ||

                    "Unable to load profiles from the backend."

                );

            }

        }
        finally {

            setLoading(false);

        }

    };


    /* ==========================================================
       REFRESH
    ========================================================== */

    const refreshProfiles = async () => {

        setRefreshing(true);

        await loadProfiles();

        setRefreshing(false);

    };


    /* ==========================================================
       CUSTOMER ACCOUNTS
       SOURCE = /api/Users
       roleId = 4
    ========================================================== */

    const customerAccounts = useMemo(() => {

        return customers.map((customer) => {

            const firstName =
                customer?.firstName || "";

            const lastName =
                customer?.lastName || "";

            const fullName =
                `${firstName} ${lastName}`.trim();


            return {

                id:
                    `customer-${customer?.userId}`,

                type:
                    "Customer",

                role:
                    "Customer",

                name:
                    fullName ||

                    customer?.userName ||

                    "Customer",

                userId:
                    customer?.userId ||

                    customer?.userName ||

                    "—",

                email:
                    customer?.email ||

                    "—",

                phone:
                    customer?.phoneNumber ||

                    "—",

                status:

                    customer?.isDeleted === true

                        ? "Deleted"

                        : customer?.isActive === false

                            ? "Inactive"

                            : "Active",

                raw:
                    customer

            };

        });

    }, [customers]);


    /* ==========================================================
       TECHNICIAN ACCOUNTS
    ========================================================== */

    const technicianAccounts = useMemo(() => {

        return technicians.map((technician) => {

            const user =
                technician?.user || {};


            const firstName =
                technician?.firstName ||
                user?.firstName ||
                "";

            const lastName =
                technician?.lastName ||
                user?.lastName ||
                "";


            const fullName =
                `${firstName} ${lastName}`.trim();


            const technicianId =
                technician?.technicianId ||

                technician?.id ||

                technician?.userId ||

                user?.userId ||

                "—";


            return {

                id:
                    `technician-${technicianId}`,

                type:
                    "Technician",

                role:
                    "Technician",

                name:
                    fullName ||

                    technician?.userName ||

                    user?.userName ||

                    "Technician",

                userId:
                    technician?.userId ||

                    user?.userId ||

                    technician?.employeeCode ||

                    technicianId,

                email:
                    technician?.email ||

                    user?.email ||

                    "—",

                phone:
                    technician?.phoneNumber ||

                    user?.phoneNumber ||

                    "—",

                status:

                    technician?.isAvailable === false

                        ? "Inactive"

                        : technician?.currentStatus ||

                        technician?.status ||

                        "Available",

                raw:
                    technician

            };

        });

    }, [technicians]);


    /* ==========================================================
       ADMIN ACCOUNTS
    ========================================================== */

    const adminAccounts = useMemo(() => {

        return adminProfile.map((admin) => {

            const firstName =
                admin?.firstName || "";

            const lastName =
                admin?.lastName || "";


            const fullName =
                `${firstName} ${lastName}`.trim();


            return {

                id:
                    `admin-${admin?.userId}`,

                type:
                    "Admin",

                role:
                    "Admin",

                name:
                    fullName ||

                    admin?.userName ||

                    "Administrator",

                userId:
                    admin?.userId ||

                    admin?.userName ||

                    "—",

                email:
                    admin?.email ||

                    "—",

                phone:
                    admin?.phoneNumber ||

                    "—",

                status:
                    admin?.isActive === false

                        ? "Inactive"

                        : "Active",

                raw:
                    admin

            };

        });

    }, [adminProfile]);


    /* ==========================================================
       ALL ACCOUNTS
    ========================================================== */

    const allAccounts = useMemo(() => {

        return [

            ...adminAccounts,

            ...technicianAccounts,

            ...customerAccounts

        ];

    }, [

        adminAccounts,

        technicianAccounts,

        customerAccounts

    ]);


    /* ==========================================================
       FILTERED ACCOUNTS
    ========================================================== */

    const filteredAccounts = useMemo(() => {

        const keyword =
            search
                .trim()
                .toLowerCase();


        return allAccounts.filter(
            (account) => {

                const matchesTab =

                    activeTab === "all" ||

                    account.type
                        .toLowerCase() ===
                    activeTab;


                const matchesSearch =

                    !keyword ||

                    String(account.name)
                        .toLowerCase()
                        .includes(keyword) ||

                    String(account.userId)
                        .toLowerCase()
                        .includes(keyword) ||

                    String(account.email)
                        .toLowerCase()
                        .includes(keyword) ||

                    String(account.phone)
                        .toLowerCase()
                        .includes(keyword);


                const matchesStatus =

                    statusFilter === "All" ||

                    String(account.status)
                        .toLowerCase() ===
                    statusFilter.toLowerCase();


                return (

                    matchesTab &&

                    matchesSearch &&

                    matchesStatus

                );

            }
        );

    }, [

        allAccounts,

        activeTab,

        search,

        statusFilter

    ]);


    /* ==========================================================
       COUNTS
    ========================================================== */

    const accountCounts = {

        all:
            allAccounts.length,

        admin:
            adminAccounts.length,

        technician:
            technicianAccounts.length,

        customer:
            customerAccounts.length

    };


    /* ==========================================================
       ACCOUNT ICON
    ========================================================== */

    const getAccountIcon = (type) => {

        if (type === "Admin") {

            return "bi bi-shield-lock-fill";

        }

        if (type === "Technician") {

            return "bi bi-person-workspace";

        }

        return "bi bi-person-fill";

    };


    /* ==========================================================
       CREATE ADMIN
    ========================================================== */

    const openAdminCreate = () => {

        setAdminError("");

        setAdminSuccess("");


        setAdminForm({

            firstName: "",

            lastName: "",

            userName:
                `Admin${Date.now().toString().slice(-5)}`,

            email: "",

            phoneNumber: "",

            password: "",

            confirmPassword: ""

        });


        setShowAdminCreate(true);

    };


    const handleAdminChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setAdminForm(
            (previous) => ({

                ...previous,

                [name]:
                    value

            })
        );

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

            setAdminError(
                "Please complete all required fields."
            );

            return;

        }


        if (
            adminForm.password !==
            adminForm.confirmPassword
        ) {

            setAdminError(
                "Passwords do not match."
            );

            return;

        }


        try {

            setAdminSaving(true);


            await authService.register({

                firstName:
                    adminForm.firstName.trim(),

                lastName:
                    adminForm.lastName.trim(),

                userName:
                    adminForm.userName,

                email:
                    adminForm.email.trim(),

                phoneNumber:
                    adminForm.phoneNumber.trim(),

                password:
                    adminForm.password,

                roleId:
                    ROLE_ADMIN

            });


            setAdminSuccess(
                "Admin account created successfully."
            );


            await loadProfiles();

        }
        catch (err) {

            console.error(
                "CREATE ADMIN ERROR:",
                err
            );


            setAdminError(

                err?.response?.data?.message ||

                err?.response?.data?.title ||

                "Unable to create admin account."

            );

        }
        finally {

            setAdminSaving(false);

        }

    };


    /* ==========================================================
       VIEW ACCOUNT
    ========================================================== */

    const handleView = (account) => {

        setSelectedAccount(account);

    };


    /* ==========================================================
       EDIT ACCOUNT
    ========================================================== */

    const handleEdit = (account) => {

        setSelectedAccount(account);


        if (
            account.type === "Customer"
        ) {

            setShowCustomerEdit(true);

        }
        else if (
            account.type === "Technician"
        ) {

            setShowTechnicianEdit(true);

        }

    };


    /* ==========================================================
       GET COMPLETE BACKEND FIELDS
    ========================================================== */

    const getProfileFields = (account) => {

        if (!account?.raw) {

            return [];

        }


        const ignoredFields = [

            "password",

            "passwordHash",

            "token",

            "refreshToken"

        ];


        return Object.entries(
            account.raw
        )
            .filter(
                ([key]) =>
                    !ignoredFields.includes(key)
            )
            .filter(
                ([_, value]) =>
                    value !== null &&
                    value !== undefined &&
                    value !== ""
            );

    };


    /* ==========================================================
       LOADING
    ========================================================== */

    if (loading) {

        return (

            <PageContainer>

                <div
                    className="profiles-page"
                    style={{
                        minHeight: "100vh",
                        background: "#fff9f2"
                    }}
                >

                    <div className="profiles-loading">

                        <div className="spinner-border text-warning"></div>

                        <h5>
                            Loading Profiles...
                        </h5>

                        <p>
                            Loading registered accounts from the backend.
                        </p>

                    </div>

                </div>

            </PageContainer>

        );

    }


    /* ==========================================================
       MAIN UI
    ========================================================== */

    return (

        <PageContainer>

            <div
                className="profiles-page"
                style={{
                    minHeight: "100vh",
                    background: "#fff9f2"
                }}
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="profiles-header">

                    <div>

                        <span className="profiles-eyebrow">
                            ACCOUNT MANAGEMENT
                        </span>

                        <h2>
                            Profiles
                        </h2>

                        <p>
                            View registered administrators,
                            technicians and customers.
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

                            {refreshing
                                ? "Refreshing..."
                                : "Refresh"
                            }

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


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="profiles-alert error">

                        <i className="bi bi-exclamation-circle-fill"></i>

                        {error}

                    </div>

                )}


                {/* =================================================
                    SUMMARY CARDS
                ================================================= */}

                <div className="profiles-summary-grid">

                    <button
                        type="button"
                        className="profiles-summary-card"
                        onClick={() =>
                            setActiveTab("all")
                        }
                    >

                        <span className="profiles-summary-icon navy">

                            <i className="bi bi-people-fill"></i>

                        </span>

                        <span>

                            <small>
                                Total Accounts
                            </small>

                            <strong>
                                {accountCounts.all}
                            </strong>

                        </span>

                    </button>


                    <button
                        type="button"
                        className="profiles-summary-card"
                        onClick={() =>
                            setActiveTab("admin")
                        }
                    >

                        <span className="profiles-summary-icon purple">

                            <i className="bi bi-shield-lock-fill"></i>

                        </span>

                        <span>

                            <small>
                                Admins
                            </small>

                            <strong>
                                {accountCounts.admin}
                            </strong>

                        </span>

                    </button>


                    <button
                        type="button"
                        className="profiles-summary-card"
                        onClick={() =>
                            setActiveTab("technician")
                        }
                    >

                        <span className="profiles-summary-icon green">

                            <i className="bi bi-person-workspace"></i>

                        </span>

                        <span>

                            <small>
                                Technicians
                            </small>

                            <strong>
                                {accountCounts.technician}
                            </strong>

                        </span>

                    </button>


                    <button
                        type="button"
                        className="profiles-summary-card"
                        onClick={() =>
                            setActiveTab("customer")
                        }
                    >

                        <span className="profiles-summary-icon orange">

                            <i className="bi bi-person-fill"></i>

                        </span>

                        <span>

                            <small>
                                Customers
                            </small>

                            <strong>
                                {accountCounts.customer}
                            </strong>

                        </span>

                    </button>

                </div>


                {/* =================================================
                    BACKEND INFORMATION
                ================================================= */}

                <div className="profiles-security-note">

                    <span>

                        <i className="bi bi-database-check"></i>

                    </span>

                    <div>

                        <strong>
                            Live backend data
                        </strong>

                        <p>
                            Customer and administrator accounts
                            are loaded from the Users API.
                            Customer accounts are identified by
                            role ID 4.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    SEARCH
                ================================================= */}

                <div className="profiles-toolbar">

                    <div className="profiles-search">

                        <i className="bi bi-search"></i>

                        <input
                            type="text"
                            placeholder="Search name, User ID, email or phone..."
                            value={search}
                            onChange={(event) =>
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

                                <i className="bi bi-x"></i>

                            </button>

                        )}

                    </div>


                    <select
                        className="profiles-filter"
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(
                                event.target.value
                            )
                        }
                    >

                        <option value="All">
                            All Status
                        </option>

                        <option value="Active">
                            Active
                        </option>

                        <option value="Available">
                            Available
                        </option>

                        <option value="Busy">
                            Busy
                        </option>

                        <option value="Inactive">
                            Inactive
                        </option>

                    </select>

                </div>


                {/* =================================================
                    TABS
                ================================================= */}

                <div className="profiles-tabs">

                    <button
                        type="button"
                        className={
                            activeTab === "all"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveTab("all")
                        }
                    >

                        All Accounts

                        <span>
                            {accountCounts.all}
                        </span>

                    </button>


                    <button
                        type="button"
                        className={
                            activeTab === "admin"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveTab("admin")
                        }
                    >

                        Admins

                        <span>
                            {accountCounts.admin}
                        </span>

                    </button>


                    <button
                        type="button"
                        className={
                            activeTab === "technician"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveTab("technician")
                        }
                    >

                        Technicians

                        <span>
                            {accountCounts.technician}
                        </span>

                    </button>


                    <button
                        type="button"
                        className={
                            activeTab === "customer"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveTab("customer")
                        }
                    >

                        Customers

                        <span>
                            {accountCounts.customer}
                        </span>

                    </button>

                </div>


                {/* =================================================
                    ACCOUNT LIST
                ================================================= */}

                <div className="profiles-list-card">

                    <div className="profiles-list-header">

                        <div>

                            <h4>
                                {activeTab === "all"
                                    ? "All Accounts"
                                    : `${activeTab
                                        .charAt(0)
                                        .toUpperCase()
                                    }${activeTab.slice(1)} Accounts`
                                }
                            </h4>

                            <p>
                                {filteredAccounts.length} account
                                {filteredAccounts.length === 1
                                    ? ""
                                    : "s"
                                } found
                            </p>

                        </div>

                    </div>


                    {filteredAccounts.length === 0 ? (

                        <div className="profiles-empty">

                            <i className="bi bi-person-x"></i>

                            <h4>
                                No accounts found
                            </h4>

                            <p>
                                Try changing your search or filters.
                            </p>

                        </div>

                    ) : (

                        <div className="profiles-account-list">

                            {filteredAccounts.map(
                                (account) => (

                                    <div
                                        className="profiles-account-row"
                                        key={account.id}
                                    >

                                        {/* AVATAR */}

                                        <div
                                            className={
                                                `profiles-avatar ${account.type.toLowerCase()}`
                                            }
                                        >

                                            <i
                                                className={
                                                    getAccountIcon(
                                                        account.type
                                                    )
                                                }
                                            ></i>

                                        </div>


                                        {/* ACCOUNT */}

                                        <div className="profiles-account-main">

                                            <div className="profiles-name-line">

                                                <strong>
                                                    {account.name}
                                                </strong>

                                                <span
                                                    className={
                                                        `profiles-role ${account.type.toLowerCase()}`
                                                    }
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


                                        {/* STATUS */}

                                        <div className="profiles-account-status">

                                            <span
                                                className={
                                                    `profiles-status ${String(
                                                        account.status
                                                    )
                                                        .toLowerCase()
                                                        .replace(
                                                            /\s+/g,
                                                            "-"
                                                        )}`
                                                }
                                            >

                                                <i className="bi bi-circle-fill"></i>

                                                {account.status}

                                            </span>

                                        </div>


                                        {/* ACTIONS */}

                                        <div className="profiles-account-actions">

                                            <button
                                                type="button"
                                                className="view"
                                                onClick={() =>
                                                    handleView(
                                                        account
                                                    )
                                                }
                                            >

                                                <i className="bi bi-eye"></i>

                                                View

                                            </button>


                                            {account.type !==
                                                "Admin" && (

                                                <button
                                                    type="button"
                                                    className="edit"
                                                    onClick={() =>
                                                        handleEdit(
                                                            account
                                                        )
                                                    }
                                                >

                                                    <i className="bi bi-pencil-square"></i>

                                                    Edit

                                                </button>

                                            )}

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>


                {/* =================================================
                    ACCOUNT DETAILS MODAL
                ================================================= */}

                {selectedAccount && (

                    <div
                        className="profiles-modal-backdrop"
                        onMouseDown={() =>
                            setSelectedAccount(null)
                        }
                    >

                        <div
                            className="profiles-modal"
                            onMouseDown={(event) =>
                                event.stopPropagation()
                            }
                        >

                            {/* HEADER */}

                            <div className="profiles-modal-header">

                                <div>

                                    <span
                                        className={
                                            `profiles-modal-icon ${selectedAccount.type.toLowerCase()}`
                                        }
                                    >

                                        <i
                                            className={
                                                getAccountIcon(
                                                    selectedAccount.type
                                                )
                                            }
                                        ></i>

                                    </span>


                                    <div>

                                        <h3>
                                            {selectedAccount.name}
                                        </h3>

                                        <p>
                                            {selectedAccount.type} Account
                                        </p>

                                    </div>

                                </div>


                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedAccount(null)
                                    }
                                >

                                    <i className="bi bi-x-lg"></i>

                                </button>

                            </div>


                            {/* BODY */}

                            <div className="profiles-modal-body">

                                <div className="profiles-detail-grid">

                                    <div>

                                        <small>
                                            User ID
                                        </small>

                                        <strong>
                                            {selectedAccount.userId}
                                        </strong>

                                    </div>


                                    <div>

                                        <small>
                                            Role
                                        </small>

                                        <strong>
                                            {selectedAccount.role}
                                        </strong>

                                    </div>


                                    <div>

                                        <small>
                                            Name
                                        </small>

                                        <strong>
                                            {selectedAccount.name}
                                        </strong>

                                    </div>


                                    <div>

                                        <small>
                                            Email
                                        </small>

                                        <strong>
                                            {selectedAccount.email}
                                        </strong>

                                    </div>


                                    <div>

                                        <small>
                                            Phone
                                        </small>

                                        <strong>
                                            {selectedAccount.phone}
                                        </strong>

                                    </div>


                                    <div>

                                        <small>
                                            Status
                                        </small>

                                        <strong>
                                            {selectedAccount.status}
                                        </strong>

                                    </div>

                                </div>


                                {/* =================================================
                                    COMPLETE USER DATA
                                ================================================= */}

                                <div
                                    className="profiles-all-details"
                                    style={{
                                        marginTop: "24px"
                                    }}
                                >

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            marginBottom: "14px"
                                        }}
                                    >

                                        <i className="bi bi-database"></i>

                                        <strong>
                                            Backend Information
                                        </strong>

                                    </div>


                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(auto-fit, minmax(220px, 1fr))",
                                            gap: "12px"
                                        }}
                                    >

                                        {getProfileFields(
                                            selectedAccount
                                        ).map(
                                            ([key, value]) => (

                                                <div
                                                    key={key}
                                                    style={{
                                                        padding: "13px",
                                                        background:
                                                            "#fff9f2",
                                                        border:
                                                            "1px solid #eee4d8",
                                                        borderRadius:
                                                            "10px"
                                                    }}
                                                >

                                                    <small
                                                        style={{
                                                            display:
                                                                "block",
                                                            color:
                                                                "#777",
                                                            marginBottom:
                                                                "5px"
                                                        }}
                                                    >

                                                        {formatLabel(
                                                            key
                                                        )}

                                                    </small>


                                                    <strong
                                                        style={{
                                                            display:
                                                                "block",
                                                            wordBreak:
                                                                "break-word"
                                                        }}
                                                    >

                                                        {getDisplayValue(
                                                            value
                                                        )}

                                                    </strong>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>


                                {/* CUSTOMER INFORMATION */}

                                {selectedAccount.type ===
                                    "Customer" && (

                                    <div className="profiles-admin-note">

                                        <i className="bi bi-info-circle-fill"></i>

                                        <p>
                                            This customer account is loaded
                                            directly from the Users API.
                                            Customer-specific bookings,
                                            service requests and order
                                            history can be accessed from
                                            Customer Management.
                                        </p>

                                    </div>

                                )}

                            </div>


                            {/* FOOTER */}

                            <div className="profiles-modal-footer">

                                {selectedAccount.type ===
                                    "Customer" && (

                                    <button
                                        type="button"
                                        className="profiles-btn secondary"
                                        onClick={() =>
                                            navigate(
                                                "/admin/customers"
                                            )
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
                                    onClick={() =>
                                        setSelectedAccount(null)
                                    }
                                >

                                    Close

                                </button>

                            </div>

                        </div>

                    </div>

                )}


                {/* =================================================
                    CREATE ADMIN MODAL
                ================================================= */}

                {showAdminCreate && (

                    <div
                        className="profiles-modal-backdrop"
                        onMouseDown={() =>
                            setShowAdminCreate(false)
                        }
                    >

                        <div
                            className="profiles-modal"
                            onMouseDown={(event) =>
                                event.stopPropagation()
                            }
                        >

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
                                            Create a new administrator
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

                                        <small>
                                            Admin Username
                                        </small>

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


                {/* =================================================
                    CREATE TECHNICIAN
                ================================================= */}

                <AddTechnicianModal
                    show={
                        showTechnicianCreate
                    }
                    onClose={() =>
                        setShowTechnicianCreate(
                            false
                        )
                    }
                    onSuccess={
                        refreshProfiles
                    }
                />


                {/* =================================================
                    EDIT CUSTOMER
                ================================================= */}

                <EditCustomerModal

                    show={
                        showCustomerEdit
                    }

                    customer={
                        selectedAccount?.type ===
                        "Customer"
                            ? selectedAccount.raw
                            : null
                    }

                    onClose={() => {

                        setShowCustomerEdit(false);

                        setSelectedAccount(null);

                    }}

                    onSuccess={
                        refreshProfiles
                    }

                />


                {/* =================================================
                    EDIT TECHNICIAN
                ================================================= */}

                <EditTechnicianModal

                    show={
                        showTechnicianEdit
                    }

                    technician={
                        selectedAccount?.type ===
                        "Technician"
                            ? selectedAccount.raw
                            : null
                    }

                    onClose={() => {

                        setShowTechnicianEdit(false);

                        setSelectedAccount(null);

                    }}

                    onSuccess={
                        refreshProfiles
                    }

                />

            </div>

        </PageContainer>

    );

}


export default Profiles;