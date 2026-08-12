import { useEffect, useState } from "react";

import finalReportService from "../../../services/finalReportService";

function EditFinalReportModal({

    show,

    report,

    onClose,

    onSuccess

}) {

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({

        reportId: 0,

        workSummary: "",

        hoursWorked: "",

        totalCost: "",

        technicianRemarks: "",

        customerRemarks: "",

        customerSignature: ""

    });

    useEffect(() => {

        if (!show || !report)
            return;

        loadReport();

    }, [show, report]);

    const loadReport = async () => {

        setLoading(true);

        try {

            const data = await finalReportService.getById(

                report.reportId

            );

            setForm({

                reportId: data.reportId,

                workSummary: data.workSummary || "",

                hoursWorked: data.hoursWorked || "",

                totalCost: data.totalCost || "",

                technicianRemarks: data.technicianRemarks || "",

                customerRemarks: data.customerRemarks || "",

                customerSignature: data.customerSignature || ""

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

        if (!form.workSummary.trim())

            validationErrors.workSummary =

                "Work Summary is required.";

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

                            Edit Final Report

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

                                    Loading Report...

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

                                                    Report Information

                                                </h5>

                                                <div className="mb-3">

                                                    <label className="form-label fw-semibold">

                                                        Work Summary

                                                    </label>

                                                    <textarea
                                                        rows="4"
                                                        name="workSummary"
                                                        className={`form-control ${
                                                            errors.workSummary
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        value={form.workSummary}
                                                        onChange={handleChange}
                                                    />

                                                    <div className="invalid-feedback">

                                                        {errors.workSummary}

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

                                                    Remarks

                                                </h5>

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

                                    await finalReportService.update(

                                        form.reportId,

                                        {

                                            reportId: form.reportId,

                                            workSummary: form.workSummary,

                                            hoursWorked: form.hoursWorked
                                                ? Number(form.hoursWorked)
                                                : null,

                                            totalCost: form.totalCost
                                                ? Number(form.totalCost)
                                                : null,

                                            technicianRemarks: form.technicianRemarks,

                                            customerRemarks: form.customerRemarks,

                                            customerSignature: form.customerSignature

                                        }

                                    );

                                    alert("Final report updated successfully.");

                                    onSuccess();

                                    onClose();

                                }
                                catch (err) {

                                    console.error(err);

                                    alert("Failed to update final report.");

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

                                    Update Report

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>);

}

export default EditFinalReportModal;