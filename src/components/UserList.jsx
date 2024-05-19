import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "./User";
import "../styles/styles.css";
import { config } from "../App";
import UserForm from "./UserForm";

/**
 * Component for the user list.
 */
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  /**
   * Fetch users from the API.
   */
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${config.endpoint}/users`);
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Handle adding or editing a user.
   * @param {Object} user - The user data.
   */
  const handleAddOrEditUser = (user) => {
    if (selectedUser) {
      setUsers(users.map(u => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, user]);
    }
    setShowForm(false);
  };

  /**
   * Handle deleting a user.
   * @param {number} id - The ID of the user to delete.
   */
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${config.endpoint}/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Handle editing a user.
   * @param {Object} userData - The user data to edit.
   */
  const handleEditUser = (userData) => {
    setSelectedUser(userData);
    setShowForm(true);
  };

  return (
    <div>
      <h1>User List</h1>
      {error && <p className="error">{error}</p>}
      <button onClick={() => {
        setSelectedUser(null);
        setShowForm(true);
      }}>Add User</button>

      {showForm && (
        <UserForm setShowForm={setShowForm} handleAddOrEditUser={handleAddOrEditUser} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      )}

      <div className="user-list">
        {users.map((user) => (
          <User
            key={user.id}
            userData={user}
            setShowForm={setShowForm}
            handleEditUser={handleEditUser}
            handleDeleteUser={handleDeleteUser}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
