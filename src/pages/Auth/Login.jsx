import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import authService from "../../services/authService";
import logo from "../../assets/images/logo.png";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    /* ==========================================
       CLOSE POPUP
    ========================================== */

    const closeLogin = () => {
        navigate(-1);
    };


    /* ==========================================
       ESC KEY
    ========================================== */

    useEffect(() => {

        const handleEscape = (event) => {

            if (event.key === "Escape") {
                closeLogin();
            }

        };

        document.addEventListener(
            "keydown",
            handleEscape
        );

        document.body.classList.add("login-modal-open");

        return () => {

            document.removeEventListener(
                "keydown",
                handleEscape
            );

            document.body.classList.remove(
                "login-modal-open"
            );

        };

    }, []);


    /* ==========================================
       LOGIN
    ========================================== */

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

            /* SAVE TOKEN */

            localStorage.setItem(
                "token",
                response.token
            );


            /* DECODE TOKEN */

            const decoded = jwtDecode(
                response.token
            );


            /* ROLE */

            const role =
                decoded[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ];


            /* USER NAME */

            const userName =
                decoded[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                ];


            localStorage.setItem(
                "role",
                role
            );

            localStorage.setItem(
                "userName",
                userName
            );


            /* ==================================
               ROLE BASED REDIRECT
            ================================== */

            switch (role) {

                case "Admin":
                    navigate("/dashboard");
                    break;

                case "Customer":
                    navigate("/customer/dashboard");
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

        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );

            if (error.response) {

                setError(
                    error.response.data?.message ||
                    `Login failed (${error.response.status})`
                );

            } else if (error.request) {

                setError(
                    "Server did not respond. Please check your connection."
                );

            } else {

                setError(
                    error.message ||
                    "Something went wrong."
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

            {/* ======================================
                BACKGROUND BLUR
            ====================================== */}

            <div className="login-modal-glow glow-one"></div>
            <div className="login-modal-glow glow-two"></div>


            {/* ======================================
                LOGIN MODAL
            ====================================== */}

            <div className="login-modal">

                {/* ==================================
                    CLOSE
                ================================== */}

                <button
                    type="button"
                    className="login-close"
                    onClick={closeLogin}
                    disabled={loading}
                    aria-label="Close login"
                >
                    <i className="bi bi-x"></i>
                </button>


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="login-modal-header">

                    <div className="login-logo">

                        <img
                            src={logo}
                            alt="City Home Services"
                        />

                    </div>

                    <div className="login-welcome">

                        <span>
                            WELCOME BACK
                        </span>

                        <h2>
                            Sign in
                        </h2>

                        <p>
                            Access your City Home Services account
                        </p>

                    </div>

                </div>


                {/* ==================================
                    ERROR
                ================================== */}

                {error && (

                    <div className="login-error-box">

                        <div className="login-error-icon">
                            <i className="bi bi-exclamation-circle-fill"></i>
                        </div>

                        <div className="login-error-content">

                            <strong>
                                Login failed
                            </strong>

                            <span>
                                {error}
                            </span>

                        </div>

                        <button
                            type="button"
                            onClick={() => setError("")}
                        >
                            <i className="bi bi-x"></i>
                        </button>

                    </div>

                )}


                {/* ==================================
                    FORM
                ================================== */}

                <form
                    className="login-modal-form"
                    onSubmit={handleLogin}
                >

                    {/* EMAIL */}

                    <div className="login-input-group">

                        <label htmlFor="login-email">
                            Email Address
                        </label>

                        <div className="login-input-wrapper">

                            <i className="bi bi-envelope"></i>

                            <input
                                id="login-email"
                                type="email"
                                value={email}
                                placeholder="Enter your email"
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                autoComplete="email"
                                required
                            />

                        </div>

                    </div>


                    {/* PASSWORD */}

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
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-eye"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
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


                    {/* LOGIN BUTTON */}

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


                {/* ==================================
                    REGISTER
                ================================== */}

                <div className="login-register">

                    <span>
                        Don't have an account?
                    </span>

                    <Link to="/register">
                        Create Account
                        <i className="bi bi-arrow-up-right"></i>
                    </Link>

                </div>


                {/* ==================================
                    SECURITY
                ================================== */}

                <div className="login-secure">

                    <i className="bi bi-shield-check"></i>

                    <span>
                        Secure login • Your information is protected
                    </span>

                </div>


                {/* ==================================
                    BRAND
                ================================== */}

                <div className="login-brand-name">

                    CITY HOME SERVICES

                </div>

            </div>

        </div>
    );
}

export default Login;