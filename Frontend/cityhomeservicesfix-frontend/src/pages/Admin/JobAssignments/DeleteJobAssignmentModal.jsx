import { useState } from "react";
import jobAssignmentService from "../../../services/jobAssignmentService";

function DeleteJobAssignmentModal({

    show,

    assignment,

    onClose,

    onSuccess

}) {

    const [deleting, setDeleting] = useState(false);

    if (!show || !assignment)
        return null;

    const handleDelete = async () => {

        setDeleting(true);

        try {

            await jobAssignmentService.delete(

                assignment.assignmentId

            );

            alert("Job assignment deleted successfully.");

            onSuccess();

            onClose();

        }
        catch (err) {

            console.error(err);

            alert("Failed to delete job assignment.");

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

                            Delete Job Assignment

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

                        Delete Job Assignment?

                    </h3>

                    <p
                        className="text-muted text-center mb-4"
                    >

                        You are about to permanently delete this job assignment.

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

                                    Assignment ID

                                </div>

                                <div className="col-7">

                                    #{assignment.assignmentId}

                                </div>

                            </div>

                            <hr />

                            <div className="row mb-3">

                                <div className="col-5 fw-semibold">

                                    Request ID

                                </div>

                                <div className="col-7">

                                    #{assignment.requestId}

                                </div>

                            </div>

                            <hr />

                            <div className="row mb-3">

                                <div className="col-5 fw-semibold">

                                    Technician

                                </div>

                                <div className="col-7">

                                    {assignment.technician?.user
                                        ? `${assignment.technician.user.firstName} ${assignment.technician.user.lastName}`
                                        : assignment.technician?.employeeCode || "-"}

                                </div>

                            </div>

                            <hr />

                            <div className="row mb-3">

                                <div className="col-5 fw-semibold">

                                    Employee Code

                                </div>

                                <div className="col-7">

                                    {assignment.technician?.employeeCode || "-"}

                                </div>

                            </div>

                            <hr />

                            <div className="row mb-3">

                                <div className="col-5 fw-semibold">

                                    Assigned Date

                                </div>

                                <div className="col-7">

                                    {assignment.assignedDate
                                        ? new Date(
                                              assignment.assignedDate
                                          ).toLocaleDateString("en-IN")
                                        : "-"}

                                </div>

                            </div>

                            <hr />

                            <div className="row">

                                <div className="col-5 fw-semibold">

                                    Status

                                </div>

                                <div className="col-7">

                                    <span
                                        className={`badge ${
                                            assignment.status === "Completed"
                                                ? "bg-success"
                                                : assignment.status === "In Progress"
                                                ? "bg-warning text-dark"
                                                : assignment.status === "Cancelled"
                                                ? "bg-danger"
                                                : "bg-primary"
                                        }`}
                                    >

                                        {assignment.status}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="alert alert-warning mt-4 mb-0">

                        <i className="bi bi-exclamation-circle me-2"></i>

                        This action cannot be undone. Deleting this job assignment
                        may affect job tracking, progress updates, and reporting history.

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

                                    Delete Job Assignment

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>);

}

export default DeleteJobAssignmentModal;