function AdditionalInformation({ profile, onChange }) {

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
                        Additional Information
                    </h4>

                    <i
                        className="bi bi-info-circle"
                        style={{
                            fontSize: "28px",
                            color: "#F7941D"
                        }}
                    ></i>

                </div>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">
                            Customer Type
                        </label>

                        <select
                            className="form-select"
                            name="customerType"
                            value={profile?.customerType || ""}
                            onChange={onChange}
                        >
                            <option value="Individual">Individual</option>
                            <option value="Business">Business</option>
                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">
                            Gender
                        </label>

                        <select
                            className="form-select"
                            name="gender"
                            value={profile?.gender || ""}
                            onChange={onChange}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">
                            Date of Birth
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            name="dateOfBirth"
                            value={profile?.dateOfBirth || ""}
                            onChange={onChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">
                            Preferred Language
                        </label>

                        <select
                            className="form-select"
                            name="preferredLanguage"
                            value={profile?.preferredLanguage || ""}
                            onChange={onChange}
                        >
                            <option value="">Select</option>
                            <option value="English">English</option>
                            <option value="Telugu">Telugu</option>
                            <option value="Hindi">Hindi</option>
                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">
                            Company Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="companyName"
                            value={profile?.companyName || ""}
                            onChange={onChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label fw-semibold">
                            Tax Number
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="taxNumber"
                            value={profile?.taxNumber || ""}
                            onChange={onChange}
                        />

                    </div>

                    <div className="col-12">

                        <label className="form-label fw-semibold">
                            Notes
                        </label>

                        <textarea
                            rows="4"
                            className="form-control"
                            name="notes"
                            value={profile?.notes || ""}
                            onChange={onChange}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdditionalInformation;