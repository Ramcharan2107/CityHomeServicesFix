import { useEffect, useState } from "react";

import notificationService from "../../../services/notificationService";
import userService from "../../../services/userService";

function AddNotificationModal({

    show,

    onClose,

    onSuccess

}) {

    const [saving, setSaving] = useState(false);

    const [users, setUsers] = useState([]);

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({

        userId: "",

        title: "",

        message: "",

        notificationType: "General"

    });

    useEffect(() => {

        if (!show)
            return;

        loadUsers();

    }, [show]);

    const loadUsers = async () => {

        try {

            const data = await userService.getAll();

            setUsers(data);

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

        if (!form.userId)
            validationErrors.userId = "Please select a user.";

        if (!form.title.trim())
            validationErrors.title = "Title is required.";

        if (!form.message.trim())
            validationErrors.message = "Message is required.";

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

                            Send Notification

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

                                                Notification Information

                                            </h5>

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    User

                                                </label>

                                                <select
                                                    name="userId"
                                                    className={`form-select ${errors.userId ? "is-invalid" : ""}`}
                                                    value={form.userId}
                                                    onChange={handleChange}
                                                >

                                                    <option value="">

                                                        Select User

                                                    </option>

                                                    {users.map(user => (

                                                        <option
                                                            key={user.userId}
                                                            value={user.userId}
                                                        >

                                                            {user.firstName} {user.lastName}

                                                        </option>

                                                    ))}

                                                </select>

                                                <div className="invalid-feedback">

                                                    {errors.userId}

                                                </div>

                                            </div>

                                            <div>

                                                <label className="form-label fw-semibold">

                                                    Notification Type

                                                </label>

                                                <select
                                                    name="notificationType"
                                                    className="form-select"
                                                    value={form.notificationType}
                                                    onChange={handleChange}
                                                >

                                                    <option value="General">

                                                        General

                                                    </option>

                                                    <option value="Service">

                                                        Service

                                                    </option>

                                                    <option value="Payment">

                                                        Payment

                                                    </option>

                                                    <option value="Reminder">

                                                        Reminder

                                                    </option>

                                                    <option value="System">

                                                        System

                                                    </option>

                                                </select>

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

                                                Notification Content

                                            </h5>

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Title

                                                </label>

                                                <input
                                                    type="text"
                                                    name="title"
                                                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                                    value={form.title}
                                                    onChange={handleChange}
                                                />

                                                <div className="invalid-feedback">

                                                    {errors.title}

                                                </div>

                                            </div>

                                            <div>

                                                <label className="form-label fw-semibold">

                                                    Message

                                                </label>

                                                <textarea
                                                    rows="6"
                                                    name="message"
                                                    className={`form-control ${errors.message ? "is-invalid" : ""}`}
                                                    value={form.message}
                                                    onChange={handleChange}
                                                ></textarea>

                                                <div className="invalid-feedback">

                                                    {errors.message}

                                                </div>

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

                                    await notificationService.create({

                                        userId: Number(form.userId),

                                        title: form.title,

                                        message: form.message,

                                        notificationType: form.notificationType

                                    });

                                    alert("Notification sent successfully.");

                                    onSuccess();

                                    onClose();

                                }
                                catch (err) {

                                    console.error(err);

                                    alert("Failed to send notification.");

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

                                    Sending...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-send me-2"></i>

                                    Send Notification

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddNotificationModal;