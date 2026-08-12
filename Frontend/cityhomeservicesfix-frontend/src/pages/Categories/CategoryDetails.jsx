import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import PageContainer from "../../components/common/PageContainer";
import serviceService from "../../services/serviceService";

import acGasRefillImage from "../../assets/images/services/ac-gas-refill.jpg";
import acInstallationImage from "../../assets/images/services/ac-installation.jpg";
import acMaintenanceImage from "../../assets/images/services/ac-maintenance.jpg";
import acRepairImage from "../../assets/images/services/ac-repair.jpg";

import applianceRepairImage from "../../assets/images/services/appliance-repair.jpg";
import bathroomCleaningImage from "../../assets/images/services/bathroom-cleaning.jpg";

import carpentryImage from "../../assets/images/services/carpentry.jpg";
import cleaningImage from "../../assets/images/services/cleaning.jpg";

import cockroachControlImage from "../../assets/images/services/cockroach-control.jpg";
import deepHomeCleaningImage from "../../assets/images/services/deep-home-cleaning.jpg";
import doorRepairImage from "../../assets/images/services/door-repair.jpg";

import electricalWiringImage from "../../assets/images/services/electrical-wiring.jpg";
import electricianImage from "../../assets/images/services/electrician.jpg";
import fanInstallationImage from "../../assets/images/services/fan-installation.jpg";

import fridgeRepairImage from "../../assets/images/services/fridge-repair.jpg";
import furnitureRepairImage from "../../assets/images/services/furniture-repair.jpg";
import geyserRepairImage from "../../assets/images/services/geyser-repair.jpg";

import homeCleaningImage from "../../assets/images/services/home-cleaning.jpg";
import interiorPaintingImage from "../../assets/images/services/interior-painting.jpg";
import kitchenCleaningImage from "../../assets/images/services/kitchen-cleaning.jpg";

import paintingImage from "../../assets/images/services/painting.jpg";
import pestControlImage from "../../assets/images/services/pest-control.jpg";

import plumbingImage from "../../assets/images/services/plumbing.jpg";
import plumbingRepairImage from "../../assets/images/services/plumbing-repair.jpg";

import refrigeratorRepairImage from "../../assets/images/services/refrigerator-repair.jpg";

import roofLeakRepairImage from "../../assets/images/services/roof-leak-repair.jpg";
import roofLeakRepair2Image from "../../assets/images/services/roof-leak-repair-2.jpg";

import sofaCleaningImage from "../../assets/images/services/sofa-cleaning.jpg";
import switchSocketRepairImage from "../../assets/images/services/switch-socket-repair.jpg";
import tapInstallationImage from "../../assets/images/services/tap-installation.jpg";

import termiteControlImage from "../../assets/images/services/termite-control.jpg";
import tileFlooringImage from "../../assets/images/services/tile-flooring-installation.jpg";

import wallPaintingImage from "../../assets/images/services/wall-painting.jpg";
import wallPainting2Image from "../../assets/images/services/wall-painting-2.jpg";

import wardrobeRepairImage from "../../assets/images/services/wardrobe-repair.jpg";
import washingMachineRepairImage from "../../assets/images/services/washing-machine-repair.jpg";

import "./CategoryDetails.css";


/* ============================================================
   CATEGORY CONFIGURATION
============================================================ */

