import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const locatoin = useLocation()
    if(loading){
       return <p className="py-28">loading....</p>
    } 
    if(user) return children
    return <Navigate to={'/login'} state={locatoin.pathname} replace={true}></Navigate>
};

export default PrivateRoutes;