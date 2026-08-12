function AccountStatus({ profile }) {

    const memberSince = profile?.createdAt
        ? new Date(profile.createdAt).toLocaleDateString("en-IN", {
              month: "long",
              year: "numeric"
          })
        : "-";

    return (

        <div
            className="card border-0 shadow-sm"
            style={{
                borderRadius: "20px"
            }}
        >

            <div className="card-body">

                <h4
                    className="fw-bold mb-4"
                    style={{
                        color: "#0B2E4F"
                    }}
                >
                    Account Status
                </h4>

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <span>Account</span>

                    <span
                        className={`badge ${
                            profile?.isActive
                                ? "bg-success"
                                : "bg-danger"
                        }`}
                    >
                        {profile?.isActive
                            ? "Active"
                            : "Inactive"}
                    </span>

                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <span>Email</span>

                    <span
                        className={`badge ${
                            profile?.emailVerified
                                ? "bg-success"
                                : "bg-warning text-dark"
                        }`}
                    >
                        {profile?.emailVerified
                            ? "Verified"
                            : "Not Verified"}
                    </span>

                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <span>Customer Type</span>

                    <strong>

                        {profile?.customerType || "-"}

                    </strong>

                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <span>Phone</span>

                    <strong>

                        {profile?.phoneNumber || "-"}

                    </strong>

                </div>

                <div className="d-flex justify-content-between align-items-center">

                    <span>Member Since</span>

                    <strong>

                        {memberSince}

                    </strong>

                </div>

            </div>

        </div>

    );

}

export default AccountStatus;