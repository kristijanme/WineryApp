import React, { useState, useEffect } from "react";
import axios from "axios";
import AddUserForm from "../components/Users/AddUserForm";
import UsersList from "../components/Users/UsersList";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const USER_API = "/api/users";

  const fetchUsers = async () => {
    try {
      const resp = await axios.get(USER_API);
      setUsers(resp.data);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  const addUser = async (user) => {
    await axios.post(USER_API, user);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${USER_API}/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-danger mb-4">👥 Manage Users</h2>
      <AddUserForm onAdd={addUser} />
      <UsersList users={users} onDelete={deleteUser} />
    </div>
  );
}

export default UsersPage;
