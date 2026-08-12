import { colors } from "../../theme/colors";

function StatusBadge({

    text,

    type = "primary"

}) {

    const map = {

        primary: colors.primary,

        success: colors.success,

        warning: colors.warning,

        danger: colors.danger,

        accent: colors.accent

    };

    return (

        <span
            className="badge"
            style={{
                background: map[type],
                color: "#fff",
                padding: "8px 14px"
            }}
        >

            {text}

        </span>

    );

}

export default StatusBadge;