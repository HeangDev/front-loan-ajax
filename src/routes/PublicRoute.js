import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const token = localStorage.getItem('auth_token')
    //console.log(localStorage.getItem('auth_token'))
    if (token) {
        return true
    } else {
        return false
    }
}

const PublicRoutes = () => {
    let auth = useAuth()
    return (
        auth ? <Navigate to="/"/> : <Outlet/>
    )
}

export default PublicRoutes