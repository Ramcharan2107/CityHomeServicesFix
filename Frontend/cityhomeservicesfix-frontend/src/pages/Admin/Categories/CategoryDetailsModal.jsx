import { useEffect, useState } from "react";
import serviceCategoryService from "../../../services/serviceCategoryService";

function CategoryDetailsModal({

    show,

    category,

    onClose

}) {

    const [loading, setLoading] = useState(false);

    const [details, setDetails] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!show || !category)
            return;

        loadCategory();

    }, [show, category]);

    const loadCategory = async () => {

        setLoading(true);

        setError("");

        try {

            const data = await serviceCategoryService.getById(

                category.categoryId

            );

            setDetails(data);

        }
        catch (err) {

            console.error(err);

            setError("Failed to load category details.");

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

                            Category Details

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

                                Loading Category...

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
                                            width: "110px",
                                            height: "110px",
                                            background: "#0B2E4F",
                                            color: "#fff",
                                            fontSize: "42px"
                                        }}
                                    >

                                        <i className="bi bi-grid-fill"></i>

                                    </div>

                                </div>

                                <div className="col-lg-9">

                                    <h3
                                        className="fw-bold mb-2"
                                        style={{
                                            color: "#0B2E4F"
                                        }}
                                    >

                                        {details.categoryName}

                                    </h3>

                                    <span
                                        className={`badge ${
                                            details.isActive
                                                ? "bg-success"
                                                : "bg-danger"
                                        }`}
                                    >

                                        {details.isActive
                                            ? "Active"
                                            : "Inactive"}

                                    </span>

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

                                                Category Information

                                            </h5>

                                            <table className="table table-borderless mb-0">

                                                <tbody>

                                                    <tr>

                                                        <th width="45%">

                                                            Category ID

                                                        </th>

                                                        <td>

                                                            #{details.categoryId}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Category Name

                                                        </th>

                                                        <td>

                                                            {details.categoryName}

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

                                                Audit Information

                                            </h5>

                                            <table className="table table-borderless mb-0">

                                                <tbody>

                                                    <tr>

                                                        <th width="45%">

                                                            Created

                                                        </th>

                                                        <td>

                                                            {formatDate(details.createdAt)}

                                                        </td>

                                                    </tr>

                                                    <tr>

                                                        <th>

                                                            Updated

                                                        </th>

                                                        <td>

                                                            {formatDate(details.updatedAt)}

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

                                                    "No description available for this category."}

                                            </p>

                                        </div>

                                    </div>

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

    );

}

export default CategoryDetailsModal;