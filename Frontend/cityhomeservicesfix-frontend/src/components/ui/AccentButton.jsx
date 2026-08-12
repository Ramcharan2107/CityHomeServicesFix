import { colors } from "../../theme/colors";

function AccentButton({

    children,

    icon,

    onClick,

    disabled = false,

    type = "button"

}) {

    return (

        <button
            type={type}
            className="btn"
            disabled={disabled}
            onClick={onClick}
            style={{
                background: colors.accent,
                color: "#fff",
                borderRadius: 12,
                padding: "10px 18px"
            }}
        >

            {icon && (

                <i className={`${icon} me-2`}></i>

            )}

            {children}

        </button>

    );

}

export default AccentButton;