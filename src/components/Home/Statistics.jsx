import PageContainer from "../common/PageContainer";

function Statistics() {

    const stats = [
        {
            icon: "bi-people-fill",
            number: "10,000+",
            title: "Happy Customers"
        },
        {
            icon: "bi-person-workspace",
            number: "500+",
            title: "Verified Professionals"
        },
        {
            icon: "bi-geo-alt-fill",
            number: "25+",
            title: "Cities Covered"
        },
        {
            icon: "bi-tools",
            number: "50,000+",
            title: "Jobs Completed"
        }
    ];

    return (

        <section
            className="py-5"
            style={{
                background:
                    "linear-gradient(135deg,#0B1F3A,#132C4B)"
            }}
        >

            <PageContainer>

                <div className="text-center mb-5">

                    <span
                        className="badge mb-3"
                        style={{
                            background: "#F4B400",
                            color: "#0B1F3A",
                            padding: "10px 18px",
                            borderRadius: "25px",
                            fontSize: "14px"
                        }}
                    >
                        OUR ACHIEVEMENTS
                    </span>

                    <h2
                        className="fw-bold text-white mb-3"
                        style={{
                            fontSize: "clamp(2rem,4vw,2.8rem)"
                        }}
                    >
                        Trusted Across India
                    </h2>

                    <p
                        className="mx-auto"
                        style={{
                            maxWidth: "650px",
                            color: "#D1D5DB",
                            fontSize: "17px"
                        }}
                    >
                        We continue to grow every day by delivering reliable,
                        professional and affordable home services to thousands
                        of satisfied customers.
                    </p>

                </div>

                <div className="row g-4">

                    {stats.map((item, index) => (

                        <div
                            key={index}
                            className="col-xl-3 col-lg-3 col-md-6"
                        >

                            <div
                                className="h-100 text-center"
                                style={{
                                    background:
                                        "rgba(255,255,255,.08)",
                                    backdropFilter: "blur(10px)",
                                    border:
                                        "1px solid rgba(244,180,0,.25)",
                                    borderRadius: "20px",
                                    padding: "35px 20px",
                                    transition: ".35s",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={(e) => {

                                    e.currentTarget.style.transform =
                                        "translateY(-8px)";

                                    e.currentTarget.style.background =
                                        "rgba(255,255,255,.12)";

                                    e.currentTarget.style.boxShadow =
                                        "0 15px 35px rgba(0,0,0,.25)";

                                }}
                                onMouseLeave={(e) => {

                                    e.currentTarget.style.transform =
                                        "translateY(0)";

                                    e.currentTarget.style.background =
                                        "rgba(255,255,255,.08)";

                                    e.currentTarget.style.boxShadow =
                                        "none";

                                }}
                            >

                                <div
                                    className="mx-auto mb-4 d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "85px",
                                        height: "85px",
                                        borderRadius: "50%",
                                        background:
                                            "rgba(244,180,0,.15)",
                                        border:
                                            "2px solid rgba(244,180,0,.35)"
                                    }}
                                >

                                    <i
                                        className={`bi ${item.icon}`}
                                        style={{
                                            fontSize: "38px",
                                            color: "#F4B400"
                                        }}
                                    ></i>

                                </div>

                                <h2
                                    className="fw-bold mb-2"
                                    style={{
                                        color: "#fff",
                                        fontSize: "2.3rem"
                                    }}
                                >
                                    {item.number}
                                </h2>

                                <p
                                    className="mb-0"
                                    style={{
                                        color: "#D1D5DB",
                                        fontWeight: "500",
                                        fontSize: "16px"
                                    }}
                                >
                                    {item.title}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </PageContainer>

        </section>

    );

}

export default Statistics;