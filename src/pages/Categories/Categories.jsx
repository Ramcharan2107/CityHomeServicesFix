import { Link } from "react-router-dom";
import PageContainer from "../../components/common/PageContainer";
import "./Categories.css";

const categories = [
    {
        name: "Appliances",
        slug: "appliances",
        description: "Repair and maintenance for your home appliances",
        icon: "bi-tools",
        color: "#ff9418",
        services: 3
    },
    {
        name: "Carpentry",
        slug: "carpentry",
        description: "Professional furniture and woodwork services",
        icon: "bi-hammer",
        color: "#c97824",
        services: 3
    },
    {
        name: "Cleaning",
        slug: "cleaning",
        description: "Complete home, kitchen, bathroom and sofa cleaning",
        icon: "bi-stars",
        color: "#ff9418",
        services: 5
    },
    {
        name: "Cooling",
        slug: "cooling",
        description: "AC maintenance, gas refill and cooling services",
        icon: "bi-snow2",
        color: "#168aad",
        services: 2
    },
    {
        name: "Electrical",
        slug: "electrical",
        description: "Safe and reliable electrical services",
        icon: "bi-lightning-charge-fill",
        color: "#f4b400",
        services: 3
    },
    {
        name: "Flooring",
        slug: "flooring",
        description: "Professional tile and flooring installation",
        icon: "bi-grid-3x3-gap-fill",
        color: "#c97824",
        services: 1
    },
    {
        name: "HVAC",
        slug: "hvac",
        description: "AC installation and professional HVAC repair",
        icon: "bi-wind",
        color: "#168aad",
        services: 3
    },
    {
        name: "Painting",
        slug: "painting",
        description: "Interior and wall painting services",
        icon: "bi-paint-bucket",
        color: "#ff9418",
        services: 2
    },
    {
        name: "Pest Control",
        slug: "pest-control",
        description: "Effective cockroach and termite control",
        icon: "bi-bug-fill",
        color: "#d97706",
        services: 2
    },
    {
        name: "Plumbing",
        slug: "plumbing",
        description: "Professional plumbing repair and installation",
        icon: "bi-droplet-fill",
        color: "#168aad",
        services: 2
    },
    {
        name: "Roofing",
        slug: "roofing",
        description: "Roof inspection and leak repair services",
        icon: "bi-house-fill",
        color: "#c97824",
        services: 1
    }
];

const stats = [
    {
        icon: "bi-grid-3x3-gap-fill",
        number: "11",
        title: "Service Categories"
    },
    {
        icon: "bi-person-workspace",
        number: "28+",
        title: "Professional Workers"
    },
    {
        icon: "bi-people-fill",
        number: "2500+",
        title: "Happy Customers"
    },
    {
        icon: "bi-star-fill",
        number: "4.8",
        title: "Average Rating"
    }
];

