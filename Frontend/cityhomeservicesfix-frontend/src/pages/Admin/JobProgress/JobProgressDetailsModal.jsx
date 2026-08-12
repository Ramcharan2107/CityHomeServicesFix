import { useEffect, useState } from "react";

import jobProgressService from "../../../services/jobProgressService";

function JobProgressDetailsModal({

    show,

    progress,

    onClose

}) {

    const [loading, setLoading] = useState(false);

    const [details, setDetails] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!show || !progress)
            return;

        loadProgress();

    }, [show, progress]);

    const loadProgress = async () => {

        setLoading(true);

        setError("");

        try {

            const data = await jobProgressService.getById(

                progress.progressId

            );

            setDetails(data);

        }
        catch (err) {

            console.error(err);

            setError("Failed to load job progress details.");

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

                            Job Progress Details

                        </h4>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body p-4">                    {loading ? (

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

                                        <i className="bi bi-list-check"></i>

                                    </div>

                                </div>

                                <div className="col-lg-9">

                                    <h2
                                        className="fw-bold mb-2"
                                        style={{
                                            color: "#0B2E4F"
                                        }}
                                    >

                                        Progress #{details.progressId}

                                    </h2>

                                    <div className="d-flex flex-wrap gap-2">

                                        <span className="badge bg-primary">

                                            Assignment #{details.assignmentId}

                                        </span>

                                        <span
                                            className={`badge ${
                                                details.progressStatus === "Completed"
                                                    ? "bg-success"
                                                    : details.progressStatus === "In Progress"
                                                    ? "bg-warning text-dark"
                                                    : "bg-primary"
                                            }`}
                                        >

                                            {details.progressStatus}

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

                                                Progress Information

                                            </h5>

                                            <table className="table table-borderless mb-0">

                                                <tbody>

                                                    <tr>

                                                        <th width="45%">

                                                            Progress ID

                                                        </th>

                                                        <td>

                                                            #{details.progressId}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Assignment ID

                                                        </th>

                                                        <td>

                                                            #{details.assignmentId}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Status

                                                        </th>

                                                        <td>

                                                            <span
                                                                className={`badge ${
                                                                    details.progressStatus === "Completed"
                                                                        ? "bg-success"
                                                                        : details.progressStatus === "In Progress"
                                                                        ? "bg-warning text-dark"
                                                                        : "bg-primary"
                                                                }`}
                                                            >

                                                                {details.progressStatus}

                                                            </span>

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Progress Time

                                                        </th>

                                                        <td>

                                                            {formatDate(details.progressTime)}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Created At

                                                        </th>

                                                        <td>

                                                            {formatDate(details.createdAt)}

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

                                                Additional Details

                                            </h5>

                                            <table className="table table-borderless mb-0">

                                                <tbody>

                                                    <tr>

                                                        <th width="45%">

                                                            Updated By

                                                        </th>

                                                        <td>

                                                            {details.updatedByNavigation
                                                                ? `${details.updatedByNavigation.firstName} ${details.updatedByNavigation.lastName}`
                                                                : "-"}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Progress Note

                                                        </th>

                                                        <td>

                                                            {details.progressNote || "-"}

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

export default JobProgressDetailsModal;