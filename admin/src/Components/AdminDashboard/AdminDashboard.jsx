import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/add-user">Add User</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} <Link to={`/delete-user/${user.id}`}>Delete</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
