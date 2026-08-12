import { useEffect, useRef, useState } from "react";
import PageContainer from "../common/PageContainer";
import "./HowItWorks.css";
function HowItWorks() {

    const [activeStep, setActiveStep] = useState(0);
    const sectionRef = useRef(null);

    const steps = [
        {
            number: "01",
            icon: "bi-search",
            title: "Choose a Service",
            shortText: "Find the right professional for your home.",
            description:
                "Browse our wide range of home services including electrical, plumbing, painting, carpentry, cleaning, appliance repair and more. Select the service that matches your requirement.",
            details: [
                "Browse available home services",
                "Explore service categories",
                "View service details and pricing",
                "Select the service you need"
            ]
        },
        {
            number: "02",
            icon: "bi-calendar-check",
            title: "Book Online",
            shortText: "Schedule your service in just a few clicks.",
            description:
                "Choose your preferred service date, visit time and saved address. Review your booking details before confirming your request.",
            details: [
                "Select your preferred date",
                "Choose a convenient visit time",
                "Select your service address",
                "Review and confirm your booking"
            ]
        },
        {
            number: "03",
            icon: "bi-person-workspace",
            title: "Expert Visits",
            shortText: "A verified professional comes to your doorstep.",
            description:
                "Once your booking is confirmed, an assigned professional visits your home at the scheduled time and understands the service requirement.",
            details: [
                "Professional assignment",
                "Technician arrives at your doorstep",
                "Service requirement is verified",
                "Work begins after confirmation"
            ]
        },
        {
            number: "04",
            icon: "bi-check-circle-fill",
            title: "Service Completed",
            shortText: "Your service is completed with quality assurance.",
            description:
                "The professional completes the requested work and updates the service status. You can review your completed booking and service details.",
            details: [
                "Service work is completed",
                "Final service status is updated",
                "Booking is marked completed",
                "Review your service experience"
            ]
        }
    ];

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("how-visible");
                }

            },
            {
                threshold: 0.15
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();

    }, []);

    return (

        <section
            ref={sectionRef}
            className="how-it-works-section"
        >

            <PageContainer>

                {/* HEADER */}

                <div className="how-header">

                    <span className="how-badge">
                        <span></span>
                        HOW IT WORKS
                    </span>

                    <h2>
                        Book Your Service
                        <br />
                        <strong>In 4 Simple Steps</strong>
                    </h2>

                    <p>
                        From finding the right professional to completing
                        your service, our simple process keeps everything
                        clear, convenient and reliable.
                    </p>

                </div>


                {/* FLOW */}

                <div className="how-flow">

                    {/* LEFT DETAILS */}

                    <div className="how-details">

                        <div className="how-detail-card">

                            <div className="how-detail-number">
                                {steps[activeStep].number}
                            </div>

                            <div className="how-detail-icon">
                                <i
                                    className={`bi ${steps[activeStep].icon}`}
                                ></i>
                            </div>

                            <span className="how-detail-label">
                                STEP {steps[activeStep].number}
                            </span>

                            <h3>
                                {steps[activeStep].title}
                            </h3>

                            <p>
                                {steps[activeStep].description}
                            </p>

                            <div className="how-detail-list">

                                {steps[activeStep].details.map(
                                    (detail, index) => (

                                        <div
                                            key={index}
                                            className="how-detail-item"
                                        >

                                            <i className="bi bi-check2"></i>

                                            <span>
                                                {detail}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>


                    {/* RIGHT FLOW */}

                    <div className="how-timeline">

                        <div className="how-line"></div>

                        {steps.map((step, index) => (

                            <div
                                key={step.number}
                                className={`how-step ${
                                    activeStep === index
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() => setActiveStep(index)}
                            >

                                <div className="how-step-marker">

                                    <span>
                                        {step.number}
                                    </span>

                                </div>

                                <div className="how-step-content">

                                    <div className="how-step-icon">

                                        <i
                                            className={`bi ${step.icon}`}
                                        ></i>

                                    </div>

                                    <div>

                                        <h4>
                                            {step.title}
                                        </h4>

                                        <p>
                                            {step.shortText}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </PageContainer>

        </section>
    );
}

export default HowItWorks;