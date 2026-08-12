import { useState } from "react";

import jobProgressService from "../../../services/jobProgressService";

function DeleteJobProgressModal({

    show,

    progress,

    onClose,

    onSuccess

}) {

    const [deleting, setDeleting] = useState(false);

    if (!show || !progress)
        return null;

    const handleDelete = async () => {

        setDeleting(true);

        try {

            await jobProgressService.delete(

                progress.progressId

            );

            alert("Job progress deleted successfully.");

            onSuccess();

            onClose();

        }
        catch (err) {

            console.error(err);

            alert("Failed to delete job progress.");

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

            <div className="modal-dialog modal-dialog-centered">

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

                            Delete Job Progress

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
                        className="fw-bold mb-3 text-center"
                        style={{
                            color: "#0B2E4F"
                        }}
                    >

                        Delete Job Progress?

                    </h3>

                    <p className="text-muted text-center mb-4">

                        You are about to permanently delete this progress record.

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

                                    Progress ID

                                </div>

                                <div className="col-7">

                                    #{progress.progressId}

                                </div>

                            </div>

                            <hr />

                            <div className="row mb-3">

                                <div className="col-5 fw-semibold">

                                    Assignment ID

                                </div>

                                <div className="col-7">

                                    #{progress.assignmentId}

                                </div>

                            </div>

                            <hr />

                            <div className="row mb-3">

                                <div className="col-5 fw-semibold">

                                    Status

                                </div>

                                <div className="col-7">

                                    <span
                                        className={`badge ${
                                            progress.progressStatus === "Completed"
                                                ? "bg-success"
                                                : progress.progressStatus === "In Progress"
                                                ? "bg-warning text-dark"
                                                : progress.progressStatus === "On Hold"
                                                ? "bg-secondary"
                                                : "bg-primary"
                                        }`}
                                    >

                                        {progress.progressStatus}

                                    </span>

                                </div>

                            </div>

                            <hr />

                            <div className="row mb-3">

                                <div className="col-5 fw-semibold">

                                    Progress Time

                                </div>

                                <div className="col-7">

                                    {progress.progressTime
                                        ? new Date(
                                              progress.progressTime
                                          ).toLocaleString("en-IN")
                                        : "-"}

                                </div>

                            </div>

                            <hr />

                            <div className="row">

                                <div className="col-5 fw-semibold">

                                    Progress Note

                                </div>

                                <div className="col-7">

                                    {progress.progressNote || "-"}

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="alert alert-warning mt-4 mb-0">

                        <i className="bi bi-exclamation-circle me-2"></i>

                        This action cannot be undone. Deleting this job progress
                        record may affect job history, reporting, and audit
                        tracking.

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

                                    Delete Job Progress

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>);

}

export default DeleteJobProgressModal;