import { useEffect, useState } from "react";

import notificationService from "../../../services/notificationService";

function EditNotificationModal({

    show,

    notification,

    onClose,

    onSuccess

}) {

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({

        notificationId: 0,

        isRead: false

    });

    useEffect(() => {

        if (!show || !notification)
            return;

        loadNotification();

    }, [show, notification]);

    const loadNotification = async () => {

        setLoading(true);

        try {

            const data = await notificationService.getById(

                notification.notificationId

            );

            setForm({

                notificationId: data.notificationId,

                isRead: data.isRead

            });

        }
        catch (err) {

            console.error(err);

        }
        finally {

            setLoading(false);

        }

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

            <div className="modal-dialog modal-dialog-centered">

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

                            Update Notification Status

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

                                    Loading Notification...

                                </h5>

                            </div>

                        ) : (

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

                                        Notification Status

                                    </h5>

                                    <div className="form-check form-switch fs-5">

                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={form.isRead}
                                            onChange={(e) =>
                                                setForm({

                                                    ...form,

                                                    isRead: e.target.checked

                                                })
                                            }
                                        />

                                        <label className="form-check-label ms-2">

                                            Mark notification as Read

                                        </label>

                                    </div>

                                    <div className="alert alert-info mt-4 mb-0">

                                        <i className="bi bi-info-circle me-2"></i>

                                        Changing this status will update the notification's
                                        read state and automatically set or clear the
                                        <strong> Read At </strong> timestamp.

                                    </div>

                                </div>

                            </div>

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

                                setSaving(true);

                                try {

                                    await notificationService.update(

                                        form.notificationId,

                                        {

                                            notificationId: form.notificationId,

                                            isRead: form.isRead

                                        }

                                    );

                                    alert("Notification updated successfully.");

                                    onSuccess();

                                    onClose();

                                }
                                catch (err) {

                                    console.error(err);

                                    alert("Failed to update notification.");

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

                                    Update Status

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default EditNotificationModal;