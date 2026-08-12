import { useEffect, useMemo, useState } from "react";

import jobAssignmentService from "../../../services/jobAssignmentService";

import JobAssignmentDetailsModal from "./JobAssignmentDetailsModal";
import AddJobAssignmentModal from "./AddJobAssignmentModal";
import EditJobAssignmentModal from "./EditJobAssignmentModal";
import DeleteJobAssignmentModal from "./DeleteJobAssignmentModal";

import PageContainer from "../../../components/common/PageContainer";

function JobAssignments() {

    const [assignments, setAssignments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedAssignment, setSelectedAssignment] = useState(null);

    const [showDetails, setShowDetails] = useState(false);

    const [showAdd, setShowAdd] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {

        loadAssignments();

    }, []);

    const loadAssignments = async () => {

        setLoading(true);

        try {

            const data = await jobAssignmentService.getAll();

            setAssignments(data);

        }
        catch (err) {

            console.error(err);

        }
        finally {

            setLoading(false);

        }

    };

    const filteredAssignments = useMemo(() => {

        return assignments.filter((assignment) => {

            const keyword = search.toLowerCase();

            const matchesSearch =

                assignment.request?.requestNumber
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                assignment.technician?.employeeCode
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                assignment.status
                    ?.toLowerCase()
                    .includes(keyword);

            const matchesStatus =

                statusFilter === "All"

                ||

                assignment.status === statusFilter;

            return matchesSearch && matchesStatus;

        });

    }, [

        assignments,

        search,

        statusFilter

    ]);

    const totalAssignments = assignments.length;

    const assignedJobs = assignments.filter(

        x => x.status === "Assigned"

    ).length;

    const inProgressJobs = assignments.filter(

        x => x.status === "In Progress"

    ).length;

    const completedJobs = assignments.filter(

        x => x.status === "Completed"

    ).length;

    const handleRefresh = () => {

        loadAssignments();

    };

    const handleView = (assignment) => {

        setSelectedAssignment(assignment);

        setShowDetails(true);

    };

    const handleEdit = (assignment) => {

        setSelectedAssignment(assignment);

        setShowEdit(true);

    };

    const handleDelete = (assignment) => {

        setSelectedAssignment(assignment);

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

                        Job Assignment Management

                    </h2>

                    <p className="text-muted mb-0">

                        Manage technician assignments for service requests.

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
                            background: "#F7941D",
                            color: "#fff"
                        }}
                        onClick={handleAdd}
                    >

                        <i className="bi bi-plus-circle me-2"></i>

                        Assign Job

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

                            <small className="text-muted">

                                Total Assignments

                            </small>

                            <h2
                                className="fw-bold mt-2"
                                style={{
                                    color: "#0B2E4F"
                                }}
                            >

                                {totalAssignments}

                            </h2>

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

                            <small className="text-muted">

                                Assigned

                            </small>

                            <h2 className="fw-bold text-primary mt-2">

                                {assignedJobs}

                            </h2>

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

                            <small className="text-muted">

                                In Progress

                            </small>

                            <h2 className="fw-bold text-warning mt-2">

                                {inProgressJobs}

                            </h2>

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

                            <small className="text-muted">

                                Completed

                            </small>

                            <h2 className="fw-bold text-success mt-2">

                                {completedJobs}

                            </h2>

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
                                    placeholder="Search by Request Number, Technician or Status..."
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

                                <option value="Assigned">

                                    Assigned

                                </option>

                                <option value="In Progress">

                                    In Progress

                                </option>

                                <option value="Completed">

                                    Completed

                                </option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= Assignments Table ================= */}

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

                                Loading Job Assignments...

                            </h5>

                        </div>

                    ) : filteredAssignments.length === 0 ? (

                        <div className="text-center py-5">

                            <i
                                className="bi bi-clipboard-check"
                                style={{
                                    fontSize: "70px",
                                    color: "#CED4DA"
                                }}
                            ></i>

                            <h4 className="mt-3 fw-bold">

                                No Job Assignments Found

                            </h4>

                            <p className="text-muted">

                                Click "Assign Job" to create the first assignment.

                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-light">

                                    <tr>

                                        <th>ID</th>

                                        <th>Request ID</th>

                                        <th>Technician</th>

                                        <th>Assigned Date</th>

                                        <th>Status</th>

                                        <th className="text-center" width="180">

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredAssignments.map((assignment) => (

                                        <tr key={assignment.assignmentId}>

                                            <td>

                                                #{assignment.assignmentId}

                                            </td>

                                            <td>

                                                #{assignment.requestId}

                                            </td>

                                            <td>

                                                {assignment.technician?.user
                                                    ? `${assignment.technician.user.firstName} ${assignment.technician.user.lastName}`
                                                    : assignment.technician?.employeeCode || "-"}

                                            </td>

                                            <td>

                                                {new Date(
                                                    assignment.assignedDate
                                                ).toLocaleDateString("en-IN")}

                                            </td>

                                            <td>

                                                {assignment.status === "Completed" ? (

                                                    <span className="badge bg-success">

                                                        Completed

                                                    </span>

                                                ) : assignment.status === "In Progress" ? (

                                                    <span className="badge bg-warning text-dark">

                                                        In Progress

                                                    </span>

                                                ) : (

                                                    <span className="badge bg-primary">

                                                        Assigned

                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                <div className="d-flex justify-content-center gap-2">

                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            handleView(assignment)
                                                        }
                                                    >

                                                        <i className="bi bi-eye"></i>

                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-warning"
                                                        onClick={() =>
                                                            handleEdit(assignment)
                                                        }
                                                    >

                                                        <i className="bi bi-pencil"></i>

                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            handleDelete(assignment)
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

        <JobAssignmentDetailsModal
            show={showDetails}
            assignment={selectedAssignment}
            onClose={() => {

                setShowDetails(false);

                setSelectedAssignment(null);

            }}
        />

        <AddJobAssignmentModal
            show={showAdd}
            onClose={() => setShowAdd(false)}
            onSuccess={loadAssignments}
        />

        <EditJobAssignmentModal
            show={showEdit}
            assignment={selectedAssignment}
            onClose={() => {

                setShowEdit(false);

                setSelectedAssignment(null);

            }}
            onSuccess={loadAssignments}
        />

        <DeleteJobAssignmentModal
            show={showDelete}
            assignment={selectedAssignment}
            onClose={() => {

                setShowDelete(false);

                setSelectedAssignment(null);

            }}
            onSuccess={loadAssignments}
        />

    </>

);

}

export default JobAssignments;