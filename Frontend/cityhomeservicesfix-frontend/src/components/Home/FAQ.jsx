import { useEffect, useRef, useState } from "react";
import PageContainer from "../common/PageContainer";

import "./FAQ.css";


const faqs = [
    {
        question: "How do I book a home service?",
        answer:
            "Browse our services, choose the one you need, select your preferred date and time, and confirm your booking online."
    },
    {
        question: "Are your technicians verified?",
        answer:
            "Yes. Every technician undergoes identity verification, background verification, and skill assessment before joining City Home Services."
    },
    {
        question: "Can I reschedule my booking?",
        answer:
            "Yes. You can easily reschedule your booking from your account before the technician begins the service."
    },
    {
        question: "What payment methods are accepted?",
        answer:
            "We support UPI, Credit Cards, Debit Cards, Net Banking and Cash after service completion."
    },
    {
        question: "Do you provide service warranty?",
        answer:
            "Yes. Selected services include a service warranty depending on the category and work performed."
    },
    {
        question: "How can I contact customer support?",
        answer:
            "Our support team is available through phone, email and live chat to assist you anytime."
    }
];


function FAQ() {

    const sectionRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);

    const [activeIndex, setActiveIndex] = useState(0);


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


    /* =====================================================
       TOGGLE FAQ
    ===================================================== */

    const toggleFAQ = (index) => {

        setActiveIndex(
            activeIndex === index
                ? null
                : index
        );

    };


    return (

        <section
            ref={sectionRef}
            className={`faq-section ${
                isVisible
                    ? "faq-visible"
                    : ""
            }`}
        >

            {/* =================================================
                BACKGROUND DECORATION
            ================================================= */}

            <div className="faq-glow faq-glow-one"></div>

            <div className="faq-glow faq-glow-two"></div>


            <PageContainer>

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="faq-header">

                    <div className="faq-label">

                        <span></span>

                        SUPPORT

                    </div>


                    <h2>
                        Frequently Asked
                        <span> Questions</span>
                    </h2>


                    <p>
                        Find answers to the most frequently asked
                        questions about our home services, bookings
                        and customer support.
                    </p>

                </div>


                {/* =================================================
                    FAQ LIST
                ================================================= */}

                <div className="faq-list">

                    {faqs.map(
                        (faq, index) => {

                            const isOpen =
                                activeIndex === index;

                            return (

                                <div
                                    className={`faq-item ${
                                        isOpen
                                            ? "faq-item-open"
                                            : ""
                                    }`}
                                    key={faq.question}
                                    style={{
                                        "--faq-delay":
                                            `${index * 90}ms`
                                    }}
                                >

                                    {/* QUESTION */}

                                    <button
                                        type="button"
                                        className="faq-question"
                                        onClick={() =>
                                            toggleFAQ(index)
                                        }
                                        aria-expanded={isOpen}
                                    >

                                        <div className="faq-question-left">

                                            <div className="faq-icon">

                                                <i className="bi bi-question-lg"></i>

                                            </div>


                                            <span>
                                                {faq.question}
                                            </span>

                                        </div>


                                        <div className="faq-toggle">

                                            <i
                                                className={`bi ${
                                                    isOpen
                                                        ? "bi-dash"
                                                        : "bi-plus"
                                                }`}
                                            ></i>

                                        </div>

                                    </button>


                                    {/* ANSWER */}

                                    <div
                                        className={`faq-answer-wrapper ${
                                            isOpen
                                                ? "faq-answer-open"
                                                : ""
                                        }`}
                                    >

                                        <div className="faq-answer">

                                            <div className="faq-answer-line"></div>

                                            <p>
                                                {faq.answer}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>


                {/* =================================================
                    BOTTOM SUPPORT MESSAGE
                ================================================= */}

                <div className="faq-support">

                    <div className="faq-support-icon">

                        <i className="bi bi-headset"></i>

                    </div>


                    <div className="faq-support-content">

                        <strong>
                            Still have questions?
                        </strong>

                        <span>
                            Our support team is ready to help you.
                        </span>

                    </div>


                    <button
                        type="button"
                        className="faq-support-button"
                    >
                        Contact Support

                        <i className="bi bi-arrow-right"></i>

                    </button>

                </div>

            </PageContainer>

        </section>

    );

}


export default FAQ;