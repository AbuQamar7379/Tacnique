import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "./User";
import "../styles/styles.css";
import { config } from "../App";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleAddOrEditUser = (user) => {
    if (selectedUser) {
      setUsers(users.map(u => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, user]);
    }
    setShowForm(false);
  };

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
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
