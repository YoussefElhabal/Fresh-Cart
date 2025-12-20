import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    if (localStorage.getItem('tkn') == null) {
        return <Navigate to={'/login'} />
    }
    return (
        <>
            {children}
        </>
    )
}
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};