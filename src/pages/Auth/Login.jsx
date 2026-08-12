import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import authService from "../../services/authService";
import logo from "../../assets/images/logo.png";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [emailOrUserName, setEmailOrUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const closeLogin = () => {
        if (!loading) {
            navigate(-1);
        }
    };

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape" && !loading) {
                closeLogin();
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.body.classList.add("login-modal-open");

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.classList.remove("login-modal-open");
        };
    }, [loading]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const loginId = emailOrUserName.trim();

        if (!loginId) {
            setError("Please enter your User ID or email.");
            return;
        }

        if (!password) {
            setError("Please enter your password.");
            return;
        }

        try {
            setLoading(true);

            const response = await authService.login({
                emailOrUserName: loginId,
                password
            });

            if (!response?.success || !response?.token) {
                setError(
                    response?.message ||
                    "Invalid User ID/Email or Password."
                );
                return;
            }

            localStorage.setItem("token", response.token);

            const decoded = jwtDecode(response.token);

            const role =
                decoded[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ];

            const userName =
                decoded[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                ];

            localStorage.setItem("role", role || "");
            localStorage.setItem("userName", userName || "");

            switch (role) {
                case "Admin":
                    navigate("/dashboard", { replace: true });
                    break;

                case "Customer":
                    navigate("/customer/dashboard", { replace: true });
                    break;

                case "Technician":
                    navigate("/technician", { replace: true });
                    break;

                default:
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    localStorage.removeItem("userName");
                    setError(
                        "Your account role is not authorized to access this application."
                    );
                    break;
            }
        } catch (error) {
            console.error("LOGIN ERROR:", error);

            if (error.response) {
                setError(
                    error.response.data?.message ||
                    `Login failed (${error.response.status}).`
                );
            } else if (error.request) {
                setError(
                    "Server did not respond. Please check your connection."
                );
            } else {
                setError(
                    error.message ||
                    "Something went wrong. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="login-modal-overlay"
            onMouseDown={(e) => {
                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {
                    closeLogin();
                }
            }}
        >
            <div className="login-modal-glow glow-one"></div>
            <div className="login-modal-glow glow-two"></div>

            <div className="login-modal">
                <button
                    type="button"
                    className="login-close"
                    onClick={closeLogin}
                    disabled={loading}
                    aria-label="Close login"
                >
                    <i className="bi bi-x"></i>
                </button>

                <div className="login-modal-header">
                    <div className="login-logo">
                        <img
                            src={logo}
                            alt="City Home Services"
                        />
                    </div>

                    <div className="login-welcome">
                        <span>WELCOME BACK</span>
                        <h2>Sign in</h2>
                        <p>
                            Access your City Home Services account
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="login-error-box">
                        <div className="login-error-icon">
                            <i className="bi bi-exclamation-circle-fill"></i>
                        </div>

                        <div className="login-error-content">
                            <strong>Login failed</strong>
                            <span>{error}</span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setError("")}
                            aria-label="Close error"
                        >
                            <i className="bi bi-x"></i>
                        </button>
                    </div>
                )}

                <form
                    className="login-modal-form"
                    onSubmit={handleLogin}
                >
                    <div className="login-input-group">
                        <label htmlFor="login-user">
                            User ID or Email
                        </label>

                        <div className="login-input-wrapper">
                            <i className="bi bi-person-badge"></i>

                            <input
                                id="login-user"
                                type="text"
                                value={emailOrUserName}
                                placeholder="Enter your User ID or email"
                                onChange={(e) => {
                                    setEmailOrUserName(e.target.value);
                                    if (error) setError("");
                                }}
                                autoComplete="username"
                                disabled={loading}
                                required
                            />
                        </div>
                    </div>

                    <div className="login-input-group">
                        <label htmlFor="login-password">
                            Password
                        </label>

                        <div className="login-input-wrapper">
                            <i className="bi bi-lock"></i>

                            <input
                                id="login-password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                placeholder="Enter your password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (error) setError("");
                                }}
                                autoComplete="current-password"
                                disabled={loading}
                                required
                            />

                            <button
                                type="button"
                                className="password-eye"
                                onClick={() =>
                                    setShowPassword(
                                        (previous) => !previous
                                    )
                                }
                                disabled={loading}
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                <i
                                    className={
                                        showPassword
                                            ? "bi bi-eye-slash"
                                            : "bi bi-eye"
                                    }
                                ></i>
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="login-modal-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="login-loader"></span>
                                Signing In...
                            </>
                        ) : (
                            <>
                                Sign In
                                <i className="bi bi-arrow-right"></i>
                            </>
                        )}
                    </button>
                </form>

                <div className="login-register">
                    <span>Don't have an account?</span>

                    <Link to="/register">
                        Create Account
                        <i className="bi bi-arrow-up-right"></i>
                    </Link>
                </div>

                <div className="login-secure">
                    <i className="bi bi-shield-check"></i>
                    <span>
                        Secure login • Your information is protected
                    </span>
                </div>

                <div className="login-brand-name">
                    CITY HOME SERVICES
                </div>
            </div>
        </div>
    );
}

export default Login;