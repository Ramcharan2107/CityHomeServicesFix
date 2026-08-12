import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/images/logo.png";

function Hero() {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [role, setRole] = useState("");

    useEffect(() => {
        const currentToken = localStorage.getItem("token");
        setToken(currentToken);

        if (currentToken) {
            try {
                const decoded = jwtDecode(currentToken);

                setRole(
                    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                );
            } catch {
                localStorage.removeItem("token");
                setToken(null);
                setRole("");
            }
        }
    }, []);


    return (

        <section
            style={{
                paddingTop: "clamp(10px, 6vw, 80px)",
                paddingBottom: "clamp(10px, 6vw, 80px)",
                background: "linear-gradient(135deg,#FFF8E6,#FFE9A8)"
            }}
        >

            <div className="container">

                <div className="row align-items-center justify-content-between g-5">

                    <div className="col-lg-6 col-md-12 text-center text-lg-start">

                        <span
                            className="badge mb-3"
                            style={{
                                background: "#F4B400",
                                color: "#0B1F3A",
                                fontSize: "15px"
                            }}
                        >
                            Trusted Home Services
                        </span>

                        <h1
                            className="fw-bold mb-4"
                            style={{
                                fontSize: "clamp(2rem, 5vw, 4rem)",
                                lineHeight: "1.15",
                                color: "var(--text-primary)"
                            }}
                        >
                            Professional Home Services
                            <br />
                            at Your Doorstep
                        </h1>

                        <p
                            className="lead mb-4 mx-auto mx-lg-0"
                            style={{
                                maxWidth: "620px",
                                color: "var(--text-secondary)"
                            }}
                        >
                            Book verified electricians, plumbers, painters,
                            carpenters, cleaners and many more professionals
                            with just a few clicks.
                        </p>

                        <div
                            className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3"
                        >

                            <Link
                                to="/services"
                                className="btn btn-lg"
                                style={{
                                    background: "#F4B400",
                                    color: "#0B1F3A",
                                    fontWeight: "600"
                                }}
                            >
                                Book Now
                            </Link>

                            {!token && (

                                <Link
                                    to="/login"
                                    className="btn btn-outline-dark btn-lg"
                                >
                                    Login
                                </Link>

                            )}

                            {token && role === "Customer" && (

                                <Link
                                    to="/customer/dashboard"
                                    className="btn btn-lg btn-outline-dark"
                                >
                                    My Dashboard
                                </Link>

                            )}

                            {token && role === "Admin" && (

                                <Link
                                    to="/dashboard"
                                    className="btn btn-lg btn-outline-dark"
                                >
                                    Admin Dashboard
                                </Link>

                            )}

                        </div>

                    </div>

                    <div className="col-lg-6 col-md-12 d-flex justify-content-center">

                        <img
                            src={logo}
                            className="img-fluid"
                            style={{
                                width: "120%",
                                maxWidth: "420px",
                                height: "auto"
                            }}
                        />

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Hero;