import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import serviceRequestService from "../../services/serviceRequestService";
import PageContainer from "../../components/common/PageContainer";
function ServiceRequests() {

    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    useEffect(() => {
        loadRequests();
    }, []);

    useEffect(() => {

        let data = [...requests];

        if (search.trim() !== "") {

            data = data.filter(r =>
                r.requestNumber.toLowerCase().includes(search.toLowerCase()) ||
                r.customerName.toLowerCase().includes(search.toLowerCase()) ||
                r.serviceName.toLowerCase().includes(search.toLowerCase())
            );

        }

        if (status !== "All") {

            data = data.filter(r => r.status === status);

        }

        setFilteredRequests(data);

    }, [requests, search, status]);

    const loadRequests = async () => {

        try {

            const data = await serviceRequestService.getAllAdmin();

            setRequests(data);

        }
        catch (err) {

            console.error(err);

        }
        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <h4>Loading Service Requests...</h4>

            </div>

        );

    }

    return (

        <PageContainer>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">
                        Service Requests
                    </h2>

                    <p className="text-muted mb-0">
                        Manage all customer service requests.
                    </p>

                </div>

            </div>

            <div className="card shadow-sm border-0">

                <div className="card-body">

                    <div className="row mb-4">

                        <div className="col-md-6">

                            <input
                                className="form-control"
                                placeholder="Search Request / Customer / Service..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                        <div className="col-md-3">

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >

                                <option>All</option>
                                <option>Pending</option>
                                <option>Assigned</option>
                                <option>Completed</option>
                                <option>Cancelled</option>

                            </select>

                        </div>

                    </div>

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-dark">

                                <tr>

                                    <th>Request No</th>

                                    <th>Customer</th>

                                    <th>Service</th>

                                    <th>Visit Date</th>

                                    <th>Status</th>

                                    <th>Cost</th>

                                    <th></th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredRequests.map(request => (

                                    <tr key={request.requestId}>

                                        <td>{request.requestNumber}</td>

                                        <td>{request.customerName}</td>

                                        <td>{request.serviceName}</td>

                                        <td>

                                            {request.preferredVisitDate
                                                ? new Date(
                                                    request.preferredVisitDate
                                                ).toLocaleDateString()
                                                : "-"}

                                        </td>

                                        <td>

                                            <span
                                                className={`badge ${
                                                    request.status === "Pending"
                                                        ? "bg-warning text-dark"
                                                        : request.status === "Completed"
                                                            ? "bg-success"
                                                            : request.status === "Assigned"
                                                                ? "bg-primary"
                                                                : "bg-danger"
                                                }`}
                                            >
                                                {request.status}
                                            </span>

                                        </td>

                                        <td>
                                            ₹ {request.estimatedCost ?? 0}
                                        </td>

                                        <td>

                                            <Link
                                                className="btn btn-sm btn-primary"
                                                to={`/service-requests/${request.requestId}`}
                                            >
                                                View
                                            </Link>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </PageContainer>

    );

}

export default ServiceRequests;