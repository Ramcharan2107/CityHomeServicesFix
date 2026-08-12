import { useEffect, useState } from "react";

import jobProgressService from "../../../services/jobProgressService";
import jobAssignmentService from "../../../services/jobAssignmentService";

function AddJobProgressModal({

    show,

    onClose,

    onSuccess

}) {

    const [saving, setSaving] = useState(false);

    const [assignments, setAssignments] = useState([]);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({

        assignmentId: "",

        progressStatus: "Started",

        progressNote: "",

        updatedBy: 1

    });

    useEffect(() => {

        if (!show)
            return;

        loadAssignments();

    }, [show]);

    const loadAssignments = async () => {

        try {

            const data = await jobAssignmentService.getAll();

            setAssignments(data);

        }
        catch (err) {

            console.error(err);

        }

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const validate = () => {

        const validationErrors = {};

        if (!form.assignmentId)
            validationErrors.assignmentId =
                "Please select a job assignment.";

        if (!form.progressStatus)
            validationErrors.progressStatus =
                "Please select a progress status.";

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;

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

                            Add Job Progress

                        </h4>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body p-4">
                                            <form>

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

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">

                                                Job Assignment

                                            </label>

                                            <select
                                                name="assignmentId"
                                                className={`form-select ${
                                                    errors.assignmentId
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                value={form.assignmentId}
                                                onChange={handleChange}
                                            >

                                                <option value="">

                                                    Select Job Assignment

                                                </option>

                                                {assignments.map((assignment) => (

                                                    <option
                                                        key={assignment.assignmentId}
                                                        value={assignment.assignmentId}
                                                    >

                                                        Assignment #
                                                        {assignment.assignmentId}
                                                        {" - "}
                                                        {assignment.technician?.user
                                                            ? `${assignment.technician.user.firstName} ${assignment.technician.user.lastName}`
                                                            : assignment.technician?.employeeCode}

                                                    </option>

                                                ))}

                                            </select>

                                            <div className="invalid-feedback">

                                                {errors.assignmentId}

                                            </div>

                                        </div>

                                        <div>

                                            <label className="form-label fw-semibold">

                                                Progress Status

                                            </label>

                                            <select
                                                name="progressStatus"
                                                className={`form-select ${
                                                    errors.progressStatus
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                value={form.progressStatus}
                                                onChange={handleChange}
                                            >

                                                <option value="Started">

                                                    Started

                                                </option>

                                                <option value="In Progress">

                                                    In Progress

                                                </option>

                                                <option value="Completed">

                                                    Completed

                                                </option>

                                                <option value="On Hold">

                                                    On Hold

                                                </option>

                                            </select>

                                            <div className="invalid-feedback">

                                                {errors.progressStatus}

                                            </div>

                                        </div>

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

                                            Progress Notes

                                        </h5>

                                        <div>

                                            <label className="form-label fw-semibold">

                                                Progress Note

                                            </label>

                                            <textarea
                                                rows="8"
                                                name="progressNote"
                                                className="form-control"
                                                placeholder="Enter detailed progress notes..."
                                                value={form.progressNote}
                                                onChange={handleChange}
                                            ></textarea>

                                            <small className="text-muted">

                                                Describe the work completed, issues encountered, or the current job status.

                                            </small>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>
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
                            disabled={saving}
                        >

                            <i className="bi bi-x-circle me-2"></i>

                            Cancel

                        </button>

                        <button
                            type="button"
                            className="btn"
                            style={{
                                background: "#F7941D",
                                color: "#fff"
                            }}
                            disabled={saving}
                            onClick={async () => {

                                if (!validate())
                                    return;

                                setSaving(true);

                                try {

                                    await jobProgressService.create({

                                        assignmentId: Number(form.assignmentId),

                                        progressStatus: form.progressStatus,

                                        progressNote: form.progressNote,

                                        updatedBy: Number(form.updatedBy)

                                    });

                                    alert("Job progress added successfully.");

                                    onSuccess();

                                    onClose();

                                }
                                catch (err) {

                                    console.error(err);

                                    alert("Failed to add job progress.");

                                }
                                finally {

                                    setSaving(false);

                                }

                            }}
                        >

                            {saving ? (

                                <>

                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                    ></span>

                                    Saving...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-check-circle me-2"></i>

                                    Save Progress

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>);

}

export default AddJobProgressModal;