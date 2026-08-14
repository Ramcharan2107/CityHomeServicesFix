import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import serviceCategoryService from "../../../services/serviceCategoryService";

import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

import PageContainer from "../../../components/common/PageContainer";

import "./Categories.css";


function Categories() {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [showDetails, setShowDetails] = useState(false);

    const [showAdd, setShowAdd] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    const [message, setMessage] = useState("");

    const [messageType, setMessageType] = useState("success");


    /* ============================================================
       LOAD CATEGORIES
    ============================================================ */

    useEffect(() => {

        loadCategories();

    }, []);


    const loadCategories = async (showRefreshMessage = false) => {

        try {

            if (showRefreshMessage) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const response =
                await serviceCategoryService.getAll();

            let data = [];

            if (Array.isArray(response)) {

                data = response;

            } else if (Array.isArray(response?.data)) {

                data = response.data;

            } else if (
                Array.isArray(response?.data?.data)
            ) {

                data = response.data.data;

            }

            setCategories(
                Array.isArray(data)
                    ? data
                    : []
            );


            if (showRefreshMessage) {

                showMessage(
                    "Categories refreshed successfully.",
                    "success"
                );

            }

        } catch (error) {

            console.error(
                "CATEGORY LOAD ERROR:",
                error
            );

            const errorMessage =
                error?.response?.data?.message ||
                error?.response?.data?.title ||
                "Unable to load categories from the server.";

            showMessage(
                errorMessage,
                "error"
            );

        } finally {

            setLoading(false);

            setRefreshing(false);

        }

    };


    /* ============================================================
       MESSAGE
    ============================================================ */

    const showMessage = (
        text,
        type = "success"
    ) => {

        setMessage(text);

        setMessageType(type);

        window.clearTimeout(
            window.__categoryMessageTimer
        );

        window.__categoryMessageTimer =
            window.setTimeout(() => {

                setMessage("");

            }, 4000);

    };


    /* ============================================================
       FILTER
    ============================================================ */

    const filteredCategories = useMemo(() => {

        const keyword =
            String(search || "")
                .trim()
                .toLowerCase();

        return categories.filter(
            category => {

                const categoryName =
                    String(
                        category?.categoryName || ""
                    ).toLowerCase();

                const description =
                    String(
                        category?.description || ""
                    ).toLowerCase();

                const matchesSearch =
                    !keyword ||
                    categoryName.includes(keyword) ||
                    description.includes(keyword);

                const matchesStatus =

                    statusFilter === "All" ||

                    (
                        statusFilter === "Active" &&
                        category?.isActive === true
                    ) ||

                    (
                        statusFilter === "Inactive" &&
                        category?.isActive !== true
                    );

                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );

    }, [
        categories,
        search,
        statusFilter
    ]);


    /* ============================================================
       STATISTICS
    ============================================================ */

    const totalCategories =
        categories.length;

    const activeCategories =
        categories.filter(
            category =>
                category?.isActive === true
        ).length;

    const inactiveCategories =
        categories.filter(
            category =>
                category?.isActive !== true
        ).length;

    const totalServices =
        categories.reduce(
            (sum, category) => {

                if (
                    Array.isArray(
                        category?.services
                    )
                ) {

                    return (
                        sum +
                        category.services.length
                    );

                }

                return sum;

            },
            0
        );


    /* ============================================================
       DETAILS POPUP
    ============================================================ */

    const openDetails = category => {

        setSelectedCategory(category);

        setShowDetails(true);

        document.body.classList.add(
            "category-modal-open"
        );

        /*
         * Prevent background page scrolling while
         * the category details popup is open.
         */
        document.body.classList.add(
            "category-details-lock"
        );

    };


    const closeDetails = () => {

        setShowDetails(false);

        setSelectedCategory(null);

        document.body.classList.remove(
            "category-modal-open"
        );

        document.body.classList.remove(
            "category-details-lock"
        );

    };


    /* ============================================================
       ESC KEY
    ============================================================ */

    useEffect(() => {

        if (!showDetails) {
            return;
        }

        const handleEscape = event => {

            if (event.key === "Escape") {

                closeDetails();

            }

        };

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {

            document.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, [showDetails]);


    /* ============================================================
       CLEANUP
    ============================================================ */

    useEffect(() => {

        return () => {

            document.body.classList.remove(
                "category-modal-open"
            );

            document.body.classList.remove(
                "category-details-lock"
            );

        };

    }, []);


    /* ============================================================
       ADD
    ============================================================ */

    const handleAdd = () => {

        setShowAdd(true);

    };


    /* ============================================================
       EDIT
    ============================================================ */

    const handleEdit = category => {

        setSelectedCategory(category);

        setShowEdit(true);

    };


    /* ============================================================
       DELETE
    ============================================================ */

    const handleDelete = category => {

        setSelectedCategory(category);

        setShowDelete(true);

    };


    /* ============================================================
       CLOSE MODALS
    ============================================================ */

    const closeAdd = () => {

        setShowAdd(false);

    };


    const closeEdit = () => {

        setShowEdit(false);

        setSelectedCategory(null);

    };


    const closeDelete = () => {

        setShowDelete(false);

        setSelectedCategory(null);

    };


    /* ============================================================
       SUCCESS
    ============================================================ */

    const handleAddSuccess = async () => {

        setShowAdd(false);

        showMessage(
            "Category added successfully.",
            "success"
        );

        await loadCategories();

    };


    const handleEditSuccess = async () => {

        setShowEdit(false);

        setSelectedCategory(null);

        showMessage(
            "Category updated successfully.",
            "success"
        );

        await loadCategories();

    };


    const handleDeleteSuccess = async () => {

        setShowDelete(false);

        setSelectedCategory(null);

        showMessage(
            "Category deleted successfully.",
            "success"
        );

        await loadCategories();

    };


    /* ============================================================
       REFRESH
    ============================================================ */

    const handleRefresh = async () => {

        await loadCategories(true);

    };


    /* ============================================================
       CLEAR FILTERS
    ============================================================ */

    const handleClearFilters = () => {

        setSearch("");

        setStatusFilter("All");

        showMessage(
            "Filters cleared.",
            "success"
        );

    };


    /* ============================================================
       EXPORT
    ============================================================ */

    const handleExport = () => {

        if (
            filteredCategories.length === 0
        ) {

            showMessage(
                "There are no categories to export.",
                "error"
            );

            return;

        }

        const headers = [
            "Category ID",
            "Category Name",
            "Description",
            "Status",
            "Created At"
        ];

        const rows =
            filteredCategories.map(
                category => [

                    category?.categoryId ?? "",

                    category?.categoryName ?? "",

                    category?.description ?? "",

                    category?.isActive
                        ? "Active"
                        : "Inactive",

                    category?.createdAt
                        ? new Date(
                            category.createdAt
                        ).toLocaleDateString(
                            "en-IN"
                        )
                        : ""

                ]
            );

        const csv = [
            headers,
            ...rows
        ]
            .map(
                row =>
                    row
                        .map(
                            value =>
                                `"${String(value)
                                    .replace(
                                        /"/g,
                                        '""'
                                    )}"`
                        )
                        .join(",")
            )
            .join("\n");

        const blob =
            new Blob(
                [csv],
                {
                    type:
                        "text/csv;charset=utf-8;"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `city-home-services-categories-${new Date()
                .toISOString()
                .slice(0, 10)}.csv`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        showMessage(
            `${filteredCategories.length} categories exported successfully.`,
            "success"
        );

    };


    /* ============================================================
       HELPERS
    ============================================================ */

    const safeValue = (
        value,
        fallback = "Not available"
    ) => {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {

            return fallback;

        }

        return String(value);

    };


    const formatDate = value => {

        if (!value) {

            return "Not available";

        }

        const date =
            new Date(value);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return "Not available";

        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    /* ============================================================
       LOADING
    ============================================================ */

    if (loading) {

        return (

            <PageContainer>

                <div className="category-page">

                    <div className="category-loading">

                        <div className="category-spinner"></div>

                        <h4>
                            Loading Categories
                        </h4>

                        <p>
                            Fetching service categories...
                        </p>

                    </div>

                </div>

            </PageContainer>

        );

    }


    /* ============================================================
       DETAILS POPUP CONTENT
       IMPORTANT:
       This is rendered using createPortal() below.
       Therefore it is NOT trapped inside admin-content.
    ============================================================ */

    const detailsPopup =

        showDetails &&
        selectedCategory
            ? createPortal(

                <div
                    className="category-details-overlay"
                    onMouseDown={event => {

                        if (
                            event.target ===
                            event.currentTarget
                        ) {

                            closeDetails();

                        }

                    }}
                >

                    <div
                        className="category-details-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="category-details-title"
                    >

                        {/* HEADER */}

                        <div className="category-details-header">

                            <div className="category-details-title-wrap">

                                <div className="category-details-icon">

                                    <i className="bi bi-grid-fill"></i>

                                </div>

                                <div>

                                    <span>
                                        CATEGORY DETAILS
                                    </span>

                                    <h2 id="category-details-title">

                                        {safeValue(
                                            selectedCategory?.categoryName,
                                            "Unnamed Category"
                                        )}

                                    </h2>

                                </div>

                            </div>


                            <button
                                type="button"
                                className="category-details-close"
                                onClick={closeDetails}
                                aria-label="Close category details"
                            >

                                <i className="bi bi-x-lg"></i>

                            </button>

                        </div>


                        {/* BODY */}

                        <div className="category-details-body">

                            <div className="category-details-status-row">

                                <span className="category-details-label">
                                    Current Status
                                </span>

                                <span
                                    className={
                                        selectedCategory?.isActive
                                            ? "category-details-status active"
                                            : "category-details-status inactive"
                                    }
                                >

                                    <i className="bi bi-circle-fill"></i>

                                    {selectedCategory?.isActive
                                        ? "Active"
                                        : "Inactive"
                                    }

                                </span>

                            </div>


                            <div className="category-details-grid">

                                <div className="category-detail-item">

                                    <span>
                                        Category ID
                                    </span>

                                    <strong>

                                        #

                                        {safeValue(
                                            selectedCategory?.categoryId
                                        )}

                                    </strong>

                                </div>


                                <div className="category-detail-item">

                                    <span>
                                        Category Name
                                    </span>

                                    <strong>

                                        {safeValue(
                                            selectedCategory?.categoryName,
                                            "Unnamed Category"
                                        )}

                                    </strong>

                                </div>


                                <div className="category-detail-item">

                                    <span>
                                        Created Date
                                    </span>

                                    <strong>

                                        {formatDate(
                                            selectedCategory?.createdAt
                                        )}

                                    </strong>

                                </div>


                                <div className="category-detail-item">

                                    <span>
                                        Updated Date
                                    </span>

                                    <strong>

                                        {formatDate(
                                            selectedCategory?.updatedAt
                                        )}

                                    </strong>

                                </div>

                            </div>


                            <div className="category-details-section">

                                <div className="category-details-section-title">

                                    <i className="bi bi-card-text"></i>

                                    Description

                                </div>


                                <div className="category-details-description">

                                    {safeValue(
                                        selectedCategory?.description,
                                        "No description has been provided for this category."
                                    )}

                                </div>

                            </div>


                            <div className="category-details-section">

                                <div className="category-details-section-title">

                                    <i className="bi bi-tools"></i>

                                    Linked Services

                                    <span className="category-services-count">

                                        {
                                            Array.isArray(
                                                selectedCategory?.services
                                            )
                                                ? selectedCategory.services.length
                                                : 0
                                        }

                                    </span>

                                </div>


                                {Array.isArray(
                                    selectedCategory?.services
                                ) &&
                                selectedCategory.services.length > 0 ? (

                                    <div className="category-services-list">

                                        {selectedCategory.services.map(
                                            (
                                                service,
                                                index
                                            ) => (

                                                <div
                                                    className="category-service-item"
                                                    key={
                                                        service?.serviceId ||
                                                        service?.id ||
                                                        index
                                                    }
                                                >

                                                    <div className="category-service-icon">

                                                        <i className="bi bi-tools"></i>

                                                    </div>


                                                    <div>

                                                        <strong>

                                                            {safeValue(
                                                                service?.serviceName ||
                                                                service?.name,
                                                                "Service"
                                                            )}

                                                        </strong>


                                                        {service?.description && (

                                                            <small>

                                                                {
                                                                    service.description
                                                                }

                                                            </small>

                                                        )}

                                                    </div>

                                                </div>

                                            )
                                        )}

                                    </div>

                                ) : (

                                    <div className="category-no-services">

                                        <i className="bi bi-info-circle"></i>

                                        <span>
                                            No linked service details are available for this category.
                                        </span>

                                    </div>

                                )}

                            </div>

                        </div>


                        {/* FOOTER */}

                        <div className="category-details-footer">

                            <button
                                type="button"
                                className="category-btn category-btn-secondary"
                                onClick={closeDetails}
                            >

                                <i className="bi bi-x-lg"></i>

                                Close

                            </button>


                            <button
                                type="button"
                                className="category-btn category-btn-primary"
                                onClick={() => {

                                    const category =
                                        selectedCategory;

                                    closeDetails();

                                    handleEdit(
                                        category
                                    );

                                }}
                            >

                                <i className="bi bi-pencil-square"></i>

                                Edit Category

                            </button>

                        </div>

                    </div>

                </div>,

                document.body

            )
            : null;


    /* ============================================================
       MAIN PAGE
    ============================================================ */

    return (

        <PageContainer>

            <div className="category-page">

                {/* HEADER */}

                <div className="category-header">

                    <div>

                        <div className="category-eyebrow">
                            SERVICE MANAGEMENT
                        </div>

                        <h1>
                            Category Management
                        </h1>

                        <p>
                            Manage service categories
                            for City Home Services.
                        </p>

                    </div>


                    <div className="category-header-actions">

                        <button
                            type="button"
                            className="category-btn category-btn-secondary"
                            onClick={handleRefresh}
                            disabled={refreshing}
                        >

                            <i
                                className={
                                    refreshing
                                        ? "bi bi-arrow-repeat category-spin"
                                        : "bi bi-arrow-clockwise"
                                }
                            ></i>

                            {refreshing
                                ? "Refreshing..."
                                : "Refresh"
                            }

                        </button>


                        <button
                            type="button"
                            className="category-btn category-btn-outline"
                            onClick={handleExport}
                        >

                            <i className="bi bi-download"></i>

                            Export

                        </button>


                        <button
                            type="button"
                            className="category-btn category-btn-primary"
                            onClick={handleAdd}
                        >

                            <i className="bi bi-plus-lg"></i>

                            Add Category

                        </button>

                    </div>

                </div>


                {/* MESSAGE */}

                {message && (

                    <div
                        className={
                            `category-alert ${
                                messageType === "error"
                                    ? "category-alert-error"
                                    : "category-alert-success"
                            }`
                        }
                    >

                        <div className="category-alert-icon">

                            <i
                                className={
                                    messageType === "error"
                                        ? "bi bi-exclamation-circle-fill"
                                        : "bi bi-check-circle-fill"
                                }
                            ></i>

                        </div>


                        <div className="category-alert-content">

                            <strong>

                                {messageType === "error"
                                    ? "Action Failed"
                                    : "Success"
                                }

                            </strong>

                            <span>
                                {message}
                            </span>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                setMessage("")
                            }
                        >

                            <i className="bi bi-x"></i>

                        </button>

                    </div>

                )}


                {/* STATISTICS */}

                <div className="category-stat-grid">

                    <div className="category-stat-card">

                        <div>

                            <span>
                                Total Categories
                            </span>

                            <strong>
                                {totalCategories}
                            </strong>

                            <small>
                                All categories
                            </small>

                        </div>


                        <div className="category-stat-icon orange">

                            <i className="bi bi-grid-3x3-gap-fill"></i>

                        </div>

                    </div>


                    <div className="category-stat-card">

                        <div>

                            <span>
                                Active Categories
                            </span>

                            <strong>
                                {activeCategories}
                            </strong>

                            <small>
                                Currently available
                            </small>

                        </div>


                        <div className="category-stat-icon green">

                            <i className="bi bi-check-circle-fill"></i>

                        </div>

                    </div>


                    <div className="category-stat-card">

                        <div>

                            <span>
                                Inactive Categories
                            </span>

                            <strong>
                                {inactiveCategories}
                            </strong>

                            <small>
                                Currently disabled
                            </small>

                        </div>


                        <div className="category-stat-icon red">

                            <i className="bi bi-pause-circle-fill"></i>

                        </div>

                    </div>


                    <div className="category-stat-card">

                        <div>

                            <span>
                                Linked Services
                            </span>

                            <strong>
                                {totalServices}
                            </strong>

                            <small>
                                Available service links
                            </small>

                        </div>


                        <div className="category-stat-icon blue">

                            <i className="bi bi-tools"></i>

                        </div>

                    </div>

                </div>


                {/* SEARCH / FILTER */}

                <div className="category-control-card">

                    <div className="category-search-box">

                        <i className="bi bi-search"></i>


                        <input
                            type="search"
                            value={search}
                            placeholder="Search category..."
                            onChange={event =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            autoComplete="off"
                        />


                        {search && (

                            <button
                                type="button"
                                className="category-clear-search"
                                onClick={() =>
                                    setSearch("")
                                }
                                aria-label="Clear search"
                            >

                                <i className="bi bi-x-circle-fill"></i>

                            </button>

                        )}

                    </div>


                    <div className="category-filter-group">

                        <label>
                            Status
                        </label>


                        <select
                            value={statusFilter}
                            onChange={event =>
                                setStatusFilter(
                                    event.target.value
                                )
                            }
                        >

                            <option value="All">
                                All
                            </option>

                            <option value="Active">
                                Active
                            </option>

                            <option value="Inactive">
                                Inactive
                            </option>

                        </select>

                    </div>


                    {(search || statusFilter !== "All") && (

                        <button
                            type="button"
                            className="category-clear-filter"
                            onClick={
                                handleClearFilters
                            }
                        >

                            <i className="bi bi-funnel"></i>

                            Clear Filters

                        </button>

                    )}

                </div>


                {/* TABLE */}

                <div className="category-table-card">

                    <div className="category-table-header">

                        <div>

                            <h3>
                                Service Categories
                            </h3>

                            <p>

                                Showing{" "}

                                <strong>
                                    {filteredCategories.length}
                                </strong>

                                {" "}of{" "}

                                <strong>
                                    {totalCategories}
                                </strong>

                            </p>

                        </div>


                        <div className="category-table-info">

                            <i className="bi bi-database-check"></i>

                            Live backend data

                        </div>

                    </div>


                    {filteredCategories.length === 0 ? (

                        <div className="category-empty">

                            <div className="category-empty-icon">

                                <i className="bi bi-grid-3x3-gap"></i>

                            </div>


                            <h3>
                                No Categories Found
                            </h3>


                            <p>
                                No categories match
                                your current filters.
                            </p>


                            <button
                                type="button"
                                className="category-btn category-btn-secondary"
                                onClick={
                                    handleClearFilters
                                }
                            >

                                <i className="bi bi-arrow-counterclockwise"></i>

                                Clear Filters

                            </button>

                        </div>

                    ) : (

                        <div className="category-table-wrapper">

                            <table className="category-table">

                                <thead>

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            CATEGORY
                                        </th>

                                        <th>
                                            DESCRIPTION
                                        </th>

                                        <th>
                                            STATUS
                                        </th>

                                        <th>
                                            CREATED
                                        </th>

                                        <th className="text-center">
                                            ACTIONS
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredCategories.map(
                                        category => (

                                            <tr
                                                key={
                                                    category?.categoryId
                                                }
                                            >

                                                <td>

                                                    <span className="category-id">

                                                        #

                                                        {safeValue(
                                                            category?.categoryId
                                                        )}

                                                    </span>

                                                </td>


                                                <td>

                                                    <div className="category-name-cell">

                                                        <div className="category-avatar">

                                                            <i className="bi bi-grid-fill"></i>

                                                        </div>


                                                        <div>

                                                            <strong>

                                                                {safeValue(
                                                                    category?.categoryName,
                                                                    "Unnamed Category"
                                                                )}

                                                            </strong>


                                                            <small>
                                                                Service Category
                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>


                                                <td>

                                                    <div className="category-description">

                                                        {safeValue(
                                                            category?.description,
                                                            "No description available"
                                                        )}

                                                    </div>

                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            category?.isActive
                                                                ? "category-status active"
                                                                : "category-status inactive"
                                                        }
                                                    >

                                                        <i className="bi bi-circle-fill"></i>

                                                        {category?.isActive
                                                            ? "Active"
                                                            : "Inactive"
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    <span className="category-date">

                                                        <i className="bi bi-calendar3"></i>

                                                        {formatDate(
                                                            category?.createdAt
                                                        )}

                                                    </span>

                                                </td>


                                                <td>

                                                    <div className="category-actions">

                                                        <button
                                                            type="button"
                                                            className="category-action view"
                                                            onClick={() =>
                                                                openDetails(
                                                                    category
                                                                )
                                                            }
                                                        >

                                                            <i className="bi bi-eye"></i>

                                                            <span>
                                                                View
                                                            </span>

                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="category-action edit"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    category
                                                                )
                                                            }
                                                        >

                                                            <i className="bi bi-pencil-square"></i>

                                                            <span>
                                                                Edit
                                                            </span>

                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="category-action delete"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    category
                                                                )
                                                            }
                                                        >

                                                            <i className="bi bi-trash3"></i>

                                                            <span>
                                                                Delete
                                                            </span>

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>


            {/* ADD */}

            <AddCategoryModal
                show={showAdd}
                onClose={closeAdd}
                onSuccess={handleAddSuccess}
            />


            {/* EDIT */}

            <EditCategoryModal
                show={showEdit}
                category={selectedCategory}
                onClose={closeEdit}
                onSuccess={handleEditSuccess}
            />


            {/* DELETE */}

            <DeleteCategoryModal
                show={showDelete}
                category={selectedCategory}
                onClose={closeDelete}
                onSuccess={handleDeleteSuccess}
            />


            {/* DETAILS PORTAL */}

            {detailsPopup}

        </PageContainer>

    );

}


export default Categories;