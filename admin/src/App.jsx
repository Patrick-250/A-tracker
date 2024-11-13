import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import AddUser from "./Components/AddUser/AddUser";
import DeleteUser from "./Components/DeleteUser/DeleteUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/delete-user/:id" element={<DeleteUser />} />
      </Routes>
    </Router>
  );
}

export default App;
