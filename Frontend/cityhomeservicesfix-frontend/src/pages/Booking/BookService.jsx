import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../components/common/PageContainer";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
function BookService() {

    const navigate = useNavigate();
    const { id } = useParams();

    // Temporary service data
    const service = {
        id,
        name: "AC Repair",
        price: 499,
        duration: "45 Minutes"
    };

    const handleContinue = () => {

        const token = localStorage.getItem("token");

        if (!token) {

            alert("Please login to continue.");

            navigate("/login");

            return;
        }

        navigate(`/booking/address/${id}`);
    };

    return (

        <PageContainer>

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow border-0">

                        <div className="card-header"
                            style={{
                                background: "#F4B400",
                                color: "#0B1F3A"
                            }}
                        >
                            <h3 className="mb-0">
                                Book Service
                            </h3>
                        </div>

                        <div className="card-body">

                            <div className="mb-4">

                                <h4>{service.name}</h4>

                                <p>
                                    <strong>Price :</strong> ₹{service.price}
                                </p>

                                <p>
                                    <strong>Duration :</strong> {service.duration}
                                </p>

                            </div>

                            <hr />

                            <div className="mb-3">

                                <label className="form-label">
                                    Preferred Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Preferred Time
                                </label>

                                <select className="form-select">

                                    <option>09:00 AM</option>

                                    <option>11:00 AM</option>

                                    <option>02:00 PM</option>

                                    <option>05:00 PM</option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Special Instructions
                                </label>

                                <textarea
                                    rows="4"
                                    className="form-control"
                                />

                            </div>

                            <button
                                className="btn btn-lg w-100"
                                style={{
                                    background: "#0B1F3A",
                                    color: "#fff"
                                }}
                                onClick={handleContinue}
                            >
                                Continue
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </PageContainer>

    );
}

export default BookService;