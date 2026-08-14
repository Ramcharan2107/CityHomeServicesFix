import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import serviceCategoryService from "../../../services/serviceCategoryService";

import "./CategoryModal.css";

function EditCategoryModal({
    show,
    category,
    onClose,
    onSuccess
}) {

    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(true);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    /* ============================================================
       LOAD CATEGORY
    ============================================================ */

    useEffect(() => {

        if (!show || !category) {
            return;
        }

        setCategoryName(
            category.categoryName || ""
        );

        setDescription(
            category.description || ""
        );

        setIsActive(
            category.isActive !== false
        );

        setError("");

    }, [show, category]);


    /* ============================================================
       LOCK BACKGROUND
    ============================================================ */

    useEffect(() => {

        if (!show) {
            return;
        }

        document.body.classList.add(
            "category-modal-open"
        );

        document.body.classList.add(
            "category-modal-lock"
        );


        const handleEscape = (event) => {

            if (
                event.key === "Escape" &&
                !saving
            ) {

                onClose();

            }

        };


        document.addEventListener(
            "keydown",
            handleEscape
        );


        return () => {

            document.body.classList.remove(
                "category-modal-open"
            );

            document.body.classList.remove(
                "category-modal-lock"
            );

            document.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, [
        show,
        saving,
        onClose
    ]);


    /* ============================================================
       UPDATE CATEGORY
    ============================================================ */

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");


        const trimmedName =
            categoryName.trim();

        const trimmedDescription =
            description.trim();


        if (!trimmedName) {

            setError(
                "Category name is required."
            );

            return;

        }


        if (!category?.categoryId) {

            setError(
                "Category ID is missing."
            );

            return;

        }


        try {

            setSaving(true);


            /*
             * IMPORTANT:
             * isActive is sent to the backend together
             * with the category information.
             */

            const payload = {

                categoryName:
                    trimmedName,

                description:
                    trimmedDescription,

                isActive:
                    isActive

            };


            console.log(
                "UPDATING CATEGORY:",
                category.categoryId,
                payload
            );


            await serviceCategoryService.update(
                category.categoryId,
                payload
            );


            /*
             * Tell parent page to refresh
             * the category list.
             */

            if (onSuccess) {

                await onSuccess();

            }


        } catch (err) {

            console.error(
                "UPDATE CATEGORY ERROR:",
                err
            );


            let message =
                "Unable to update the category.";


            if (
                err?.response?.data?.message
            ) {

                message =
                    err.response.data.message;

            } else if (
                err?.response?.data?.title
            ) {

                message =
                    err.response.data.title;

            } else if (
                err?.response?.status === 400
            ) {

                message =
                    "Invalid category information. Please check the entered details.";

            } else if (
                err?.response?.status === 404
            ) {

                message =
                    "Category was not found.";

            } else if (
                err?.response?.status === 401 ||
                err?.response?.status === 403
            ) {

                message =
                    "You are not authorized to update this category.";

            }


            setError(message);

        } finally {

            setSaving(false);

        }

    };


    /* ============================================================
       CLOSE
    ============================================================ */

    const handleOverlayClick = (event) => {

        if (
            event.target === event.currentTarget &&
            !saving
        ) {

            onClose();

        }

    };


    /* ============================================================
       HIDDEN
    ============================================================ */

    if (
        !show ||
        !category
    ) {

        return null;

    }


    /* ============================================================
       MODAL
    ============================================================ */

    return createPortal(

        <div
            className="category-modal-overlay"
            onMouseDown={handleOverlayClick}
        >

            <div
                className="category-edit-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-category-title"
            >


                {/* ====================================================
                    HEADER
                ==================================================== */}

                <div className="category-modal-header">

                    <div className="category-modal-header-left">

                        <div className="category-modal-icon">

                            <i className="bi bi-pencil-square"></i>

                        </div>


                        <div>

                            <span>
                                CATEGORY MANAGEMENT
                            </span>

                            <h2 id="edit-category-title">
                                Edit Category
                            </h2>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="category-modal-close"
                        onClick={onClose}
                        disabled={saving}
                    >

                        <i className="bi bi-x-lg"></i>

                    </button>

                </div>


                {/* ====================================================
                    FORM
                ==================================================== */}

                <form
                    className="category-modal-form"
                    onSubmit={handleSubmit}
                >


                    {/* ==================================================
                        BODY
                    ================================================== */}

                    <div className="category-modal-body">


                        {/* ERROR */}

                        {error && (

                            <div className="category-modal-error">

                                <i className="bi bi-exclamation-circle-fill"></i>

                                <span>
                                    {error}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setError("")
                                    }
                                >

                                    <i className="bi bi-x"></i>

                                </button>

                            </div>

                        )}


                        {/* ==================================================
                            CATEGORY INFORMATION
                        ================================================== */}

                        <div className="category-form-section">

                            <div className="category-form-section-title">

                                <i className="bi bi-grid-fill"></i>

                                Category Information

                            </div>


                            {/* CATEGORY NAME */}

                            <div className="category-form-group">

                                <label htmlFor="category-name">

                                    Category Name

                                    <span>
                                        *
                                    </span>

                                </label>


                                <input
                                    id="category-name"
                                    type="text"
                                    value={categoryName}
                                    onChange={(event) =>
                                        setCategoryName(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Enter category name"
                                    disabled={saving}
                                    autoComplete="off"
                                />

                            </div>


                            {/* DESCRIPTION */}

                            <div className="category-form-group">

                                <label htmlFor="category-description">

                                    Description

                                </label>


                                <textarea
                                    id="category-description"
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Enter category description"
                                    disabled={saving}
                                    rows={5}
                                />


                                <small>
                                    Update the description
                                    for this service category.
                                </small>

                            </div>


                            {/* ==================================================
                                STATUS
                            ================================================== */}

                            <div className="category-form-group">

                                <label>

                                    Category Status

                                </label>


                                <div className="category-status-selector">


                                    {/* ACTIVE */}

                                    <button
                                        type="button"
                                        className={`category-status-option active-option ${
                                            isActive
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setIsActive(true)
                                        }
                                        disabled={saving}
                                    >

                                        <div className="status-option-icon">

                                            <i className="bi bi-check-circle-fill"></i>

                                        </div>


                                        <div className="status-option-content">

                                            <strong>
                                                Active
                                            </strong>

                                            <span>
                                                Category is available
                                                for customers.
                                            </span>

                                        </div>


                                        <div className="status-radio">

                                            {isActive && (

                                                <i className="bi bi-check"></i>

                                            )}

                                        </div>

                                    </button>


                                    {/* INACTIVE */}

                                    <button
                                        type="button"
                                        className={`category-status-option inactive-option ${
                                            !isActive
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setIsActive(false)
                                        }
                                        disabled={saving}
                                    >

                                        <div className="status-option-icon">

                                            <i className="bi bi-pause-circle-fill"></i>

                                        </div>


                                        <div className="status-option-content">

                                            <strong>
                                                Inactive
                                            </strong>

                                            <span>
                                                Category is disabled
                                                for customers.
                                            </span>

                                        </div>


                                        <div className="status-radio">

                                            {!isActive && (

                                                <i className="bi bi-check"></i>

                                            )}

                                        </div>

                                    </button>


                                </div>

                            </div>


                        </div>


                        {/* ==================================================
                            CATEGORY INFORMATION SUMMARY
                        ================================================== */}

                        <div className="category-edit-meta">


                            <div>

                                <span>
                                    Category ID
                                </span>

                                <strong>
                                    #{category.categoryId}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Current Status
                                </span>


                                <strong
                                    className={
                                        isActive
                                            ? "active"
                                            : "inactive"
                                    }
                                >

                                    <i className="bi bi-circle-fill"></i>

                                    {isActive
                                        ? "Active"
                                        : "Inactive"
                                    }

                                </strong>

                            </div>


                        </div>


                    </div>


                    {/* ====================================================
                        FOOTER
                    ==================================================== */}

                    <div className="category-modal-footer">


                        <button
                            type="button"
                            className="category-modal-btn cancel"
                            onClick={onClose}
                            disabled={saving}
                        >

                            <i className="bi bi-x-circle"></i>

                            Cancel

                        </button>


                        <button
                            type="submit"
                            className="category-modal-btn update"
                            disabled={saving}
                        >

                            {saving ? (

                                <>

                                    <span className="category-button-spinner"></span>

                                    Updating...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-check-circle"></i>

                                    Update Category

                                </>

                            )}

                        </button>


                    </div>


                </form>

            </div>

        </div>,

        document.body

    );

}

export default EditCategoryModal;