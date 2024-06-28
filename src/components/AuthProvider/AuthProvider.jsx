import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../API/api-hook";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [roles, setRoles] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      const user = jwtDecode(token);
      setRoles(user.usertype);
    }
  }, []);

  const login = async (userName, password) => {
    try {
      const response = await api.post("/authentication", {
        userName,
        password,
      });

      const token = response.data;

      const user = jwtDecode(token);
      const role = user.usertype;

      localStorage.setItem("token", token);

      setIsLoggedIn(true);
      setRoles(role);

      toast.success("Inicio de sesión exitoso.", {
        position: "bottom-left",
      });

      return { success: true };
    } catch (error) {
      toast.error("Error al iniciar sesión.", {
        position: "bottom-left",
      });

      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setRoles(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, roles }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
