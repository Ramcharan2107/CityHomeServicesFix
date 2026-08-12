import { useEffect, useState } from "react";
import technicianService from "../../../services/technicianService";

function TechnicianDetailsModal({

    show,

    technician,

    onClose

}) {

    const [loading, setLoading] = useState(false);

    const [details, setDetails] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!show || !technician)
            return;

        loadTechnician();

    }, [show, technician]);

    const loadTechnician = async () => {

        setLoading(true);

        setError("");

        try {

            const data = await technicianService.getById(

                technician.technicianId

            );

            setDetails(data);

        }
        catch (err) {

            console.error(err);

            setError("Failed to load technician details.");

        }
        finally {

            setLoading(false);

        }

    };

    const formatDate = (date) => {

        if (!date)
            return "-";

        return new Date(date).toLocaleDateString("en-IN", {

            day: "2-digit",

            month: "short",

            year: "numeric"

        });

    };

    const formatCurrency = (amount) => {

        if (amount == null)
            return "-";

        return `₹ ${Number(amount).toLocaleString("en-IN")}`;

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

                            Technician Details

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

                                Loading Technician...

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

                                        <i className="bi bi-person-workspace"></i>

                                    </div>

                                </div>

                                <div className="col-lg-9">

                                    <h2
                                        className="fw-bold mb-2"
                                        style={{
                                            color: "#0B2E4F"
                                        }}
                                    >

                                        {details.user?.firstName} {details.user?.lastName}

                                    </h2>

                                    <div className="d-flex flex-wrap gap-2">

                                        <span className="badge bg-primary">

                                            {details.employeeCode}

                                        </span>

                                        <span className="badge bg-info">

                                            {details.department || "Department"}

                                        </span>

                                        {details.isAvailable ? (

                                            <span className="badge bg-success">

                                                {details.currentStatus}

                                            </span>

                                        ) : (

                                            <span className="badge bg-danger">

                                                Inactive

                                            </span>

                                        )}

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

                                                Personal Information

                                            </h5>

                                            <table className="table table-borderless mb-0">

                                                <tbody>

                                                    <tr>

                                                        <th width="45%">

                                                            Employee Code

                                                        </th>

                                                        <td>

                                                            {details.employeeCode}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Full Name

                                                        </th>

                                                        <td>

                                                            {details.user?.firstName} {details.user?.lastName}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Email

                                                        </th>

                                                        <td>

                                                            {details.user?.email || "-"}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Phone

                                                        </th>

                                                        <td>

                                                            {details.user?.phoneNumber || "-"}

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

                                                Professional Information

                                            </h5>

                                            <table className="table table-borderless mb-0">

                                                <tbody>

                                                    <tr>

                                                        <th width="45%">

                                                            Department

                                                        </th>

                                                        <td>

                                                            {details.department || "-"}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Designation

                                                        </th>

                                                        <td>

                                                            {details.designation || "-"}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Experience

                                                        </th>

                                                        <td>

                                                            {details.experienceYears ?? 0} Years

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Joining Date

                                                        </th>

                                                        <td>

                                                            {formatDate(details.joiningDate)}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Hourly Rate

                                                        </th>

                                                        <td>

                                                            {formatCurrency(details.hourlyRate)}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Availability

                                                        </th>

                                                        <td>

                                                            {details.isAvailable ? (

                                                                <span className="badge bg-success">

                                                                    Available

                                                                </span>

                                                            ) : (

                                                                <span className="badge bg-danger">

                                                                    Unavailable

                                                                </span>

                                                            )}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Current Status

                                                        </th>

                                                        <td>

                                                            {details.currentStatus}

                                                        </td>

                                                    </tr>

                                                </tbody>

                                            </table>

                                        </div>

                                    </div>

                                </div>

                                <div className="col-12">

                                    <div
                                        className="card border shadow-sm"
                                        style={{
                                            borderRadius: "15px"
                                        }}
                                    >

                                        <div className="card-body">

                                            <h5
                                                className="fw-bold mb-3"
                                                style={{
                                                    color: "#0B2E4F"
                                                }}
                                            >

                                                Skills

                                            </h5>

                                            {details.technicianSkills?.length > 0 ? (

                                                <div className="d-flex flex-wrap gap-2">

                                                    {details.technicianSkills.map((skill, index) => (

                                                        <span
                                                            key={index}
                                                            className="badge bg-primary"
                                                        >

                                                            {skill.skillName || `Skill ${index + 1}`}

                                                        </span>

                                                    ))}

                                                </div>

                                            ) : (

                                                <p className="text-muted mb-0">

                                                    No skills assigned.

                                                </p>

                                            )}

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

    </div>
    );


}

export default TechnicianDetailsModal;