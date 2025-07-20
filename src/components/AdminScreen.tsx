import { useNavigate } from "react-router";
import { useHandleLogout } from "../utils/isTokenExpired";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar"
import Home from "../pages/Home";

function AdminScreen() {
  const navigate = useNavigate();
  const handleLogout = useHandleLogout(); 


  return (
    <Box minH="100vh" bg="#234E52" color="white" overflow="hidden">
      <Navbar 
        onLogout={handleLogout} 
        onSearch={() => {navigate("/auth/search", { state: { isAdmin: true } })}}
        onRegister={() => {navigate("/auth/register")}}
        navigateBack={() => {navigate(-1)}}
      />
      <Home />
    </Box>
  );
}

export default AdminScreen;
