import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`);
      alert("User deleted successfully");
      navigate("/admin");
    } catch (error) {
      alert("Error deleting user");
    }
  };

  return (
    <div>
      <h1>Delete User</h1>
      <p>Are you sure you want to delete this user?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate("/admin")}>Cancel</button>
    </div>
  );
};

export default DeleteUser;
