import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

function RedirectBaseOnRole() {
    const { userRole} = useAuth();
    if(userRole === 'admin'){
        return <Navigate to="/auth/admin" />
    }
    if(userRole === 'user'){
        return <Navigate to="/auth/user" />
    }

    return <Navigate to="/unauthorized" />
}

export default RedirectBaseOnRole