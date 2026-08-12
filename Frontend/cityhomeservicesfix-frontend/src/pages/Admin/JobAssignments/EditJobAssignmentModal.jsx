import { useEffect, useState } from "react";

import jobAssignmentService from "../../../services/jobAssignmentService";
import technicianService from "../../../services/technicianService";

function EditJobAssignmentModal({

    show,

    assignment,

    onClose,

    onSuccess

}) {

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [technicians, setTechnicians] = useState([]);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({

        assignmentId: 0,

        technicianId: "",

        scheduledStart: "",

        scheduledEnd: "",

        status: "Assigned",

        remarks: ""

    });

    useEffect(() => {

        if (!show || !assignment)
            return;

        loadData();

    }, [show, assignment]);

    const loadData = async () => {

        setLoading(true);

        try {

            const [assignmentData, technicianData] = await Promise.all([

                jobAssignmentService.getById(
                    assignment.assignmentId
                ),

                technicianService.getAll()

            ]);

            setTechnicians(technicianData);

            setForm({

                assignmentId: assignmentData.assignmentId,

                technicianId: assignmentData.technicianId,

                scheduledStart: assignmentData.scheduledStart
                    ? assignmentData.scheduledStart.substring(0, 16)
                    : "",

                scheduledEnd: assignmentData.scheduledEnd
                    ? assignmentData.scheduledEnd.substring(0, 16)
                    : "",

                status: assignmentData.status,

                remarks: assignmentData.remarks || ""

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

        if (!form.technicianId)
            validationErrors.technicianId =
                "Please select a technician.";

        if (!form.status)
            validationErrors.status =
                "Please select a status.";

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

                            Edit Job Assignment

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

                                Loading Assignment...

                            </h5>

                        </div>

                    ) : (

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

                                                Assignment Details

                                            </h5>

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Technician

                                                </label>

                                                <select
                                                    name="technicianId"
                                                    className={`form-select ${
                                                        errors.technicianId
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    value={form.technicianId}
                                                    onChange={handleChange}
                                                >

                                                    <option value="">

                                                        Select Technician

                                                    </option>

                                                    {technicians.map((tech) => (

                                                        <option
                                                            key={tech.technicianId}
                                                            value={tech.technicianId}
                                                        >

                                                            {tech.employeeCode}
                                                            {" - "}
                                                            {tech.user?.firstName}
                                                            {" "}
                                                            {tech.user?.lastName}

                                                        </option>

                                                    ))}

                                                </select>

                                                <div className="invalid-feedback">

                                                    {errors.technicianId}

                                                </div>

                                            </div>

                                            <div>

                                                <label className="form-label fw-semibold">

                                                    Status

                                                </label>

                                                <select
                                                    name="status"
                                                    className={`form-select ${
                                                        errors.status
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    value={form.status}
                                                    onChange={handleChange}
                                                >

                                                    <option value="Assigned">

                                                        Assigned

                                                    </option>

                                                    <option value="In Progress">

                                                        In Progress

                                                    </option>

                                                    <option value="Completed">

                                                        Completed

                                                    </option>

                                                    <option value="Cancelled">

                                                        Cancelled

                                                    </option>

                                                </select>

                                                <div className="invalid-feedback">

                                                    {errors.status}

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

                                                Schedule

                                            </h5>

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Scheduled Start

                                                </label>

                                                <input
                                                    type="datetime-local"
                                                    name="scheduledStart"
                                                    className="form-control"
                                                    value={form.scheduledStart}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Scheduled End

                                                </label>

                                                <input
                                                    type="datetime-local"
                                                    name="scheduledEnd"
                                                    className="form-control"
                                                    value={form.scheduledEnd}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div>

                                                <label className="form-label fw-semibold">

                                                    Remarks

                                                </label>

                                                <textarea
                                                    rows="4"
                                                    name="remarks"
                                                    className="form-control"
                                                    value={form.remarks}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                        </div>

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

                                    await jobAssignmentService.update(

                                        form.assignmentId,

                                        {

                                            assignmentId: form.assignmentId,

                                            technicianId: Number(form.technicianId),

                                            scheduledStart:
                                                form.scheduledStart || null,

                                            scheduledEnd:
                                                form.scheduledEnd || null,

                                            status: form.status,

                                            remarks: form.remarks

                                        }

                                    );

                                    alert("Job assignment updated successfully.");

                                    onSuccess();

                                    onClose();

                                }
                                catch (err) {

                                    console.error(err);

                                    alert("Failed to update job assignment.");

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

                                    Update Assignment

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>);

}

export default EditJobAssignmentModal;