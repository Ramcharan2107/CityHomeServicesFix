import { colors } from "../../theme/colors";

function PrimaryButton({

    children,

    icon,

    onClick,

    type = "button",

    disabled = false

}) {

    return (

        <button
            type={type}
            className="btn"
            disabled={disabled}
            onClick={onClick}
            style={{
                background: colors.primary,
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

export default PrimaryButton;