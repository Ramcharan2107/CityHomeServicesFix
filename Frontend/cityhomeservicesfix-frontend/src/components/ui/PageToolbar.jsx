import PrimaryButton from "./PrimaryButton";
import AccentButton from "./AccentButton";

function PageToolbar({

    title,

    subtitle,

    onRefresh,

    onAdd,

    addText

}) {

    return (

        <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

                <h2 className="page-title">

                    {title}

                </h2>

                <p className="page-subtitle">

                    {subtitle}

                </p>

            </div>

            <div className="d-flex gap-2">

                <PrimaryButton
                    icon="bi bi-arrow-clockwise"
                    onClick={onRefresh}
                >

                    Refresh

                </PrimaryButton>

                <AccentButton
                    icon="bi bi-plus-circle"
                    onClick={onAdd}
                >

                    {addText}

                </AccentButton>

            </div>

        </div>

    );

}

export default PageToolbar;