function PersonalInformation({ profile, onChange }) {

    return (

        <div
            className="card border-0 shadow-sm"
            style={{
                borderRadius: "20px"
            }}
        >

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h4
                        className="fw-bold"
                        style={{
                            color: "#0B2E4F"
                        }}
                    >
                        Personal Information
                    </h4>

                    <i
                        className="bi bi-person-circle"
                        style={{
                            fontSize: "28px",
                            color: "#F7941D"
                        }}
                    ></i>

                </div>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">

                            First Name

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={profile?.firstName || ""}
                            onChange={onChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">

                            Last Name

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={profile?.lastName || ""}
                            onChange={onChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">

                            Username

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="userName"
                            value={profile?.userName || ""}
                            onChange={onChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">

                            Email

                        </label>

                        <input
                            type="email"
                            className="form-control bg-light"
                            value={profile?.email || ""}
                            readOnly
                        />

                    </div>

                    <div className="col-md-6">

                        <label className="form-label fw-semibold">

                            Phone Number

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            value={profile?.phoneNumber || ""}
                            onChange={onChange}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PersonalInformation;