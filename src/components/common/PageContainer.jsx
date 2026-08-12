function PageContainer({ children, className = "" }) {

    return (

        <div
            className={`container-fluid ${className}`}
        >

            <div
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    paddingInline: "clamp(16px, 3vw, 40px)",
                    paddingBlock: "24px"
                }}
            >

                {children}

            </div>

        </div>

    );

}

export default PageContainer;