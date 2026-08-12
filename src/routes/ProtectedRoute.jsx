import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRoles }) {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {

        const decoded = jwtDecode(token);

        const role =
            decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (!allowedRoles.includes(role)) {
            return <Navigate to="/" replace />;
        }

        return children;

    }
    catch {

        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;

    }
}

export default ProtectedRoute;