import { useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../../components/common/PageContainer";
import "./Contact.css";

function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Thank you! Your message has been received.");

        setForm({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: ""
        });
    };

    return (
        <section className="contact-page">

            {/* =====================================================
                HERO
            ===================================================== */}

            <div className="contact-hero">

                <div className="contact-glow contact-glow-one"></div>
                <div className="contact-glow contact-glow-two"></div>

                <PageContainer>

                    {/* BACK BUTTON */}

                    <div className="contact-back-wrapper">

                        <Link
                            to="/"
                            className="contact-back-button"
                        >
                            <i className="bi bi-arrow-left"></i>

                            <span>Home</span>

                            <i className="bi bi-chevron-right"></i>

                            <strong>Contact</strong>
                        </Link>

                    </div>


                    {/* HERO CONTENT */}

                    <div className="contact-hero-content">

                        <div className="contact-badge">
                            <span></span>
                            CONTACT US
                        </div>

                        <h1>
                            Let's Start a
                            <span> Conversation.</span>
                        </h1>

                        <p>
                            Have a question, need help with a booking,
                            or want to know more about our services?
                            Fill in the form below and our team will
                            get back to you.
                        </p>

                    </div>

                </PageContainer>

            </div>


            {/* =====================================================
                CONTACT AREA
            ===================================================== */}

            <PageContainer>

                <div className="contact-layout">


                    {/* =================================================
                        CONTACT INFORMATION
                    ================================================= */}

                    <div className="contact-information">

                        <div className="contact-section-label">
                            GET IN TOUCH
                        </div>

                        <h2>
                            We're here to
                            <span> help.</span>
                        </h2>

                        <p className="contact-description">
                            Whether you have a question about a service,
                            need assistance with a booking, or want to
                            share your feedback, our team is ready to help.
                        </p>


                        {/* INFORMATION CARDS */}

                        <div className="contact-details">

                            <div className="contact-detail-card">

                                <div className="contact-detail-icon">
                                    <i className="bi bi-geo-alt-fill"></i>
                                </div>

                                <div>
                                    <span>ADDRESS</span>

                                    <p>
                                        Hyderabad, Telangana, India
                                    </p>
                                </div>

                            </div>


                            <div className="contact-detail-card">

                                <div className="contact-detail-icon">
                                    <i className="bi bi-telephone-fill"></i>
                                </div>

                                <div>
                                    <span>PHONE</span>

                                    <p>
                                        +91 98765 43210
                                    </p>
                                </div>

                            </div>


                            <div className="contact-detail-card">

                                <div className="contact-detail-icon">
                                    <i className="bi bi-envelope-fill"></i>
                                </div>

                                <div>
                                    <span>EMAIL</span>

                                    <p>
                                        support@cityhomeservices.com
                                    </p>
                                </div>

                            </div>


                            <div className="contact-detail-card">

                                <div className="contact-detail-icon">
                                    <i className="bi bi-clock-fill"></i>
                                </div>

                                <div>
                                    <span>WORKING HOURS</span>

                                    <p>
                                        Mon - Sat · 9:00 AM - 8:00 PM
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* SUPPORT BOX */}

                        <div className="contact-support-box">

                            <div className="support-box-icon">
                                <i className="bi bi-headset"></i>
                            </div>

                            <div>

                                <small>
                                    NEED QUICK HELP?
                                </small>

                                <h4>
                                    Our support team is ready.
                                </h4>

                                <p>
                                    We're happy to assist you with
                                    any questions or concerns.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        DETAILS FILLING CONTAINER
                    ================================================= */}

                    <div className="contact-form-container">

                        <div className="contact-form-top">

                            <div>

                                <span>
                                    SEND US A MESSAGE
                                </span>

                                <h2>
                                    Tell us how we can help
                                </h2>

                                <p>
                                    Fill in your details and we'll
                                    get back to you shortly.
                                </p>

                            </div>

                            <div className="form-icon">
                                <i className="bi bi-chat-square-text-fill"></i>
                            </div>

                        </div>


                        {/* FORM */}

                        <form
                            className="contact-form"
                            onSubmit={handleSubmit}
                        >

                            {/* NAME + EMAIL */}

                            <div className="form-row">

                                <div className="form-group">

                                    <label htmlFor="name">
                                        Full Name
                                    </label>

                                    <div className="input-container">

                                        <i className="bi bi-person"></i>

                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>


                                <div className="form-group">

                                    <label htmlFor="email">
                                        Email Address
                                    </label>

                                    <div className="input-container">

                                        <i className="bi bi-envelope"></i>

                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email address"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* PHONE */}

                            <div className="form-group">

                                <label htmlFor="phone">
                                    Phone Number
                                    <small>Optional</small>
                                </label>

                                <div className="input-container">

                                    <i className="bi bi-telephone"></i>

                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* SUBJECT */}

                            <div className="form-group">

                                <label htmlFor="subject">
                                    Subject
                                </label>

                                <div className="input-container">

                                    <i className="bi bi-bookmark"></i>

                                    <input
                                        id="subject"
                                        type="text"
                                        name="subject"
                                        placeholder="What can we help you with?"
                                        value={form.subject}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>


                            {/* MESSAGE */}

                            <div className="form-group">

                                <label htmlFor="message">
                                    Message
                                </label>

                                <div className="input-container textarea-container">

                                    <i className="bi bi-chat-left-text"></i>

                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="6"
                                        placeholder="Write your message here..."
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>

                                </div>

                            </div>


                            {/* SUBMIT */}

                            <button
                                type="submit"
                                className="contact-submit"
                            >

                                <span>
                                    Send Message
                                </span>

                                <i className="bi bi-arrow-up-right"></i>

                            </button>


                            {/* SECURITY NOTE */}

                            <div className="form-security">

                                <i className="bi bi-shield-check"></i>

                                <span>
                                    Your information is secure and will
                                    only be used to respond to your request.
                                </span>

                            </div>

                        </form>

                    </div>

                </div>


                {/* =====================================================
                    BOTTOM CTA
                ===================================================== */}

                <div className="contact-cta">

                    <div className="cta-content">

                        <span>
                            CITY HOME SERVICES
                        </span>

                        <h2>
                            Your home deserves
                            <strong> the best care.</strong>
                        </h2>

                        <p>
                            From quick repairs to complete home maintenance,
                            our trusted professionals are just a booking away.
                        </p>

                    </div>

                    <Link
                        to="/services"
                        className="cta-button"
                    >
                        Explore Services

                        <i className="bi bi-arrow-up-right"></i>
                    </Link>

                </div>

            </PageContainer>

        </section>
    );
}

export default Contact;