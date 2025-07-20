import { BrowserRouter, Routes, Route } from "react-router";
import AdminScreen from "../components/AdminScreen";
import Login from "../pages/Login";
import UpdateUserScreen from "../pages/UpdateUserScreen";
import UnauthorizedScreen from "../pages/UnauthorizedScreen";
import { PrivateRoute } from "./PrivateRoute";
import RedirectBaseOnRole from "../contexts/RedirectBaseOnRole";
import Search from "../components/Search";
import Home from "../pages/Home";
import Layout from "../contexts/Layout"; 
import RegisterScreen from "../components/RegistrerScreen";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route
            path="/auth/search"
            element={
              <PrivateRoute >
                <Search />
              </PrivateRoute>
            }
          />
          <Route
            path="/auth/admin"
            element={
              <PrivateRoute role="admin">
                <AdminScreen />
              </PrivateRoute>
            }
          />
          <Route path="/auth/user" element={<Home />}/>
          <Route path="/home" element={<Home />} />
          <Route
            path="/auth/:id"
            element={
              <PrivateRoute role="admin">
                <UpdateUserScreen />
              </PrivateRoute>
            }
          />
          <Route path="/auth/register" element={< RegisterScreen/>}/>
          <Route path="/redirect" element={<RedirectBaseOnRole />} />
          <Route path="/unauthorized" element={<UnauthorizedScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
