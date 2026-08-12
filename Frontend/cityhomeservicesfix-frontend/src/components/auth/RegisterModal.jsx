import logo from "../../assets/images/logo.png";
import RegisterForm from "./RegisterForm";

function RegisterModal({ show, onClose, onLogin }) {

    if (!show) return null;

    return (

        <div
            className="modal fade show d-block"
            style={{
                background: "rgba(0,0,0,.6)",
                backdropFilter: "blur(4px)",
                zIndex: 1055
            }}
        >

            <div
                className="modal-dialog modal-lg modal-dialog-centered"
                style={{ maxWidth: "900px" }}
            >

                <div
                    className="modal-content border-0"
                    style={{
                        borderRadius: "20px",
                        overflow: "hidden"
                    }}
                >

                    <div className="row g-0">

                        {/* Left */}

                        <div
                            className="col-lg-5 d-flex flex-column justify-content-center align-items-center text-white p-4"
                            style={{
                                background:
                                    "linear-gradient(135deg,#0B2E4F,#F7941D)"
                            }}
                        >

                            <img
                                src={logo}
                                alt="Logo"
                                width="110"
                                className="mb-3"
                            />

                            <h3 className="fw-bold text-center">
                                City Home Services
                            </h3>

                            <p className="text-center opacity-75">
                                We Care, You Relax
                            </p>

                            <hr
                                className="w-100"
                                style={{
                                    borderColor: "rgba(255,255,255,.3)"
                                }}
                            />

                            <div className="mt-2">

                                <p className="mb-2">
                                    ✔ Verified Professionals
                                </p>

                                <p className="mb-2">
                                    ✔ Secure Online Booking
                                </p>

                                <p className="mb-2">
                                    ✔ Affordable Pricing
                                </p>

                                <p className="mb-2">
                                    ✔ 24×7 Customer Support
                                </p>

                                <p className="mb-2">
                                    ✔ Trusted Home Services
                                </p>

                            </div>

                        </div>

                        {/* Right */}

                        <div className="col-lg-7 p-4">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <h3
                                    className="fw-bold"
                                    style={{ color: "#0B2E4F" }}
                                >
                                    Create Account
                                </h3>

                                <button
                                    className="btn-close"
                                    onClick={onClose}
                                ></button>

                            </div>

                            <RegisterForm
                                onSuccess={onClose}
                                onLogin={onLogin}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default RegisterModal;