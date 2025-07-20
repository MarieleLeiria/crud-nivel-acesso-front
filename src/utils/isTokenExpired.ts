import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return true;
  }
}

export function useLogoutIfExpired() {
  const handleLogout = useHandleLogout();

  const logoutIfExpired = () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.log("Token não encontrado.");
      return;
    }

    if (isTokenExpired(token)) {
      console.log("Token expirado. Fazendo logout...");
      handleLogout();
    } else {
      console.log("Token ainda válido. Nenhuma ação necessária.");
    }
  };

  return logoutIfExpired;
}

export function useHandleLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("userId");
    navigate("/");
  };

  return handleLogout;
}
