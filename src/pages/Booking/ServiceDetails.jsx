import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import serviceService from "../../services/serviceService";
import PageContainer from "../../components/common/PageContainer";

function ServiceDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { setBooking } = useBooking();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadService = async () => {

            try {

                setLoading(true);
                setError("");

                console.log("Loading Service ID:", id);

                const response = await serviceService.getById(id);

                console.log("Service API Response:", response);

                const serviceData =
                    response?.data ||
                    response?.result ||
                    response;

                setService(serviceData);

            } catch (error) {

                console.error("Error loading service:", error);

                setError("Unable to load service details.");

                setService(null);

            } finally {

                setLoading(false);

            }
        };

        if (id) {
            loadService();
        }

    }, [id]);


    const included = [
        "Verified Professional",
        "Quality Service",
        "Doorstep Visit",
        "Service Warranty",
        "Transparent Pricing",
        "Customer Support"
    ];


    const getServiceImage = (serviceName = "") => {

        const name = serviceName.toLowerCase();

        if (
            name.includes("ac") ||
            name.includes("fridge") ||
            name.includes("refrigerator") ||
            name.includes("washing machine") ||
            name.includes("geyser")
        ) {
            return "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200";
        }

        if (
            name.includes("plumbing") ||
            name.includes("tap") ||
            name.includes("leak")
        ) {
            return "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1200";
        }

        if (
            name.includes("cleaning") ||
            name.includes("sofa") ||
            name.includes("bathroom")
        ) {
            return "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200";
        }

        if (
            name.includes("painting")
        ) {
            return "https://images.unsplash.com/photo-1562259949-a4c9d1a3d1f0?w=1200";
        }

        if (
            name.includes("door") ||
            name.includes("wardrobe") ||
            name.includes("furniture")
        ) {
            return "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200";
        }

        if (
            name.includes("electrical") ||
            name.includes("fan") ||
            name.includes("switch")
        ) {
            return "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200";
        }

        return "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200";
    };


    if (loading) {

        return (
            <PageContainer>
                <div className="py-5 text-center">

                    <div
                        className="spinner-border"
                        style={{ color: "#F59E0B" }}
                    >
                    </div>

                    <p className="mt-3">
                        Loading service details...
                    </p>

                </div>
            </PageContainer>
        );
    }


    if (error || !service) {

        return (
            <PageContainer>
                <div className="py-5 text-center">

                    <h3 style={{ color: "#0B1F3A" }}>
                        Service Not Found
                    </h3>

                    <p className="text-muted">
                        {error || "The requested service could not be found."}
                    </p>

                    <button
                        className="btn mt-3"
                        style={{
                            background: "#F59E0B",
                            color: "#ffffff"
                        }}
                        onClick={() => navigate("/services")}
                    >
                        Browse Services
                    </button>

                </div>
            </PageContainer>
        );
    }


    return (

        <div
            style={{
                background: "#F8FAFC",
                minHeight: "100vh",
                padding: "40px 0"
            }}
        >

            <PageContainer>

                <div className="row align-items-center g-5">

                    {/* SERVICE IMAGE */}

                    <div className="col-lg-6">

                        <img
                            src={
                                service.imageUrl ||
                                service.image ||
                                getServiceImage(service.serviceName)
                            }
                            alt={service.serviceName}
                            className="img-fluid rounded-4 shadow"
                            style={{
                                width: "100%",
                                height: "450px",
                                objectFit: "cover"
                            }}
                            onError={(e) => {
                                e.currentTarget.src =
                                    getServiceImage(service.serviceName);
                            }}
                        />

                    </div>


                    {/* SERVICE INFORMATION */}

                    <div className="col-lg-6">

                        <span
                            className="badge mb-3 px-3 py-2"
                            style={{
                                background: "#FFF3D6",
                                color: "#D97706",
                                fontSize: "14px"
                            }}
                        >
                            {service.categoryName || "Home Service"}
                        </span>


                        <h1
                            className="fw-bold mb-3"
                            style={{
                                color: "#0B1F3A",
                                fontSize: "42px"
                            }}
                        >
                            {service.serviceName}
                        </h1>


                        <p className="fs-5 mb-3">

                            ⭐ 4.8

                            <span className="text-muted">
                                {" "}(2500+ Reviews)
                            </span>

                        </p>


                        <h2
                            className="fw-bold mb-4"
                            style={{
                                color: "#F59E0B"
                            }}
                        >
                            ₹ {service.basePrice || service.price || 0}
                        </h2>


                        <p className="mb-3">

                            <strong>
                                Estimated Time:
                            </strong>

                            {" "}

                            {service.estimatedHours || 1} Hours

                        </p>


                        <p
                            className="text-muted fs-6"
                            style={{
                                lineHeight: "1.8"
                            }}
                        >
                            {service.description ||
                                "Professional and reliable home service delivered by verified experts."}
                        </p>


                        <button
                            className="btn btn-lg mt-3 px-5"
                            style={{
                                background: "#F59E0B",
                                color: "#ffffff",
                                fontWeight: "600",
                                borderRadius: "10px"
                            }}
                            onClick={() => {

                                setBooking(prev => ({
                                    ...prev,
                                    serviceId: service.serviceId,
                                    serviceName: service.serviceName,
                                    servicePrice: Number(
                                        service.basePrice ||
                                        service.price ||
                                        0
                                    ),
                                    total: Number(
                                        service.basePrice ||
                                        service.price ||
                                        0
                                    )
                                }));

                                navigate(
                                    `/booking/address/${service.serviceId}`
                                );

                            }}
                        >
                            Book Now
                        </button>

                    </div>

                </div>


                <hr className="my-5" />


                <div className="row g-5">

                    {/* WHAT'S INCLUDED */}

                    <div className="col-lg-6">

                        <h3
                            className="fw-bold mb-4"
                            style={{ color: "#0B1F3A" }}
                        >
                            What's Included
                        </h3>


                        <ul className="list-group shadow-sm">

                            {included.map((item, index) => (

                                <li
                                    key={index}
                                    className="list-group-item py-3"
                                >
                                    <span className="me-2">
                                        ✅
                                    </span>

                                    {item}

                                </li>

                            ))}

                        </ul>

                    </div>


                    {/* WHY CHOOSE US */}

                    <div className="col-lg-6">

                        <h3
                            className="fw-bold mb-4"
                            style={{ color: "#0B1F3A" }}
                        >
                            Why Choose Us
                        </h3>


                        <div
                            className="card shadow-sm border-0 rounded-4"
                        >

                            <div className="card-body p-4">

                                <p>✔ Verified Professionals</p>

                                <p>✔ Genuine Pricing</p>

                                <p>✔ On-Time Service</p>

                                <p>✔ Secure Payments</p>

                                <p>✔ Service Warranty</p>

                                <p className="mb-0">
                                    ✔ 24/7 Customer Support
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* BACK BUTTON */}

                <div className="mt-5">

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>

                </div>

            </PageContainer>

        </div>

    );
}

export default ServiceDetails;