import { useEffect, useState } from "react";

import jobProgressService from "../../../services/jobProgressService";

function EditJobProgressModal({

    show,

    progress,

    onClose,

    onSuccess

}) {

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({

        progressId: 0,

        progressStatus: "Started",

        progressNote: ""

    });

    useEffect(() => {

        if (!show || !progress)
            return;

        loadProgress();

    }, [show, progress]);

    const loadProgress = async () => {

        setLoading(true);

        try {

            const data = await jobProgressService.getById(

                progress.progressId

            );

            setForm({

                progressId: data.progressId,

                progressStatus: data.progressStatus,

                progressNote: data.progressNote || ""

            });

        }
        catch (err) {

            console.error(err);

        }
        finally {

            setLoading(false);

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

            <div className="modal-dialog modal-lg modal-dialog-centered">

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

                            Edit Job Progress

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

                                Loading Job Progress...

                            </h5>

                        </div>

                    ) : (

                        <form>

                            <div
                                className="card border shadow-sm"
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

                                        Update Progress

                                    </h5>

                                    <div className="mb-4">

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

                                    <div>

                                        <label className="form-label fw-semibold">

                                            Progress Note

                                        </label>

                                        <textarea
                                            rows="6"
                                            name="progressNote"
                                            className="form-control"
                                            placeholder="Enter updated progress notes..."
                                            value={form.progressNote}
                                            onChange={handleChange}
                                        ></textarea>

                                        <small className="text-muted">

                                            Update the latest work completed, issues, or observations for this job.

                                        </small>

                                    </div>

                                </div>

                            </div>

                        </form>

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

                                    await jobProgressService.update(

                                        form.progressId,

                                        {

                                            progressId: form.progressId,

                                            progressStatus: form.progressStatus,

                                            progressNote: form.progressNote

                                        }

                                    );

                                    alert("Job progress updated successfully.");

                                    onSuccess();

                                    onClose();

                                }
                                catch (err) {

                                    console.error(err);

                                    alert("Failed to update job progress.");

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

                                    Updating...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-check-circle me-2"></i>

                                    Update Progress

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>);

}

export default EditJobProgressModal;