const categoryConfig = {
    appliances: {
        id: 12,
        name: "Appliances",
        icon: "bi-tools",
        accent: "APPLIANCE SERVICES",
        description:
            "Professional repair, maintenance and installation services for your home appliances.",
    },

    carpentry: {
        id: 6,
        name: "Carpentry",
        icon: "bi-hammer",
        accent: "CARPENTRY SERVICES",
        description:
            "Professional furniture repair, woodwork and carpentry services for your home.",
    },

    cleaning: {
        id: 5,
        name: "Cleaning",
        icon: "bi-stars",
        accent: "CLEANING SERVICES",
        description:
            "Professional cleaning services to keep your home fresh, clean and comfortable.",
    },

    cooling: {
        id: 10,
        name: "Cooling",
        icon: "bi-snow2",
        accent: "COOLING SERVICES",
        description:
            "Professional cooling, AC maintenance and related home services.",
    },

    electrical: {
        id: 11,
        name: "Electrical",
        icon: "bi-lightning-charge-fill",
        accent: "ELECTRICAL SERVICES",
        description:
            "Safe, reliable and professional electrical services for your home.",
    },

    flooring: {
        id: 8,
        name: "Flooring",
        icon: "bi-grid-3x3-gap-fill",
        accent: "FLOORING SERVICES",
        description:
            "Professional flooring installation, repair and maintenance services.",
    },

    hvac: {
        id: 3,
        name: "HVAC",
        icon: "bi-wind",
        accent: "HVAC SERVICES",
        description:
            "Professional HVAC installation, maintenance and repair services.",
    },

    painting: {
        id: 4,
        name: "Painting",
        icon: "bi-paint-bucket",
        accent: "PAINTING SERVICES",
        description:
            "Professional interior and exterior painting services for your home.",
    },

    "pest-control": {
        id: 13,
        name: "Pest Control",
        icon: "bi-bug-fill",
        accent: "PEST CONTROL SERVICES",
        description:
            "Effective pest control solutions to protect your home and family.",
    },

    plumbing: {
        id: 1,
        name: "Plumbing",
        icon: "bi-droplet-fill",
        accent: "PLUMBING SERVICES",
        description:
            "Professional plumbing repair, installation and maintenance services.",
    },

    roofing: {
        id: 7,
        name: "Roofing",
        icon: "bi-house-fill",
        accent: "ROOFING SERVICES",
        description:
            "Professional roof inspection, repair and maintenance services.",
    },
};


/* ============================================================
   NORMALIZE CATEGORY
============================================================ */

const normalizeCategory = (value) => {
    if (!value) {
        return "";
    }

    if (typeof value === "object") {
        value =
            value.categoryName ||
            value.name ||
            value.category ||
            "";
    }

    return String(value)
        .trim()
        .toLowerCase()
        .replace(/[_\s]+/g, "-")
        .replace(/-+/g, "-");
};


/* ============================================================
   GET SERVICE CATEGORY
============================================================ */

const getServiceCategoryId = (service) => {
    if (!service) return "";

    const value =
        service.categoryId ??
        service.category?.categoryId ??
        service.category?.id ??
        "";

    return String(value).trim();
};

const getServiceCategoryName = (service) => {
    if (!service) return "";

    const value =
        service.categoryName ??
        service.category?.categoryName ??
        service.category?.name ??
        service.category?.category ??
        "";

    return String(value).trim();
};


/* ============================================================
   GET SERVICE NAME
============================================================ */

const getServiceName = (service) => {
    return (
        service?.serviceName ||
        service?.name ||
        service?.title ||
        "Service"
    );
};


/* ============================================================
   GET SERVICE ID
============================================================ */

const getServiceId = (service) => {
    return (
        service?.serviceId ||
        service?.id ||
        service?.serviceID ||
        ""
    );
};


/* ============================================================
   SERVICE IMAGE MAPPING
============================================================ */

const serviceImages = {

    /* ---------------- HVAC / COOLING ---------------- */

    "AC Gas Refill": acGasRefillImage,
    "AC Installation": acInstallationImage,
    "AC Maintenance": acMaintenanceImage,
    "AC Repair": acRepairImage,


    /* ---------------- APPLIANCES ---------------- */

    "Appliance Repair": applianceRepairImage,
    "Geyser Repair": geyserRepairImage,
    "Fridge Repair": fridgeRepairImage,
    "Refrigerator Repair": refrigeratorRepairImage,
    "Washing Machine Repair": washingMachineRepairImage,


    /* ---------------- CARPENTRY ---------------- */

    "Carpentry": carpentryImage,
    "Door Repair": doorRepairImage,
    "Furniture Repair": furnitureRepairImage,
    "Wardrobe Repair": wardrobeRepairImage,


    /* ---------------- CLEANING ---------------- */

    "Bathroom Cleaning": bathroomCleaningImage,
    "Cleaning": cleaningImage,
    "Cockroach Control": cockroachControlImage,
    "Deep Home Cleaning": deepHomeCleaningImage,
    "Home Cleaning": homeCleaningImage,
    "Kitchen Cleaning": kitchenCleaningImage,
    "Sofa Cleaning": sofaCleaningImage,


    /* ---------------- ELECTRICAL ---------------- */

    "Electrical Wiring": electricalWiringImage,
    "Electrician": electricianImage,
    "Fan Installation": fanInstallationImage,
    "Switch & Socket Repair": switchSocketRepairImage,
    "Switch Socket Repair": switchSocketRepairImage,


    /* ---------------- PAINTING ---------------- */

    "Interior Painting": interiorPaintingImage,
    "Painting": paintingImage,
    "Wall Painting": wallPaintingImage,
    "Wall Painting 2": wallPainting2Image,


    /* ---------------- PEST CONTROL ---------------- */

    "Pest Control": pestControlImage,
    "Termite Control": termiteControlImage,


    /* ---------------- PLUMBING ---------------- */

    "Plumbing": plumbingImage,
    "Plumbing Repair": plumbingRepairImage,
    "Tap Installation": tapInstallationImage,


    /* ---------------- FLOORING ---------------- */

    "Tile Flooring Installation": tileFlooringImage,
    "Tile Flooring": tileFlooringImage,


    /* ---------------- ROOFING ---------------- */

    "Roof Leak Repair": roofLeakRepairImage,
    "Roof Leak Repair 2": roofLeakRepair2Image,
};


