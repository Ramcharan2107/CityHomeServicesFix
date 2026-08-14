import { useEffect, useMemo, useState } from "react";
import technicianService from "../../../services/technicianService";
import PageContainer from "../../../components/common/PageContainer";
import "./Technicians.css";

/* =========================================================
   HELPERS
========================================================= */

function getValue(obj, ...keys) {
    for (const key of keys) {
        if (
            obj &&
            obj[key] !== undefined &&
            obj[key] !== null
        ) {
            return obj[key];
        }
    }

    return null;
}

function getName(technician) {
    const firstName =
        getValue(
            technician?.user,
            "firstName",
            "FirstName"
        ) ??
        getValue(
            technician,
            "firstName",
            "FirstName"
        ) ??
        "";

    const lastName =
        getValue(
            technician?.user,
            "lastName",
            "LastName"
        ) ??
        getValue(
            technician,
            "lastName",
            "LastName"
        ) ??
        "";

    const fullName =
        `${firstName} ${lastName}`.trim();

    return fullName || "Unnamed Technician";
}

function getTechnicianId(technician) {
    return getValue(
        technician,
        "technicianId",
        "TechnicianId",
        "id",
        "Id"
    );
}

function getEmployeeCode(technician) {
    return (
        getValue(
            technician,
            "employeeCode",
            "EmployeeCode"
        ) || "—"
    );
}

function getDepartment(technician) {
    return (
        getValue(
            technician,
            "department",
            "Department"
        ) || "—"
    );
}

function getDesignation(technician) {
    return (
        getValue(
            technician,
            "designation",
            "Designation"
        ) || "—"
    );
}

function getExperience(technician) {
    const value = getValue(
        technician,
        "experienceYears",
        "ExperienceYears"
    );

    return value !== null && value !== undefined
        ? `${value} Years`
        : "—";
}

function getHourlyRate(technician) {
    const value = getValue(
        technician,
        "hourlyRate",
        "HourlyRate"
    );

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "—";
    }

    const number = Number(value);

    if (Number.isNaN(number)) {
        return "—";
    }

    return `₹ ${number.toLocaleString("en-IN")}`;
}

function getIsAvailable(technician) {
    return Boolean(
        getValue(
            technician,
            "isAvailable",
            "IsAvailable"
        )
    );
}

function getCurrentStatus(technician) {
    const isAvailable =
        getIsAvailable(technician);

    if (!isAvailable) {
        return "Inactive";
    }

    const status =
        getValue(
            technician,
            "currentStatus",
            "CurrentStatus"
        ) || "Available";

    return status;
}

function getStatusClass(status) {
    switch (status) {
        case "Busy":
            return "busy";

        case "On Leave":
            return "leave";

        case "Inactive":
            return "inactive";

        default:
            return "available";
    }
}

/* =========================================================
   MAIN PAGE
========================================================= */

