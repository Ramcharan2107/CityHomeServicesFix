import { useEffect, useState } from "react";
import customerService from "../../services/customerService";

function CustomerDetailsModal({

    customerId,

    show,

    onClose

}) {

    const [customer, setCustomer] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!show || !customerId)
            return;

        loadCustomer();

    }, [show, customerId]);

    const loadCustomer = async () => {

        setLoading(true);

        setError("");

        try {

            const data = await customerService.getById(customerId);

            setCustomer(data);

        }
        catch (err) {

            console.error(err);

            setError("Failed to load customer details.");

        }
        finally {

            setLoading(false);

        }

    };

    if (!show)
        return null;

    const getInitials = () => {

        if (!customer)
            return "";

        return `${customer.firstName?.charAt(0) ?? ""}${customer.lastName?.charAt(0) ?? ""}`;

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

                            Customer Details

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
                                Loading Customer...
                            </h5>

                        </div>

                    ) : error ? (

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    ) : (

                        <>

                            {/* ================= Customer Header ================= */}

                            <div className="row align-items-center mb-4">

                                <div className="col-lg-3 text-center">

                                    <div
                                        className="rounded-circle d-flex justify-content-center align-items-center mx-auto"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            background: "#0B2E4F",
                                            color: "#fff",
                                            fontSize: "42px",
                                            fontWeight: "bold"
                                        }}
                                    >

                                        {getInitials()}

                                    </div>

                                </div>

                                <div className="col-lg-9">

                                    <h3
                                        className="fw-bold mb-1"
                                        style={{
                                            color: "#0B2E4F"
                                        }}
                                    >
                                        {customer.firstName} {customer.lastName}
                                    </h3>

                                    <p className="text-muted mb-2">

                                        {customer.email}

                                    </p>

                                    <span
                                        className={`badge me-2 ${
                                            customer.isActive
                                                ? "bg-success"
                                                : "bg-danger"
                                        }`}
                                    >

                                        {customer.isActive
                                            ? "Active"
                                            : "Inactive"}

                                    </span>

                                    <span
                                        className={`badge ${
                                            customer.customerType === "Premium"
                                                ? "bg-warning text-dark"
                                                : "bg-info"
                                        }`}
                                    >

                                        {customer.customerType}

                                    </span>

                                </div>

                            </div>

                            {/* ================= Information ================= */}

                            <div className="row g-4">

                                <div className="col-md-6">

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
                                                            Customer Code
                                                        </th>

                                                        <td>
                                                            {customer.customerCode}
                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>
                                                            Gender
                                                        </th>

                                                        <td>
                                                            {customer.gender || "-"}
                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>
                                                            Date of Birth
                                                        </th>

                                                        <td>
                                                            {formatDate(customer.dateOfBirth)}
                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>
                                                            Language
                                                        </th>

                                                        <td>
                                                            {customer.preferredLanguage || "-"}
                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>
                                                            Joined
                                                        </th>

                                                        <td>
                                                            {formatDate(customer.createdAt)}
                                                        </td>

                                                    </tr>

                                                </tbody>

                                            </table>

                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-6">

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

                                                Contact Information

                                            </h5>

                                            <table className="table table-borderless mb-0">

                                                <tbody>

                                                    <tr>

                                                        <th width="40%">
                                                            Email
                                                        </th>

                                                        <td>
                                                            {customer.email}
                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>
                                                            Phone
                                                        </th>

                                                        <td>
                                                            {customer.phoneNumber || "-"}
                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>
                                                            Company
                                                        </th>

                                                        <td>
                                                            {customer.companyName || "-"}
                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>
                                                            Tax Number
                                                        </th>

                                                        <td>
                                                            {customer.taxNumber || "-"}
                                                        </td>

                                                    </tr>

                                                </tbody>

                                            </table>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* ================= Notes ================= */}

                            <div className="card border shadow-sm mt-4">

                                <div className="card-body">

                                    <h5
                                        className="fw-bold mb-3"
                                        style={{
                                            color: "#0B2E4F"
                                        }}
                                    >

                                        Notes

                                    </h5>

                                    <p className="text-muted mb-0">

                                        {customer.notes || "No notes available."}

                                    </p>

                                </div>

                            </div>

                        </>
                    )}
                                        </div>

                    <div
                        className="modal-footer"
                        style={{
                            background: "#F8F9FA"
                        }}
                    >

                        <button
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

    );

}

export default CustomerDetailsModal;
                    