import { useEffect, useMemo, useState } from "react";

import serviceCategoryService from "../../../services/serviceCategoryService";

import CategoryDetailsModal from "./CategoryDetailsModal";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

import PageContainer from "../../../components/common/PageContainer";

function Categories() {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [showDetails, setShowDetails] = useState(false);

    const [showAdd, setShowAdd] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories = async () => {

        setLoading(true);

        try {

            const data = await serviceCategoryService.getAll();

            setCategories(data);

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };

    const filteredCategories = useMemo(() => {

        return categories.filter(category => {

            const keyword = search.toLowerCase();

            const matchesSearch =

                category.categoryName
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                category.description
                    ?.toLowerCase()
                    .includes(keyword);

            const matchesStatus =

                statusFilter === "All"

                ||

                (statusFilter === "Active" && category.isActive)

                ||

                (statusFilter === "Inactive" && !category.isActive);

            return matchesSearch && matchesStatus;

        });

    }, [categories, search, statusFilter]);

    const totalCategories = categories.length;

    const activeCategories =

        categories.filter(x => x.isActive).length;

    const inactiveCategories =

        categories.filter(x => !x.isActive).length;

    const totalServices =

        categories.reduce((sum, category) => {

            return sum + (category.services?.length || 0);

        }, 0);

    const handleRefresh = () => {

        loadCategories();

    };

    const handleView = (category) => {

        setSelectedCategory(category);

        setShowDetails(true);

    };

    const handleAdd = () => {

        setShowAdd(true);

    };

    const handleEdit = (category) => {

        setSelectedCategory(category);

        setShowEdit(true);

    };

    const handleDelete = (category) => {

        setSelectedCategory(category);

        setShowDelete(true);

    };
    return (

    <>

        <PageContainer>

            {/* ================= Header ================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2
                        className="fw-bold mb-1"
                        style={{
                            color: "#0B2E4F"
                        }}
                    >
                        Category Management
                    </h2>

                    <p className="text-muted mb-0">
                        Manage all service categories used across the platform.
                    </p>

                </div>

                <div className="d-flex gap-2">

                    <button
                        className="btn btn-outline-secondary"
                        onClick={handleRefresh}
                    >

                        <i className="bi bi-arrow-clockwise me-2"></i>

                        Refresh

                    </button>

                    <button
                        className="btn btn-outline-success"
                    >

                        <i className="bi bi-download me-2"></i>

                        Export

                    </button>

                    <button
                        className="btn"
                        style={{
                            background: "#F7941D",
                            color: "#fff"
                        }}
                        onClick={handleAdd}
                    >

                        <i className="bi bi-plus-circle me-2"></i>

                        Add Category

                    </button>

                </div>

            </div>

            {/* ================= Statistics ================= */}

            <div className="row g-4 mb-4">

                <div className="col-lg-3 col-md-6">

                    <div
                        className="card border shadow-sm h-100"
                        style={{
                            borderRadius: "18px"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <small className="text-muted">

                                        Total Categories

                                    </small>

                                    <h2
                                        className="fw-bold mt-2"
                                        style={{
                                            color: "#0B2E4F"
                                        }}
                                    >

                                        {totalCategories}

                                    </h2>

                                </div>

                                <i
                                    className="bi bi-grid-fill"
                                    style={{
                                        fontSize: "45px",
                                        color: "#F7941D"
                                    }}
                                ></i>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div
                        className="card border shadow-sm h-100"
                        style={{
                            borderRadius: "18px"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <small className="text-muted">

                                        Active

                                    </small>

                                    <h2 className="fw-bold text-success mt-2">

                                        {activeCategories}

                                    </h2>

                                </div>

                                <i
                                    className="bi bi-check-circle-fill"
                                    style={{
                                        fontSize: "45px",
                                        color: "#198754"
                                    }}
                                ></i>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div
                        className="card border shadow-sm h-100"
                        style={{
                            borderRadius: "18px"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <small className="text-muted">

                                        Inactive

                                    </small>

                                    <h2 className="fw-bold text-danger mt-2">

                                        {inactiveCategories}

                                    </h2>

                                </div>

                                <i
                                    className="bi bi-x-circle-fill"
                                    style={{
                                        fontSize: "45px",
                                        color: "#DC3545"
                                    }}
                                ></i>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div
                        className="card border shadow-sm h-100"
                        style={{
                            borderRadius: "18px"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <small className="text-muted">

                                        Total Services

                                    </small>

                                    <h2
                                        className="fw-bold mt-2"
                                        style={{
                                            color: "#0B2E4F"
                                        }}
                                    >

                                        {totalServices}

                                    </h2>

                                </div>

                                <i
                                    className="bi bi-tools"
                                    style={{
                                        fontSize: "45px",
                                        color: "#0B2E4F"
                                    }}
                                ></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= Search & Filter ================= */}

            <div
                className="card border shadow-sm mb-4"
                style={{
                    borderRadius: "18px"
                }}
            >

                <div className="card-body">

                    <div className="row g-3">

                        <div className="col-lg-8">

                            <div className="input-group">

                                <span className="input-group-text bg-white">

                                    <i className="bi bi-search"></i>

                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Category Name or Description..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                        <div className="col-lg-4">

                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                            >

                                <option value="All">

                                    All Categories

                                </option>

                                <option value="Active">

                                    Active

                                </option>

                                <option value="Inactive">

                                    Inactive

                                </option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= Categories Table ================= */}

            <div
                className="card border shadow-sm"
                style={{
                    borderRadius: "18px"
                }}
            >

                <div className="card-body">
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

                                Loading Categories...

                            </h5>

                        </div>

                    ) : filteredCategories.length === 0 ? (

                        <div className="text-center py-5">

                            <i
                                className="bi bi-grid-3x3-gap"
                                style={{
                                    fontSize: "70px",
                                    color: "#CED4DA"
                                }}
                            ></i>

                            <h4 className="mt-3 fw-bold">

                                No Categories Found

                            </h4>

                            <p className="text-muted">

                                Click "Add Category" to create your first service category.

                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-light">

                                    <tr>

                                        <th width="80">

                                            ID

                                        </th>

                                        <th>

                                            Category Name

                                        </th>

                                        <th>

                                            Description

                                        </th>

                                        <th width="120">

                                            Status

                                        </th>

                                        <th width="180">

                                            Created

                                        </th>

                                        <th
                                            className="text-center"
                                            width="220"
                                        >

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredCategories.map(category => (

                                        <tr key={category.categoryId}>

                                            <td>

                                                <strong>

                                                    #{category.categoryId}

                                                </strong>

                                            </td>

                                            <td>

                                                <div className="d-flex align-items-center">

                                                    <div
                                                        className="rounded-circle me-3 d-flex justify-content-center align-items-center"
                                                        style={{
                                                            width: "45px",
                                                            height: "45px",
                                                            background: "#E8F1FD",
                                                            color: "#0B2E4F",
                                                            fontWeight: "bold"
                                                        }}
                                                    >

                                                        <i className="bi bi-grid-fill"></i>

                                                    </div>

                                                    <div>

                                                        <div className="fw-bold">

                                                            {category.categoryName}

                                                        </div>

                                                    </div>

                                                </div>

                                            </td>

                                            <td>

                                                {category.description || "-"}

                                            </td>

                                            <td>

                                                {category.isActive ? (

                                                    <span className="badge bg-success">

                                                        Active

                                                    </span>

                                                ) : (

                                                    <span className="badge bg-danger">

                                                        Inactive

                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                {category.createdAt
                                                    ? new Date(
                                                          category.createdAt
                                                      ).toLocaleDateString("en-IN")
                                                    : "-"}

                                            </td>

                                            <td>

                                                <div className="d-flex justify-content-center gap-2">

                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        title="View"
                                                        onClick={() =>
                                                            handleView(category)
                                                        }
                                                    >

                                                        <i className="bi bi-eye"></i>

                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-warning"
                                                        title="Edit"
                                                        onClick={() =>
                                                            handleEdit(category)
                                                        }
                                                    >

                                                        <i className="bi bi-pencil-square"></i>

                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        title="Delete"
                                                        onClick={() =>
                                                            handleDelete(category)
                                                        }
                                                    >

                                                        <i className="bi bi-trash"></i>

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </PageContainer>

        <CategoryDetailsModal
            show={showDetails}
            category={selectedCategory}
            onClose={() => {

                setShowDetails(false);

                setSelectedCategory(null);

            }}
        />

        <AddCategoryModal
            show={showAdd}
            onClose={() => {

                setShowAdd(false);

            }}
            onSuccess={loadCategories}
        />

        <EditCategoryModal
            show={showEdit}
            category={selectedCategory}
            onClose={() => {

                setShowEdit(false);

                setSelectedCategory(null);

            }}
            onSuccess={loadCategories}
        />

        <DeleteCategoryModal
            show={showDelete}
            category={selectedCategory}
            onClose={() => {

                setShowDelete(false);

                setSelectedCategory(null);

            }}
            onSuccess={loadCategories}
        />

    </>

);

}

export default Categories;