function Technicians() {
    const [technicians, setTechnicians] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [successMessage, setSuccessMessage] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [selectedTechnician, setSelectedTechnician] =
        useState(null);

    const [modal, setModal] =
        useState(null);

    /* =====================================================
       LOAD TECHNICIANS
    ===================================================== */

    const loadTechnicians = async () => {
        try {
            setLoading(true);
            setError("");

            const response =
                await technicianService.getAll();

            console.log(
                "TECHNICIANS API RESPONSE:",
                response
            );

            let data = [];

            if (Array.isArray(response)) {
                data = response;
            } else if (
                Array.isArray(response?.data)
            ) {
                data = response.data;
            } else if (
                Array.isArray(response?.items)
            ) {
                data = response.items;
            } else if (
                Array.isArray(response?.data?.items)
            ) {
                data = response.data.items;
            }

            setTechnicians(data);
        } catch (err) {
            console.error(
                "TECHNICIANS LOAD ERROR:",
                err
            );

            setTechnicians([]);

            setError(
                err?.response?.data?.message ||
                err?.response?.data?.Message ||
                err?.message ||
                "Unable to load technicians."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTechnicians();
    }, []);

    /* =====================================================
       SUCCESS MESSAGE
    ===================================================== */

    const showSuccess = (message) => {
        setSuccessMessage(message);

        window.setTimeout(() => {
            setSuccessMessage("");
        }, 3500);
    };

    /* =====================================================
       FILTER
    ===================================================== */

    const filteredTechnicians = useMemo(() => {
        const keyword =
            search.trim().toLowerCase();

        return technicians.filter(
            (technician) => {
                const name =
                    getName(technician);

                const searchableText = [
                    name,
                    getEmployeeCode(
                        technician
                    ),
                    getDepartment(
                        technician
                    ),
                    getDesignation(
                        technician
                    ),
                    getValue(
                        technician,
                        "currentStatus",
                        "CurrentStatus"
                    ),
                    getValue(
                        technician?.user,
                        "email",
                        "Email"
                    ),
                    getValue(
                        technician?.user,
                        "phoneNumber",
                        "PhoneNumber"
                    ),
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                const matchesSearch =
                    !keyword ||
                    searchableText.includes(
                        keyword
                    );

                const status =
                    getCurrentStatus(
                        technician
                    );

                const matchesStatus =
                    statusFilter === "All" ||
                    status === statusFilter;

                return (
                    matchesSearch &&
                    matchesStatus
                );
            }
        );
    }, [
        technicians,
        search,
        statusFilter,
    ]);

    /* =====================================================
       STATISTICS
    ===================================================== */

    const totalTechnicians =
        technicians.length;

    const availableTechnicians =
        technicians.filter(
            (technician) =>
                getCurrentStatus(
                    technician
                ) === "Available"
        ).length;

    const busyTechnicians =
        technicians.filter(
            (technician) =>
                getCurrentStatus(
                    technician
                ) === "Busy"
        ).length;

    const inactiveTechnicians =
        technicians.filter(
            (technician) =>
                getCurrentStatus(
                    technician
                ) === "Inactive"
        ).length;

    const onLeaveTechnicians =
        technicians.filter(
            (technician) =>
                getCurrentStatus(
                    technician
                ) === "On Leave"
        ).length;

    /* =====================================================
       MODAL CONTROL
    ===================================================== */

    const openModal = (
        type,
        technician = null
    ) => {
        setSelectedTechnician(
            technician
        );

        setModal(type);

        setError("");
        setSuccessMessage("");
    };

    const closeModal = () => {
        setModal(null);
        setSelectedTechnician(null);
    };

    /* =====================================================
       AFTER ADD / EDIT / DELETE
    ===================================================== */

    const handleSuccess = async (
        message
    ) => {
        closeModal();

        await loadTechnicians();

        showSuccess(
            message ||
            "Operation completed successfully."
        );
    };

    /* =====================================================
       CLEAR FILTERS
    ===================================================== */

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("All");
    };

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <PageContainer>

            <div className="technicians-page">

                {/* =========================================
                    PAGE HEADER
                ========================================= */}

                <div className="technicians-header">

                    <div className="technicians-header-content">

                        <span className="technicians-eyebrow">
                            TECHNICIAN MANAGEMENT
                        </span>

                        <h1>
                            Technician Management
                        </h1>

                        <p>
                            Manage technicians, availability, assignments and workforce information.
                        </p>

                    </div>

                    <div className="technicians-header-actions">

                        <button
                            type="button"
                            className="technician-top-btn secondary"
                            onClick={
                                loadTechnicians
                            }
                            disabled={loading}
                        >
                            <i
                                className={
                                    loading
                                        ? "bi bi-arrow-repeat spin"
                                        : "bi bi-arrow-clockwise"
                                }
                            ></i>

                            {loading
                                ? "Refreshing..."
                                : "Refresh"}
                        </button>

                        <button
                            type="button"
                            className="technician-top-btn primary"
                            onClick={() =>
                                openModal("add")
                            }
                        >
                            <i className="bi bi-person-plus"></i>

                            Add Technician
                        </button>

                    </div>

                </div>

                {/* =========================================
                    SUCCESS MESSAGE
                ========================================= */}

                {successMessage && (
                    <div className="technician-alert success">

                        <i className="bi bi-check-circle-fill"></i>

                        <span>
                            {successMessage}
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                setSuccessMessage("")
                            }
                        >
                            <i className="bi bi-x"></i>
                        </button>

                    </div>
                )}

                {/* =========================================
                    ERROR MESSAGE
                ========================================= */}

                {error && (
                    <div className="technician-alert error">

                        <i className="bi bi-exclamation-triangle-fill"></i>

                        <span>
                            {error}
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                setError("")
                            }
                        >
                            <i className="bi bi-x"></i>
                        </button>

                    </div>
                )}

                {/* =========================================
                    STATISTICS
                ========================================= */}

                <div className="technician-stats">

                    <StatCard
                        title="Total Technicians"
                        value={
                            totalTechnicians
                        }
                        subtitle="Registered technicians"
                        icon="bi-people-fill"
                        className="orange"
                    />

                    <StatCard
                        title="Available"
                        value={
                            availableTechnicians
                        }
                        subtitle="Ready for assignments"
                        icon="bi-person-check-fill"
                        className="green"
                    />

                    <StatCard
                        title="Busy"
                        value={
                            busyTechnicians
                        }
                        subtitle="Currently working"
                        icon="bi-person-workspace"
                        className="yellow"
                    />

                    <StatCard
                        title="Inactive"
                        value={
                            inactiveTechnicians
                        }
                        subtitle="Currently unavailable"
                        icon="bi-person-x-fill"
                        className="red"
                    />

                </div>

                {/* =========================================
                    FILTER CARD
                ========================================= */}

                <div className="technician-filter-card">

                    <div className="technician-search">

                        <i className="bi bi-search"></i>

                        <input
                            type="text"
                            value={search}
                            placeholder="Search by name, employee code, department or designation..."
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                        />

                        {search && (
                            <button
                                type="button"
                                className="technician-search-clear"
                                onClick={() =>
                                    setSearch("")
                                }
                                aria-label="Clear search"
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        )}

                    </div>

                    <div className="technician-status-filter">

                        <label>
                            Status
                        </label>

                        <select
                            value={
                                statusFilter
                            }
                            onChange={(event) =>
                                setStatusFilter(
                                    event.target.value
                                )
                            }
                        >
                            <option value="All">
                                All Status
                            </option>

                            <option value="Available">
                                Available
                            </option>

                            <option value="Busy">
                                Busy
                            </option>

                            <option value="On Leave">
                                On Leave
                            </option>

                            <option value="Inactive">
                                Inactive
                            </option>
                        </select>

                    </div>

                    {(search ||
                        statusFilter !==
                            "All") && (
                        <button
                            type="button"
                            className="technician-clear-filter"
                            onClick={
                                clearFilters
                            }
                        >
                            <i className="bi bi-funnel"></i>

                            Clear
                        </button>
                    )}

                </div>

                {/* =========================================
                    TABLE HEADER
                ========================================= */}

                <div className="technician-table-card">

                    <div className="technician-table-header">

                        <div>
                            <h2>
                                Technicians
                            </h2>

                            <p>
                                Showing{" "}
                                <strong>
                                    {
                                        filteredTechnicians.length
                                    }
                                </strong>{" "}
                                of{" "}
                                <strong>
                                    {
                                        totalTechnicians
                                    }
                                </strong>
                                {" "}
                                technicians
                            </p>
                        </div>

                        <div className="technician-live-status">

                            <span></span>

                            Live backend data

                        </div>

                    </div>

                    {/* =====================================
                        LOADING
                    ===================================== */}

                    {loading ? (

                        <div className="technician-state">

                            <div className="technician-loader">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <h3>
                                Loading technicians...
                            </h3>

                            <p>
                                Please wait while
                                technician records
                                are being loaded.
                            </p>

                        </div>

                    ) : filteredTechnicians.length ===
                      0 ? (

                        /* =================================
                           EMPTY STATE
                        ================================= */

                        <div className="technician-state">

                            <div className="technician-empty-icon">

                                <i className="bi bi-person-workspace"></i>

                            </div>

                            <h3>
                                No Technicians Found
                            </h3>

                            <p>
                                {search ||
                                statusFilter !==
                                    "All"
                                    ? "No technician matches your current search or filter."
                                    : "There are currently no technician records."}
                            </p>

                            {(search ||
                                statusFilter !==
                                    "All") && (
                                <button
                                    type="button"
                                    className="technician-top-btn primary"
                                    onClick={
                                        clearFilters
                                    }
                                >
                                    <i className="bi bi-arrow-counterclockwise"></i>

                                    Clear Filters
                                </button>
                            )}

                        </div>

                    ) : (

                        /* =================================
                           TABLE
                        ================================= */

                        <div className="technician-table-wrapper">

                            <table className="technician-table">

                                <thead>

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            EMPLOYEE
                                        </th>

                                        <th>
                                            TECHNICIAN
                                        </th>

                                        <th>
                                            DEPARTMENT
                                        </th>

                                        <th>
                                            DESIGNATION
                                        </th>

                                        <th>
                                            EXPERIENCE
                                        </th>

                                        <th>
                                            HOURLY RATE
                                        </th>

                                        <th>
                                            STATUS
                                        </th>

                                        <th>
                                            ACTIONS
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredTechnicians.map(
                                        (
                                            technician
                                        ) => {

                                            const id =
                                                getTechnicianId(
                                                    technician
                                                );

                                            const name =
                                                getName(
                                                    technician
                                                );

                                            const status =
                                                getCurrentStatus(
                                                    technician
                                                );

                                            return (
                                                <tr
                                                    key={
                                                        id ??
                                                        `${getEmployeeCode(
                                                            technician
                                                        )}-${name}`
                                                    }
                                                >

                                                    <td>

                                                        <span className="technician-id">
                                                            #
                                                            {id ??
                                                                "—"}
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <span className="employee-code">
                                                            {
                                                                getEmployeeCode(
                                                                    technician
                                                                )
                                                            }
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <div className="technician-name-cell">

                                                            <div className="table-avatar">
                                                                {name
                                                                    .charAt(
                                                                        0
                                                                    )
                                                                    .toUpperCase()}
                                                            </div>

                                                            <div>

                                                                <strong>
                                                                    {
                                                                        name
                                                                    }
                                                                </strong>

                                                                <small>
                                                                    {getValue(
                                                                        technician?.user,
                                                                        "email",
                                                                        "Email"
                                                                    ) ||
                                                                        "Technician account"}
                                                                </small>

                                                            </div>

                                                        </div>

                                                    </td>

                                                    <td>
                                                        {
                                                            getDepartment(
                                                                technician
                                                            )
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            getDesignation(
                                                                technician
                                                            )
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            getExperience(
                                                                technician
                                                            )
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            getHourlyRate(
                                                                technician
                                                            )
                                                        }
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`technician-status ${getStatusClass(
                                                                status
                                                            )}`}
                                                        >

                                                            <span></span>

                                                            {
                                                                status
                                                            }

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <div className="technician-actions">

                                                            <button
                                                                type="button"
                                                                className="view"
                                                                title="View technician"
                                                                onClick={() =>
                                                                    openModal(
                                                                        "details",
                                                                        technician
                                                                    )
                                                                }
                                                            >
                                                                <i className="bi bi-eye"></i>
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="edit"
                                                                title="Edit technician"
                                                                onClick={() =>
                                                                    openModal(
                                                                        "edit",
                                                                        technician
                                                                    )
                                                                }
                                                            >
                                                                <i className="bi bi-pencil-square"></i>
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="delete"
                                                                title="Delete technician"
                                                                onClick={() =>
                                                                    openModal(
                                                                        "delete",
                                                                        technician
                                                                    )
                                                                }
                                                            >
                                                                <i className="bi bi-trash3"></i>
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

                {/* =========================================
                    MODAL PLACEHOLDER
                    Existing modal components can be connected
                    here without changing the backend.
                ========================================= */}

                {modal === "details" &&
                    selectedTechnician && (
                        <TechnicianDetailsModal
                            technician={
                                selectedTechnician
                            }
                            onClose={
                                closeModal
                            }
                        />
                    )}

                {modal === "add" && (
                    <AddTechnicianModal
                        onClose={
                            closeModal
                        }
                        onSuccess={() =>
                            handleSuccess(
                                "Technician created successfully."
                            )
                        }
                    />
                )}

                {modal === "edit" &&
                    selectedTechnician && (
                        <EditTechnicianModal
                            technician={
                                selectedTechnician
                            }
                            onClose={
                                closeModal
                            }
                            onSuccess={() =>
                                handleSuccess(
                                    "Technician updated successfully."
                                )
                            }
                        />
                    )}

                {modal === "delete" &&
                    selectedTechnician && (
                        <DeleteTechnicianModal
                            technician={
                                selectedTechnician
                            }
                            onClose={
                                closeModal
                            }
                            onSuccess={() =>
                                handleSuccess(
                                    "Technician deleted successfully."
                                )
                            }
                        />
                    )}

            </div>

        </PageContainer>
    );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
    title,
    value,
    subtitle,
    icon,
    className,
}) {
    return (
        <div className="technician-stat-card">

            <div className="technician-stat-content">

                <span>
                    {title}
                </span>

                <strong>
                    {value}
                </strong>

                <small>
                    {subtitle}
                </small>

            </div>

            <div
                className={`technician-stat-icon ${className}`}
            >
                <i
                    className={`bi ${icon}`}
                ></i>
            </div>

        </div>
    );
}

/* =========================================================
   FALLBACK MODALS
   These wrappers expect the modal components to be
   available in the same JSX file if they have not yet
   been separated.
========================================================= */

function TechnicianDetailsModal({
    technician,
    onClose,
}) {
    const name =
        getName(technician);

    const status =
        getCurrentStatus(
            technician
        );

    useModalLock(onClose);

    return (
        <div
            className="technician-modal-overlay"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose();
                }
            }}
        >

            <div
                className="technician-modal large"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
                role="dialog"
                aria-modal="true"
            >

                <ModalHeader
                    icon="bi-person-workspace"
                    title="Technician Details"
                    subtitle="Complete technician information"
                    onClose={onClose}
                />

                <div className="technician-modal-body">

                    <div className="technician-profile-banner">

                        <div className="technician-avatar">
                            {name
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div>

                            <h2>
                                {name}
                            </h2>

                            <p>
                                {getDesignation(
                                    technician
                                )}
                            </p>

                            <span
                                className={`technician-status ${getStatusClass(
                                    status
                                )}`}
                            >
                                <span></span>
                                {status}
                            </span>

                        </div>

                    </div>

                    <div className="technician-detail-grid">

                        <Detail
                            label="Technician ID"
                            value={
                                getTechnicianId(
                                    technician
                                )
                                    ? `#${getTechnicianId(
                                          technician
                                      )}`
                                    : "—"
                            }
                        />

                        <Detail
                            label="Employee Code"
                            value={getEmployeeCode(
                                technician
                            )}
                        />

                        <Detail
                            label="First Name"
                            value={
                                getValue(
                                    technician?.user,
                                    "firstName",
                                    "FirstName"
                                ) || "—"
                            }
                        />

                        <Detail
                            label="Last Name"
                            value={
                                getValue(
                                    technician?.user,
                                    "lastName",
                                    "LastName"
                                ) || "—"
                            }
                        />

                        <Detail
                            label="Email"
                            value={
                                getValue(
                                    technician?.user,
                                    "email",
                                    "Email"
                                ) || "—"
                            }
                        />

                        <Detail
                            label="Phone"
                            value={
                                getValue(
                                    technician?.user,
                                    "phoneNumber",
                                    "PhoneNumber"
                                ) || "—"
                            }
                        />

                        <Detail
                            label="Department"
                            value={getDepartment(
                                technician
                            )}
                        />

                        <Detail
                            label="Designation"
                            value={getDesignation(
                                technician
                            )}
                        />

                        <Detail
                            label="Experience"
                            value={getExperience(
                                technician
                            )}
                        />

                        <Detail
                            label="Hourly Rate"
                            value={getHourlyRate(
                                technician
                            )}
                        />

                        <Detail
                            label="Availability"
                            value={
                                getIsAvailable(
                                    technician
                                )
                                    ? "Available"
                                    : "Unavailable"
                            }
                        />

                        <Detail
                            label="Current Status"
                            value={status}
                        />

                    </div>

                </div>

                <ModalFooter
                    onClose={onClose}
                />

            </div>

        </div>
    );
}

