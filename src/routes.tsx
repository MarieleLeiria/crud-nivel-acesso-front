
import { BrowserRouter, Routes, Route } from "react-router";
import UserScreen from "./components/UserScreen";
import AdminScreen from "./components/AdminScreen";
import Login from "./pages/Login";
import UpdateUserScreen from "./components/UpdateUserScreen";
import UnauthorizedScreen from "./components/UnauthorizedScreen";
import { PrivateRoute } from "./components/PrivateRoute";
import RedirectBaseOnRole from "./components/RedirectBaseOnRole";



export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/user"
                 element={ 
                 <PrivateRoute role="user">
                 <UserScreen  />
                 </PrivateRoute>} />
                <Route path="/auth/admin"
                 element={
                 <PrivateRoute>
                    <AdminScreen />
                 </PrivateRoute>
                 } />
                 <Route path="/" element={<Login />} />
                 <Route path="/auth/:id" element={
                    <PrivateRoute>
                    <UpdateUserScreen/>
                    </PrivateRoute>
                    }/>
                 <Route path="/redirect" element={<RedirectBaseOnRole />}/>
                  <Route path="/unauthorized" element={<UnauthorizedScreen />} />
                  
            </Routes>
        </BrowserRouter>
    );
}