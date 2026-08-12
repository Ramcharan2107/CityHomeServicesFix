import { useEffect, useMemo, useState } from "react";

import serviceService from "../../../services/serviceService";
import serviceCategoryService from "../../../services/serviceCategoryService";

import ServiceDetailsModal from "./ServiceDetailsModal";
import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";

import PageContainer from "../../../components/common/PageContainer";

function Services() {

    const [services, setServices] = useState([]);

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");

    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedService, setSelectedService] = useState(null);

    const [showDetails, setShowDetails] = useState(false);

    const [showAdd, setShowAdd] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        setLoading(true);

        try {

            const [servicesData, categoriesData] = await Promise.all([

                serviceService.getAll(),

                serviceCategoryService.getAll()

            ]);

            setServices(servicesData);

            setCategories(categoriesData);

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };

    const filteredServices = useMemo(() => {

        return services.filter(service => {

            const keyword = search.toLowerCase();

            const matchesSearch =

                service.serviceName
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                service.serviceCode
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                service.categoryName
                    ?.toLowerCase()
                    .includes(keyword);

            const matchesCategory =

                selectedCategory === "All"

                ||

                service.categoryName === selectedCategory;

            const matchesStatus =

                statusFilter === "All"

                ||

                (statusFilter === "Active" && service.isActive)

                ||

                (statusFilter === "Inactive" && !service.isActive);

            return matchesSearch &&
                   matchesCategory &&
                   matchesStatus;

        });

    }, [

        services,

        search,

        selectedCategory,

        statusFilter

    ]);

    const totalServices = services.length;

    const activeServices =

        services.filter(x => x.isActive).length;

    const inactiveServices =

        services.filter(x => !x.isActive).length;

    const totalCategories = categories.length;

    const handleRefresh = () => {

        loadData();

    };

    const handleView = (service) => {

        setSelectedService(service);

        setShowDetails(true);

    };

    const handleAdd = () => {

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
    return (

    <>

        <PageContainer>

            {/* ================= Header ================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2
                        className="fw-bold mb-1"
                        style={{
                            color: "#0B2E4F"
                        }}
                    >

                        Service Management

                    </h2>

                    <p className="text-muted mb-0">

                        Manage all services available in City Home Services.

                    </p>

                </div>

                <div className="d-flex gap-2">

                    <button
                        className="btn btn-outline-secondary"
                        onClick={handleRefresh}
                    >

                        <i className="bi bi-arrow-clockwise me-2"></i>

                        Refresh

                    </button>

                    <button
                        className="btn btn-outline-success"
                    >

                        <i className="bi bi-download me-2"></i>

                        Export

                    </button>

                    <button
                        className="btn"
                        style={{
                            background: "#F7941D",
                            color: "#fff"
                        }}
                        onClick={handleAdd}
                    >

                        <i className="bi bi-plus-circle me-2"></i>

                        Add Service

                    </button>

                </div>

            </div>

            {/* ================= Statistics ================= */}

            <div className="row g-4 mb-4">

                <div className="col-lg-3 col-md-6">

                    <div
                        className="card border shadow-sm h-100"
                        style={{
                            borderRadius: "18px"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <small className="text-muted">

                                        Total Services

                                    </small>

                                    <h2
                                        className="fw-bold mt-2"
                                        style={{
                                            color: "#0B2E4F"
                                        }}
                                    >

                                        {totalServices}

                                    </h2>

                                </div>

                                <i
                                    className="bi bi-tools"
                                    style={{
                                        fontSize: "45px",
                                        color: "#F7941D"
                                    }}
                                ></i>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div
                        className="card border shadow-sm h-100"
                        style={{
                            borderRadius: "18px"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <small className="text-muted">

                                        Active Services

                                    </small>

                                    <h2 className="fw-bold text-success mt-2">

                                        {activeServices}

                                    </h2>

                                </div>

                                <i
                                    className="bi bi-check-circle-fill"
                                    style={{
                                        fontSize: "45px",
                                        color: "#198754"
                                    }}
                                ></i>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div
                        className="card border shadow-sm h-100"
                        style={{
                            borderRadius: "18px"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <small className="text-muted">

                                        Inactive Services

                                    </small>

                                    <h2 className="fw-bold text-danger mt-2">

                                        {inactiveServices}

                                    </h2>

                                </div>

                                <i
                                    className="bi bi-x-circle-fill"
                                    style={{
                                        fontSize: "45px",
                                        color: "#DC3545"
                                    }}
                                ></i>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div
                        className="card border shadow-sm h-100"
                        style={{
                            borderRadius: "18px"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <small className="text-muted">

                                        Categories

                                    </small>

                                    <h2
                                        className="fw-bold mt-2"
                                        style={{
                                            color: "#0B2E4F"
                                        }}
                                    >

                                        {totalCategories}

                                    </h2>

                                </div>

                                <i
                                    className="bi bi-grid-fill"
                                    style={{
                                        fontSize: "45px",
                                        color: "#0B2E4F"
                                    }}
                                ></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= Search & Filters ================= */}

            <div
                className="card border shadow-sm mb-4"
                style={{
                    borderRadius: "18px"
                }}
            >

                <div className="card-body">

                    <div className="row g-3">

                        <div className="col-lg-4">

                            <div className="input-group">

                                <span className="input-group-text bg-white">

                                    <i className="bi bi-search"></i>

                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Service..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                        <div className="col-lg-4">

                            <select
                                className="form-select"
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                            >

                                <option value="All">

                                    All Categories

                                </option>

                                {categories.map(category => (

                                    <option
                                        key={category.categoryId}
                                        value={category.categoryName}
                                    >

                                        {category.categoryName}

                                    </option>

                                ))}

                            </select>

                        </div>

                        <div className="col-lg-4">

                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
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

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= Services Table ================= */}

            <div
                className="card border shadow-sm"
                style={{
                    borderRadius: "18px"
                }}
            >

                <div className="card-body">
                                        {loading ? (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-warning"
                                style={{
                                    width: "3rem",
                                    height: "3rem"
                                }}
                            ></div>

                            <h5 className="mt-3">

                                Loading Services...

                            </h5>

                        </div>

                    ) : filteredServices.length === 0 ? (

                        <div className="text-center py-5">

                            <i
                                className="bi bi-tools"
                                style={{
                                    fontSize: "70px",
                                    color: "#CED4DA"
                                }}
                            ></i>

                            <h4 className="mt-3 fw-bold">

                                No Services Found

                            </h4>

                            <p className="text-muted">

                                Click "Add Service" to create your first service.

                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-light">

                                    <tr>

                                        <th width="80">

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

                                        <th
                                            className="text-center"
                                            width="220"
                                        >

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredServices.map(service => (

                                        <tr key={service.serviceId}>

                                            <td>

                                                <strong>

                                                    #{service.serviceId}

                                                </strong>

                                            </td>

                                            <td>

                                                <div className="d-flex align-items-center">

                                                    <div
                                                        className="rounded-circle me-3 d-flex justify-content-center align-items-center"
                                                        style={{
                                                            width: "45px",
                                                            height: "45px",
                                                            background: "#E8F1FD",
                                                            color: "#0B2E4F"
                                                        }}
                                                    >

                                                        <i className="bi bi-tools"></i>

                                                    </div>

                                                    <div>

                                                        <div className="fw-bold">

                                                            {service.serviceName}

                                                        </div>

                                                        <small className="text-muted">

                                                            {service.serviceCode}

                                                        </small>

                                                    </div>

                                                </div>

                                            </td>

                                            <td>

                                                {service.categoryName}

                                            </td>

                                            <td>

                                                ₹ {service.basePrice}

                                            </td>

                                            <td>

                                                {service.estimatedHours} hrs

                                            </td>

                                            <td>

                                                {service.isActive ? (

                                                    <span className="badge bg-success">

                                                        Active

                                                    </span>

                                                ) : (

                                                    <span className="badge bg-danger">

                                                        Inactive

                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                <div className="d-flex justify-content-center gap-2">

                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            handleView(service)
                                                        }
                                                    >

                                                        <i className="bi bi-eye"></i>

                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-warning"
                                                        onClick={() =>
                                                            handleEdit(service)
                                                        }
                                                    >

                                                        <i className="bi bi-pencil-square"></i>

                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            handleDelete(service)
                                                        }
                                                    >

                                                        <i className="bi bi-trash"></i>

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </PageContainer>

        <ServiceDetailsModal
            show={showDetails}
            service={selectedService}
            onClose={() => {

                setShowDetails(false);

                setSelectedService(null);

            }}
        />

        <AddServiceModal
            show={showAdd}
            categories={categories}
            onClose={() => {

                setShowAdd(false);

            }}
            onSuccess={loadData}
        />

        <EditServiceModal
            show={showEdit}
            service={selectedService}
            categories={categories}
            onClose={() => {

                setShowEdit(false);

                setSelectedService(null);

            }}
            onSuccess={loadData}
        />

        <DeleteServiceModal
            show={showDelete}
            service={selectedService}
            onClose={() => {

                setShowDelete(false);

                setSelectedService(null);

            }}
            onSuccess={loadData}
        />

    </>

);

}

export default Services;