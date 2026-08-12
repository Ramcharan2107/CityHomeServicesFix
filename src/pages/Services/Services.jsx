import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Link,
    useSearchParams
} from "react-router-dom";

import PageContainer from "../../components/common/PageContainer";
import serviceService from "../../services/serviceService";

import acRepairImage from "../../assets/images/services/ac-repair.jpg";
import applianceRepairImage from "../../assets/images/services/appliance-repair.jpg";
import carpentryImage from "../../assets/images/services/carpentry.jpg";
import cleaningImage from "../../assets/images/services/cleaning.jpg";
import electricianImage from "../../assets/images/services/electrician.jpg";
import paintingImage from "../../assets/images/services/painting.jpg";
import pestControlImage from "../../assets/images/services/pest-control.jpg";
import plumbingImage from "../../assets/images/services/plumbing.jpg";

import "./Services.css";


function Services() {

    const [searchParams, setSearchParams] =
        useSearchParams();

    const urlCategory =
        searchParams.get("category")?.trim() || "All";


    const [services, setServices] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [selectedCategory, setSelectedCategory] =
        useState(urlCategory);

    const [visibleCards, setVisibleCards] =
        useState(false);


    /* =========================================================
       PAGE ANIMATION
    ========================================================= */

    useEffect(() => {

        const timer = setTimeout(() => {
            setVisibleCards(true);
        }, 120);

        return () => clearTimeout(timer);

    }, []);


    /* =========================================================
       CATEGORY NORMALIZATION
    ========================================================= */

    const normalizeCategory = (category) => {

        if (!category) {
            return "";
        }

        return String(category)
            .trim()
            .toLowerCase()
            .replace(/[-_]/g, " ")
            .replace(/\s+/g, " ");
    };


    /* =========================================================
       CATEGORY NAME
    ========================================================= */

    const getCategoryName = (service) => {

        if (!service) {
            return "";
        }

        return (
            service.categoryName ||
            service.category?.categoryName ||
            service.category?.name ||
            service.category ||
            service.CategoryName ||
            service.Category ||
            ""
        );
    };


    /* =========================================================
       LOAD SERVICES
    ========================================================= */

    useEffect(() => {

        loadServices();

    }, []);


    const loadServices = async () => {

        try {

            setLoading(true);

            const data =
                await serviceService.getAll();

            console.log(
                "Services API Response:",
                data
            );

            const serviceList =
                Array.isArray(data)
                    ? data
                    : data?.data &&
                        Array.isArray(data.data)
                        ? data.data
                        : [];

            setServices(serviceList);

        }
        catch (error) {

            console.error(
                "Failed to load services:",
                error
            );

            setServices([]);

        }
        finally {

            setLoading(false);

        }

    };


    /* =========================================================
       SERVICE IMAGES
    ========================================================= */

    const serviceImages = {

        "AC Repair":
            acRepairImage,

        "AC Installation":
            acRepairImage,

        "AC Gas Refill":
            acRepairImage,

        "AC Maintenance":
            acRepairImage,

        "Geyser Repair":
            applianceRepairImage,

        "Refrigerator Repair":
            applianceRepairImage,

        "Fridge Repair":
            applianceRepairImage,

        "Washing Machine Repair":
            applianceRepairImage,

        "Door Repair":
            carpentryImage,

        "Furniture Repair":
            carpentryImage,

        "Wardrobe Repair":
            carpentryImage,

        "Bathroom Cleaning":
            cleaningImage,

        "Deep Home Cleaning":
            cleaningImage,

        "Home Cleaning":
            cleaningImage,

        "Kitchen Cleaning":
            cleaningImage,

        "Sofa Cleaning":
            cleaningImage,

        "Electrical Wiring":
            electricianImage,

        "Fan Installation":
            electricianImage,

        "Switch & Socket Repair":
            electricianImage,

        "Interior Painting":
            paintingImage,

        "Wall Painting":
            paintingImage,

        "Cockroach Control":
            pestControlImage,

        "Termite Control":
            pestControlImage,

        "Plumbing Repair":
            plumbingImage,

        "Tap Installation":
            plumbingImage,

        "Tile Flooring Installation":
            carpentryImage,

        "Roof Leak Repair":
            paintingImage

    };


    /* =========================================================
       CATEGORY FALLBACK IMAGES
    ========================================================= */

    const categoryImages = {

        hvac:
            acRepairImage,

        cooling:
            acRepairImage,

        appliances:
            applianceRepairImage,

        carpentry:
            carpentryImage,

        cleaning:
            cleaningImage,

        electrical:
            electricianImage,

        painting:
            paintingImage,

        "pest control":
            pestControlImage,

        plumbing:
            plumbingImage,

        flooring:
            carpentryImage,

        roofing:
            paintingImage

    };


    /* =========================================================
       GET IMAGE
    ========================================================= */

    const getServiceImage = (service) => {

        const serviceName =
            service?.serviceName?.trim() || "";

        const categoryName =
            normalizeCategory(
                getCategoryName(service)
            );

        return (
            serviceImages[serviceName] ||
            categoryImages[categoryName] ||
            cleaningImage
        );

    };


    /* =========================================================
       UNIQUE CATEGORIES
    ========================================================= */

    const categories = useMemo(() => {

        const categoryMap = new Map();

        services.forEach((service) => {

            const categoryName =
                String(
                    getCategoryName(service)
                ).trim();

            const normalizedName =
                normalizeCategory(categoryName);

            if (
                categoryName &&
                normalizedName &&
                !categoryMap.has(
                    normalizedName
                )
            ) {

                categoryMap.set(
                    normalizedName,
                    categoryName
                );

            }

        });

        return [
            "All",
            ...Array.from(
                categoryMap.values()
            )
        ];

    }, [services]);


    /* =========================================================
       MATCH CATEGORY
    ========================================================= */

    const getMatchingCategory =
        (category) => {

            if (
                normalizeCategory(category) ===
                "all"
            ) {
                return "All";
            }

            const normalizedCategory =
                normalizeCategory(category);

            const foundCategory =
                categories.find(
                    (item) =>
                        normalizeCategory(item) ===
                        normalizedCategory
                );

            return foundCategory || category;

        };


    /* =========================================================
       VALIDATE URL CATEGORY
    ========================================================= */

    useEffect(() => {

        if (!services.length) {
            return;
        }

        const matchingCategory =
            getMatchingCategory(
                urlCategory
            );

        const categoryExists =
            matchingCategory === "All" ||
            categories.some(
                (category) =>
                    normalizeCategory(
                        category
                    ) ===
                    normalizeCategory(
                        matchingCategory
                    )
            );

        if (categoryExists) {

            setSelectedCategory(
                matchingCategory
            );

        }
        else {

            setSelectedCategory("All");

            setSearchParams(
                {},
                {
                    replace: true
                }
            );

        }

    }, [
        services,
        urlCategory,
        categories,
        setSearchParams
    ]);


    /* =========================================================
       CATEGORY CHANGE
    ========================================================= */

    const handleCategoryChange =
        (category) => {

            setSelectedCategory(category);

            setSearch("");

            if (category === "All") {

                setSearchParams({});

            }
            else {

                setSearchParams({
                    category
                });

            }

        };


    /* =========================================================
       FILTER SERVICES
    ========================================================= */

    const filteredServices = useMemo(() => {

        const searchValue =
            search
                .trim()
                .toLowerCase();

        return services.filter(
            (service) => {

                const serviceName =
                    String(
                        service.serviceName ||
                        service.name ||
                        ""
                    )
                        .trim()
                        .toLowerCase();

                const categoryName =
                    getCategoryName(service);

                const normalizedServiceCategory =
                    normalizeCategory(
                        categoryName
                    );

                const normalizedSelectedCategory =
                    normalizeCategory(
                        selectedCategory
                    );

                const matchesCategory =
                    selectedCategory === "All" ||
                    normalizedServiceCategory ===
                    normalizedSelectedCategory;

                const matchesSearch =
                    !searchValue ||
                    serviceName.includes(
                        searchValue
                    ) ||
                    String(categoryName)
                        .toLowerCase()
                        .includes(searchValue);

                return (
                    matchesCategory &&
                    matchesSearch
                );

            }
        );

    }, [
        services,
        search,
        selectedCategory
    ]);


    /* =========================================================
       CLEAR FILTERS
    ========================================================= */

    const clearFilters = () => {

        setSearch("");

        setSelectedCategory("All");

        setSearchParams({});

    };


    /* =========================================================
       CATEGORY ICON
    ========================================================= */

    const getCategoryIcon =
        (category) => {

            const name =
                normalizeCategory(category);

            const icons = {

                all:
                    "bi-grid-fill",

                electrical:
                    "bi-lightning-charge-fill",

                plumbing:
                    "bi-droplet-fill",

                painting:
                    "bi-brush-fill",

                carpentry:
                    "bi-hammer",

                cleaning:
                    "bi-stars",

                appliances:
                    "bi-tv-fill",

                "pest control":
                    "bi-bug-fill",

                hvac:
                    "bi-snow",

                cooling:
                    "bi-snow"

            };

            return (
                icons[name] ||
                "bi-tools"
            );

        };


    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {

        return (

            <section className="services-page">

                <div className="services-background-orb orb-one"></div>
                <div className="services-background-orb orb-two"></div>

                <PageContainer>

                    <div className="services-loading">

                        <div className="services-loading-logo">

                            <i className="bi bi-tools"></i>

                        </div>

                        <div className="services-loader"></div>

                        <h4>
                            Finding Services
                        </h4>

                        <p>
                            We're preparing the best
                            services for your home.
                        </p>

                    </div>

                </PageContainer>

            </section>

        );

    }


    /* =========================================================
       PAGE
    ========================================================= */

    return (

        <section
            className={`services-page ${
                visibleCards
                    ? "services-page-visible"
                    : ""
            }`}
        >

            {/* BACKGROUND DECORATION */}

            <div className="services-background-grid"></div>

            <div className="services-background-orb orb-one"></div>

            <div className="services-background-orb orb-two"></div>

            <div className="services-background-orb orb-three"></div>


            <PageContainer>

                {/* =================================================
                    HERO
                ================================================= */}

                <div className="services-hero">

                    <div className="services-hero-content">

                        <div className="services-eyebrow">

                            <span className="eyebrow-dot"></span>

                            CITY HOME SERVICES

                        </div>


                        <h1>

                            {selectedCategory === "All"
                                ? (
                                    <>
                                        Professional
                                        <span>
                                            Home Services
                                        </span>
                                        <br />
                                        At Your Doorstep
                                    </>
                                )
                                : (
                                    <>
                                        Professional
                                        <span>
                                            {selectedCategory}
                                        </span>
                                        <br />
                                        Services Near You
                                    </>
                                )
                            }

                        </h1>


                        <p>

                            {selectedCategory === "All"
                                ? "Trusted professionals for repairs, maintenance, cleaning and home improvement — all in one place."
                                : `Reliable ${selectedCategory.toLowerCase()} services delivered by experienced professionals at your doorstep.`
                            }

                        </p>


                        <div className="services-hero-highlights">

                            <div>
                                <i className="bi bi-patch-check-fill"></i>
                                Verified Experts
                            </div>

                            <div>
                                <i className="bi bi-shield-check"></i>
                                Reliable Service
                            </div>

                            <div>
                                <i className="bi bi-clock-fill"></i>
                                Quick Booking
                            </div>

                        </div>

                    </div>


                    <div className="services-hero-visual">

                        <div className="hero-visual-circle circle-large"></div>

                        <div className="hero-visual-circle circle-small"></div>

                        <div className="hero-tool-icon">

                            <i className="bi bi-tools"></i>

                        </div>


                        <div className="floating-service-card floating-card-one">

                            <i className="bi bi-lightning-charge-fill"></i>

                            <div>
                                <strong>
                                    Expert Service
                                </strong>

                                <small>
                                    Verified professionals
                                </small>
                            </div>

                        </div>


                        <div className="floating-service-card floating-card-two">

                            <span className="floating-star">
                                ★
                            </span>

                            <div>
                                <strong>
                                    4.8 / 5
                                </strong>

                                <small>
                                    Customer rating
                                </small>
                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    SEARCH
                ================================================= */}

                <div className="services-search-section">

                    <div className="services-search-label">

                        <span>
                            FIND YOUR SERVICE
                        </span>

                        <small>
                            Search from our available services
                        </small>

                    </div>


                    <div className="services-search">

                        <div className="search-icon-wrapper">

                            <i className="bi bi-search"></i>

                        </div>


                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder={
                                selectedCategory === "All"
                                    ? "What service do you need today?"
                                    : `Search ${selectedCategory.toLowerCase()} services...`
                            }
                        />


                        {search && (

                            <button
                                type="button"
                                className="services-search-clear"
                                onClick={() =>
                                    setSearch("")
                                }
                                aria-label="Clear search"
                            >
                                <i className="bi bi-x"></i>
                            </button>

                        )}


                        <div className="search-action">

                            <i className="bi bi-arrow-right"></i>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    CATEGORY FILTERS
                ================================================= */}

                <div className="services-category-section">

                    <div className="services-section-heading">

                        <div>

                            <span>
                                EXPLORE
                            </span>

                            <h2>
                                Browse by Category
                            </h2>

                        </div>


                        <div className="category-count">

                            <strong>
                                {categories.length - 1}
                            </strong>

                            <small>
                                Categories
                            </small>

                        </div>

                    </div>


                    <div className="services-filters">

                        {categories.map(
                            (category) => (

                                <button
                                    key={category}
                                    type="button"
                                    className={
                                        selectedCategory ===
                                        category
                                            ? "service-filter active"
                                            : "service-filter"
                                    }
                                    onClick={() =>
                                        handleCategoryChange(
                                            category
                                        )
                                    }
                                >

                                    <span className="filter-icon">

                                        <i
                                            className={`bi ${getCategoryIcon(
                                                category
                                            )}`}
                                        ></i>

                                    </span>

                                    <span>
                                        {category}
                                    </span>

                                    {selectedCategory ===
                                        category && (

                                        <i className="bi bi-check2 filter-check"></i>

                                    )}

                                </button>

                            )
                        )}

                    </div>

                </div>


                {/* =================================================
                    RESULT BAR
                ================================================= */}

                <div className="services-result-bar">

                    <div className="result-info">

                        <span className="result-icon">

                            <i className="bi bi-grid-3x3-gap-fill"></i>

                        </span>

                        <div>

                            <strong>
                                {filteredServices.length}
                            </strong>

                            <span>

                                {selectedCategory === "All"
                                    ? " services available"
                                    : ` ${selectedCategory.toLowerCase()} services`
                                }

                            </span>

                        </div>

                    </div>


                    {(search ||
                        selectedCategory !== "All") && (

                        <button
                            type="button"
                            className="clear-filters"
                            onClick={clearFilters}
                        >

                            <i className="bi bi-arrow-counterclockwise"></i>

                            Reset Filters

                        </button>

                    )}

                </div>


                {/* =================================================
                    SERVICE GRID
                ================================================= */}

                <div className="services-grid">

                    {filteredServices.length > 0 ? (

                        filteredServices.map(
                            (service, index) => {

                                const image =
                                    getServiceImage(
                                        service
                                    );

                                const serviceId =
                                    service.serviceId ||
                                    service.id;

                                const serviceName =
                                    service.serviceName ||
                                    service.name ||
                                    "Service";

                                const categoryName =
                                    getCategoryName(
                                        service
                                    );

                                const estimatedHours =
                                    service.estimatedHours ||
                                    service.duration ||
                                    1;

                                const basePrice =
                                    service.basePrice ||
                                    service.price ||
                                    0;


                                return (

                                    <article
                                        className="service-card"
                                        key={serviceId}
                                        style={{
                                            "--card-index":
                                                index
                                        }}
                                    >

                                        {/* IMAGE */}

                                        <Link
                                            to={`/service/${serviceId}`}
                                            className="service-image-wrapper"
                                        >

                                            <img
                                                src={image}
                                                alt={serviceName}
                                                className="service-image"
                                                loading="lazy"
                                            />

                                            <div className="service-image-overlay"></div>


                                            <span className="service-category">

                                                <i className={`bi ${getCategoryIcon(categoryName)}`}></i>

                                                {categoryName}

                                            </span>


                                            <div className="service-rating">

                                                <i className="bi bi-star-fill"></i>

                                                <span>
                                                    4.8
                                                </span>

                                            </div>


                                            <div className="service-image-arrow">

                                                <i className="bi bi-arrow-up-right"></i>

                                            </div>

                                        </Link>


                                        {/* CONTENT */}

                                        <div className="service-card-content">

                                            <div className="service-title-row">

                                                <div>

                                                    <span className="service-mini-label">
                                                        PROFESSIONAL SERVICE
                                                    </span>

                                                    <h3>
                                                        {serviceName}
                                                    </h3>

                                                </div>

                                            </div>


                                            {/* META */}

                                            <div className="service-meta">

                                                <div>

                                                    <span className="meta-icon">
                                                        <i className="bi bi-people-fill"></i>
                                                    </span>

                                                    <span>
                                                        2500+ customers
                                                    </span>

                                                </div>


                                                <div>

                                                    <span className="meta-icon">
                                                        <i className="bi bi-clock-fill"></i>
                                                    </span>

                                                    <span>

                                                        {estimatedHours}

                                                        {" "}

                                                        {Number(
                                                            estimatedHours
                                                        ) === 1
                                                            ? "Hour"
                                                            : "Hours"
                                                        }

                                                    </span>

                                                </div>

                                            </div>


                                            {/* BOTTOM */}

                                            <div className="service-bottom">

                                                <div className="service-price">

                                                    <small>
                                                        Starting from
                                                    </small>

                                                    <strong>

                                                        ₹{" "}

                                                        {Number(
                                                            basePrice
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}

                                                    </strong>

                                                </div>


                                                <Link
                                                    to={`/service/${serviceId}`}
                                                    className="service-details-button"
                                                >

                                                    <span>
                                                        Explore Service
                                                    </span>

                                                    <i className="bi bi-arrow-right"></i>

                                                </Link>

                                            </div>

                                        </div>

                                    </article>

                                );

                            }
                        )

                    ) : (

                        <div className="services-empty">

                            <div className="services-empty-decoration">

                                <span></span>
                                <span></span>
                                <span></span>

                            </div>


                            <div className="services-empty-icon">

                                <i className="bi bi-search"></i>

                            </div>


                            <span className="empty-label">
                                NO RESULTS
                            </span>


                            <h3>
                                No Services Found
                            </h3>


                            <p>
                                We couldn't find any services
                                matching your current search
                                or category.
                            </p>


                            <button
                                type="button"
                                onClick={clearFilters}
                            >

                                <i className="bi bi-grid-fill"></i>

                                View All Services

                            </button>

                        </div>

                    )}

                </div>


                {/* =================================================
                    BOTTOM CTA
                ================================================= */}

                {filteredServices.length > 0 && (

                    <div className="services-bottom-cta">

                        <div className="cta-decoration"></div>

                        <div className="cta-icon">

                            <i className="bi bi-house-heart-fill"></i>

                        </div>


                        <div className="cta-content">

                            <span>
                                NEED HELP CHOOSING?
                            </span>

                            <h3>
                                Not sure which service you need?
                            </h3>

                            <p>
                                Our team can help you find the right
                                professional for your home.
                            </p>

                        </div>


                        <Link
                            to="/contact"
                            className="cta-button"
                        >

                            Talk to Us

                            <i className="bi bi-arrow-up-right"></i>

                        </Link>

                    </div>

                )}

            </PageContainer>

        </section>

    );

}

export default Services;