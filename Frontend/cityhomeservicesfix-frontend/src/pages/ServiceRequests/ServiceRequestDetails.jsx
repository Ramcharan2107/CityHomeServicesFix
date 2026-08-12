import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import serviceRequestService from "../../services/serviceRequestService";

function ServiceRequestDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [request, setRequest] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRequest();
    }, []);

    const loadRequest = async () => {

        try {

            const data = await serviceRequestService.getAdminById(id);

            setRequest(data);
            setStatus(data.status);

        }
        catch (err) {

            console.error(err);

            alert("Unable to load request details.");

        }
        finally {

            setLoading(false);

        }

    };

    const saveStatus = async () => {

        try {

            await serviceRequestService.updateAdminStatus(
                request.requestId,
                status
            );

            alert("Status updated successfully.");

            navigate("/service-requests");

        }
        catch (err) {

            console.error(err);

            alert("Unable to update status.");

        }

    };

    if (loading) {

        return (
            <div className="container py-5 text-center">
                <h4>Loading...</h4>
            </div>
        );

    }

    return (

        <div className="container py-4">

            <div className="card shadow border-0">

                <div className="card-header bg-dark text-white">

                    <h3 className="mb-0">
                        Service Request Details
                    </h3>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <strong>Request No</strong>
                            <div>{request.requestNumber}</div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Customer</strong>
                            <div>{request.customerName}</div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Email</strong>
                            <div>{request.email}</div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Phone</strong>
                            <div>{request.phoneNumber}</div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Service</strong>
                            <div>{request.serviceName}</div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Priority</strong>
                            <div>{request.priority}</div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Preferred Visit</strong>
                            <div>
                                {request.preferredVisitDate
                                    ? new Date(
                                        request.preferredVisitDate
                                    ).toLocaleDateString()
                                    : "-"}
                            </div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Estimated Cost</strong>
                            <div>₹ {request.estimatedCost}</div>
                        </div>

                        <div className="col-12 mb-3">
                            <strong>Address</strong>
                            <div>{request.address}</div>
                        </div>

                        <div className="col-12 mb-3">
                            <strong>Description</strong>
                            <div>{request.description}</div>
                        </div>

                        <div className="col-md-4">

                            <label className="form-label">
                                Status
                            </label>

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >
                                <option>Pending</option>
                                <option>Assigned</option>
                                <option>Completed</option>
                                <option>Cancelled</option>
                            </select>

                        </div>

                    </div>

                    <div className="mt-4">

                        <button
                            className="btn btn-success"
                            onClick={saveStatus}
                        >
                            Save Status
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ServiceRequestDetails;