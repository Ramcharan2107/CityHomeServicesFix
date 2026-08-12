import { useEffect, useState } from "react";
import jobAssignmentService from "../../../services/jobAssignmentService";

function JobAssignmentDetailsModal({

    show,

    assignment,

    onClose

}) {

    const [loading, setLoading] = useState(false);

    const [details, setDetails] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!show || !assignment)
            return;

        loadAssignment();

    }, [show, assignment]);

    const loadAssignment = async () => {

        setLoading(true);

        setError("");

        try {

            const data = await jobAssignmentService.getById(

                assignment.assignmentId

            );

            setDetails(data);

        }
        catch (err) {

            console.error(err);

            setError("Failed to load job assignment.");

        }
        finally {

            setLoading(false);

        }

    };

    const formatDate = (date) => {

        if (!date)
            return "-";

        return new Date(date).toLocaleString("en-IN", {

            day: "2-digit",

            month: "short",

            year: "numeric",

            hour: "2-digit",

            minute: "2-digit"

        });

    };

    if (!show)
        return null;

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                background: "rgba(0,0,0,.45)"
            }}
        >

            <div className="modal-dialog modal-xl modal-dialog-centered">

                <div
                    className="modal-content border-0 shadow-lg"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div
                        className="modal-header"
                        style={{
                            background: "#0B2E4F",
                            color: "#fff"
                        }}
                    >

                        <h4 className="fw-bold mb-0">

                            Job Assignment Details

                        </h4>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body p-4">
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

                                Loading Job Assignment...

                            </h5>

                        </div>

                    ) : error ? (

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    ) : (

                        <>

                            {/* ================= Header ================= */}

                            <div className="row align-items-center mb-4">

                                <div className="col-lg-3 text-center">

                                    <div
                                        className="rounded-circle d-flex justify-content-center align-items-center mx-auto"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            background: "#0B2E4F",
                                            color: "#fff",
                                            fontSize: "48px"
                                        }}
                                    >

                                        <i className="bi bi-clipboard-check"></i>

                                    </div>

                                </div>

                                <div className="col-lg-9">

                                    <h2
                                        className="fw-bold mb-2"
                                        style={{
                                            color: "#0B2E4F"
                                        }}
                                    >

                                        Assignment #{details.assignmentId}

                                    </h2>

                                    <div className="d-flex flex-wrap gap-2">

                                        <span className="badge bg-primary">

                                            Request #{details.requestId}

                                        </span>

                                        <span
                                            className={`badge ${
                                                details.status === "Completed"
                                                    ? "bg-success"
                                                    : details.status === "In Progress"
                                                    ? "bg-warning text-dark"
                                                    : "bg-primary"
                                            }`}
                                        >

                                            {details.status}

                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* ================= Information ================= */}

                            <div className="row g-4">

                                <div className="col-lg-6">

                                    <div
                                        className="card border shadow-sm h-100"
                                        style={{
                                            borderRadius: "15px"
                                        }}
                                    >

                                        <div className="card-body">

                                            <h5
                                                className="fw-bold mb-4"
                                                style={{
                                                    color: "#0B2E4F"
                                                }}
                                            >

                                                Assignment Information

                                            </h5>

                                            <table className="table table-borderless mb-0">

                                                <tbody>

                                                    <tr>

                                                        <th width="45%">

                                                            Assignment ID

                                                        </th>

                                                        <td>

                                                            #{details.assignmentId}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Request ID

                                                        </th>

                                                        <td>

                                                            #{details.requestId}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Assigned Date

                                                        </th>

                                                        <td>

                                                            {formatDate(details.assignedDate)}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Scheduled Start

                                                        </th>

                                                        <td>

                                                            {formatDate(details.scheduledStart)}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Scheduled End

                                                        </th>

                                                        <td>

                                                            {formatDate(details.scheduledEnd)}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Status

                                                        </th>

                                                        <td>

                                                            <span
                                                                className={`badge ${
                                                                    details.status === "Completed"
                                                                        ? "bg-success"
                                                                        : details.status === "In Progress"
                                                                        ? "bg-warning text-dark"
                                                                        : "bg-primary"
                                                                }`}
                                                            >

                                                                {details.status}

                                                            </span>

                                                        </td>

                                                    </tr>

                                                </tbody>

                                            </table>

                                        </div>

                                    </div>

                                </div>

                                <div className="col-lg-6">

                                    <div
                                        className="card border shadow-sm h-100"
                                        style={{
                                            borderRadius: "15px"
                                        }}
                                    >

                                        <div className="card-body">

                                            <h5
                                                className="fw-bold mb-4"
                                                style={{
                                                    color: "#0B2E4F"
                                                }}
                                            >

                                                Assignment Details

                                            </h5>

                                            <table className="table table-borderless mb-0">

                                                <tbody>

                                                    <tr>

                                                        <th width="45%">

                                                            Technician

                                                        </th>

                                                        <td>

                                                            {details.technician?.user
                                                                ? `${details.technician.user.firstName} ${details.technician.user.lastName}`
                                                                : details.technician?.employeeCode || "-"}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Employee Code

                                                        </th>

                                                        <td>

                                                            {details.technician?.employeeCode || "-"}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Current Status

                                                        </th>

                                                        <td>

                                                            {details.status}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Remarks

                                                        </th>

                                                        <td>

                                                            {details.remarks || "-"}

                                                        </td>

                                                    </tr>

                                                </tbody>

                                            </table>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </>

                    )}
                                        <div
                        className="modal-footer"
                        style={{
                            background: "#F8F9FA"
                        }}
                    >

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >

                            <i className="bi bi-x-circle me-2"></i>

                            Close

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>);

}

export default JobAssignmentDetailsModal;