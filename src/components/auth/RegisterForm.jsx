import { useState } from "react";
import authService from "../../services/authService";

function RegisterForm({ onSuccess, onLogin }) {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        roleId: 4
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

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

            const response = await authService.register(form);

            if (response.success) {

                alert("Registration Successful");

                onSuccess();

            } else {

                setError(response.message);

            }

        }
        catch (err) {

            console.log("ERROR :", err);

            console.log("STATUS :", err.response?.status);

            console.log("DATA :", err.response?.data);

            console.log("REQUEST JSON:");
            console.log(JSON.stringify(form, null, 2));

            console.log("RESPONSE:");
            console.log(err.response?.data);
            setError(
                err.response?.data?.message ||
                err.response?.data?.title ||
                "Registration failed."
            );

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="row">

                <div className="col-md-6 mb-3">

                    <input
                        className="form-control"
                        placeholder="First Name"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="col-md-6 mb-3">

                    <input
                        className="form-control"
                        placeholder="Last Name"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                    />

                </div>

            </div>

            <div className="mb-3">

                <input
                    className="form-control"
                    placeholder="Username"
                    name="userName"
                    value={form.userName}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <input
                    className="form-control"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />

            </div>

            {error && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}

            <button
                className="btn w-100"
                disabled={loading}
                style={{
                    background: "#F7941D",
                    color: "#fff",
                    fontWeight: "600"
                }}
            >

                {loading
                    ? "Creating..."
                    : "Create Account"}

            </button>

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
                >
                    Login
                </button>

            </div>

        </form>

    );

}

export default RegisterForm;