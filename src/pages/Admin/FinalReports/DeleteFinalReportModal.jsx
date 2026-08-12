import { useState } from "react";

import finalReportService from "../../../services/finalReportService";

function DeleteFinalReportModal({

    show,

    report,

    onClose,

    onSuccess

}) {

    const [deleting, setDeleting] = useState(false);

    if (!show || !report)
        return null;

    const handleDelete = async () => {

        setDeleting(true);

        try {

            await finalReportService.delete(

                report.reportId

            );

            alert("Final report deleted successfully.");

            onSuccess();

            onClose();

        }
        catch (err) {

            console.error(err);

            alert("Failed to delete final report.");

        }
        finally {

            setDeleting(false);

        }

    };

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                background: "rgba(0,0,0,.45)"
            }}
        >

            <div className="modal-dialog modal-dialog-centered modal-lg">

                <div
                    className="modal-content border-0 shadow-lg"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div
                        className="modal-header"
                        style={{
                            background: "#DC3545",
                            color: "#fff"
                        }}
                    >

                        <h4 className="fw-bold mb-0">

                            Delete Final Report

                        </h4>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                            disabled={deleting}
                        ></button>

                    </div>

                    <div className="modal-body p-4">

                        <div
                            className="mx-auto mb-4 d-flex justify-content-center align-items-center rounded-circle"
                            style={{
                                width: "100px",
                                height: "100px",
                                background: "#FDECEC"
                            }}
                        >

                            <i
                                className="bi bi-exclamation-triangle-fill"
                                style={{
                                    fontSize: "50px",
                                    color: "#DC3545"
                                }}
                            ></i>

                        </div>

                        <h3
                            className="fw-bold text-center mb-3"
                            style={{
                                color: "#0B2E4F"
                            }}
                        >

                            Delete Final Report?

                        </h3>

                        <p className="text-center text-muted mb-4">

                            You are about to permanently delete this final report.

                        </p>

                        <div
                            className="card border shadow-sm"
                            style={{
                                borderRadius: "15px"
                            }}
                        >

                            <div className="card-body">

                                <div className="row mb-3">

                                    <div className="col-5 fw-semibold">

                                        Report ID

                                    </div>

                                    <div className="col-7">

                                        #{report.reportId}

                                    </div>

                                </div>

                                <hr />

                                <div className="row mb-3">

                                    <div className="col-5 fw-semibold">

                                        Assignment ID

                                    </div>

                                    <div className="col-7">

                                        #{report.assignmentId}

                                    </div>

                                </div>

                                <hr />

                                <div className="row mb-3">

                                    <div className="col-5 fw-semibold">

                                        Technician

                                    </div>

                                    <div className="col-7">

                                        {report.assignment?.technician?.user
                                            ? `${report.assignment.technician.user.firstName} ${report.assignment.technician.user.lastName}`
                                            : "-"}

                                    </div>

                                </div>

                                <hr />

                                <div className="row mb-3">

                                    <div className="col-5 fw-semibold">

                                        Hours Worked

                                    </div>

                                    <div className="col-7">

                                        {report.hoursWorked ?? "-"}

                                    </div>

                                </div>

                                <hr />

                                <div className="row">

                                    <div className="col-5 fw-semibold">

                                        Total Cost

                                    </div>

                                    <div className="col-7">

                                        ₹{Number(report.totalCost || 0).toLocaleString()}

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="alert alert-warning mt-4 mb-0">

                            <i className="bi bi-exclamation-circle me-2"></i>

                            This action cannot be undone. Deleting this final report
                            will permanently remove its work summary, remarks, and
                            associated report information.

                        </div>
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
                            disabled={deleting}
                        >

                            <i className="bi bi-x-circle me-2"></i>

                            Cancel

                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleDelete}
                            disabled={deleting}
                        >

                            {deleting ? (

                                <>

                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                    ></span>

                                    Deleting...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-trash me-2"></i>

                                    Delete Report

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>);

}

export default DeleteFinalReportModal;