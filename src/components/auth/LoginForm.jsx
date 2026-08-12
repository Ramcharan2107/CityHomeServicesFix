import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import authService from "../../services/authService";

function LoginForm({ onSuccess, onRegister }) {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await authService.login({
                email,
                password
            });

            if (!response.success) {

                setError(
                    response.message ||
                    "Invalid Email or Password"
                );

                setLoading(false);

                return;

            }

            localStorage.setItem(
                "token",
                response.token
            );
            window.location.reload();

            const decoded = jwtDecode(response.token);

            const role =
                decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            const userName =
                decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

            localStorage.setItem("role", role);
            localStorage.setItem("userName", userName);

            if (onSuccess) {

                onSuccess();

            }

            switch (role) {

                case "Admin":

                    navigate("/dashboard");

                    break;

                case "Customer":

                    navigate("/");

                    break;

                case "Technician":

                    navigate("/technician");

                    break;

                case "Dispatcher":

                    navigate("/dispatcher");

                    break;

                default:

                    navigate("/");

                    break;

            }

        }
        catch {

            setError("Invalid Email or Password");

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <form onSubmit={handleLogin}>

            <div className="mb-3">

                <label className="form-label fw-semibold">
                    Email
                </label>

                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

            </div>

            <div className="mb-3">

                <label className="form-label fw-semibold">
                    Password
                </label>

                <div className="input-group">

                    <input
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                    >

                        <i
                            className={`bi ${
                                showPassword
                                    ? "bi-eye-slash"
                                    : "bi-eye"
                            }`}
                        ></i>

                    </button>

                </div>

            </div>

            {error && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}

            <button
                type="submit"
                disabled={loading}
                className="btn w-100"
                style={{
                    background: "#F7941D",
                    color: "#fff",
                    fontWeight: "600"
                }}
            >

                {loading
                    ? "Logging In..."
                    : "Login"}

            </button>

           <div className="text-center mt-4">

                Don't have an account?{" "}

                <button
                    type="button"
                    className="btn btn-link fw-bold p-0"
                    style={{
                        color: "#0B2E4F",
                        textDecoration: "none"
                    }}
                    onClick={onRegister}
                >
                    Register
                </button>

            </div>

        </form>

    );

}

export default LoginForm;