function AddTechnicianModal({
    onClose,
    onSuccess,
}) {
    const [form, setForm] =
        useState({
            employeeCode: "",
            department: "",
            designation: "",
            experienceYears: "",
            hourlyRate: "",
            isAvailable: true,
            currentStatus: "Available",
        });

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    useModalLock(onClose);

    const update = (
        field,
        value
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const submit = async (
        event
    ) => {
        event.preventDefault();

        setError("");

        if (
            !form.employeeCode.trim()
        ) {
            setError(
                "Employee code is required."
            );
            return;
        }

        setSaving(true);

        try {
            await technicianService.create({
                employeeCode:
                    form.employeeCode.trim(),

                department:
                    form.department.trim(),

                designation:
                    form.designation.trim(),

                experienceYears:
                    form.experienceYears === ""
                        ? 0
                        : Number(
                              form.experienceYears
                          ),

                hourlyRate:
                    form.hourlyRate === ""
                        ? 0
                        : Number(
                              form.hourlyRate
                          ),

                isAvailable:
                    Boolean(
                        form.isAvailable
                    ),

                currentStatus:
                    form.isAvailable
                        ? form.currentStatus
                        : "Inactive",
            });

            onSuccess();
        } catch (err) {
            console.error(
                "ADD TECHNICIAN ERROR:",
                err
            );

            setError(
                err?.response?.data
                    ?.message ||
                err?.response?.data
                    ?.Message ||
                err?.message ||
                "Unable to create technician."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div
            className="technician-modal-overlay"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose();
                }
            }}
        >

            <div
                className="technician-modal"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
                role="dialog"
                aria-modal="true"
            >

                <ModalHeader
                    icon="bi-person-plus"
                    title="Add Technician"
                    subtitle="Create a new technician account"
                    onClose={onClose}
                />

                <form
                    onSubmit={submit}
                >

                    <div className="technician-modal-body">

                        {error && (
                            <div className="technician-alert error">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                {error}
                            </div>
                        )}

                        <div className="technician-form-grid">

                            <FormField
                                label="Employee Code"
                                required
                                value={
                                    form.employeeCode
                                }
                                onChange={(value) =>
                                    update(
                                        "employeeCode",
                                        value
                                    )
                                }
                                placeholder="EMP-001"
                            />

                            <FormField
                                label="Department"
                                value={
                                    form.department
                                }
                                onChange={(value) =>
                                    update(
                                        "department",
                                        value
                                    )
                                }
                                placeholder="Electrical"
                            />

                            <FormField
                                label="Designation"
                                value={
                                    form.designation
                                }
                                onChange={(value) =>
                                    update(
                                        "designation",
                                        value
                                    )
                                }
                                placeholder="Senior Technician"
                            />

                            <FormField
                                label="Experience (Years)"
                                type="number"
                                value={
                                    form.experienceYears
                                }
                                onChange={(value) =>
                                    update(
                                        "experienceYears",
                                        value
                                    )
                                }
                                placeholder="5"
                            />

                            <FormField
                                label="Hourly Rate"
                                type="number"
                                value={
                                    form.hourlyRate
                                }
                                onChange={(value) =>
                                    update(
                                        "hourlyRate",
                                        value
                                    )
                                }
                                placeholder="500"
                            />

                            <div className="technician-form-group">

                                <label>
                                    Status
                                </label>

                                <select
                                    className="technician-form-control"
                                    value={
                                        form.isAvailable
                                            ? form.currentStatus
                                            : "Inactive"
                                    }
                                    disabled={
                                        !form.isAvailable
                                    }
                                    onChange={(event) =>
                                        update(
                                            "currentStatus",
                                            event.target
                                                .value
                                        )
                                    }
                                >
                                    <option value="Available">
                                        Available
                                    </option>

                                    <option value="Busy">
                                        Busy
                                    </option>

                                    <option value="On Leave">
                                        On Leave
                                    </option>
                                </select>

                            </div>

                        </div>

                        <label className="technician-switch-row">

                            <input
                                type="checkbox"
                                checked={
                                    form.isAvailable
                                }
                                onChange={(event) =>
                                    update(
                                        "isAvailable",
                                        event.target
                                            .checked
                                    )
                                }
                            />

                            <span className="technician-switch"></span>

                            <span>
                                Technician is active
                            </span>

                        </label>

                    </div>

                    <ModalActions
                        onClose={onClose}
                        saving={saving}
                        loadingText="Saving..."
                        submitText="Add Technician"
                    />

                </form>

            </div>

        </div>
    );
}

