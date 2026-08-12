import { colors } from "../../theme/colors";

function DashboardCard({

    title,

    value,

    icon,

    color = colors.primary,

    subtitle

}) {

    return (

        <div
            className="card h-100"
            style={{
                overflow: "hidden"
            }}
        >

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">

                    <div>

                        <small
                            style={{
                                color: colors.muted,
                                fontWeight: 600
                            }}
                        >

                            {title}

                        </small>

                        <h2
                            className="fw-bold mt-2 mb-1"
                            style={{
                                color: colors.primary
                            }}
                        >

                            {value}

                        </h2>

                        {subtitle && (

                            <small
                                style={{
                                    color: colors.muted
                                }}
                            >

                                {subtitle}

                            </small>

                        )}

                    </div>

                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            background: color,
                            color: "#fff",
                            fontSize: 24
                        }}
                    >

                        <i className={icon}></i>

                    </div>

                </div>

            </div>

            <div
                style={{
                    height: 5,
                    background: color
                }}
            ></div>

        </div>

    );

}

export default DashboardCard;