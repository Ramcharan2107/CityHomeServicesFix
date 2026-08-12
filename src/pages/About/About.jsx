import PageContainer from "../../components/common/PageContainer";
import { Link } from "react-router-dom";

import electric from "../../assets/images/technicians/electric.jpeg";
import plumber from "../../assets/images/technicians/plumber.jpeg";
import AC from "../../assets/images/technicians/AC.jpeg";
import carpenter from "../../assets/images/technicians/carpenter.jpeg";

import "./About.css";

function About() {

    const stats = [
        {
            value: "5,000+",
            title: "Happy Customers",
            icon: "bi-people-fill"
        },
        {
            value: "300+",
            title: "Verified Professionals",
            icon: "bi-person-check-fill"
        },
        {
            value: "15+",
            title: "Service Categories",
            icon: "bi-grid-fill"
        },
        {
            value: "4.8★",
            title: "Average Rating",
            icon: "bi-star-fill"
        }
    ];

    const features = [
        {
            icon: "bi-patch-check-fill",
            title: "Verified Professionals",
            description:
                "Every professional is verified and selected to provide dependable service."
        },
        {
            icon: "bi-wallet2",
            title: "Transparent Pricing",
            description:
                "Clear pricing with no unnecessary hidden charges."
        },
        {
            icon: "bi-clock-fill",
            title: "On-Time Service",
            description:
                "Get professional assistance at your preferred date and time."
        },
        {
            icon: "bi-shield-check",
            title: "Safe & Reliable",
            description:
                "Your home and service experience are treated with complete care."
        },
        {
            icon: "bi-award-fill",
            title: "Quality Service",
            description:
                "We focus on professional workmanship and customer satisfaction."
        },
        {
            icon: "bi-headset",
            title: "Customer Support",
            description:
                "Our support team is available to help whenever you need us."
        }
    ];

    return (
        <section className="about-page">

            <PageContainer>

                {/* =========================================
                    BACK / BREADCRUMB
                ========================================== */}

                <div className="about-breadcrumb">

                    <Link to="/">
                        <i className="bi bi-arrow-left"></i>
                        Home
                    </Link>

                    <i className="bi bi-chevron-right"></i>

                    <span>About Us</span>

                </div>


                {/* =========================================
                    HERO
                ========================================== */}

                <section className="about-hero">

                    <div className="about-hero-content">

                        <span className="about-eyebrow">
                            <i className="bi bi-stars"></i>
                            ABOUT CITY HOME SERVICES
                        </span>

                        <h1>
                            Professional Help,
                            <span> Right at Your Door.</span>
                        </h1>

                        <p>
                            We connect homeowners with trusted professionals
                            for reliable, affordable and hassle-free home
                            services.
                        </p>

                        <div className="about-hero-actions">

                            <Link
                                to="/services"
                                className="about-primary-button"
                            >
                                Explore Services
                                <i className="bi bi-arrow-up-right"></i>
                            </Link>

                            <Link
                                to="/contact"
                                className="about-secondary-button"
                            >
                                Contact Us
                                <i className="bi bi-arrow-right"></i>
                            </Link>

                        </div>

                    </div>


                    {/* HERO IMAGE */}

                    <div className="about-hero-image">

                        <div className="hero-image-glow"></div>

                        <div className="hero-image-frame">

                            <img
                                src={electric}
                                alt="Professional electrician"
                            />

                            <div className="hero-image-overlay"></div>

                        </div>


                        <div className="hero-floating-card hero-card-top">

                            <div className="floating-icon">
                                <i className="bi bi-patch-check-fill"></i>
                            </div>

                            <div>
                                <strong>300+</strong>
                                <span>Verified Experts</span>
                            </div>

                        </div>


                        <div className="hero-floating-card hero-card-bottom">

                            <div className="floating-icon rating-icon">
                                <i className="bi bi-star-fill"></i>
                            </div>

                            <div>
                                <strong>4.8 / 5</strong>
                                <span>Customer Rating</span>
                            </div>

                        </div>


                        <div className="hero-small-badge">

                            <i className="bi bi-house-heart-fill"></i>

                            <span>
                                Trusted Home Care
                            </span>

                        </div>

                    </div>

                </section>


                {/* =========================================
                    STORY
                ========================================== */}

                <section className="about-story">

                    <div className="story-image-wrapper">

                        <div className="story-image-main">

                            <img
                                src={plumber}
                                alt="Professional plumber"
                            />

                            <div className="story-image-overlay"></div>

                        </div>


                        <div className="story-small-image">

                            <img
                                src={carpenter}
                                alt="Professional carpenter"
                            />

                        </div>


                        <div className="story-experience-card">

                            <div className="experience-icon">
                                <i className="bi bi-award-fill"></i>
                            </div>

                            <div>
                                <strong>Professional</strong>
                                <span>Home Services</span>
                            </div>

                        </div>

                    </div>


                    <div className="about-story-content">

                        <span className="section-label">
                            OUR STORY
                        </span>

                        <h2>
                            Making Home Services
                            <span> Easier.</span>
                        </h2>

                        <p>
                            City Home Services was established with a simple
                            goal — to make finding reliable home service
                            professionals easier, faster and more trustworthy.
                        </p>

                        <p>
                            From plumbing and electrical work to cleaning,
                            painting, carpentry and appliance services, we
                            connect customers with professionals who can take
                            care of their home needs.
                        </p>


                        <div className="story-check-list">

                            <div>
                                <i className="bi bi-check-circle-fill"></i>
                                <span>Verified professionals</span>
                            </div>

                            <div>
                                <i className="bi bi-check-circle-fill"></i>
                                <span>Transparent pricing</span>
                            </div>

                            <div>
                                <i className="bi bi-check-circle-fill"></i>
                                <span>Convenient doorstep service</span>
                            </div>

                            <div>
                                <i className="bi bi-check-circle-fill"></i>
                                <span>Customer-focused support</span>
                            </div>

                        </div>

                    </div>

                </section>


                {/* =========================================
                    MISSION / VISION
                ========================================== */}

                <section className="about-purpose">

                    <div className="section-heading centered">

                        <span className="section-label">
                            WHAT DRIVES US
                        </span>

                        <h2>
                            Built Around
                            <span> Your Convenience.</span>
                        </h2>

                        <p>
                            Our mission and vision guide everything we do.
                        </p>

                    </div>


                    <div className="purpose-grid">

                        <div className="purpose-card">

                            <div className="purpose-image">

                                <img
                                    src={AC}
                                    alt="AC professional"
                                />

                                <div className="purpose-image-overlay"></div>

                                <div className="purpose-number">
                                    01
                                </div>

                            </div>

                            <div className="purpose-content">

                                <div className="purpose-icon">
                                    <i className="bi bi-bullseye"></i>
                                </div>

                                <h3>
                                    Our Mission
                                </h3>

                                <p>
                                    To provide reliable, affordable and
                                    professional home services while
                                    ensuring complete customer satisfaction.
                                </p>

                            </div>

                        </div>


                        <div className="purpose-card">

                            <div className="purpose-image">

                                <img
                                    src={carpenter}
                                    alt="Carpenter professional"
                                />

                                <div className="purpose-image-overlay"></div>

                                <div className="purpose-number">
                                    02
                                </div>

                            </div>

                            <div className="purpose-content">

                                <div className="purpose-icon">
                                    <i className="bi bi-eye-fill"></i>
                                </div>

                                <h3>
                                    Our Vision
                                </h3>

                                <p>
                                    To become a trusted platform for
                                    professional home services by delivering
                                    quality, convenience and innovation.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =========================================
                    WHY CHOOSE US
                ========================================== */}

                <section className="about-features">

                    <div className="features-intro">

                        <span className="section-label">
                            WHY CITY HOME SERVICES
                        </span>

                        <h2>
                            Everything Your Home
                            <span> Needs.</span>
                        </h2>

                        <p>
                            We bring professional expertise, convenience
                            and trust together in one platform.
                        </p>


                        <div className="features-photo">

                            <img
                                src={electric}
                                alt="Professional home service"
                            />

                            <div className="features-photo-card">

                                <i className="bi bi-house-check-fill"></i>

                                <div>
                                    <strong>Quality First</strong>
                                    <span>Every Service</span>
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="features-grid">

                        {features.map((feature, index) => (

                            <div
                                className="feature-card"
                                key={feature.title}
                                style={{
                                    "--delay": `${index * 0.08}s`
                                }}
                            >

                                <div className="feature-number">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div className="feature-icon">

                                    <i
                                        className={`bi ${feature.icon}`}
                                    ></i>

                                </div>

                                <h3>
                                    {feature.title}
                                </h3>

                                <p>
                                    {feature.description}
                                </p>

                                <div className="feature-arrow">
                                    <i className="bi bi-arrow-up-right"></i>
                                </div>

                            </div>

                        ))}

                    </div>

                </section>


                {/* =========================================
                    STATISTICS
                ========================================== */}

                <section className="about-stats">

                    <div className="stats-background"></div>

                    <div className="stats-heading">

                        <span className="section-label">
                            OUR IMPACT
                        </span>

                        <h2>
                            Trusted by
                            <span> Thousands.</span>
                        </h2>

                        <p>
                            Growing every day by delivering dependable
                            home services.
                        </p>

                    </div>


                    <div className="stats-grid">

                        {stats.map((stat, index) => (

                            <div
                                className="about-stat-card"
                                key={stat.title}
                                style={{
                                    "--delay": `${index * 0.1}s`
                                }}
                            >

                                <div className="stat-icon">
                                    <i
                                        className={`bi ${stat.icon}`}
                                    ></i>
                                </div>

                                <h3>
                                    {stat.value}
                                </h3>

                                <p>
                                    {stat.title}
                                </p>

                            </div>

                        ))}

                    </div>

                </section>


                {/* =========================================
                    FINAL CTA
                ========================================== */}

                <section className="about-cta">

                    <div className="cta-background">

                        <img
                            src={plumber}
                            alt=""
                        />

                    </div>

                    <div className="cta-overlay"></div>


                    <div className="cta-content">

                        <span>
                            READY TO GET STARTED?
                        </span>

                        <h2>
                            Let us take care
                            of your home.
                        </h2>

                        <p>
                            Find a trusted professional and book your
                            service in just a few clicks.
                        </p>

                    </div>


                    <Link
                        to="/services"
                        className="about-cta-button"
                    >
                        Book a Service
                        <i className="bi bi-arrow-up-right"></i>
                    </Link>

                </section>

            </PageContainer>

        </section>
    );
}

export default About;