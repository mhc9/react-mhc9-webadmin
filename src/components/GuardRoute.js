import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { jwtDecode } from "jwt-decode";

const GuardRoute = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const token = localStorage.getItem("access_token");
    const decode = token ? jwtDecode(token) : null;

    /** Checking token expiration */
    // console.log((decode.exp * 1000), Date.now());

    if ((!isLoggedIn && !token) || (decode && ((decode.exp * 1000) < Date.now()))) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default GuardRoute