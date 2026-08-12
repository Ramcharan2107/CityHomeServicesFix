import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import logo from "../../assets/images/logo.png";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [error, setError] = useState("");


    /* ==========================================
       CLOSE POPUP
    ========================================== */

    const closeRegister = () => {
        navigate(-1);
    };


    /* ==========================================
       ESC KEY
    ========================================== */

    useEffect(() => {

        const handleEscape = (event) => {

            if (event.key === "Escape" && !loading) {
                closeRegister();
            }

        };

        document.addEventListener(
            "keydown",
            handleEscape
        );

        document.body.classList.add(
            "register-modal-open"
        );

        return () => {

            document.removeEventListener(
                "keydown",
                handleEscape
            );

            document.body.classList.remove(
                "register-modal-open"
            );

        };

    }, [loading]);


    /* ==========================================
       HANDLE CHANGE
    ========================================== */

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setError("");

    };


    /* ==========================================
       SUBMIT
    ========================================== */

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        /* PASSWORD VALIDATION */

        if (
            form.password !==
            form.confirmPassword
        ) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        try {

            setLoading(true);


            /* REGISTER */

            await authService.register({

                firstName:
                    form.firstName,

                lastName:
                    form.lastName,

                userName:
                    form.userName,

                email:
                    form.email,

                phoneNumber:
                    form.phoneNumber,

                password:
                    form.password,

                roleId: 4

            });


            alert(
                "Registration successful."
            );


            navigate("/login");

        }
        catch (error) {

            console.error(
                "REGISTRATION ERROR:",
                error
            );

            setError(
                error?.response?.data?.message ||
                "Registration failed. Please try again."
            );

        }
        finally {

            setLoading(false);

        }

    };


    return (

        <div
            className="register-modal-overlay"
            onMouseDown={(e) => {

                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {
                    closeRegister();
                }

            }}
        >

            {/* ======================================
                BACKGROUND GLOW
            ====================================== */}

            <div className="register-glow register-glow-one"></div>

            <div className="register-glow register-glow-two"></div>


            {/* ======================================
                REGISTER MODAL
            ====================================== */}

            <div className="register-modal">


                {/* ==================================
                    CLOSE
                ================================== */}

                <button
                    type="button"
                    className="register-close"
                    onClick={closeRegister}
                    disabled={loading}
                    aria-label="Close registration"
                >
                    <i className="bi bi-x"></i>
                </button>


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="register-header">

                    <div className="register-logo">

                        <img
                            src={logo}
                            alt="City Home Services"
                        />

                    </div>

                    <div>

                        <span>
                            GET STARTED
                        </span>

                        <h2>
                            Create Account
                        </h2>

                        <p>
                            Join City Home Services today
                        </p>

                    </div>

                </div>


                {/* ==================================
                    ERROR
                ================================== */}

                {error && (

                    <div className="register-error">

                        <div className="register-error-icon">

                            <i className="bi bi-exclamation-circle-fill"></i>

                        </div>

                        <div className="register-error-content">

                            <strong>
                                Registration failed
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
                    className="register-form"
                    onSubmit={handleSubmit}
                >


                    {/* =================================
                        FIRST + LAST NAME
                    ================================= */}

                    <div className="register-row">

                        <div className="register-field">

                            <label>
                                First Name
                            </label>

                            <div className="register-input">

                                <i className="bi bi-person"></i>

                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <div className="register-field">

                            <label>
                                Last Name
                            </label>

                            <div className="register-input">

                                <i className="bi bi-person"></i>

                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        USERNAME
                    ================================= */}

                    <div className="register-field">

                        <label>
                            Username
                        </label>

                        <div className="register-input">

                            <i className="bi bi-at"></i>

                            <input
                                type="text"
                                name="userName"
                                placeholder="Choose a username"
                                value={form.userName}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* =================================
                        EMAIL
                    ================================= */}

                    <div className="register-field">

                        <label>
                            Email Address
                        </label>

                        <div className="register-input">

                            <i className="bi bi-envelope"></i>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* =================================
                        PHONE
                    ================================= */}

                    <div className="register-field">

                        <label>
                            Phone Number
                        </label>

                        <div className="register-input">

                            <i className="bi bi-telephone"></i>

                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Enter phone number"
                                value={form.phoneNumber}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* =================================
                        PASSWORD
                    ================================= */}

                    <div className="register-row">

                        <div className="register-field">

                            <label>
                                Password
                            </label>

                            <div className="register-input">

                                <i className="bi bi-lock"></i>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    type="button"
                                    className="register-eye"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
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


                        <div className="register-field">

                            <label>
                                Confirm Password
                            </label>

                            <div className="register-input">

                                <i className="bi bi-lock-fill"></i>

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    value={
                                        form.confirmPassword
                                    }
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    type="button"
                                    className="register-eye"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >

                                    <i
                                        className={
                                            showConfirmPassword
                                                ? "bi bi-eye-slash"
                                                : "bi bi-eye"
                                        }
                                    ></i>

                                </button>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        REGISTER BUTTON
                    ================================= */}

                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >

                        {loading ? (

                            <>
                                <span className="register-loader"></span>

                                Creating Account...
                            </>

                        ) : (

                            <>
                                Create Account

                                <i className="bi bi-arrow-right"></i>
                            </>

                        )}

                    </button>

                </form>


                {/* ==================================
                    LOGIN
                ================================== */}

                <div className="register-login">

                    <span>
                        Already have an account?
                    </span>

                    <Link to="/login">
                        Sign In

                        <i className="bi bi-arrow-up-right"></i>
                    </Link>

                </div>


                {/* ==================================
                    SECURITY
                ================================== */}

                <div className="register-secure">

                    <i className="bi bi-shield-check"></i>

                    <span>
                        Your information is securely protected
                    </span>

                </div>


                {/* BRAND */}

                <div className="register-brand">
                    CITY HOME SERVICES
                </div>

            </div>

        </div>
    );
}

export default Register;