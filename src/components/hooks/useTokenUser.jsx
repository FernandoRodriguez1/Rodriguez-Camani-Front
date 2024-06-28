import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useTokenUser = () => {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Debe iniciar sesión");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      setTokenInfo(decodedToken);
    } catch (err) {
      setError("El token no es válido");
    }
  }, []);

  return { tokenInfo, error };
};

export default useTokenUser;
