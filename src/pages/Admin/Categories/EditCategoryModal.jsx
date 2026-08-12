import { useEffect, useState } from "react";
import serviceCategoryService from "../../../services/serviceCategoryService";

function EditCategoryModal({

    show,

    category,

    onClose,

    onSuccess

}) {

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({

        categoryId: 0,

        categoryName: "",

        description: ""

    });

    useEffect(() => {

        if (!show || !category)
            return;

        loadCategory();

    }, [show, category]);

    const loadCategory = async () => {

        setLoading(true);

        setErrors({});

        try {

            const data = await serviceCategoryService.getById(

                category.categoryId

            );

            setForm({

                categoryId: data.categoryId,

                categoryName: data.categoryName || "",

                description: data.description || ""

            });

        }
        catch (err) {

            console.error(err);

            alert("Failed to load category.");

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

        if (!form.categoryName.trim()) {

            validationErrors.categoryName =
                "Category Name is required.";

        }

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

                            Edit Category

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

                    ) : (

                        <form>

                            <div className="row">

                                <div className="col-12">

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

                                                Category Information

                                            </h5>

                                            <div className="mb-4">

                                                <label className="form-label fw-semibold">

                                                    Category Name

                                                </label>

                                                <input
                                                    type="text"
                                                    name="categoryName"
                                                    className={`form-control ${
                                                        errors.categoryName
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    value={form.categoryName}
                                                    onChange={handleChange}
                                                    placeholder="Enter Category Name"
                                                />

                                                <div className="invalid-feedback">

                                                    {errors.categoryName}

                                                </div>

                                            </div>

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Description

                                                </label>

                                                <textarea
                                                    rows="5"
                                                    name="description"
                                                    className="form-control"
                                                    value={form.description}
                                                    onChange={handleChange}
                                                    placeholder="Enter Category Description..."
                                                ></textarea>

                                                <small className="text-muted">

                                                    Update the description for this service category.

                                                </small>

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
                                background: "#0B2E4F",
                                color: "#fff"
                            }}
                            disabled={saving}
                            onClick={async () => {

                                if (!validate())
                                    return;

                                setSaving(true);

                                try {

                                    await serviceCategoryService.update(form);

                                    alert("Category updated successfully.");

                                    onSuccess();

                                    onClose();

                                }
                                catch (err) {

                                    console.error(err);

                                    alert("Failed to update category.");

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

                                    Update Category

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>);

}

export default EditCategoryModal;
                    