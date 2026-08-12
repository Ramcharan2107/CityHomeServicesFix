import { useEffect, useMemo, useState } from "react";

import technicianService from "../../../services/technicianService";

import TechnicianDetailsModal from "./TechnicianDetailsModal";
import AddTechnicianModal from "./AddTechnicianModal";
import EditTechnicianModal from "./EditTechnicianModal";
import DeleteTechnicianModal from "./DeleteTechnicianModal";

import PageContainer from "../../../components/common/PageContainer";

function Technicians() {

    const [technicians, setTechnicians] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedTechnician, setSelectedTechnician] = useState(null);

    const [showDetails, setShowDetails] = useState(false);

    const [showAdd, setShowAdd] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {

        loadTechnicians();

    }, []);

    const loadTechnicians = async () => {

        setLoading(true);

        try {

            const data = await technicianService.getAll();

            setTechnicians(data);

        }
        catch (err) {

            console.error(err);

        }
        finally {

            setLoading(false);

        }

    };

    const filteredTechnicians = useMemo(() => {

        return technicians.filter((technician) => {

            const keyword = search.toLowerCase();

            const matchesSearch =

                technician.employeeCode
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                technician.user?.firstName
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                technician.user?.lastName
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                technician.user?.email
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                technician.department
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                technician.designation
                    ?.toLowerCase()
                    .includes(keyword);

            const matchesStatus =

                statusFilter === "All"

                ||

                technician.currentStatus === statusFilter;

            return matchesSearch && matchesStatus;

        });

    }, [

        technicians,

        search,

        statusFilter

    ]);

    const totalTechnicians = technicians.length;

    const availableTechnicians = technicians.filter(

        x => x.currentStatus === "Available"

    ).length;

    const busyTechnicians = technicians.filter(

        x => x.currentStatus === "Busy"

    ).length;

    const inactiveTechnicians = technicians.filter(

        x => !x.isAvailable

    ).length;

    const handleRefresh = () => {

        loadTechnicians();

    };

    const handleView = (technician) => {

        setSelectedTechnician(technician);

        setShowDetails(true);

    };

    const handleEdit = (technician) => {

        setSelectedTechnician(technician);

        setShowEdit(true);

    };

    const handleDelete = (technician) => {

        setSelectedTechnician(technician);

        setShowDelete(true);

    };

    const handleAdd = () => {

        setShowAdd(true);

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

                        Technician Management

                    </h2>

                    <p className="text-muted mb-0">

                        Manage all technicians of City Home Services.

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

                        Add Technician

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

                                        Total Technicians

                                    </small>

                                    <h2
                                        className="fw-bold mt-2"
                                        style={{
                                            color: "#0B2E4F"
                                        }}
                                    >

                                        {totalTechnicians}

                                    </h2>

                                </div>

                                <i
                                    className="bi bi-people-fill"
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

                                        Available

                                    </small>

                                    <h2 className="fw-bold text-success mt-2">

                                        {availableTechnicians}

                                    </h2>

                                </div>

                                <i
                                    className="bi bi-person-check-fill"
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

                                        Busy

                                    </small>

                                    <h2 className="fw-bold text-warning mt-2">

                                        {busyTechnicians}

                                    </h2>

                                </div>

                                <i
                                    className="bi bi-person-workspace"
                                    style={{
                                        fontSize: "45px",
                                        color: "#FFC107"
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

                                        Inactive

                                    </small>

                                    <h2 className="fw-bold text-danger mt-2">

                                        {inactiveTechnicians}

                                    </h2>

                                </div>

                                <i
                                    className="bi bi-person-x-fill"
                                    style={{
                                        fontSize: "45px",
                                        color: "#DC3545"
                                    }}
                                ></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= Search & Filter ================= */}

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
                                    placeholder="Search Technician..."
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

                            </select>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= Technicians Table ================= */}

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

                                Loading Technicians...

                            </h5>

                        </div>

                    ) : filteredTechnicians.length === 0 ? (

                        <div className="text-center py-5">

                            <i
                                className="bi bi-person-workspace"
                                style={{
                                    fontSize: "70px",
                                    color: "#CED4DA"
                                }}
                            ></i>

                            <h4 className="mt-3 fw-bold">

                                No Technicians Found

                            </h4>

                            <p className="text-muted">

                                Click "Add Technician" to create your first technician.

                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-light">

                                    <tr>

                                        <th>ID</th>

                                        <th>Employee Code</th>

                                        <th>Name</th>

                                        <th>Department</th>

                                        <th>Designation</th>

                                        <th>Experience</th>

                                        <th>Hourly Rate</th>

                                        <th>Status</th>

                                        <th
                                            className="text-center"
                                            width="180"
                                        >

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredTechnicians.map((technician) => (

                                        <tr key={technician.technicianId}>

                                            <td>

                                                #{technician.technicianId}

                                            </td>

                                            <td>

                                                <strong>

                                                    {technician.employeeCode}

                                                </strong>

                                            </td>

                                            <td>

                                                {technician.user?.firstName}{" "}

                                                {technician.user?.lastName}

                                            </td>

                                            <td>

                                                {technician.department || "-"}

                                            </td>

                                            <td>

                                                {technician.designation || "-"}

                                            </td>

                                            <td>

                                                {technician.experienceYears ?? 0} Years

                                            </td>

                                            <td>

                                                ₹ {technician.hourlyRate ?? 0}

                                            </td>

                                            <td>

                                                {technician.isAvailable ? (

                                                    <span className="badge bg-success">

                                                        {technician.currentStatus}

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
                                                            handleView(technician)
                                                        }
                                                    >

                                                        <i className="bi bi-eye"></i>

                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-warning"
                                                        onClick={() =>
                                                            handleEdit(technician)
                                                        }
                                                    >

                                                        <i className="bi bi-pencil"></i>

                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            handleDelete(technician)
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

        <TechnicianDetailsModal
            show={showDetails}
            technician={selectedTechnician}
            onClose={() => {

                setShowDetails(false);

                setSelectedTechnician(null);

            }}
        />

        <AddTechnicianModal
            show={showAdd}
            onClose={() => {

                setShowAdd(false);

            }}
            onSuccess={loadTechnicians}
        />

        <EditTechnicianModal
            show={showEdit}
            technician={selectedTechnician}
            onClose={() => {

                setShowEdit(false);

                setSelectedTechnician(null);

            }}
            onSuccess={loadTechnicians}
        />

        <DeleteTechnicianModal
            show={showDelete}
            technician={selectedTechnician}
            onClose={() => {

                setShowDelete(false);

                setSelectedTechnician(null);

            }}
            onSuccess={loadTechnicians}
        />

    </>

);

}

export default Technicians;