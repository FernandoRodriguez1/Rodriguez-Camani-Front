import { useState } from "react";
import api from "../../API/api-hook";
import { toast } from "react-toastify";

const useAddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [error, setError] = useState(null);

  const addUser = async () => {
    const userData = {
      userName: username,
      age: parseInt(age),
      email: email,
      passwordHash: password,
      phoneNumber: phonenumber,
    };

    try {
      await api.post("User/add-user", userData);
      toast.success("Usuario agregado exitosamente.");
      setUsername("");
      setAge("");
      setEmail("");
      setPassword("");
      setPhonenumber("");
    } catch (error) {
      setError(error);
      toast.error("Hubo un error al agregar el usuario.");
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    age,
    setAge,
    email,
    setEmail,
    phonenumber,
    setPhonenumber,
    addUser,
    error,
  };
};

export default useAddUser;
