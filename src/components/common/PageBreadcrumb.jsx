import { useNavigate } from "react-router-dom";
import "./PageBreadcrumb.css";

function PageBreadcrumb({ previousPage, currentPage }) {
    const navigate = useNavigate();

    return (
        <div className="page-breadcrumb">
            <button
                type="button"
                className="breadcrumb-back"
                onClick={() => navigate(-1)}
            >
                ←
            </button>

            <span className="breadcrumb-previous">
                {previousPage}
            </span>

            <span className="breadcrumb-separator">
                /
            </span>

            <span className="breadcrumb-current">
                {currentPage}
            </span>
        </div>
    );
}

export default PageBreadcrumb;