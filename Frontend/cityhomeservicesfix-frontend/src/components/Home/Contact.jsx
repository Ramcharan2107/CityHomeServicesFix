import { useEffect, useRef, useState } from "react";
import PageContainer from "../../components/common/PageContainer";

import "./Contact.css";


function Contact() {

    const sectionRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    useEffect(() => {

        const section =
            sectionRef.current;

        if (!section) return;

        const observer =
            new IntersectionObserver(
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

        return () =>
            observer.disconnect();

    }, []);


    return (

        <section
            ref={sectionRef}
            className={`contact-section ${
                isVisible
                    ? "contact-visible"
                    : ""
            }`}
        >

            {/* =================================================
                BACKGROUND ANIMATION
            ================================================= */}

            <div className="contact-glow contact-glow-one"></div>

            <div className="contact-glow contact-glow-two"></div>


            <PageContainer>

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="contact-header">

                    <div className="contact-label">

                        <span></span>

                        GET IN TOUCH

                    </div>


                    <h2>
                        We're Here to
                        <span> Help</span>
                    </h2>


                    <p>
                        Have a question, need assistance or want to
                        know more about our services? Our team is ready
                        to help you.
                    </p>

                </div>


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <div className="contact-grid">


                    {/* =================================================
                        CONTACT INFORMATION
                    ================================================= */}

                    <div className="contact-info">

                        <div className="contact-info-heading">

                            <div className="contact-info-icon">

                                <i className="bi bi-headset"></i>

                            </div>


                            <div>

                                <h3>
                                    Contact Information
                                </h3>

                                <p>
                                    Reach out to our support team.
                                </p>

                            </div>

                        </div>


                        {/* LOCATION */}

                        <div className="contact-detail">

                            <div className="contact-detail-icon">

                                <i className="bi bi-geo-alt-fill"></i>

                            </div>


                            <div>

                                <span>
                                    Our Location
                                </span>

                                <strong>
                                    Hyderabad, Telangana, India
                                </strong>

                            </div>

                        </div>


                        {/* PHONE */}

                        <div className="contact-detail">

                            <div className="contact-detail-icon">

                                <i className="bi bi-telephone-fill"></i>

                            </div>


                            <div>

                                <span>
                                    Call Us
                                </span>

                                <strong>
                                    +91 98765 43210
                                </strong>

                            </div>

                        </div>


                        {/* EMAIL */}

                        <div className="contact-detail">

                            <div className="contact-detail-icon">

                                <i className="bi bi-envelope-fill"></i>

                            </div>


                            <div>

                                <span>
                                    Email Us
                                </span>

                                <strong>
                                    support@cityhomeservices.com
                                </strong>

                            </div>

                        </div>


                        {/* HOURS */}

                        <div className="contact-detail">

                            <div className="contact-detail-icon">

                                <i className="bi bi-clock-fill"></i>

                            </div>


                            <div>

                                <span>
                                    Working Hours
                                </span>

                                <strong>
                                    Mon - Sun : 8:00 AM - 9:00 PM
                                </strong>

                            </div>

                        </div>


                        {/* SUPPORT BADGE */}

                        <div className="contact-availability">

                            <div className="contact-status-dot"></div>

                            <div>

                                <strong>
                                    Customer support is available
                                </strong>

                                <span>
                                    We're here when you need us.
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        CONTACT FORM
                    ================================================= */}

                    <div className="contact-form-wrapper">

                        <div className="contact-form-header">

                            <div>

                                <span>
                                    SEND US A MESSAGE
                                </span>

                                <h3>
                                    How can we help?
                                </h3>

                            </div>


                            <div className="contact-form-header-icon">

                                <i className="bi bi-chat-dots-fill"></i>

                            </div>

                        </div>


                        <form
                            className="contact-form"
                            onSubmit={(e) =>
                                e.preventDefault()
                            }
                        >

                            {/* NAME + EMAIL */}

                            <div className="contact-form-row">

                                <div className="contact-field">

                                    <label>
                                        Full Name
                                    </label>

                                    <div className="contact-input-wrapper">

                                        <i className="bi bi-person"></i>

                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                        />

                                    </div>

                                </div>


                                <div className="contact-field">

                                    <label>
                                        Email Address
                                    </label>

                                    <div className="contact-input-wrapper">

                                        <i className="bi bi-envelope"></i>

                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* PHONE */}

                            <div className="contact-field">

                                <label>
                                    Phone Number
                                </label>

                                <div className="contact-input-wrapper">

                                    <i className="bi bi-telephone"></i>

                                    <input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                    />

                                </div>

                            </div>


                            {/* MESSAGE */}

                            <div className="contact-field">

                                <label>
                                    Your Message
                                </label>

                                <div className="contact-input-wrapper contact-textarea-wrapper">

                                    <i className="bi bi-chat-left-text"></i>

                                    <textarea
                                        rows="5"
                                        placeholder="Tell us how we can help you..."
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

                                <i className="bi bi-arrow-right"></i>

                            </button>


                            <div className="contact-form-note">

                                <i className="bi bi-shield-check"></i>

                                Your information is safe and secure with us.

                            </div>

                        </form>

                    </div>

                </div>

            </PageContainer>

        </section>

    );

}


export default Contact;