import { useEffect, useRef, useState } from "react";
import PageContainer from "../common/PageContainer";

import "./Testimonials.css";


const testimonials = [
    {
        name: "Priya Sharma",
        city: "Hyderabad",
        review:
            "Excellent service! The electrician arrived on time and completed the work professionally.",
        rating: 5
    },
    {
        name: "Anil Kumar",
        city: "Bengaluru",
        review:
            "Booking was simple, pricing was transparent, and the technician was very skilled.",
        rating: 5
    },
    {
        name: "Sneha Reddy",
        city: "Chennai",
        review:
            "Highly recommended. The home cleaning team did an outstanding job.",
        rating: 5
    }
];


function Testimonials() {

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
                threshold: 0.15
            }
        );

        observer.observe(section);

        return () => observer.disconnect();

    }, []);


    /* =====================================================
       UPDATE ACTIVE DOT
    ===================================================== */

    const handleScroll = () => {

        const carousel = carouselRef.current;

        if (!carousel) return;

        const cards =
            carousel.querySelectorAll(
                ".testimonial-slide"
            );

        if (!cards.length) return;

        const cardWidth =
            cards[0].offsetWidth + 22;

        const index =
            Math.round(
                carousel.scrollLeft / cardWidth
            );

        setActiveIndex(
            Math.min(
                Math.max(index, 0),
                testimonials.length - 1
            )
        );

    };


    /* =====================================================
       DOT NAVIGATION
    ===================================================== */

    const goToTestimonial = (index) => {

        const carousel = carouselRef.current;

        if (!carousel) return;

        const cards =
            carousel.querySelectorAll(
                ".testimonial-slide"
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
            className={`testimonials-section ${
                isVisible
                    ? "testimonials-visible"
                    : ""
            }`}
        >

            {/* =================================================
                BACKGROUND ANIMATION
            ================================================= */}

            <div className="testimonial-glow testimonial-glow-one"></div>

            <div className="testimonial-glow testimonial-glow-two"></div>


            <PageContainer>

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="testimonials-header">

                    <div className="testimonials-label">

                        <span></span>

                        TESTIMONIALS

                    </div>


                    <h2>
                        Loved by
                        <span> Homeowners</span>
                    </h2>


                    <p>
                        Thousands of customers trust City Home
                        Services for reliable, affordable and
                        professional home maintenance solutions.
                    </p>

                </div>


                {/* =================================================
                    TESTIMONIAL CAROUSEL
                ================================================= */}

                <div
                    ref={carouselRef}
                    className="testimonials-carousel"
                    onScroll={handleScroll}
                >

                    {testimonials.map(
                        (item, index) => (

                            <div
                                className="testimonial-slide"
                                key={item.name}
                                style={{
                                    "--testimonial-delay":
                                        `${index * 100}ms`
                                }}
                            >

                                <div className="testimonial-card">

                                    {/* =================================================
                                        CUSTOMER PROFILE
                                    ================================================= */}

                                    <div className="testimonial-customer">

                                        <div className="testimonial-avatar-wrapper">

                                            {/* HUMAN ICON */}

                                            <div className="testimonial-human-icon">

                                                <i className="bi bi-person-fill"></i>

                                            </div>


                                            {/* VERIFIED */}

                                            <div className="testimonial-verified">

                                                <i className="bi bi-check-lg"></i>

                                            </div>

                                        </div>


                                        <div className="testimonial-customer-info">

                                            <h3>
                                                {item.name}
                                            </h3>


                                            <p>

                                                <i className="bi bi-geo-alt-fill"></i>

                                                {item.city}

                                            </p>


                                            {/* STARS */}

                                            <div className="testimonial-stars">

                                                {[...Array(item.rating)].map(
                                                    (_, starIndex) => (

                                                        <i
                                                            key={starIndex}
                                                            className="bi bi-star-fill"
                                                        ></i>

                                                    )
                                                )}

                                            </div>

                                        </div>

                                    </div>


                                    {/* =================================================
                                        QUOTE
                                    ================================================= */}

                                    <div className="testimonial-quote-icon">

                                        <i className="bi bi-quote"></i>

                                    </div>


                                    {/* =================================================
                                        REVIEW
                                    ================================================= */}

                                    <div className="testimonial-review">

                                        <p>
                                            "{item.review}"
                                        </p>

                                    </div>


                                    {/* =================================================
                                        FOOTER
                                    ================================================= */}

                                    <div className="testimonial-footer">

                                        <span>

                                            <i className="bi bi-patch-check-fill"></i>

                                            Verified Customer

                                        </span>


                                        <span>

                                            <i className="bi bi-star-fill"></i>

                                            5.0 Experience

                                        </span>

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>


                {/* =================================================
                    DOT NAVIGATION
                ================================================= */}

                <div className="testimonials-pagination">

                    {testimonials.map(
                        (_, index) => (

                            <button
                                key={index}
                                type="button"
                                aria-label={
                                    `Show testimonial ${index + 1}`
                                }
                                className={`testimonial-dot ${
                                    activeIndex === index
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    goToTestimonial(index)
                                }
                            />

                        )
                    )}

                </div>


                {/* =================================================
                    TRUST MESSAGE
                ================================================= */}

                <div className="testimonial-trust">

                    <div className="testimonial-trust-icon">

                        <i className="bi bi-heart-fill"></i>

                    </div>


                    <div>

                        <strong>
                            Thousands of happy customers
                        </strong>

                        <span>
                            Real experiences from homeowners who trust us.
                        </span>

                    </div>

                </div>

            </PageContainer>

        </section>

    );

}


export default Testimonials;