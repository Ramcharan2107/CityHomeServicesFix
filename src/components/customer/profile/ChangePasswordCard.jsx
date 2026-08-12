import { useState } from "react";
import userService from "../../../services/userService";

function ChangePasswordCard() {

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);

    const [showNew, setShowNew] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const changePassword = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (newPassword !== confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            await userService.changePassword({

                currentPassword,

                newPassword

            });

            setMessage("Password changed successfully.");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        }
        catch (err) {

            setError(

                err.response?.data?.message ||

                "Failed to change password."

            );

        }
        finally {

            setLoading(false);

        }

    };

    const getStrength = () => {

        if (newPassword.length === 0)
            return null;

        if (newPassword.length < 6)
            return {
                text: "Weak",
                color: "danger",
                width: "25%"
            };

        if (newPassword.length < 10)
            return {
                text: "Medium",
                color: "warning",
                width: "60%"
            };

        return {
            text: "Strong",
            color: "success",
            width: "100%"
        };

    };

    const strength = getStrength();

    return (

        <div
            className="card border-0 shadow-sm"
            style={{
                borderRadius: "20px"
            }}
        >

            <div className="card-body">

                <h4
                    className="fw-bold mb-4"
                    style={{
                        color: "#0B2E4F"
                    }}
                >
                    Change Password
                </h4>

                {message &&

                    <div className="alert alert-success">

                        {message}

                    </div>

                }

                {error &&

                    <div className="alert alert-danger">

                        {error}

                    </div>

                }

                <form onSubmit={changePassword}>

                    <div className="mb-3">

                        <label className="form-label">

                            Current Password

                        </label>

                        <div className="input-group">

                            <input
                                type={showCurrent ? "text" : "password"}
                                className="form-control"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                required
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    setShowCurrent(!showCurrent)
                                }
                            >
                                <i className={`bi ${showCurrent ? "bi-eye-slash" : "bi-eye"}`}></i>
                            </button>

                        </div>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            New Password

                        </label>

                        <div className="input-group">

                            <input
                                type={showNew ? "text" : "password"}
                                className="form-control"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                required
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    setShowNew(!showNew)
                                }
                            >
                                <i className={`bi ${showNew ? "bi-eye-slash" : "bi-eye"}`}></i>
                            </button>

                        </div>

                    </div>

                    {strength && (

                        <div className="mb-3">

                            <div className="progress">

                                <div
                                    className={`progress-bar bg-${strength.color}`}
                                    style={{
                                        width: strength.width
                                    }}
                                />

                            </div>

                            <small
                                className={`text-${strength.color}`}
                            >

                                Password Strength :
                                {" "}
                                {strength.text}

                            </small>

                        </div>

                    )}

                    <div className="mb-4">

                        <label className="form-label">

                            Confirm Password

                        </label>

                        <div className="input-group">

                            <input
                                type={showConfirm ? "text" : "password"}
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    setShowConfirm(!showConfirm)
                                }
                            >
                                <i className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`}></i>
                            </button>

                        </div>

                    </div>

                    <button
                        className="btn"
                        type="submit"
                        disabled={loading}
                        style={{
                            background: "#F7941D",
                            color: "#fff",
                            minWidth: "180px"
                        }}
                    >

                        {loading

                            ? "Updating..."

                            : "Update Password"}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default ChangePasswordCard;