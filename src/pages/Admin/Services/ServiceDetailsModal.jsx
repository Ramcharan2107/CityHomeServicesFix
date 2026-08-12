import { useEffect, useState } from "react";
import serviceService from "../../../services/serviceService";

function ServiceDetailsModal({

    show,

    service,

    onClose

}) {

    const [loading, setLoading] = useState(false);

    const [details, setDetails] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!show || !service)
            return;

        loadService();

    }, [show, service]);

    const loadService = async () => {

        setLoading(true);

        setError("");

        try {

            const data = await serviceService.getById(

                service.serviceId

            );

            setDetails(data);

        }
        catch (err) {

            console.error(err);

            setError("Failed to load service details.");

        }
        finally {

            setLoading(false);

        }

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

                            Service Details

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

                                Loading Service...

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

                                        <i className="bi bi-tools"></i>

                                    </div>

                                </div>

                                <div className="col-lg-9">

                                    <h2
                                        className="fw-bold mb-2"
                                        style={{
                                            color: "#0B2E4F"
                                        }}
                                    >

                                        {details.serviceName}

                                    </h2>

                                    <div className="d-flex flex-wrap gap-2">

                                        <span className="badge bg-primary">

                                            {details.serviceCode}

                                        </span>

                                        <span className="badge bg-info">

                                            {details.categoryName}

                                        </span>

                                        {details.isActive ? (

                                            <span className="badge bg-success">

                                                Active

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

                                                Service Information

                                            </h5>

                                            <table className="table table-borderless mb-0">

                                                <tbody>

                                                    <tr>

                                                        <th width="45%">

                                                            Service ID

                                                        </th>

                                                        <td>

                                                            #{details.serviceId}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Service Name

                                                        </th>

                                                        <td>

                                                            {details.serviceName}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Service Code

                                                        </th>

                                                        <td>

                                                            {details.serviceCode}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Category

                                                        </th>

                                                        <td>

                                                            {details.categoryName}

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

                                                Pricing & Duration

                                            </h5>

                                            <table className="table table-borderless mb-0">

                                                <tbody>

                                                    <tr>

                                                        <th width="45%">

                                                            Base Price

                                                        </th>

                                                        <td>

                                                            {formatCurrency(details.basePrice)}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Estimated Hours

                                                        </th>

                                                        <td>

                                                            {details.estimatedHours} hrs

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Status

                                                        </th>

                                                        <td>

                                                            {details.isActive ? (

                                                                <span className="badge bg-success">

                                                                    Active

                                                                </span>

                                                            ) : (

                                                                <span className="badge bg-danger">

                                                                    Inactive

                                                                </span>

                                                            )}

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

                                                Description

                                            </h5>

                                            <p
                                                className="text-muted mb-0"
                                                style={{
                                                    lineHeight: "1.8"
                                                }}
                                            >

                                                {details.description ||

                                                    "No description available for this service."}

                                            </p>

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

export default ServiceDetailsModal;