function Categories() {
    return (
        <section className="categories-page">

            <div className="categories-bg-orb categories-bg-orb-one"></div>
            <div className="categories-bg-orb categories-bg-orb-two"></div>
            <div className="categories-grid-pattern"></div>

            <PageContainer>

                {/* PAGE NAVIGATION */}
                <nav
                    className="categories-breadcrumb"
                    aria-label="Breadcrumb"
                >
                    <Link to="/">
                        <i className="bi bi-arrow-left"></i>
                        <span>Home</span>
                    </Link>

                    <i className="bi bi-chevron-right breadcrumb-divider"></i>

                    <strong>Categories</strong>
                </nav>

                {/* HERO */}
                <header className="categories-hero">

                    <div className="categories-hero-content">

                        <div className="categories-hero-badge">
                            <span className="badge-dot"></span>
                            <i className="bi bi-grid-fill"></i>
                            SERVICE CATEGORIES
                        </div>

                        <h1>
                            Everything Your Home Needs,
                            <span> In One Place.</span>
                        </h1>

                        <p>
                            Explore professional home service categories and
                            connect with trusted experts for every job around
                            your home.
                        </p>

                        <div className="categories-hero-actions">
                            <Link
                                to="/services"
                                className="categories-primary-button"
                            >
                                Explore Services
                                <i className="bi bi-arrow-up-right"></i>
                            </Link>

                            <a
                                href="#category-list"
                                className="categories-secondary-button"
                            >
                                Browse Categories
                                <i className="bi bi-arrow-down"></i>
                            </a>
                        </div>

                    </div>

                    <div className="categories-hero-visual">

                        <div className="hero-visual-ring hero-visual-ring-one"></div>
                        <div className="hero-visual-ring hero-visual-ring-two"></div>

                        <div className="hero-service-orbit hero-service-orbit-one">
                            <i className="bi bi-lightning-charge-fill"></i>
                        </div>

                        <div className="hero-service-orbit hero-service-orbit-two">
                            <i className="bi bi-droplet-fill"></i>
                        </div>

                        <div className="hero-service-orbit hero-service-orbit-three">
                            <i className="bi bi-tools"></i>
                        </div>

                        <div className="hero-main-icon">
                            <i className="bi bi-house-heart-fill"></i>
                        </div>

                        <div className="hero-floating-label">
                            <i className="bi bi-patch-check-fill"></i>
                            Trusted Professionals
                        </div>

                    </div>

                </header>

                {/* STATS */}
                <section className="stats-section">

                    <div className="stats-card">

                        {stats.map((stat, index) => (
                            <div
                                className="stat-item"
                                key={stat.title}
                                style={{
                                    "--stat-delay": `${index * 90}ms`
                                }}
                            >
                                <div className="stat-icon">
                                    <i className={`bi ${stat.icon}`}></i>
                                </div>

                                <div>
                                    <h2>{stat.number}</h2>
                                    <p>{stat.title}</p>
                                </div>
                            </div>
                        ))}

                    </div>

                </section>

                {/* CATEGORY SECTION HEADER */}
                <div
                    className="category-list-heading"
                    id="category-list"
                >
                    <div>
                        <span className="section-eyebrow">
                            <i className="bi bi-stars"></i>
                            EXPLORE OUR SERVICES
                        </span>

                        <h2>
                            Choose a category
                            <span> for your home.</span>
                        </h2>

                        <p>
                            From quick repairs to complete home maintenance,
                            find the service that fits your needs.
                        </p>
                    </div>

                    <div className="category-count-pill">
                        <strong>{categories.length}</strong>
                        <span>Categories</span>
                    </div>
                </div>

                {/* CATEGORY GRID */}
                <div className="categories-grid">

                    {categories.map((category, index) => (
                        <Link
                            key={category.name}
                            to={`/categories/${category.slug}`}
                            className="category-card"
                            style={{
                                "--category-color": category.color,
                                "--card-delay": `${index * 70}ms`
                            }}
                        >
                            <div className="category-card-glow"></div>

                            <div className="category-icon">
                                <i className={`bi ${category.icon}`}></i>
                            </div>

                            <div className="category-card-content">

                                <div className="category-card-top">

                                    <span>
                                        {category.services}{" "}
                                        {category.services === 1
                                            ? "Service"
                                            : "Services"}
                                    </span>

                                    <i className="bi bi-arrow-up-right"></i>

                                </div>

                                <h2>{category.name}</h2>

                                <p>{category.description}</p>

                            </div>

                            <div className="category-explore">

                                <span>Explore Services</span>

                                <i className="bi bi-arrow-right"></i>

                            </div>
                        </Link>
                    ))}

                </div>

                {/* CTA */}
                <section className="categories-cta">

                    <div className="cta-glow"></div>
                    <div className="cta-ring"></div>

                    <div className="categories-cta-content">

                        <span>
                            <i className="bi bi-stars"></i>
                            NEED HELP?
                        </span>

                        <h2>
                            Not sure which service you need?
                        </h2>

                        <p>
                            Browse all our services and find the right
                            solution for your home.
                        </p>

                    </div>

                    <Link
                        to="/services"
                        className="categories-cta-button"
                    >
                        View All Services
                        <i className="bi bi-arrow-right"></i>
                    </Link>

                </section>

            </PageContainer>
        </section>
    );
}

export default Categories;