import React, { useEffect, useMemo, useState } from "react";

import customerService from "../../services/customerService";

import CustomerDetailsModal from "./CustomerDetailsModal";
import EditCustomerModal from "./EditCustomerModal";

import PageContainer from "../../components/common/PageContainer";

function Customers() {

    const [customers, setCustomers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [showDetails, setShowDetails] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {

        loadCustomers();

    }, []);

    const loadCustomers = async () => {

        setLoading(true);

        try {

            const data = await customerService.getAll();

            setCustomers(data);

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };

    const filteredCustomers = useMemo(() => {

        return customers.filter(customer => {

            const keyword = search.toLowerCase();

            const fullName =
                `${customer.firstName} ${customer.lastName}`.toLowerCase();

            const matchesSearch =

                fullName.includes(keyword) ||

                customer.email?.toLowerCase().includes(keyword) ||

                customer.phoneNumber?.toLowerCase().includes(keyword) ||

                customer.customerCode?.toLowerCase().includes(keyword);

            const matchesStatus =

                statusFilter === "All" ||

                (statusFilter === "Active" && customer.isActive) ||

                (statusFilter === "Inactive" && !customer.isActive);

            return matchesSearch && matchesStatus;

        });

    }, [customers, search, statusFilter]);

    const totalCustomers = customers.length;

    const activeCustomers =
        customers.filter(x => x.isActive).length;

    const inactiveCustomers =
        customers.filter(x => !x.isActive).length;

    const individualCustomers =
        customers.filter(
            x => x.customerType === "Individual"
        ).length;

    const handleView = customer => {

        setSelectedCustomer(customer);

        setShowDetails(true);

    };

    const handleEdit = customer => {

            setSelectedCustomer(customer);

            setShowEdit(true);

        };

        const handleDelete = async (customer) => {

        if (!window.confirm(`Delete ${customer.firstName} ${customer.lastName}?`))
            return;

        try {

            await customerService.delete(customer.customerId);

            loadCustomers();

        }
        catch (err) {

            console.error(err);

        }

    };

    const handleRefresh = () => {

        loadCustomers();

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
                        Customer Management
                    </h2>

                    <p className="text-muted mb-0">
                        View and manage all customers registered through the website.
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
                        className="btn"
                        style={{
                            background: "#0B2E4F",
                            color: "#fff"
                        }}
                    >
                        <i className="bi bi-download me-2"></i>

                        Export

                    </button>

                </div>

            </div>

            {/* ================= Dashboard Cards ================= */}

            <div className="row g-4 mb-4">

                <div className="col-lg-3 col-md-6">

                    <div
                        className="card border shadow-sm h-100"
                        style={{
                            borderRadius: "18px"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-muted">
                                        Total Customers
                                    </small>

                                    <h2
                                        className="fw-bold mt-2"
                                        style={{
                                            color: "#0B2E4F"
                                        }}
                                    >
                                        {totalCustomers}
                                    </h2>

                                </div>

                                <div
                                    className="rounded-circle d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        background: "#E8F1FD"
                                    }}
                                >

                                    <i
                                        className="bi bi-people-fill"
                                        style={{
                                            fontSize: "28px",
                                            color: "#0B2E4F"
                                        }}
                                    ></i>

                                </div>

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

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-muted">
                                        Active Customers
                                    </small>

                                    <h2 className="fw-bold text-success mt-2">

                                        {activeCustomers}

                                    </h2>

                                </div>

                                <div
                                    className="rounded-circle d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        background: "#EAF7EE"
                                    }}
                                >

                                    <i
                                        className="bi bi-person-check-fill"
                                        style={{
                                            fontSize: "28px",
                                            color: "#198754"
                                        }}
                                    ></i>

                                </div>

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

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-muted">
                                        Inactive Customers
                                    </small>

                                    <h2 className="fw-bold text-danger mt-2">

                                        {inactiveCustomers}

                                    </h2>

                                </div>

                                <div
                                    className="rounded-circle d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        background: "#FDECEC"
                                    }}
                                >

                                    <i
                                        className="bi bi-person-x-fill"
                                        style={{
                                            fontSize: "28px",
                                            color: "#DC3545"
                                        }}
                                    ></i>

                                </div>

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

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-muted">
                                        Individual Customers
                                    </small>

                                    <h2
                                        className="fw-bold mt-2"
                                        style={{
                                            color: "#F7941D"
                                        }}
                                    >
                                        {individualCustomers}
                                    </h2>

                                </div>

                                <div
                                    className="rounded-circle d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        background: "#FFF4E6"
                                    }}
                                >

                                    <i
                                        className="bi bi-person-badge-fill"
                                        style={{
                                            fontSize: "28px",
                                            color: "#F7941D"
                                        }}
                                    ></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= Toolbar ================= */}

            <div
                className="card border shadow-sm mb-4"
                style={{
                    borderRadius: "18px"
                }}
            >

                <div className="card-body">

                    <div className="row g-3">

                        <div className="col-lg-8">

                            <div className="input-group">

                                <span className="input-group-text bg-white">

                                    <i className="bi bi-search"></i>

                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Name, Email, Phone or Customer Code..."
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
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
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

                    </div>

                </div>

            </div>

            {/* ================= Customers Table ================= */}

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
                                Loading Registered Customers...
                            </h5>

                        </div>

                    ) : filteredCustomers.length === 0 ? (

                        <div className="text-center py-5">

                            <i
                                className="bi bi-people"
                                style={{
                                    fontSize: "70px",
                                    color: "#CED4DA"
                                }}
                            ></i>

                            <h4 className="mt-3 fw-bold">
                                No Registered Customers
                            </h4>

                            <p className="text-muted">
                                Registered customers will automatically appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table align-middle table-hover">

                                <thead
                                    className="table-light"
                                >

                                    <tr>

                                        <th>Customer</th>

                                        <th>Customer Code</th>

                                        <th>Phone</th>

                                        <th>Customer Type</th>

                                        <th>Status</th>

                                        <th
                                            className="text-center"
                                            width="240"
                                        >
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredCustomers.map(customer => (

                                        <tr key={customer.customerId}>

                                            <td>

                                                <div className="d-flex align-items-center">

                                                    <div
                                                        className="rounded-circle d-flex justify-content-center align-items-center me-3"
                                                        style={{
                                                            width: "50px",
                                                            height: "50px",
                                                            background: "#0B2E4F",
                                                            color: "#fff",
                                                            fontWeight: "bold",
                                                            fontSize: "18px"
                                                        }}
                                                    >

                                                        {customer.firstName?.charAt(0)}
                                                        {customer.lastName?.charAt(0)}

                                                    </div>

                                                    <div>

                                                        <div className="fw-bold">

                                                            {customer.firstName} {customer.lastName}

                                                        </div>

                                                        <small className="text-muted">

                                                            {customer.email}

                                                        </small>

                                                    </div>

                                                </div>

                                            </td>

                                            <td>

                                                <span className="badge bg-light text-dark border">

                                                    {customer.customerCode}

                                                </span>

                                            </td>

                                            <td>

                                                {customer.phoneNumber || "-"}

                                            </td>

                                            <td>

                                                <span
                                                    className={`badge ${
                                                        customer.customerType === "Premium"
                                                            ? "bg-warning text-dark"
                                                            : "bg-info"
                                                    }`}
                                                >

                                                    {customer.customerType}

                                                </span>

                                            </td>

                                            <td>

                                                {customer.isActive ? (

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
                                                        title="View Customer"
                                                        onClick={() =>
                                                            handleView(customer)
                                                        }
                                                    >

                                                        <i className="bi bi-eye"></i>

                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-warning"
                                                        title="Edit Customer"
                                                        onClick={() =>
                                                            handleEdit(customer)
                                                        }
                                                    >

                                                        <i className="bi bi-pencil-square"></i>

                                                    </button>

                                                    <button
                                                        className={`btn btn-sm ${
                                                            customer.isActive
                                                                ? "btn-outline-secondary"
                                                                : "btn-outline-success"
                                                        }`}
                                                        title={
                                                            customer.isActive
                                                                ? "Deactivate Customer"
                                                                : "Activate Customer"
                                                        }
                                                    >

                                                        <i
                                                            className={`bi ${
                                                                customer.isActive
                                                                    ? "bi-person-x"
                                                                    : "bi-person-check"
                                                            }`}
                                                        ></i>

                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        title="Delete Customer"
                                                        onClick={() =>
                                                            handleDelete(customer)
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

        {/* ================= Modals ================= */}

        <CustomerDetailsModal
            show={showDetails}
            customerId={selectedCustomer?.customerId}
            onClose={() => {

                setShowDetails(false);

                setSelectedCustomer(null);

            }}
        />

        <EditCustomerModal
            show={showEdit}
            customer={selectedCustomer}
            onClose={() => {

                setShowEdit(false);

                setSelectedCustomer(null);

            }}
            onSuccess={loadCustomers}
        />

    </>

);

}

export default Customers;