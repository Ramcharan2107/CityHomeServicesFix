import { useState } from "react";
import serviceCategoryService from "../../../services/serviceCategoryService";

function AddCategoryModal({

    show,

    onClose,

    onSuccess

}) {

    const [saving, setSaving] = useState(false);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({

        categoryName: "",

        description: ""

    });

    if (!show)
        return null;

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

    const handleSave = async () => {

        if (!validate())
            return;

        setSaving(true);

        try {

            await serviceCategoryService.create(form);

            setForm({

                categoryName: "",

                description: ""

            });

            onSuccess();

            onClose();

        }
        catch (err) {

            console.error(err);

            alert("Failed to create category.");

        }
        finally {

            setSaving(false);

        }

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

                            Add New Category

                        </h4>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body p-4">
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
                                                placeholder="Enter Category Name"
                                                value={form.categoryName}
                                                onChange={handleChange}
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
                                                placeholder="Enter Category Description..."
                                                value={form.description}
                                                onChange={handleChange}
                                            ></textarea>

                                            <small className="text-muted">

                                                Provide a short description for this
                                                service category.

                                            </small>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>
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
                            onClick={handleSave}
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

                                    Save Category

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>);

}

export default AddCategoryModal;