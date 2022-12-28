import { Outlet,Navigate } from "react-router-dom";

const ProtectedRoutes = ()=>{
    let isAuthenticated = window.localStorage.getItem("token")?true:false;
    return(
        isAuthenticated?<Outlet/>:<Navigate to="/"/>
    )
}

export default ProtectedRoutes;