function EditTechnicianModal({
    technician,
    onClose,
    onSuccess,
}) {
    const [form, setForm] =
        useState({});

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    useModalLock(onClose);

    useEffect(() => {
        if (!technician) return;

        setForm({
            employeeCode:
                getEmployeeCode(
                    technician
                ) === "—"
                    ? ""
                    : getEmployeeCode(
                          technician
                      ),

            department:
                getDepartment(
                    technician
                ) === "—"
                    ? ""
                    : getDepartment(
                          technician
                      ),

            designation:
                getDesignation(
                    technician
                ) === "—"
                    ? ""
                    : getDesignation(
                          technician
                      ),

            experienceYears:
                getValue(
                    technician,
                    "experienceYears",
                    "ExperienceYears"
                ) ?? "",

            hourlyRate:
                getValue(
                    technician,
                    "hourlyRate",
                    "HourlyRate"
                ) ?? "",

            isAvailable:
                getIsAvailable(
                    technician
                ),

            currentStatus:
                getValue(
                    technician,
                    "currentStatus",
                    "CurrentStatus"
                ) || "Available",
        });

        setError("");
    }, [technician]);

    if (!technician) {
        return null;
    }

    const update = (
        field,
        value
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const submit = async (
        event
    ) => {
        event.preventDefault();

        setError("");
        setSaving(true);

        try {
            const id =
                getTechnicianId(
                    technician
                );

            await technicianService.update(
                id,
                {
                    employeeCode:
                        String(
                            form.employeeCode ||
                                ""
                        ).trim(),

                    department:
                        String(
                            form.department ||
                                ""
                        ).trim(),

                    designation:
                        String(
                            form.designation ||
                                ""
                        ).trim(),

                    experienceYears:
                        form.experienceYears ===
                        ""
                            ? 0
                            : Number(
                                  form.experienceYears
                              ),

                    hourlyRate:
                        form.hourlyRate === ""
                            ? 0
                            : Number(
                                  form.hourlyRate
                              ),

                    isAvailable:
                        Boolean(
                            form.isAvailable
                        ),

                    currentStatus:
                        form.isAvailable
                            ? form.currentStatus
                            : "Inactive",
                }
            );

            onSuccess();
        } catch (err) {
            console.error(
                "UPDATE TECHNICIAN ERROR:",
                err
            );

            setError(
                err?.response?.data
                    ?.message ||
                err?.response?.data
                    ?.Message ||
                err?.message ||
                "Unable to update technician."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div
            className="technician-modal-overlay"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose();
                }
            }}
        >

            <div
                className="technician-modal"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
                role="dialog"
                aria-modal="true"
            >

                <ModalHeader
                    icon="bi-pencil-square"
                    title="Edit Technician"
                    subtitle="Update technician information and status"
                    onClose={onClose}
                />

                <form
                    onSubmit={submit}
                >

                    <div className="technician-modal-body">

                        {error && (
                            <div className="technician-alert error">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                {error}
                            </div>
                        )}

                        <div className="technician-form-grid">

                            <FormField
                                label="Employee Code"
                                required
                                value={
                                    form.employeeCode ||
                                    ""
                                }
                                onChange={(value) =>
                                    update(
                                        "employeeCode",
                                        value
                                    )
                                }
                            />

                            <FormField
                                label="Department"
                                value={
                                    form.department ||
                                    ""
                                }
                                onChange={(value) =>
                                    update(
                                        "department",
                                        value
                                    )
                                }
                            />

                            <FormField
                                label="Designation"
                                value={
                                    form.designation ||
                                    ""
                                }
                                onChange={(value) =>
                                    update(
                                        "designation",
                                        value
                                    )
                                }
                            />

                            <FormField
                                label="Experience (Years)"
                                type="number"
                                value={
                                    form.experienceYears ??
                                    ""
                                }
                                onChange={(value) =>
                                    update(
                                        "experienceYears",
                                        value
                                    )
                                }
                            />

                            <FormField
                                label="Hourly Rate"
                                type="number"
                                value={
                                    form.hourlyRate ??
                                    ""
                                }
                                onChange={(value) =>
                                    update(
                                        "hourlyRate",
                                        value
                                    )
                                }
                            />

                            <div className="technician-form-group">

                                <label>
                                    Status
                                </label>

                                <select
                                    className="technician-form-control"
                                    value={
                                        form.isAvailable
                                            ? form.currentStatus ||
                                              "Available"
                                            : "Inactive"
                                    }
                                    disabled={
                                        !form.isAvailable
                                    }
                                    onChange={(event) =>
                                        update(
                                            "currentStatus",
                                            event.target
                                                .value
                                        )
                                    }
                                >
                                    <option value="Available">
                                        Available
                                    </option>

                                    <option value="Busy">
                                        Busy
                                    </option>

                                    <option value="On Leave">
                                        On Leave
                                    </option>
                                </select>

                            </div>

                        </div>

                        <label className="technician-switch-row">

                            <input
                                type="checkbox"
                                checked={
                                    Boolean(
                                        form.isAvailable
                                    )
                                }
                                onChange={(event) =>
                                    update(
                                        "isAvailable",
                                        event.target
                                            .checked
                                    )
                                }
                            />

                            <span className="technician-switch"></span>

                            <span>
                                Technician is active
                            </span>

                        </label>

                    </div>

                    <ModalActions
                        onClose={onClose}
                        saving={saving}
                        loadingText="Updating..."
                        submitText="Save Changes"
                    />

                </form>

            </div>

        </div>
    );
}

