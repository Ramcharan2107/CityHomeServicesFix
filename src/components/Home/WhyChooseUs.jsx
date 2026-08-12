import { useEffect, useRef, useState } from "react";
import PageContainer from "../common/PageContainer";
import "./WhyChooseUs.css";

const features = [
    {
        icon: "bi-patch-check-fill",
        title: "Verified Professionals",
        description:
            "Every technician is background verified and professionally trained."
    },
    {
        icon: "bi-currency-rupee",
        title: "Transparent Pricing",
        description:
            "No hidden charges. Get upfront pricing before booking."
    },
    {
        icon: "bi-clock-history",
        title: "Quick Service",
        description:
            "Book a service in minutes and get fast doorstep assistance."
    },
    {
        icon: "bi-headset",
        title: "24/7 Customer Support",
        description:
            "Our support team is available anytime to help you."
    }
];

function WhyChooseUs() {

    const sectionRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {

                if (entry.isIntersecting) {

                    setIsVisible(true);

                    observer.disconnect();
                }

            },
            {
                threshold: 0.15
            }
        );

        observer.observe(section);

        return () => observer.disconnect();

    }, []);


    return (

        <section
            ref={sectionRef}
            className={`why-section ${
                isVisible ? "why-visible" : ""
            }`}
        >

            {/* Background decoration */}

            <div className="why-glow why-glow-one"></div>

            <div className="why-glow why-glow-two"></div>


            <PageContainer>

                {/* =========================
                    HEADER
                ========================= */}

                <div className="why-header">

                    <div className="why-label">

                        <span></span>

                        Why Choose Us

                    </div>


                    <h2>
                        Built Around Your
                        <span> Convenience</span>
                    </h2>


                    <p>
                        Trusted professionals, transparent pricing,
                        fast doorstep service and complete customer
                        satisfaction.
                    </p>

                </div>


                {/* =========================
                    FEATURES
                ========================= */}

                <div className="row g-4">

                    {features.map((item, index) => (

                        <div
                            className="col-lg-3 col-md-6"
                            key={item.title}
                        >

                            <div
                                className="why-card"
                                style={{
                                    "--card-delay":
                                        `${index * 100}ms`
                                }}
                            >

                                {/* Number */}

                                <div className="why-number">
                                    0{index + 1}
                                </div>


                                {/* Icon */}

                                <div className="why-icon-wrapper">

                                    <div className="why-icon">

                                        <i
                                            className={`bi ${item.icon}`}
                                        ></i>

                                    </div>

                                </div>


                                {/* Content */}

                                <div className="why-content">

                                    <h5>
                                        {item.title}
                                    </h5>

                                    <p>
                                        {item.description}
                                    </p>

                                </div>


                                {/* Bottom line */}

                                <div className="why-card-line"></div>

                            </div>

                        </div>

                    ))}

                </div>

            </PageContainer>

        </section>
    );
}

export default WhyChooseUs;