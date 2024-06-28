import { useState } from "react";
import api from "../../API/api-hook";

const useAddBarber = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const addBarber = async () => {
    const barberData = {
      userName: username,
      email: email,
      passwordHash: password,
      specialties: 2,
    };

    try {
      await api.post("User/add-barber", barberData);
      alert("Barbero agregado exitosamente.");
      setUsername("");

      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error);
      alert("Hubo un error al agregar el barbero.");
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,

    email,
    setEmail,

    addBarber,
    error,
  };
};

export default useAddBarber;