function DeleteTechnicianModal({
    technician,
    onClose,
    onSuccess,
}) {
    const [deleting, setDeleting] =
        useState(false);

    const [error, setError] =
        useState("");

    useModalLock(onClose);

    if (!technician) {
        return null;
    }

    const name =
        getName(technician);

    const handleDelete = async () => {
        setError("");
        setDeleting(true);

        try {
            const id =
                getTechnicianId(
                    technician
                );

            await technicianService.delete(
                id
            );

            onSuccess();
        } catch (err) {
            console.error(
                "DELETE TECHNICIAN ERROR:",
                err
            );

            setError(
                err?.response?.data
                    ?.message ||
                err?.response?.data
                    ?.Message ||
                "Unable to delete technician. The technician may be linked to existing records."
            );
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div
            className="technician-modal-overlay"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose();
                }
            }}
        >

            <div
                className="technician-modal small"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
                role="dialog"
                aria-modal="true"
            >

                <ModalHeader
                    icon="bi-trash3"
                    title="Delete Technician"
                    subtitle="Confirm technician removal"
                    onClose={onClose}
                />

                <div className="technician-modal-body">

                    <div className="technician-delete-content">

                        <div className="technician-delete-icon">
                            <i className="bi bi-exclamation-triangle-fill"></i>
                        </div>

                        <h3>
                            Delete Technician?
                        </h3>

                        <p>
                            You are about to
                            delete{" "}
                            <strong>
                                {name}
                            </strong>
                            .
                        </p>

                        <p className="text-muted">
                            Please confirm
                            before continuing.
                        </p>

                        {error && (
                            <div className="technician-alert error">
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                {error}
                            </div>
                        )}

                    </div>

                </div>

                <div className="technician-modal-footer">

                    <button
                        type="button"
                        className="technician-btn secondary"
                        onClick={onClose}
                        disabled={
                            deleting
                        }
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="technician-btn danger"
                        onClick={
                            handleDelete
                        }
                        disabled={
                            deleting
                        }
                    >

                        {deleting ? (
                            <>
                                <span className="spinner-border spinner-border-sm"></span>
                                Deleting...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-trash3"></i>
                                Delete Technician
                            </>
                        )}

                    </button>

                </div>

            </div>

        </div>
    );
}

