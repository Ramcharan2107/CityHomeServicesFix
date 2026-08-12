import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../common/PageContainer";
import "./Categories.css";

const services = [
    {
        id: 1,
        icon: "bi-lightning-charge-fill",
        title: "Electrician",
        description: "Electrical repairs and installations"
    },
    {
        id: 3,
        icon: "bi-droplet-fill",
        title: "Plumbing",
        description: "Leakage, taps and pipe repairs"
    },
    {
        id: 7,
        icon: "bi-brush-fill",
        title: "Painting",
        description: "Interior and exterior painting"
    },
    {
        id: 8,
        icon: "bi-hammer",
        title: "Carpentry",
        description: "Furniture and wood works"
    },
    {
        id: 1,
        icon: "bi-snow",
        title: "AC Repair",
        description: "AC installation and servicing"
    },
    {
        id: 5,
        icon: "bi-house-heart-fill",
        title: "Cleaning",
        description: "Complete home cleaning"
    },
    {
        id: 9,
        icon: "bi-bug-fill",
        title: "Pest Control",
        description: "Termite and pest solutions"
    },
    {
        id: 8,
        icon: "bi-tools",
        title: "Appliance Repair",
        description: "TV, Fridge & Washing Machine"
    }
];

function Categories() {

    const navigate = useNavigate();

    const sectionRef = useRef(null);
    const carouselRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    const [activeDot, setActiveDot] = useState(0);

    /*
     * Number of cards visible at once.
     */
    const getCardsPerPage = () => {

        if (window.innerWidth <= 767) {
            return 1;
        }

        if (window.innerWidth <= 1199) {
            return 2;
        }

        return 4;
    };


    /*
     * Total number of dots.
     */
    const [cardsPerPage, setCardsPerPage] = useState(
        getCardsPerPage()
    );


    useEffect(() => {

        const handleResize = () => {
            setCardsPerPage(getCardsPerPage());
            setActiveDot(0);

            if (carouselRef.current) {
                carouselRef.current.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };

    }, []);


    /*
     * Animate section when it enters viewport.
     */
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


    /*
     * Move carousel when dot is clicked.
     */
    const goToPage = (pageIndex) => {

        const carousel = carouselRef.current;

        if (!carousel) return;

        const pageWidth = carousel.clientWidth;

        carousel.scrollTo({
            left: pageIndex * pageWidth,
            behavior: "smooth"
        });

        setActiveDot(pageIndex);
    };


    /*
     * Update active dot while user swipes/scrolls.
     */
    const handleScroll = () => {

        const carousel = carouselRef.current;

        if (!carousel) return;

        const pageWidth = carousel.clientWidth;

        const currentPage = Math.round(
            carousel.scrollLeft / pageWidth
        );

        setActiveDot(currentPage);
    };


    const totalPages = Math.ceil(
        services.length / cardsPerPage
    );


    return (

        <section
            ref={sectionRef}
            className={`categories-section ${
                isVisible
                    ? "categories-visible"
                    : ""
            }`}
        >

            <div className="categories-glow categories-glow-one"></div>

            <div className="categories-glow categories-glow-two"></div>


            <PageContainer>

                {/* HEADER */}

                <div className="categories-header">

                    <div className="categories-label">

                        <span></span>

                        Our Services

                    </div>


                    <h2>
                        Popular Home Services
                    </h2>


                    <p>
                        Professional services for everything
                        your home needs, delivered by trusted
                        experts.
                    </p>

                </div>


                {/* SERVICES */}

                <div
                    ref={carouselRef}
                    className="services-carousel"
                    onScroll={handleScroll}
                >

                    {services.map((service, index) => (

                        <div
                            className="service-slide"
                            key={`${service.title}-${index}`}
                            style={{
                                "--card-delay":
                                    `${index * 90}ms`
                            }}
                        >

                            <div
                                className="service-card"
                                onClick={() =>
                                    navigate(
                                        `/service/${service.id}`
                                    )
                                }
                            >

                                <div className="service-icon-wrapper">

                                    <div className="service-icon">

                                        <i
                                            className={`bi ${service.icon}`}
                                        ></i>

                                    </div>

                                </div>


                                <div className="service-content">

                                    <h5>
                                        {service.title}
                                    </h5>

                                    <p>
                                        {service.description}
                                    </p>

                                </div>


                                <button
                                    type="button"
                                    className="service-book-btn"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        navigate(
                                            `/service/${service.id}`
                                        );

                                    }}
                                >

                                    Book Now

                                    <span>
                                        ↗
                                    </span>

                                </button>

                            </div>

                        </div>

                    ))}

                </div>


                {/* DOT NAVIGATION */}

                {totalPages > 1 && (

                    <div className="services-pagination">

                        {Array.from(
                            { length: totalPages }
                        ).map((_, index) => (

                            <button
                                key={index}
                                type="button"
                                aria-label={`Go to service page ${index + 1}`}
                                className={
                                    `service-dot ${
                                        activeDot === index
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

            </PageContainer>

        </section>
    );
}

export default Categories;