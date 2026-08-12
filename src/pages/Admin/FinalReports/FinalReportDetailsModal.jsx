import { useEffect, useState } from "react";

import finalReportService from "../../../services/finalReportService";

function FinalReportDetailsModal({

    show,

    report,

    onClose

}) {

    const [loading, setLoading] = useState(false);

    const [details, setDetails] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!show || !report)
            return;

        loadReport();

    }, [show, report]);

    const loadReport = async () => {

        setLoading(true);

        setError("");

        try {

            const data = await finalReportService.getById(

                report.reportId

            );

            setDetails(data);

        }
        catch (err) {

            console.error(err);

            setError("Failed to load final report details.");

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

                            Final Report Details

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

                                Loading Final Report...

                            </h5>

                        </div>

                    ) : error ? (

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    ) : (

                        <>

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

                                        <i className="bi bi-file-earmark-text"></i>

                                    </div>

                                </div>

                                <div className="col-lg-9">

                                    <h2
                                        className="fw-bold mb-2"
                                        style={{
                                            color: "#0B2E4F"
                                        }}
                                    >

                                        Report #{details.reportId}

                                    </h2>

                                    <div className="d-flex flex-wrap gap-2">

                                        <span className="badge bg-primary">

                                            Assignment #{details.assignmentId}

                                        </span>

                                        <span className="badge bg-success">

                                            Completed

                                        </span>

                                    </div>

                                </div>

                            </div>

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

                                                Report Information

                                            </h5>

                                            <table className="table table-borderless mb-0">

                                                <tbody>

                                                    <tr>

                                                        <th width="45%">

                                                            Report ID

                                                        </th>

                                                        <td>

                                                            #{details.reportId}

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

                                                            Technician

                                                        </th>

                                                        <td>

                                                            {details.assignment?.technician?.user
                                                                ? `${details.assignment.technician.user.firstName} ${details.assignment.technician.user.lastName}`
                                                                : "-"}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Hours Worked

                                                        </th>

                                                        <td>

                                                            {details.hoursWorked ?? "-"}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Total Cost

                                                        </th>

                                                        <td>

                                                            ₹{Number(details.totalCost || 0).toLocaleString()}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Completion Date

                                                        </th>

                                                        <td>

                                                            {formatDate(details.completionDate)}

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

                                                Report Details

                                            </h5>

                                            <div className="mb-4">

                                                <label className="fw-semibold d-block mb-2">

                                                    Work Summary

                                                </label>

                                                <div className="border rounded p-3 bg-light">

                                                    {details.workSummary || "-"}

                                                </div>

                                            </div>

                                            <div className="mb-4">

                                                <label className="fw-semibold d-block mb-2">

                                                    Technician Remarks

                                                </label>

                                                <div className="border rounded p-3 bg-light">

                                                    {details.technicianRemarks || "-"}

                                                </div>

                                            </div>

                                            <div className="mb-4">

                                                <label className="fw-semibold d-block mb-2">

                                                    Customer Remarks

                                                </label>

                                                <div className="border rounded p-3 bg-light">

                                                    {details.customerRemarks || "-"}

                                                </div>

                                            </div>

                                            <div>

                                                <label className="fw-semibold d-block mb-2">

                                                    Customer Signature

                                                </label>

                                                <div className="border rounded p-3 bg-light">

                                                    {details.customerSignature || "Not Available"}

                                                </div>

                                            </div>

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

export default FinalReportDetailsModal;