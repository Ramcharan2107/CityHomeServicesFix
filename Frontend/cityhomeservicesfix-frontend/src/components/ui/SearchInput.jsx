import { colors } from "../../theme/colors";

function SearchInput({

    value,

    onChange,

    placeholder = "Search..."

}) {

    return (

        <div
            className="position-relative"
            style={{
                width: "100%"
            }}
        >

            <i
                className="bi bi-search"
                style={{
                    position: "absolute",
                    left: 15,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: colors.accent,
                    fontSize: 18
                }}
            ></i>

            <input
                className="form-control"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    paddingLeft: 45
                }}
            />

        </div>

    );

}

export default SearchInput;