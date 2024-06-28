import { useEffect, useState } from "react";
import api from "../../API/api-hook";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const GetUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get("User/get-users");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    GetUsers();
  }, []);
  return { users, loading, error };
};
export default GetAllUsers;
