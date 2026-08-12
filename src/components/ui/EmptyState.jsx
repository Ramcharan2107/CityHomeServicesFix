import { colors } from "../../theme/colors";

function EmptyState({

    icon = "bi bi-folder2-open",

    title = "No Records Found",

    subtitle = "Nothing to display."

}) {

    return (

        <div className="text-center py-5">

            <i
                className={icon}
                style={{
                    fontSize: 70,
                    color: colors.accent
                }}
            ></i>

            <h4
                className="mt-3"
                style={{
                    color: colors.primary
                }}
            >

                {title}

            </h4>

            <p
                style={{
                    color: colors.muted
                }}
            >

                {subtitle}

            </p>

        </div>

    );

}

export default EmptyState;