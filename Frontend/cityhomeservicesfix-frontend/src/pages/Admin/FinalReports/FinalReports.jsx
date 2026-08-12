import { useEffect, useMemo, useState } from "react";

import finalReportService from "../../../services/finalReportService";

import FinalReportDetailsModal from "./FinalReportDetailsModal";
import AddFinalReportModal from "./AddFinalReportModal";
import EditFinalReportModal from "./EditFinalReportModal";
import DeleteFinalReportModal from "./DeleteFinalReportModal";

import PageContainer from "../../../components/common/PageContainer";

function FinalReports() {

    const [reports, setReports] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [selectedReport, setSelectedReport] = useState(null);

    const [showDetails, setShowDetails] = useState(false);

    const [showAdd, setShowAdd] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {

        loadReports();

    }, []);

    const loadReports = async () => {

        setLoading(true);

        try {

            const data = await finalReportService.getAll();

            setReports(data);

        }
        catch (err) {

            console.error(err);

        }
        finally {

            setLoading(false);

        }

    };

    const filteredReports = useMemo(() => {

        const keyword = search.toLowerCase();

        return reports.filter(report =>

            report.reportId
                ?.toString()
                .includes(keyword)

            ||

            report.assignmentId
                ?.toString()
                .includes(keyword)

            ||

            report.assignment?.technician?.user?.firstName
                ?.toLowerCase()
                .includes(keyword)

            ||

            report.assignment?.technician?.user?.lastName
                ?.toLowerCase()
                .includes(keyword)

            ||

            report.workSummary
                ?.toLowerCase()
                .includes(keyword)

        );

    }, [

        reports,

        search

    ]);

    const totalReports = reports.length;

    const completedToday = reports.filter(x => {

        if (!x.completionDate)
            return false;

        return new Date(x.completionDate)
            .toDateString() === new Date().toDateString();

    }).length;

    const totalHours = reports.reduce(

        (sum, x) => sum + (Number(x.hoursWorked) || 0),

        0

    );

    const totalRevenue = reports.reduce(

        (sum, x) => sum + (Number(x.totalCost) || 0),

        0

    );

    const handleRefresh = () => {

        loadReports();

    };

    const handleView = (report) => {

        setSelectedReport(report);

        setShowDetails(true);

    };

    const handleEdit = (report) => {

        setSelectedReport(report);

        setShowEdit(true);

    };

    const handleDelete = (report) => {

        setSelectedReport(report);

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

                        Final Reports Management

                    </h2>

                    <p className="text-muted mb-0">

                        Manage completed job reports, work summaries and customer acknowledgements.

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

                        Add Report

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

                                Total Reports

                            </small>

                            <h2
                                className="fw-bold mt-2"
                                style={{
                                    color: "#0B2E4F"
                                }}
                            >

                                {totalReports}

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

                                Completed Today

                            </small>

                            <h2 className="fw-bold text-success mt-2">

                                {completedToday}

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

                                Total Hours

                            </small>

                            <h2 className="fw-bold text-primary mt-2">

                                {totalHours.toFixed(1)}

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

                                Total Cost

                            </small>

                            <h2 className="fw-bold text-warning mt-2">

                                ₹{totalRevenue.toLocaleString()}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= Search ================= */}

            <div
                className="card border shadow-sm mb-4"
                style={{
                    borderRadius: "18px"
                }}
            >

                <div className="card-body">

                    <div className="input-group">

                        <span className="input-group-text bg-white">

                            <i className="bi bi-search"></i>

                        </span>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Report ID, Assignment, Technician or Work Summary..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                </div>

            </div>

            {/* ================= Reports Table ================= */}

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

                                Loading Final Reports...

                            </h5>

                        </div>

                    ) : filteredReports.length === 0 ? (

                        <div className="text-center py-5">

                            <i
                                className="bi bi-file-earmark-text"
                                style={{
                                    fontSize: "70px",
                                    color: "#CED4DA"
                                }}
                            ></i>

                            <h4 className="mt-3 fw-bold">

                                No Final Reports Found

                            </h4>

                            <p className="text-muted">

                                Click "Add Report" to create the first final report.

                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-light">

                                    <tr>

                                        <th>Report ID</th>

                                        <th>Assignment</th>

                                        <th>Technician</th>

                                        <th>Hours</th>

                                        <th>Total Cost</th>

                                        <th>Completion Date</th>

                                        <th
                                            className="text-center"
                                            width="180"
                                        >

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredReports.map((report) => (

                                        <tr key={report.reportId}>

                                            <td>

                                                #{report.reportId}

                                            </td>

                                            <td>

                                                #{report.assignmentId}

                                            </td>

                                            <td>

                                                {report.assignment?.technician?.user
                                                    ? `${report.assignment.technician.user.firstName} ${report.assignment.technician.user.lastName}`
                                                    : "-"}

                                            </td>

                                            <td>

                                                {report.hoursWorked ?? "-"}

                                            </td>

                                            <td>

                                                ₹{Number(
                                                    report.totalCost || 0
                                                ).toLocaleString()}

                                            </td>

                                            <td>

                                                {report.completionDate
                                                    ? new Date(
                                                          report.completionDate
                                                      ).toLocaleDateString("en-IN")
                                                    : "-"}

                                            </td>

                                            <td>

                                                <div className="d-flex justify-content-center gap-2">

                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            handleView(report)
                                                        }
                                                    >

                                                        <i className="bi bi-eye"></i>

                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-warning"
                                                        onClick={() =>
                                                            handleEdit(report)
                                                        }
                                                    >

                                                        <i className="bi bi-pencil"></i>

                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            handleDelete(report)
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

        <FinalReportDetailsModal
            show={showDetails}
            report={selectedReport}
            onClose={() => {

                setShowDetails(false);

                setSelectedReport(null);

            }}
        />

        <AddFinalReportModal
            show={showAdd}
            onClose={() => setShowAdd(false)}
            onSuccess={loadReports}
        />

        <EditFinalReportModal
            show={showEdit}
            report={selectedReport}
            onClose={() => {

                setShowEdit(false);

                setSelectedReport(null);

            }}
            onSuccess={loadReports}
        />

        <DeleteFinalReportModal
            show={showDelete}
            report={selectedReport}
            onClose={() => {

                setShowDelete(false);

                setSelectedReport(null);

            }}
            onSuccess={loadReports}
        />

    </>

);

}

export default FinalReports;