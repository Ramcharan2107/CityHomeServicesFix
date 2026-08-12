import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import WhyChooseUs from "../components/home/WhyChooseUs";
import HowItWorks from "../components/home/HowItWorks";
import FeaturedServices from "../components/home/FeaturedServices";
import FeaturedTechnicians from "../components/home/FeaturedTechnicians";
import Testimonials from "../components/home/Testimonials";
import Statistics from "../components/home/Statistics";
import FAQ from "../components/home/FAQ";
import Contact from "../components/home/Contact";
import Footer from "../components/home/Footer";

function HomePage() {
    return (
        <>
            <Hero />
            <Categories />
            <WhyChooseUs />
            <HowItWorks />
            <FeaturedServices />
            <FeaturedTechnicians />
            <Testimonials />
            <Statistics />
            <FAQ />
            <Contact />
        </>
    );
}

export default HomePage;