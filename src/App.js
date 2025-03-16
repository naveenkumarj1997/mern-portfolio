import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    about: "",
  });

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update a user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        // Update existing user
        await axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, formData);
      } else {
        // Add new user
        await axios.post("http://localhost:5000/api/users", formData);
      }
      setFormData({ name: "", email: "", password: "", role: "", about: "" });
      setSelectedUser(null);
      fetchUsers(); // Refresh the user list
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  // Edit a user
  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      about: user.about,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">User Management - Employees</h1>

      {/* User Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {selectedUser ? "Edit User" : "Add User"}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="about"
            placeholder="About"
            value={formData.about}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {selectedUser ? "Update User" : "Add User"}
        </button>
      </form>

      {/* User List */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">User List</h2>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">{user.role}</p>
              <p className="text-sm text-gray-500 mt-2">{user.about}</p>
              <p className="text-sm text-gray-500 mt-1">Email: {user.email}</p>
              <button
                onClick={() => handleEdit(user)}
                className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;