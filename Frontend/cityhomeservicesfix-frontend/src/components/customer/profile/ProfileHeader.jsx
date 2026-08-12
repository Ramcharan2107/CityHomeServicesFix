function ProfileHeader({ profile }) {

    const initials =
        `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase();

    return (

        <div
            className="card border-0 shadow-sm overflow-hidden"
            style={{
                borderRadius: "22px"
            }}
        >

            {/* Top Accent */}

            <div
                style={{
                    height: "10px",
                    background: "linear-gradient(90deg,#0B2E4F,#1C5D8C,#F7941D)"
                }}
            />

            <div className="card-body p-4">

                <div className="d-flex align-items-center">
                    {/* Left */}

                    <div className="d-flex align-items-center">

                        {/* Avatar */}

                        <div
                            className="d-flex justify-content-center align-items-center shadow-sm"
                            style={{
                                width: "90px",
                                height: "90px",
                                borderRadius: "50%",
                                background: "#FFF4E8",
                                color: "#F7941D",
                                fontSize: "35px",
                                fontWeight: "700",
                                border: "4px solid #fff"
                            }}
                        >

                            {initials}

                        </div>

                        <div className="ms-3">

                            <h3
                                className="fw-bold mb-1"
                                style={{
                                    color: "#0B2E4F"
                                }}
                            >

                                {profile.firstName} {profile.lastName}

                            </h3>

                            <p
                                className="text-muted mb-3"
                                style={{
                                    fontSize: "16px"
                                }}
                            >

                                {profile.customerType} Customer

                            </p>

                            <div className="d-flex gap-2 flex-wrap">

                                <span className="badge bg-success px-3 py-2">

                                    Active

                                </span>

                                <span className="badge bg-primary px-3 py-2">

                                    {profile.emailVerified
                                        ? "Email Verified"
                                        : "Email Not Verified"}

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                <hr className="my-3" />
                                <div className="row g-3 text-center text-lg-start">

                    <div className="col-lg-4 col-md-6">

                        <div className="d-flex align-items-center">

                            <div
                                className="d-flex justify-content-center align-items-center me-3"
                                style={{
                                    width: "52px",
                                    height: "52px",
                                    borderRadius: "14px",
                                    background: "#EAF3FB"
                                }}
                            >

                                <i
                                    className="bi bi-envelope"
                                    style={{
                                        color: "#0B2E4F",
                                        fontSize: "22px"
                                    }}
                                ></i>

                            </div>

                            <div>

                                <small className="text-muted">

                                    Email

                                </small>

                                <h6 className="fw-bold mb-0">

                                    {profile.email}

                                </h6>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4 col-md-6">

                        <div className="d-flex align-items-center">

                            <div
                                className="d-flex justify-content-center align-items-center me-3"
                                style={{
                                    width: "45px",
                                    height: "45px",
                                    borderRadius: "14px",
                                    background: "#FFF4E8"
                                }}
                            >

                                <i
                                    className="bi bi-person"
                                    style={{
                                        color: "#F7941D",
                                        fontSize: "20px"
                                    }}
                                ></i>

                            </div>

                            <div>

                                <small className="text-muted">

                                    Username

                                </small>

                                <h6 className="fw-bold mb-0">

                                    {profile.userName}

                                </h6>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4 col-md-12">

                        <div className="d-flex align-items-center">

                            <div
                                className="d-flex justify-content-center align-items-center me-3"
                                style={{
                                    width: "52px",
                                    height: "52px",
                                    borderRadius: "14px",
                                    background: "#EAF8EE"
                                }}
                            >

                                <i
                                    className="bi bi-calendar-event"
                                    style={{
                                        color: "#198754",
                                        fontSize: "22px"
                                    }}
                                ></i>

                            </div>

                            <div>

                                <small className="text-muted">

                                    Member Since

                                </small>

                                <h6 className="fw-bold mb-0">

                                    {profile.createdAt
                                        ? new Date(profile.createdAt).toLocaleDateString(
                                            "en-IN",
                                            {
                                                month: "short",
                                                year: "numeric"
                                            }
                                        )
                                        : "-"}

                                </h6>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ProfileHeader;