/* =========================================================
   MODAL COMPONENTS
========================================================= */

function useModalLock(onClose) {
    useEffect(() => {
        const previousOverflow =
            document.body.style.overflow;

        const handleEscape = (
            event
        ) => {
            if (
                event.key ===
                "Escape"
            ) {
                onClose();
            }
        };

        document.body.style.overflow =
            "hidden";

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.body.style.overflow =
                previousOverflow;

            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [onClose]);
}

function ModalHeader({
    icon,
    title,
    subtitle,
    onClose,
}) {
    return (
        <div className="technician-modal-header">

            <div className="technician-modal-heading">

                <div className="technician-modal-icon">
                    <i
                        className={`bi ${icon}`}
                    ></i>
                </div>

                <div>

                    <span className="technician-modal-eyebrow">
                        TECHNICIAN MANAGEMENT
                    </span>

                    <h3>
                        {title}
                    </h3>

                    <p>
                        {subtitle}
                    </p>

                </div>

            </div>

            <button
                type="button"
                className="technician-modal-close"
                onClick={onClose}
                aria-label="Close"
            >
                <i className="bi bi-x-lg"></i>
            </button>

        </div>
    );
}

function ModalFooter({
    onClose,
}) {
    return (
        <div className="technician-modal-footer">

            <button
                type="button"
                className="technician-btn secondary"
                onClick={onClose}
            >
                <i className="bi bi-x-lg"></i>
                Close
            </button>

        </div>
    );
}

function ModalActions({
    onClose,
    saving,
    loadingText,
    submitText,
}) {
    return (
        <div className="technician-modal-footer">

            <button
                type="button"
                className="technician-btn secondary"
                onClick={onClose}
                disabled={saving}
            >
                Cancel
            </button>

            <button
                type="submit"
                className="technician-btn primary"
                disabled={saving}
            >

                {saving ? (
                    <>
                        <span className="spinner-border spinner-border-sm"></span>
                        {loadingText}
                    </>
                ) : (
                    <>
                        <i className="bi bi-check-lg"></i>
                        {submitText}
                    </>
                )}

            </button>

        </div>
    );
}

function Detail({
    label,
    value,
}) {
    return (
        <div className="technician-detail-item">

            <span>
                {label}
            </span>

            <strong>
                {value}
            </strong>

        </div>
    );
}

function FormField({
    label,
    required = false,
    value,
    onChange,
    type = "text",
    placeholder = "",
}) {
    return (
        <div className="technician-form-group">

            <label>

                {label}

                {required && (
                    <span className="required">
                        *
                    </span>
                )}

            </label>

            <input
                type={type}
                className="technician-form-control"
                value={
                    value ?? ""
                }
                placeholder={
                    placeholder
                }
                min={
                    type === "number"
                        ? "0"
                        : undefined
                }
                onChange={(event) =>
                    onChange(
                        event.target
                            .value
                    )
                }
            />

        </div>
    );
}

export default Technicians;
