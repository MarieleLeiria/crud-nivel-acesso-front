
import { BrowserRouter, Routes, Route } from "react-router";
import UserScreen from "./components/UserScreen";
import AdminScreen from "./components/AdminScreen";
import LoginScreen from "./components/LoginScreen";
import UpdateUserScreen from "./components/UpdateUserScreen";



export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/user" element={<UserScreen  />} />
                <Route path="/admin" element={<AdminScreen />} />
                 <Route path="/login" element={<LoginScreen />} />
                 <Route path="/users/:id" element={<UpdateUserScreen/>}/>
                  
            </Routes>
        </BrowserRouter>
    );
}