import { useEffect, useRef, useState } from "react";
import PageContainer from "../common/PageContainer";

import electric from "../../assets/images/technicians/electric.jpeg";
import plumber from "../../assets/images/technicians/plumber.jpeg";
import AC from "../../assets/images/technicians/AC.jpeg";
import carpenter from "../../assets/images/technicians/carpenter.jpeg";

import "./FeaturedTechnicians.css";


const technicians = [
    {
        image: electric,
        name: "Rajesh Kumar",
        role: "Electrician",
        experience: "8 Years",
        rating: "4.9",
        jobs: "1250"
    },
    {
        image: plumber,
        name: "Ravi Sharma",
        role: "Plumber",
        experience: "6 Years",
        rating: "4.8",
        jobs: "980"
    },
    {
        image: AC,
        name: "Arun Reddy",
        role: "AC Technician",
        experience: "9 Years",
        rating: "4.9",
        jobs: "1650"
    },
    {
        image: carpenter,
        name: "Vikram Singh",
        role: "Carpenter",
        experience: "7 Years",
        rating: "4.8",
        jobs: "1100"
    }
];


function FeaturedTechnicians() {

    const sectionRef = useRef(null);
    const carouselRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

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
                threshold: 0.12
            }
        );

        observer.observe(section);

        return () => observer.disconnect();

    }, []);


    /* =====================================================
       CAROUSEL SCROLL
    ===================================================== */

    const handleScroll = () => {

        const carousel =
            carouselRef.current;

        if (!carousel) return;

        const cards =
            carousel.querySelectorAll(
                ".technician-slide"
            );

        if (!cards.length) return;

        const scrollLeft =
            carousel.scrollLeft;

        const cardWidth =
            cards[0].offsetWidth + 22;

        const index =
            Math.round(
                scrollLeft / cardWidth
            );

        setActiveIndex(
            Math.min(
                Math.max(index, 0),
                technicians.length - 1
            )
        );

    };


    /* =====================================================
       DOT NAVIGATION
    ===================================================== */

    const goToTechnician = (index) => {

        const carousel =
            carouselRef.current;

        if (!carousel) return;

        const cards =
            carousel.querySelectorAll(
                ".technician-slide"
            );

        if (!cards[index]) return;

        cards[index].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });

        setActiveIndex(index);

    };


    return (

        <section
            ref={sectionRef}
            className={`technicians-section ${
                isVisible
                    ? "technicians-visible"
                    : ""
            }`}
        >

            {/* Background decoration */}

            <div className="technician-glow technician-glow-one"></div>

            <div className="technician-glow technician-glow-two"></div>


            <PageContainer>

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="technicians-header">

                    <div className="technicians-label">

                        <span></span>

                        OUR EXPERTS

                    </div>


                    <h2>
                        Meet Our
                        <span> Professionals</span>
                    </h2>


                    <p>
                        Certified and experienced professionals
                        delivering trusted home services at your
                        doorstep.
                    </p>

                </div>


                {/* =================================================
                    TECHNICIAN CAROUSEL
                ================================================= */}

                <div
                    ref={carouselRef}
                    className="technicians-carousel"
                    onScroll={handleScroll}
                >

                    {technicians.map(
                        (tech, index) => (

                            <div
                                className="technician-slide"
                                key={tech.name}
                                style={{
                                    "--tech-delay":
                                        `${index * 100}ms`
                                }}
                            >

                                <div className="technician-card">

                                    {/* IMAGE */}

                                    <div className="technician-image-wrapper">

                                        <img
                                            src={tech.image}
                                            alt={tech.name}
                                            className="technician-image"
                                        />


                                        <div className="technician-image-overlay"></div>


                                        {/* Role */}

                                        <div className="technician-role">

                                            {tech.role}

                                        </div>


                                        {/* Rating */}

                                        <div className="technician-rating">

                                            <i className="bi bi-star-fill"></i>

                                            {tech.rating}

                                        </div>

                                    </div>


                                    {/* BODY */}

                                    <div className="technician-body">

                                        <div className="technician-name-row">

                                            <h3>
                                                {tech.name}
                                            </h3>

                                            <div className="technician-verified">

                                                <i className="bi bi-patch-check-fill"></i>

                                            </div>

                                        </div>


                                        <p className="technician-specialist">

                                            <i className="bi bi-tools"></i>

                                            {tech.role}

                                        </p>


                                        {/* Stats */}

                                        <div className="technician-stats">

                                            <div>

                                                <span>
                                                    EXPERIENCE
                                                </span>

                                                <strong>
                                                    {tech.experience}
                                                </strong>

                                            </div>


                                            <div className="technician-divider"></div>


                                            <div>

                                                <span>
                                                    COMPLETED
                                                </span>

                                                <strong>
                                                    {tech.jobs}+
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Button */}

                                        <button
                                            type="button"
                                            className="technician-button"
                                        >

                                            Hire Technician

                                            <span>
                                                →
                                            </span>

                                        </button>

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>


                {/* =================================================
                    DOTS
                ================================================= */}

                <div className="technicians-pagination">

                    {technicians.map(
                        (_, index) => (

                            <button
                                key={index}
                                type="button"
                                aria-label={
                                    `Show technician ${index + 1}`
                                }
                                className={`technician-dot ${
                                    activeIndex === index
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    goToTechnician(index)
                                }
                            />

                        )
                    )}

                </div>


                {/* =================================================
                    TRUST STRIP
                ================================================= */}

                <div className="technician-trust-strip">

                    <div className="technician-trust-item">

                        <div className="trust-icon">

                            <i className="bi bi-patch-check-fill"></i>

                        </div>

                        <div>

                            <strong>
                                Verified Professionals
                            </strong>

                            <span>
                                Trained & background verified
                            </span>

                        </div>

                    </div>


                    <div className="technician-trust-item">

                        <div className="trust-icon">

                            <i className="bi bi-star-fill"></i>

                        </div>

                        <div>

                            <strong>
                                Highly Rated
                            </strong>

                            <span>
                                Trusted by homeowners
                            </span>

                        </div>

                    </div>


                    <div className="technician-trust-item">

                        <div className="trust-icon">

                            <i className="bi bi-shield-check"></i>

                        </div>

                        <div>

                            <strong>
                                Reliable Service
                            </strong>

                            <span>
                                Quality-focused professionals
                            </span>

                        </div>

                    </div>

                </div>

            </PageContainer>

        </section>

    );

}

export default FeaturedTechnicians;