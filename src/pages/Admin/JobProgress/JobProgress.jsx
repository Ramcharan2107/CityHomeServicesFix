import { useEffect, useMemo, useState } from "react";

import jobProgressService from "../../../services/jobProgressService";

import JobProgressDetailsModal from "./JobProgressDetailsModal";
import AddJobProgressModal from "./AddJobProgressModal";
import EditJobProgressModal from "./EditJobProgressModal";
import DeleteJobProgressModal from "./DeleteJobProgressModal";

import PageContainer from "../../../components/common/PageContainer";

function JobProgress() {

    const [progressList, setProgressList] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedProgress, setSelectedProgress] = useState(null);

    const [showDetails, setShowDetails] = useState(false);

    const [showAdd, setShowAdd] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {

        loadProgress();

    }, []);

    const loadProgress = async () => {

        setLoading(true);

        try {

            const data = await jobProgressService.getAll();

            setProgressList(data);

        }
        catch (err) {

            console.error(err);

        }
        finally {

            setLoading(false);

        }

    };

    const filteredProgress = useMemo(() => {

        return progressList.filter((item) => {

            const keyword = search.toLowerCase();

            const matchesSearch =

                item.progressStatus
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                item.assignmentId
                    ?.toString()
                    .includes(keyword);

            const matchesStatus =

                statusFilter === "All"

                ||

                item.progressStatus === statusFilter;

            return matchesSearch && matchesStatus;

        });

    }, [

        progressList,

        search,

        statusFilter

    ]);

    const totalProgress = progressList.length;

    const startedCount = progressList.filter(

        x => x.progressStatus === "Started"

    ).length;

    const inProgressCount = progressList.filter(

        x => x.progressStatus === "In Progress"

    ).length;

    const completedCount = progressList.filter(

        x => x.progressStatus === "Completed"

    ).length;

    const handleRefresh = () => {

        loadProgress();

    };

    const handleView = (progress) => {

        setSelectedProgress(progress);

        setShowDetails(true);

    };

    const handleEdit = (progress) => {

        setSelectedProgress(progress);

        setShowEdit(true);

    };

    const handleDelete = (progress) => {

        setSelectedProgress(progress);

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

                        Job Progress Management

                    </h2>

                    <p className="text-muted mb-0">

                        Track and manage technician job progress updates.

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

                        Add Progress

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

                                Total Progress Records

                            </small>

                            <h2
                                className="fw-bold mt-2"
                                style={{
                                    color: "#0B2E4F"
                                }}
                            >

                                {totalProgress}

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

                                Started

                            </small>

                            <h2 className="fw-bold text-primary mt-2">

                                {startedCount}

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

                                {inProgressCount}

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

                                {completedCount}

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
                                    placeholder="Search by Assignment ID or Status..."
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

                                <option value="Started">

                                    Started

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

            {/* ================= Progress Table ================= */}

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

                                Loading Job Progress...

                            </h5>

                        </div>

                    ) : filteredProgress.length === 0 ? (

                        <div className="text-center py-5">

                            <i
                                className="bi bi-list-check"
                                style={{
                                    fontSize: "70px",
                                    color: "#CED4DA"
                                }}
                            ></i>

                            <h4 className="mt-3 fw-bold">

                                No Job Progress Found

                            </h4>

                            <p className="text-muted">

                                Click "Add Progress" to create the first progress update.

                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-light">

                                    <tr>

                                        <th>ID</th>

                                        <th>Assignment</th>

                                        <th>Status</th>

                                        <th>Updated Time</th>

                                        <th className="text-center" width="180">

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredProgress.map((progress) => (

                                        <tr key={progress.progressId}>

                                            <td>

                                                #{progress.progressId}

                                            </td>

                                            <td>

                                                #{progress.assignmentId}

                                            </td>

                                            <td>

                                                {progress.progressStatus === "Completed" ? (

                                                    <span className="badge bg-success">

                                                        Completed

                                                    </span>

                                                ) : progress.progressStatus === "In Progress" ? (

                                                    <span className="badge bg-warning text-dark">

                                                        In Progress

                                                    </span>

                                                ) : (

                                                    <span className="badge bg-primary">

                                                        {progress.progressStatus}

                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                {new Date(
                                                    progress.progressTime
                                                ).toLocaleString("en-IN")}

                                            </td>

                                            <td>

                                                <div className="d-flex justify-content-center gap-2">

                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            handleView(progress)
                                                        }
                                                    >

                                                        <i className="bi bi-eye"></i>

                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-warning"
                                                        onClick={() =>
                                                            handleEdit(progress)
                                                        }
                                                    >

                                                        <i className="bi bi-pencil"></i>

                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            handleDelete(progress)
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

        <JobProgressDetailsModal
            show={showDetails}
            progress={selectedProgress}
            onClose={() => {

                setShowDetails(false);

                setSelectedProgress(null);

            }}
        />

        <AddJobProgressModal
            show={showAdd}
            onClose={() => setShowAdd(false)}
            onSuccess={loadProgress}
        />

        <EditJobProgressModal
            show={showEdit}
            progress={selectedProgress}
            onClose={() => {

                setShowEdit(false);

                setSelectedProgress(null);

            }}
            onSuccess={loadProgress}
        />

        <DeleteJobProgressModal
            show={showDelete}
            progress={selectedProgress}
            onClose={() => {

                setShowDelete(false);

                setSelectedProgress(null);

            }}
            onSuccess={loadProgress}
        />

    </>

);

}

export default JobProgress;