import { useCallback, useEffect, useMemo, useState } from "react";

import serviceService from "../../../services/serviceService";
import serviceCategoryService from "../../../services/serviceCategoryService";

import ServiceDetailsModal from "./ServiceDetailsModal";
import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";

import PageContainer from "../../../components/common/PageContainer";

import "./Services.css";


function Services() {

    /* ============================================================
       STATE
    ============================================================ */

    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedService, setSelectedService] = useState(null);

    const [showDetails, setShowDetails] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);


    /* ============================================================
       SAFE VALUE HELPERS
    ============================================================ */

    const getServiceId = (service) =>
        service?.serviceId ??
        service?.ServiceId ??
        service?.id ??
        "-";

    const getServiceName = (service) =>
        service?.serviceName ??
        service?.ServiceName ??
        "Unnamed Service";

    const getServiceCode = (service) =>
        service?.serviceCode ??
        service?.ServiceCode ??
        "—";

    const getCategoryId = (service) =>
        service?.categoryId ??
        service?.CategoryId ??
        null;

    const getCategoryName = (service) =>
        service?.categoryName ??
        service?.CategoryName ??
        service?.category?.categoryName ??
        service?.category?.CategoryName ??
        "Uncategorized";

    const getDescription = (service) =>
        service?.description ??
        service?.Description ??
        "No description available.";

    const getEstimatedHours = (service) =>
        service?.estimatedHours ??
        service?.EstimatedHours ??
        null;

    const getBasePrice = (service) =>
        service?.basePrice ??
        service?.BasePrice ??
        null;

    const getIsActive = (service) =>
        Boolean(
            service?.isActive ??
            service?.IsActive ??
            false
        );

    const getCreatedAt = (service) =>
        service?.createdAt ??
        service?.CreatedAt ??
        null;

    const getUpdatedAt = (service) =>
        service?.updatedAt ??
        service?.UpdatedAt ??
        null;


    /* ============================================================
       RESPONSE NORMALIZER
    ============================================================ */

    const normalizeArrayResponse = (response, possibleKeys = []) => {

        if (Array.isArray(response)) {
            return response;
        }

        if (Array.isArray(response?.data)) {
            return response.data;
        }

        for (const key of possibleKeys) {

            if (Array.isArray(response?.[key])) {
                return response[key];
            }

            if (Array.isArray(response?.data?.[key])) {
                return response.data[key];
            }

        }

        return [];
    };


    /* ============================================================
       LOAD DATA
    ============================================================ */

    const loadData = useCallback(async (isRefresh = false) => {

        try {

            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const [servicesResponse, categoriesResponse] =
                await Promise.all([
                    serviceService.getAll(),
                    serviceCategoryService.getAll()
                ]);

            const servicesData = normalizeArrayResponse(
                servicesResponse,
                ["services", "Services", "data"]
            );

            const categoriesData = normalizeArrayResponse(
                categoriesResponse,
                ["categories", "Categories", "data"]
            );

            console.log(
                "ADMIN SERVICES API RESPONSE:",
                servicesData
            );

            console.log(
                "ADMIN SERVICE CATEGORIES:",
                categoriesData
            );

            setServices(servicesData);
            setCategories(categoriesData);

        }
        catch (err) {

            console.error(
                "ADMIN SERVICES LOAD ERROR:",
                err
            );

            setServices([]);
            setCategories([]);

            setError(
                err?.response?.data?.message ||
                err?.response?.data?.title ||
                "Unable to load services. Please try again."
            );

        }
        finally {

            setLoading(false);
            setRefreshing(false);

        }

    }, []);


    useEffect(() => {

        const modalOpen =
            showDetails ||
            showAdd ||
            showEdit ||
            showDelete;

        if (modalOpen) {
            document.body.classList.add("admin-modal-open");
            document.body.style.overflow = "hidden";
        } else {
            document.body.classList.remove("admin-modal-open");
            document.body.style.overflow = "";
        }

        return () => {
            document.body.classList.remove("admin-modal-open");
            document.body.style.overflow = "";
        };

    }, [showDetails, showAdd, showEdit, showDelete]);


    useEffect(() => {

        loadData();

    }, [loadData]);


    /* ============================================================
       CATEGORY NAME RESOLUTION
    ============================================================ */

    const getResolvedCategoryName = useCallback(
        (service) => {

            const directName = getCategoryName(service);

            if (
                directName &&
                directName !== "Uncategorized"
            ) {
                return directName;
            }

            const categoryId = getCategoryId(service);

            if (categoryId == null) {
                return "Uncategorized";
            }

            const category = categories.find(
                item =>
                    String(
                        item?.categoryId ??
                        item?.CategoryId ??
                        item?.id
                    ) === String(categoryId)
            );

            return (
                category?.categoryName ??
                category?.CategoryName ??
                "Uncategorized"
            );

        },
        [categories]
    );


    /* ============================================================
       NORMALIZED SERVICES
    ============================================================ */

    const normalizedServices = useMemo(() => {

        return services.map(service => ({

            ...service,

            _id: getServiceId(service),

            _name: getServiceName(service),

            _code: getServiceCode(service),

            _categoryId: getCategoryId(service),

            _categoryName: getResolvedCategoryName(service),

            _description: getDescription(service),

            _hours: getEstimatedHours(service),

            _price: getBasePrice(service),

            _active: getIsActive(service),

            _createdAt: getCreatedAt(service),

            _updatedAt: getUpdatedAt(service)

        }));

    }, [
        services,
        getResolvedCategoryName
    ]);


    /* ============================================================
       FILTER SERVICES
    ============================================================ */

    const filteredServices = useMemo(() => {

        const keyword =
            search
                .trim()
                .toLowerCase();

        return normalizedServices.filter(service => {

            const matchesSearch =
                !keyword ||

                service._name
                    .toLowerCase()
                    .includes(keyword) ||

                service._code
                    .toLowerCase()
                    .includes(keyword) ||

                service._categoryName
                    .toLowerCase()
                    .includes(keyword) ||

                service._description
                    .toLowerCase()
                    .includes(keyword);

            const matchesCategory =
                selectedCategory === "All" ||
                String(service._categoryName) ===
                    String(selectedCategory);

            const matchesStatus =
                statusFilter === "All" ||

                (
                    statusFilter === "Active" &&
                    service._active
                ) ||

                (
                    statusFilter === "Inactive" &&
                    !service._active
                );

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            );

        });

    }, [
        normalizedServices,
        search,
        selectedCategory,
        statusFilter
    ]);


    /* ============================================================
       STATISTICS
    ============================================================ */

    const totalServices =
        normalizedServices.length;

    const activeServices =
        normalizedServices.filter(
            service => service._active
        ).length;

    const inactiveServices =
        normalizedServices.filter(
            service => !service._active
        ).length;

    const totalCategories =
        categories.length;


    /* ============================================================
       HANDLERS
    ============================================================ */

    const handleRefresh = () => {

        loadData(true);

    };


    const handleView = (service) => {

        setSelectedService(service);

        setShowDetails(true);

    };


    const handleAdd = () => {

        setSelectedService(null);

        setShowAdd(true);

    };


    const handleEdit = (service) => {

        setSelectedService(service);

        setShowEdit(true);

    };


    const handleDelete = (service) => {

        setSelectedService(service);

        setShowDelete(true);

    };


    const closeAllModals = () => {

        setShowDetails(false);
        setShowAdd(false);
        setShowEdit(false);
        setShowDelete(false);

        setSelectedService(null);

    };


    const handleModalSuccess = async () => {

        closeAllModals();

        await loadData(true);

    };


    /* ============================================================
       EXPORT SERVICES
    ============================================================ */

    const handleExport = () => {

        try {

            if (!normalizedServices.length) {

                window.alert(
                    "There are no services available to export."
                );

                return;

            }

            const headers = [
                "Service ID",
                "Service Name",
                "Service Code",
                "Category",
                "Description",
                "Estimated Hours",
                "Base Price",
                "Status"
            ];

            const rows =
                normalizedServices.map(service => [

                    service._id,

                    service._name,

                    service._code,

                    service._categoryName,

                    service._description,

                    service._hours ?? "",

                    service._price ?? "",

                    service._active
                        ? "Active"
                        : "Inactive"

                ]);

            const csv = [

                headers,

                ...rows

            ]
                .map(row =>
                    row
                        .map(value => {

                            const text =
                                String(value ?? "");

                            return `"${text.replace(
                                /"/g,
                                '""'
                            )}"`;

                        })
                        .join(",")
                )
                .join("\n");

            const blob = new Blob(
                [csv],
                {
                    type: "text/csv;charset=utf-8;"
                }
            );

            const url =
                URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                `city-home-services-${Date.now()}.csv`;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            URL.revokeObjectURL(url);

        }
        catch (err) {

            console.error(
                "SERVICE EXPORT ERROR:",
                err
            );

            window.alert(
                "Unable to export services."
            );

        }

    };


    /* ============================================================
       DATE FORMATTER
    ============================================================ */

    const formatDate = (value) => {

        if (!value) {
            return "—";
        }

        const date =
            new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "—";
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
       MAIN
    ============================================================ */

    return (

        <>

            <PageContainer>

                <div className="admin-services-page">

                    {/* ==================================================
                        HEADER
                    ================================================== */}

                    <div className="services-page-header">

                        <div>

                            <div className="services-eyebrow">
                                SERVICE MANAGEMENT
                            </div>

                            <h1>
                                Services
                            </h1>

                            <p>
                                Manage services available
                                across City Home Services.
                            </p>

                        </div>


                        <div className="services-header-actions">

                            <button
                                type="button"
                                className="services-btn services-btn-secondary"
                                onClick={handleRefresh}
                                disabled={refreshing}
                            >

                                <i
                                    className={
                                        refreshing
                                            ? "bi bi-arrow-repeat services-spin"
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
                                className="services-btn services-btn-outline"
                                onClick={handleExport}
                                disabled={!normalizedServices.length}
                            >

                                <i className="bi bi-download"></i>

                                Export

                            </button>


                            <button
                                type="button"
                                className="services-btn services-btn-primary"
                                onClick={handleAdd}
                            >

                                <i className="bi bi-plus-lg"></i>

                                Add Service

                            </button>

                        </div>

                    </div>


                    {/* ==================================================
                        ERROR
                    ================================================== */}

                    {error && (

                        <div className="services-error">

                            <div>

                                <i className="bi bi-exclamation-triangle-fill"></i>

                                <span>
                                    {error}
                                </span>

                            </div>

                            <button
                                type="button"
                                onClick={() => loadData(true)}
                            >
                                Try Again
                            </button>

                        </div>

                    )}


                    {/* ==================================================
                        STATISTICS
                    ================================================== */}

                    <div className="services-stat-grid">

                        <div className="services-stat-card">

                            <div className="services-stat-icon orange">
                                <i className="bi bi-tools"></i>
                            </div>

                            <div>

                                <span>
                                    Total Services
                                </span>

                                <strong>
                                    {totalServices}
                                </strong>

                            </div>

                        </div>


                        <div className="services-stat-card">

                            <div className="services-stat-icon green">
                                <i className="bi bi-check-circle-fill"></i>
                            </div>

                            <div>

                                <span>
                                    Active Services
                                </span>

                                <strong>
                                    {activeServices}
                                </strong>

                            </div>

                        </div>


                        <div className="services-stat-card">

                            <div className="services-stat-icon red">
                                <i className="bi bi-x-circle-fill"></i>
                            </div>

                            <div>

                                <span>
                                    Inactive Services
                                </span>

                                <strong>
                                    {inactiveServices}
                                </strong>

                            </div>

                        </div>


                        <div className="services-stat-card">

                            <div className="services-stat-icon navy">
                                <i className="bi bi-grid-fill"></i>
                            </div>

                            <div>

                                <span>
                                    Categories
                                </span>

                                <strong>
                                    {totalCategories}
                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* ==================================================
                        FILTERS
                    ================================================== */}

                    <div className="services-filter-card">

                        <div className="services-search">

                            <i className="bi bi-search"></i>

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }
                                placeholder="Search services, code or category..."
                            />

                            {search && (

                                <button
                                    type="button"
                                    className="services-search-clear"
                                    onClick={() =>
                                        setSearch("")
                                    }
                                >
                                    <i className="bi bi-x-circle-fill"></i>
                                </button>

                            )}

                        </div>


                        <select
                            value={selectedCategory}
                            onChange={(event) =>
                                setSelectedCategory(
                                    event.target.value
                                )
                            }
                            className="services-filter-select"
                        >

                            <option value="All">
                                All Categories
                            </option>

                            {categories.map(category => {

                                const categoryId =
                                    category?.categoryId ??
                                    category?.CategoryId ??
                                    category?.id;

                                const categoryName =
                                    category?.categoryName ??
                                    category?.CategoryName ??
                                    "Unnamed Category";

                                return (

                                    <option
                                        key={categoryId}
                                        value={categoryName}
                                    >
                                        {categoryName}
                                    </option>

                                );

                            })}

                        </select>


                        <select
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(
                                    event.target.value
                                )
                            }
                            className="services-filter-select"
                        >

                            <option value="All">
                                All Status
                            </option>

                            <option value="Active">
                                Active
                            </option>

                            <option value="Inactive">
                                Inactive
                            </option>

                        </select>


                        {(search ||
                            selectedCategory !== "All" ||
                            statusFilter !== "All") && (

                            <button
                                type="button"
                                className="services-clear-filters"
                                onClick={() => {

                                    setSearch("");
                                    setSelectedCategory("All");
                                    setStatusFilter("All");

                                }}
                            >

                                <i className="bi bi-x-lg"></i>

                                Clear

                            </button>

                        )}

                    </div>


                    {/* ==================================================
                        TABLE
                    ================================================== */}

                    <div className="services-table-card">

                        <div className="services-table-header">

                            <div>

                                <h2>
                                    Service List
                                </h2>

                                <p>
                                    Showing{" "}
                                    <strong>
                                        {filteredServices.length}
                                    </strong>{" "}
                                    of{" "}
                                    <strong>
                                        {totalServices}
                                    </strong>{" "}
                                    services
                                </p>

                            </div>

                        </div>


                        {loading ? (

                            <div className="services-loading">

                                <div className="services-loader"></div>

                                <h3>
                                    Loading Services
                                </h3>

                                <p>
                                    Fetching service information...
                                </p>

                            </div>

                        ) : filteredServices.length === 0 ? (

                            <div className="services-empty">

                                <div className="services-empty-icon">
                                    <i className="bi bi-tools"></i>
                                </div>

                                <h3>
                                    No Services Found
                                </h3>

                                <p>
                                    {search ||
                                    selectedCategory !== "All" ||
                                    statusFilter !== "All"
                                        ? "Try changing your search or filters."
                                        : "No services are currently available."
                                    }
                                </p>

                                {!search &&
                                selectedCategory === "All" &&
                                statusFilter === "All" && (

                                    <button
                                        type="button"
                                        className="services-btn services-btn-primary"
                                        onClick={handleAdd}
                                    >
                                        <i className="bi bi-plus-lg"></i>
                                        Add Service
                                    </button>

                                )}

                            </div>

                        ) : (

                            <div className="services-table-wrapper">

                                <table className="services-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                ID
                                            </th>

                                            <th>
                                                Service
                                            </th>

                                            <th>
                                                Category
                                            </th>

                                            <th>
                                                Price
                                            </th>

                                            <th>
                                                Hours
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                            <th className="text-center">
                                                Actions
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {filteredServices.map(
                                            service => (

                                                <tr
                                                    key={service._id}
                                                >

                                                    <td>

                                                        <span className="services-id">
                                                            #{service._id}
                                                        </span>

                                                    </td>


                                                    <td>

                                                        <div className="services-name-cell">

                                                            <div className="services-service-icon">

                                                                <i className="bi bi-tools"></i>

                                                            </div>

                                                            <div>

                                                                <strong>
                                                                    {service._name}
                                                                </strong>

                                                                <small>
                                                                    {service._code}
                                                                </small>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    <td>

                                                        <span className="services-category">
                                                            {service._categoryName}
                                                        </span>

                                                    </td>


                                                    <td>

                                                        <strong className="services-price">

                                                            {service._price != null &&
                                                            Number.isFinite(Number(service._price))
                                                                ? `₹ ${Number(
                                                                    service._price
                                                                ).toLocaleString(
                                                                    "en-IN"
                                                                )}`
                                                                : "—"
                                                            }

                                                        </strong>

                                                    </td>


                                                    <td>

                                                        {service._hours != null &&
                                                        Number.isFinite(Number(service._hours))
                                                            ? `${service._hours} hrs`
                                                            : "—"
                                                        }

                                                    </td>


                                                    <td>

                                                        <span
                                                            className={
                                                                service._active
                                                                    ? "services-status active"
                                                                    : "services-status inactive"
                                                            }
                                                        >

                                                            <span></span>

                                                            {service._active
                                                                ? "Active"
                                                                : "Inactive"
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        <div className="services-actions">

                                                            <button
                                                                type="button"
                                                                className="services-action view"
                                                                title="View Service"
                                                                onClick={() =>
                                                                    handleView(service)
                                                                }
                                                            >

                                                                <i className="bi bi-eye"></i>

                                                            </button>


                                                            <button
                                                                type="button"
                                                                className="services-action edit"
                                                                title="Edit Service"
                                                                onClick={() =>
                                                                    handleEdit(service)
                                                                }
                                                            >

                                                                <i className="bi bi-pencil-square"></i>

                                                            </button>


                                                            <button
                                                                type="button"
                                                                className="services-action delete"
                                                                title="Delete Service"
                                                                onClick={() =>
                                                                    handleDelete(service)
                                                                }
                                                            >

                                                                <i className="bi bi-trash3"></i>

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

            </PageContainer>


            {/* ============================================================
                VIEW SERVICE
            ============================================================ */}

            <ServiceDetailsModal
                show={showDetails}
                service={selectedService}
                onClose={() => {

                    setShowDetails(false);
                    setSelectedService(null);

                }}
            />


            {/* ============================================================
                ADD SERVICE
            ============================================================ */}

            <AddServiceModal
                show={showAdd}
                categories={categories}
                onClose={() => {

                    setShowAdd(false);

                }}
                onSuccess={handleModalSuccess}
            />


            {/* ============================================================
                EDIT SERVICE
            ============================================================ */}

            <EditServiceModal
                show={showEdit}
                service={selectedService}
                categories={categories}
                onClose={() => {

                    setShowEdit(false);
                    setSelectedService(null);

                }}
                onSuccess={handleModalSuccess}
            />


            {/* ============================================================
                DELETE SERVICE
            ============================================================ */}

            <DeleteServiceModal
                show={showDelete}
                service={selectedService}
                onClose={() => {

                    setShowDelete(false);
                    setSelectedService(null);

                }}
                onSuccess={handleModalSuccess}
            />

        </>

    );

}


export default Services;