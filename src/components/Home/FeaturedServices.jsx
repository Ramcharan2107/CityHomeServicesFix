import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../common/PageContainer";

import electrician from "../../assets/images/services/electrician.jpg";
import plumbing from "../../assets/images/services/plumbing.jpg";
import painting from "../../assets/images/services/painting.jpg";
import carpentry from "../../assets/images/services/carpentry.jpg";
import acRepair from "../../assets/images/services/ac-repair.jpg";
import cleaning from "../../assets/images/services/cleaning.jpg";
import pestControl from "../../assets/images/services/pest-control.jpg";
import applianceRepair from "../../assets/images/services/appliance-repair.jpg";

import "./FeaturedServices.css";


function FeaturedServices() {

    const navigate = useNavigate();

    const sectionRef = useRef(null);
    const carouselRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(4);


    const services = [

        {
            id: 1,
            image: acRepair,
            title: "AC Repair",
            category: "Cooling",
            price: "₹499",
            rating: "4.9",
            jobs: "4,520"
        },

        {
            id: 2,
            image: electrician,
            title: "AC Installation",
            category: "Cooling",
            price: "₹999",
            rating: "4.8",
            jobs: "2,875"
        },

        {
            id: 3,
            image: plumbing,
            title: "Plumbing Repair",
            category: "Plumbing",
            price: "₹399",
            rating: "4.8",
            jobs: "3,420"
        },

        {
            id: 4,
            image: plumbing,
            title: "Tap Installation",
            category: "Plumbing",
            price: "₹249",
            rating: "4.8",
            jobs: "2,140"
        },

        {
            id: 5,
            image: cleaning,
            title: "Home Cleaning",
            category: "Cleaning",
            price: "₹1499",
            rating: "4.9",
            jobs: "5,210"
        },

        {
            id: 6,
            image: cleaning,
            title: "Bathroom Cleaning",
            category: "Cleaning",
            price: "₹699",
            rating: "4.8",
            jobs: "2,150"
        },

        {
            id: 7,
            image: painting,
            title: "Wall Painting",
            category: "Painting",
            price: "₹2999",
            rating: "4.9",
            jobs: "1,865"
        },

        {
            id: 8,
            image: carpentry,
            title: "Furniture Repair",
            category: "Carpentry",
            price: "₹899",
            rating: "4.8",
            jobs: "2,140"
        },

        {
            id: 9,
            image: pestControl,
            title: "Roof Leak Repair",
            category: "Roofing",
            price: "₹2499",
            rating: "4.8",
            jobs: "1,240"
        },

        {
            id: 10,
            image: applianceRepair,
            title: "Tile Flooring",
            category: "Flooring",
            price: "₹3499",
            rating: "4.9",
            jobs: "980"
        }

    ];


    /* =====================================================
       RESPONSIVE CARD COUNT
    ===================================================== */

    const getCardsPerPage = () => {

        if (window.innerWidth <= 767) {
            return 1;
        }

        if (window.innerWidth <= 1199) {
            return 2;
        }

        return 4;
    };


    useEffect(() => {

        const updateCardsPerPage = () => {

            setCardsPerPage(
                getCardsPerPage()
            );

            setActivePage(0);

            if (carouselRef.current) {

                carouselRef.current.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });

            }

        };

        updateCardsPerPage();

        window.addEventListener(
            "resize",
            updateCardsPerPage
        );

        return () => {

            window.removeEventListener(
                "resize",
                updateCardsPerPage
            );

        };

    }, []);


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
       DOT COUNT
    ===================================================== */

    const totalPages = Math.ceil(
        services.length / cardsPerPage
    );


    /* =====================================================
       MOVE TO PAGE
    ===================================================== */

    const goToPage = (pageIndex) => {

        const carousel =
            carouselRef.current;

        if (!carousel) return;

        carousel.scrollTo({
            left:
                pageIndex *
                carousel.clientWidth,

            behavior: "smooth"
        });

        setActivePage(pageIndex);

    };


    /* =====================================================
       UPDATE ACTIVE DOT
    ===================================================== */

    const handleScroll = () => {

        const carousel =
            carouselRef.current;

        if (!carousel) return;

        const pageWidth =
            carousel.clientWidth;

        const currentPage =
            Math.round(
                carousel.scrollLeft /
                pageWidth
            );

        setActivePage(currentPage);

    };


    /* =====================================================
       CARD
    ===================================================== */

    const renderCard = (service, index) => (

        <div
            className="featured-service-slide"
            key={service.id}
            style={{
                "--featured-delay":
                    `${index * 70}ms`
            }}
        >

            <div
                className="featured-service-card"
                onClick={() =>
                    navigate(
                        `/service/${service.id}`
                    )
                }
            >

                {/* IMAGE */}

                <div className="featured-image-wrapper">

                    <img
                        src={service.image}
                        alt={service.title}
                        className="featured-service-image"
                    />


                    {/* Image overlay */}

                    <div className="featured-image-overlay"></div>


                    {/* Category */}

                    <span className="featured-category">

                        {service.category}

                    </span>


                    {/* Rating */}

                    <div className="featured-rating">

                        <i className="bi bi-star-fill"></i>

                        {service.rating}

                    </div>

                </div>


                {/* BODY */}

                <div className="featured-card-body">

                    <div className="featured-card-heading">

                        <h5>
                            {service.title}
                        </h5>

                        <span className="featured-arrow">
                            ↗
                        </span>

                    </div>


                    <p className="featured-jobs">

                        <i className="bi bi-check-circle-fill"></i>

                        {service.jobs} completed jobs

                    </p>


                    <div className="featured-card-footer">

                        <div>

                            <span className="featured-starting">
                                Starting from
                            </span>

                            <strong className="featured-price">
                                {service.price}
                            </strong>

                        </div>


                        <button
                            type="button"
                            className="featured-book-button"
                            onClick={(e) => {

                                e.stopPropagation();

                                navigate(
                                    `/service/${service.id}`
                                );

                            }}
                        >
                            Book
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );


    return (

        <section
            ref={sectionRef}
            className={`featured-services-section ${
                isVisible
                    ? "featured-visible"
                    : ""
            }`}
        >

            {/* BACKGROUND DECORATION */}

            <div className="featured-glow featured-glow-one"></div>

            <div className="featured-glow featured-glow-two"></div>


            <PageContainer>

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="featured-header">

                    <div className="featured-label">

                        <span></span>

                        FEATURED SERVICES

                    </div>


                    <h2>
                        Most Popular
                        <span> Home Services</span>
                    </h2>


                    <p>
                        Trusted by thousands of homeowners for
                        quality, reliability and affordable pricing.
                    </p>

                </div>


                {/* =================================================
                    CAROUSEL
                ================================================= */}

                <div
                    ref={carouselRef}
                    className="featured-carousel"
                    onScroll={handleScroll}
                >

                    {services.map(renderCard)}

                </div>


                {/* =================================================
                    DOTS
                ================================================= */}

                {totalPages > 1 && (

                    <div className="featured-pagination">

                        {Array.from({
                            length: totalPages
                        }).map((_, index) => (

                            <button
                                key={index}
                                type="button"
                                aria-label={
                                    `Show featured services page ${index + 1}`
                                }
                                className={
                                    `featured-dot ${
                                        activePage === index
                                            ? "active"
                                            : ""
                                    }`
                                }
                                onClick={() =>
                                    goToPage(index)
                                }
                            />

                        ))}

                    </div>

                )}


                {/* =================================================
                    BOTTOM CTA
                ================================================= */}

                <div className="featured-cta">

                    <div className="featured-cta-content">

                        <div className="featured-cta-icon">

                            <i className="bi bi-house-heart-fill"></i>

                        </div>

                        <div>

                            <h3>
                                Can't find what you need?
                            </h3>

                            <p>
                                Explore all our home services and
                                find the right professional for your needs.
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="featured-explore-button"
                        onClick={() =>
                            navigate("/services")
                        }
                    >

                        Explore All Services

                        <span>
                            →
                        </span>

                    </button>

                </div>

            </PageContainer>

        </section>

    );

}

export default FeaturedServices;