import { colors } from "../../theme/colors";

function LoadingSpinner({

    text = "Loading..."

}) {

    return (

        <div className="text-center py-5">

            <div
                className="spinner-border"
                style={{
                    color: colors.accent,
                    width: "3rem",
                    height: "3rem"
                }}
            ></div>

            <h5
                className="mt-3"
                style={{
                    color: colors.primary
                }}
            >

                {text}

            </h5>

        </div>

    );

}

export default LoadingSpinner;