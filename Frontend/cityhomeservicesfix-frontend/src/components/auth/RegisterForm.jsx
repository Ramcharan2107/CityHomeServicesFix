import { useState } from "react";
import authService from "../../services/authService";

function generateCustomerId() {
    return `Customer@${Math.floor(100 + Math.random() * 900)}`;
}

function RegisterForm({ onSuccess, onLogin }) {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        userName: generateCustomerId(),
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        roleId: 4
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {

            setLoading(true);

            /*
             * Only Customer registration is allowed
             * from the public website.
             *
             * RoleId 4 = Customer
             */
            const registerRequest = {
                firstName: form.firstName,
                lastName: form.lastName,
                userName: form.userName,
                email: form.email,
                phoneNumber: form.phoneNumber,
                password: form.password,
                roleId: 4
            };

            const response =
                await authService.register(registerRequest);

            if (response.success) {

                alert(
                    `Registration Successful!\n\nYour Customer ID is:\n${form.userName}\n\nUse this ID or your email with your password to login.`
                );

                onSuccess();

            } else {

                setError(
                    response.message ||
                    "Registration failed."
                );
            }

        }
        catch (err) {

            console.error("Registration Error:", err);

            setError(
                err.response?.data?.message ||
                err.response?.data?.title ||
                "Registration failed. Please try again."
            );

        }
        finally {

            setLoading(false);

        }
    };

    return (

        <form onSubmit={handleSubmit}>

            {/* =========================================
                FIRST NAME / LAST NAME
            ========================================= */}

            <div className="row">

                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        First Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />

                </div>

                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Last Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />

                </div>

            </div>


            {/* =========================================
                CUSTOMER ID
            ========================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Customer ID
                </label>

                <div className="input-group">

                    <span className="input-group-text">
                        <i className="bi bi-person-badge"></i>
                    </span>

                    <input
                        type="text"
                        className="form-control"
                        name="userName"
                        value={form.userName}
                        readOnly
                    />

                </div>

                <small className="text-muted">
                    Your Customer ID is generated automatically
                    and will be used to log in.
                </small>

            </div>


            {/* =========================================
                EMAIL
            ========================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Email Address
                </label>

                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                />

            </div>


            {/* =========================================
                PHONE
            ========================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Phone Number
                </label>

                <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter your phone number"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    disabled={loading}
                    required
                />

            </div>


            {/* =========================================
                PASSWORD
            ========================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Password
                </label>

                <input
                    type="password"
                    className="form-control"
                    placeholder="Create a password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    disabled={loading}
                    required
                />

            </div>


            {/* =========================================
                CONFIRM PASSWORD
            ========================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Confirm Password
                </label>

                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    required
                />

            </div>


            {/* =========================================
                ERROR
            ========================================= */}

            {error && (

                <div className="alert alert-danger">

                    <i className="bi bi-exclamation-circle me-2"></i>

                    {error}

                </div>

            )}


            {/* =========================================
                REGISTER BUTTON
            ========================================= */}

            <button
                type="submit"
                className="btn w-100"
                disabled={loading}
                style={{
                    background: "#F7941D",
                    color: "#fff",
                    fontWeight: "600"
                }}
            >

                {loading ? (

                    <>
                        <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                        ></span>

                        Creating Account...
                    </>

                ) : (

                    <>
                        <i className="bi bi-person-plus me-2"></i>

                        Create Customer Account
                    </>

                )}

            </button>


            {/* =========================================
                LOGIN
            ========================================= */}

            <div className="text-center mt-4">

                Already have an account?{" "}

                <button
                    type="button"
                    className="btn btn-link p-0 fw-bold"
                    style={{
                        color: "#0B2E4F",
                        textDecoration: "none"
                    }}
                    onClick={onLogin}
                    disabled={loading}
                >
                    Login
                </button>

            </div>

        </form>
    );
}

export default RegisterForm;