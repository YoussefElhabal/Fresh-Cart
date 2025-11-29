import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext();

export default function AuthContextProvider({ children }) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem('tkn');
        if (userToken) {
            setToken(userToken);
        }
    }, [])

    return (
        <authContext.Provider value={{ token, setToken }}>
            {children}
        </authContext.Provider>
    )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};