/* ============================================================
   CATEGORY FALLBACK IMAGES
============================================================ */

const categoryImages = {
    appliances: applianceRepairImage,
    carpentry: carpentryImage,
    cleaning: cleaningImage,
    cooling: acRepairImage,
    electrical: electricianImage,
    flooring: tileFlooringImage,
    hvac: acRepairImage,
    painting: paintingImage,
    "pest-control": pestControlImage,
    plumbing: plumbingImage,
    roofing: roofLeakRepairImage,
};


/* ============================================================
   GET CORRECT SERVICE IMAGE
============================================================ */

const getServiceImage = (service) => {

    const serviceName = getServiceName(service).trim();

    const serviceCategoryId =
        getServiceCategoryId(service);

    const categoryKey =
        Object.keys(categoryConfig).find(
            (key) =>
                String(categoryConfig[key].id) ===
                String(serviceCategoryId)
        );

    return (
        serviceImages[serviceName] ||
        service.imageUrl ||
        service.image ||
        service.serviceImage ||
        categoryImages[categoryKey] ||
        cleaningImage
    );
};


/* ============================================================
   COMPONENT
============================================================ */

function CategoryDetails() {

    const { category } = useParams();

    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);


    /* --------------------------------------------------------
       CATEGORY CONFIG
    -------------------------------------------------------- */

    const categoryKey = normalizeCategory(category);

    const config = categoryConfig[categoryKey];


    /* --------------------------------------------------------
       SCROLL TO TOP
    -------------------------------------------------------- */

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }, [categoryKey]);


    /* --------------------------------------------------------
       LOAD SERVICES
    -------------------------------------------------------- */

    useEffect(() => {

        const loadServices = async () => {

            try {

                setLoading(true);

                const response =
                    await serviceService.getAll();

                const serviceData =
                    Array.isArray(response)
                        ? response
                        : Array.isArray(response?.data)
                            ? response.data
                            : Array.isArray(response?.services)
                                ? response.services
                                : [];

                console.log(
                    "All services:",
                    serviceData
                );

                console.log(
                    "Current category:",
                    categoryKey
                );

                setServices(serviceData);

            } catch (error) {

                console.error(
                    "Failed to load category services:",
                    error
                );

                setServices([]);

            } finally {

                setLoading(false);

            }

        };

        loadServices();

    }, []);


    /* --------------------------------------------------------
       FILTER CURRENT CATEGORY
    -------------------------------------------------------- */

    const categoryServices = useMemo(() => {

        if (!config) {
            return [];
        }

        const selectedCategoryId = String(config.id).trim();

        const selectedCategoryName =
            normalizeCategory(config.name);

        const filtered = services.filter((service) => {

            const serviceCategoryId =
                getServiceCategoryId(service);

            const serviceCategoryName =
                normalizeCategory(
                    getServiceCategoryName(service)
                );

            /*
            Match using either:

            1. Category ID
            OR
            2. Category Name

            This supports different API response formats.
            */

            const matchesCategoryId =
                serviceCategoryId !== "" &&
                serviceCategoryId === selectedCategoryId;

            const matchesCategoryName =
                serviceCategoryName !== "" &&
                serviceCategoryName === selectedCategoryName;

            return (
                matchesCategoryId ||
                matchesCategoryName
            );

        });

        console.log("====================================");
        console.log(
            "Selected category:",
            config.name
        );
        console.log(
            "Selected category ID:",
            selectedCategoryId
        );
        console.log(
            "Services found:",
            filtered.length
        );
        console.table(
            filtered.map((service) => ({
                serviceName: getServiceName(service),
                categoryId: getServiceCategoryId(service),
                categoryName: getServiceCategoryName(service)
            }))
        );
        console.log("====================================");

        return filtered;

    }, [
        services,
        config
    ]);


    /* --------------------------------------------------------
       SEARCH SERVICES
    -------------------------------------------------------- */

    const filteredServices = useMemo(() => {

        const searchValue =
            search.trim().toLowerCase();

        if (!searchValue) {
            return categoryServices;
        }

        return categoryServices.filter((service) => {

            const serviceName =
                getServiceName(service)
                    .toLowerCase();

            const description =
                String(
                    service.description ||
                    service.serviceDescription ||
                    ""
                ).toLowerCase();

            return (
                serviceName.includes(searchValue) ||
                description.includes(searchValue)
            );

        });

    }, [
        categoryServices,
        search
    ]);


    /* --------------------------------------------------------
       LOADING
    -------------------------------------------------------- */

    if (loading) {

        return (

            <section className="category-details-page">

                <PageContainer>

                    <div className="category-loading">

                        <div className="category-spinner"></div>

                        <h3>
                            Loading {config?.name || "services"}...
                        </h3>

                        <p>
                            Finding the right services for your home.
                        </p>

                    </div>

                </PageContainer>

            </section>

        );

    }


    /* --------------------------------------------------------
       CATEGORY NOT FOUND
    -------------------------------------------------------- */

    if (!config) {

        return (

            <section className="category-details-page">

                <PageContainer>

                    <div className="category-not-found">

                        <div className="category-error-icon">
                            <i className="bi bi-exclamation-circle"></i>
                        </div>

                        <h1>
                            Category Not Found
                        </h1>

                        <p>
                            We couldn't find the category you're looking for.
                        </p>

                        <Link
                            to="/categories"
                            className="category-back-button"
                        >

                            <i className="bi bi-arrow-left"></i>

                            Back to Categories

                        </Link>

                    </div>

                </PageContainer>

            </section>

        );

    }


    /* --------------------------------------------------------
       MAIN PAGE
    -------------------------------------------------------- */

    return (

        <section className="category-details-page">

            <PageContainer>


                {/* BREADCRUMB */}

                <div className="category-breadcrumb">

                    <Link to="/categories">

                        <i className="bi bi-arrow-left"></i>

                        Categories

                    </Link>

                    <span>/</span>

                    <strong>
                        {config.name}
                    </strong>

                </div>


                {/* HERO */}

                <div className="category-details-hero">

                    <div className="category-details-hero-content">

                        <div className="category-hero-badge">

                            <i
                                className={`bi ${config.icon}`}
                            ></i>

                            {config.accent}

                        </div>


                        <h1>

                            Services available in

                            <span>
                                {" "}{config.name}
                            </span>

                        </h1>


                        <p>
                            {config.description}
                        </p>


                        <div className="category-hero-stats">

                            <div className="category-stat">

                                <strong>
                                    {categoryServices.length}
                                </strong>

                                <span>
                                    Services
                                </span>

                            </div>


                            <div className="category-stat">

                                <strong>
                                    4.8
                                </strong>

                                <span>
                                    Average Rating
                                </span>

                            </div>


                            <div className="category-stat">

                                <strong>
                                    2500+
                                </strong>

                                <span>
                                    Happy Customers
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* SEARCH */}

                    <div className="category-search-box">

                        <i className="bi bi-search"></i>

                        <input
                            type="text"
                            placeholder={`Search ${config.name.toLowerCase()} services...`}
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />

                    </div>

                </div>


                {/* SERVICES COUNT */}

                <div className="category-services-header">

                    <div>

                        <span>
                            {filteredServices.length}
                        </span>

                        {" "}

                        service
                        {filteredServices.length !== 1
                            ? "s"
                            : ""
                        }

                        {" "}available

                    </div>


                    {search && (

                        <button
                            type="button"
                            className="clear-category-search"
                            onClick={() =>
                                setSearch("")
                            }
                        >

                            Clear Search

                        </button>

                    )}

                </div>


                {/* SERVICES GRID */}

                {filteredServices.length > 0 ? (

                    <div className="category-services-grid">

                        {filteredServices.map((service) => {

                            const serviceId =
                                getServiceId(service);

                            const serviceName =
                                getServiceName(service);

                            const image =
                                getServiceImage(service);

                            return (

                                <Link
                                    key={
                                        serviceId ||
                                        serviceName
                                    }

                                    /*
                                      IMPORTANT:
                                      Your route is:
                                      /service/:id
                                    */
                                    to={`/service/${serviceId}`}

                                    className="category-service-card"
                                >


                                    {/* SERVICE IMAGE */}

                                    <div className="category-service-image">

                                        <img
                                            src={image}
                                            alt={serviceName}
                                        />

                                        <div className="category-service-category">

                                            {config.name}

                                        </div>

                                    </div>


                                    {/* SERVICE CONTENT */}

                                    <div className="category-service-content">


                                        <div className="category-service-top">

                                            <div>

                                                <i className="bi bi-star-fill"></i>

                                                <span>
                                                    {service.rating || "4.8"}
                                                </span>

                                            </div>

                                            <i className="bi bi-arrow-up-right"></i>

                                        </div>


                                        <h2>
                                            {serviceName}
                                        </h2>


                                        <p>

                                            {
                                                service.description ||
                                                service.serviceDescription ||
                                                "Professional and reliable home service."
                                            }

                                        </p>


                                        <div className="category-service-meta">

                                            <span>

                                                <i className="bi bi-clock"></i>

                                                {
                                                    service.duration ||
                                                    service.estimatedTime ||
                                                    (
                                                        service.estimatedHours
                                                            ? `${service.estimatedHours} Hours`
                                                            : "2 Hours"
                                                    )
                                                }

                                            </span>


                                            <span>

                                                <i className="bi bi-people"></i>

                                                2500+ Customers

                                            </span>

                                        </div>


                                        <div className="category-service-bottom">

                                            <div className="category-service-price">

                                                <small>
                                                    Starting From
                                                </small>

                                                <strong>

                                                    ₹
                                                    {
                                                        service.basePrice ||
                                                        service.price ||
                                                        service.startingPrice ||
                                                        "499"
                                                    }

                                                </strong>

                                            </div>


                                            <span className="category-view-service">

                                                View Details

                                                <i className="bi bi-arrow-right"></i>

                                            </span>

                                        </div>

                                    </div>

                                </Link>

                            );

                        })}

                    </div>

                ) : (

                    <div className="category-empty-state">

                        <div className="category-empty-icon">

                            <i className="bi bi-search"></i>

                        </div>


                        <h2>
                            No Services Found
                        </h2>


                        <p>

                            {search

                                ? `We couldn't find a ${config.name} service matching "${search}".`

                                : `No services are currently available in the ${config.name} category.`

                            }

                        </p>


                        {search ? (

                            <button
                                type="button"
                                className="category-reset-button"
                                onClick={() =>
                                    setSearch("")
                                }
                            >

                                Show All {config.name} Services

                            </button>

                        ) : (

                            <Link
                                to="/categories"
                                className="category-reset-button"
                            >

                                <i className="bi bi-arrow-left"></i>

                                Browse Other Categories

                            </Link>

                        )}

                    </div>

                )}


                {/* BOTTOM CTA */}

                <div className="category-details-cta">

                    <div>

                        <span>
                            NEED SOMETHING ELSE?
                        </span>

                        <h2>
                            Explore more home services
                        </h2>

                        <p>
                            Browse all our service categories and find the
                            right professional for your home.
                        </p>

                    </div>


                    <Link
                        to="/categories"
                        className="category-details-cta-button"
                    >

                        Explore Categories

                        <i className="bi bi-arrow-right"></i>

                    </Link>

                </div>


            </PageContainer>

        </section>

    );

}


export default CategoryDetails;