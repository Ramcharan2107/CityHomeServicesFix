import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/Categories";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import HowItWorks from "../components/Home/HowItWorks";
import FeaturedServices from "../components/Home/FeaturedServices";
import FeaturedTechnicians from "../components/Home/FeaturedTechnicians";
import Testimonials from "../components/Home/Testimonials";
import Statistics from "../components/Home/Statistics";
import FAQ from "../components/Home/FAQ";
import Contact from "../components/Home/Contact";
import Footer from "../components/Home/Footer";

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