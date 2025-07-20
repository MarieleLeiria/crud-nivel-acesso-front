import { useLocation, Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useHandleLogout } from "../utils/isTokenExpired";

export default function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  const handleLogout = useHandleLogout(); 
  const navigate = useNavigate();

  return (
    <>
      {!isLoginPage && <Navbar onLogout={handleLogout}
       onRegister={() => {navigate("/auth/register")}}
       onSearch={() => {navigate("/auth/search")}}
        navigateBack={() => {navigate(-1)}} />}
      <Outlet />
    </>
  );
}
