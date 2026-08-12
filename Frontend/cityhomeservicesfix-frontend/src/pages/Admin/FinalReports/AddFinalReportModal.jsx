import { useEffect, useState } from "react";

import finalReportService from "../../../services/finalReportService";
import jobAssignmentService from "../../../services/jobAssignmentService";

function AddFinalReportModal({

    show,

    onClose,

    onSuccess

}) {

    const [saving, setSaving] = useState(false);

    const [assignments, setAssignments] = useState([]);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({

        assignmentId: "",

        workSummary: "",

        hoursWorked: "",

        totalCost: "",

        technicianRemarks: "",

        customerRemarks: "",

        customerSignature: "",

        createdBy: 1

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
            validationErrors.assignmentId = "Please select a job assignment.";

        if (!form.workSummary.trim())
            validationErrors.workSummary = "Work summary is required.";

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

                            Add Final Report

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

                                                Report Information

                                            </h5>

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Job Assignment

                                                </label>

                                                <select
                                                    name="assignmentId"
                                                    className={`form-select ${errors.assignmentId ? "is-invalid" : ""}`}
                                                    value={form.assignmentId}
                                                    onChange={handleChange}
                                                >

                                                    <option value="">

                                                        Select Assignment

                                                    </option>

                                                    {assignments.map(a => (

                                                        <option
                                                            key={a.assignmentId}
                                                            value={a.assignmentId}
                                                        >

                                                            Assignment #{a.assignmentId}
                                                            {" - "}
                                                            {a.technician?.user
                                                                ? `${a.technician.user.firstName} ${a.technician.user.lastName}`
                                                                : a.technician?.employeeCode}

                                                        </option>

                                                    ))}

                                                </select>

                                                <div className="invalid-feedback">

                                                    {errors.assignmentId}

                                                </div>

                                            </div>

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Hours Worked

                                                </label>

                                                <input
                                                    type="number"
                                                    step="0.5"
                                                    name="hoursWorked"
                                                    className="form-control"
                                                    value={form.hoursWorked}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div>

                                                <label className="form-label fw-semibold">

                                                    Total Cost

                                                </label>

                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    name="totalCost"
                                                    className="form-control"
                                                    value={form.totalCost}
                                                    onChange={handleChange}
                                                />

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

                                                Report Details

                                            </h5>

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Work Summary

                                                </label>

                                                <textarea
                                                    rows="3"
                                                    name="workSummary"
                                                    className={`form-control ${errors.workSummary ? "is-invalid" : ""}`}
                                                    value={form.workSummary}
                                                    onChange={handleChange}
                                                />

                                                <div className="invalid-feedback">

                                                    {errors.workSummary}

                                                </div>

                                            </div>

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Technician Remarks

                                                </label>

                                                <textarea
                                                    rows="2"
                                                    name="technicianRemarks"
                                                    className="form-control"
                                                    value={form.technicianRemarks}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Customer Remarks

                                                </label>

                                                <textarea
                                                    rows="2"
                                                    name="customerRemarks"
                                                    className="form-control"
                                                    value={form.customerRemarks}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div>

                                                <label className="form-label fw-semibold">

                                                    Customer Signature

                                                </label>

                                                <input
                                                    type="text"
                                                    name="customerSignature"
                                                    className="form-control"
                                                    value={form.customerSignature}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </form>
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

                                    await finalReportService.create({

                                        assignmentId: Number(form.assignmentId),

                                        workSummary: form.workSummary,

                                        hoursWorked: form.hoursWorked
                                            ? Number(form.hoursWorked)
                                            : null,

                                        totalCost: form.totalCost
                                            ? Number(form.totalCost)
                                            : null,

                                        technicianRemarks: form.technicianRemarks,

                                        customerRemarks: form.customerRemarks,

                                        customerSignature: form.customerSignature,

                                        createdBy: Number(form.createdBy)

                                    });

                                    alert("Final report created successfully.");

                                    onSuccess();

                                    onClose();

                                }
                                catch (err) {

                                    console.error(err);

                                    alert("Failed to create final report.");

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

                                    Save Report

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddFinalReportModal;