import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useAuth = () => {
    const authCustom = useContext(AuthContext)
    return authCustom
};

export default useAuth;