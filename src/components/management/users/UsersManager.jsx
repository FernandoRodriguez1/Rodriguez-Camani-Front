import React, { useEffect } from "react";
import GetAllUsers from "./HttpGetAllUsers";
import UsersList from "./Userlist";
import useDeleteUser from "./HttpDeleteUsers";
import AddUserForm from "./AddUserForm";

const UsersComponent = () => {
  const { users: initialUsers, loading, error: loadError } = GetAllUsers();
  const { deleteUser, users, error: deleteError, setUsers } = useDeleteUser();

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers, setUsers]);

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {(loadError || deleteError) && (
        <p>Error: {(loadError || deleteError).message}</p>
      )}
      <UsersList users={users} handleDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default UsersComponent;
