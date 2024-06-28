import { useState } from "react";
import api from "../../API/api-hook";

const useDeleteUser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const deleteUser = async (userId) => {
    try {
      await api.delete(`User/delete-user/${userId}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );
    } catch (err) {
      setError(err);
    }
  };

  return { deleteUser, users, error, setUsers };
};

export default useDeleteUser;
