import { Link } from "react-router-dom";

function RecommendedServices({ services = [] }) {

    const getIcon = (category) => {

        switch (category?.toLowerCase()) {


            case "plumbing":
                return "bi-droplet";

            case "cleaning":
                return "bi-house-heart";

            case "painting":
                return "bi-brush";

            case "electrical":
                return "bi-lightning-charge";

            case "carpentry":
                return "bi-hammer";

            default:
                return "bi-tools";

        }

    };

    return (

        <div
            className="card border-0 shadow-sm"
            style={{
                borderRadius: "20px"
            }}
        >

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <Link
                        to="/services"
                        className="btn btn-outline-warning"
                    >
                        View All
                    </Link>

                </div>

                {services.length === 0 ? (

                    <div className="text-center py-5">

                        <i
                            className="bi bi-tools"
                            style={{
                                fontSize: "60px",
                                color: "#CED4DA"
                            }}
                        ></i>

                        <h5 className="mt-3">

                            No Services Available

                        </h5>

                        <p className="text-muted">

                            Recommended services will appear here.

                        </p>

                    </div>

                ) : (

                    <div className="row">

                        {services.map((service) => (

                            <div
                                key={service.serviceId}
                                className="col-lg-3 col-md-6 mb-3"
                            >

                                <div
                                    className="card border-0 shadow-sm h-100"
                                    style={{
                                        borderRadius: "16px",
                                        transition: "all .3s ease"
                                    }}
                                    onMouseEnter={(e) => {

                                        e.currentTarget.style.transform =
                                            "translateY(-5px)";

                                        e.currentTarget.style.boxShadow =
                                            "0 15px 35px rgba(0,0,0,.12)";

                                    }}
                                    onMouseLeave={(e) => {

                                        e.currentTarget.style.transform =
                                            "translateY(0)";

                                        e.currentTarget.style.boxShadow = "";

                                    }}
                                >

                                    <div className="card-body text-center">

                                        <div
                                            className="mx-auto mb-3 d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                borderRadius: "50%",
                                                background: "#FFF4E5"
                                            }}
                                        >

                                            <i
                                                className={`bi ${getIcon(service.categoryName)}`}
                                                style={{
                                                    fontSize: "40px",
                                                    color: "#F7941D"
                                                }}
                                            ></i>

                                        </div>

                                        <h5 className="fw-bold">

                                            {service.serviceName}

                                        </h5>

                                        <p className="text-muted mb-1">

                                            {service.categoryName}

                                        </p>

                                        <small className="text-secondary">

                                            Estimated Time

                                        </small>

                                        <h6 className="fw-bold">

                                            {service.estimatedHours} Hours

                                        </h6>

                                        <p className="text-muted mb-1">

                                            Starting From

                                        </p>

                                        <h4
                                            className="fw-bold"
                                            style={{
                                                color: "#0B2E4F"
                                            }}
                                        >

                                            ₹ {service.basePrice}

                                        </h4>

                                        <Link
                                            to={`/service/${service.serviceId}`}
                                            className="btn mt-3 w-100"
                                            style={{
                                                background: "#F7941D",
                                                color: "#fff",
                                                borderRadius: "10px"
                                            }}
                                        >

                                            Book Now

                                        </Link>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}

export default RecommendedServices;