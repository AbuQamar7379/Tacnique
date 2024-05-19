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

  const fetchUsers = async () => {
    try {
      let { data } = await axios.get(`${config.endpoint}/users`);
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = (newUser) => {
    let usersArr = users;
    usersArr.push(newUser);
    setUsers(usersArr);
    setShowForm(false);
  };

  return (
    <div>
      <h1>User List</h1>
      {error && <p className="error">{error}</p>}
      <button onClick={() => setShowForm(true)}>Add User</button>

      {showForm && (
        <UserForm setShowForm={setShowForm} handleUsersData={handleAddUser} />
      )}

      <div className="user-list">
        {users.map((user) => {
          return (
            <User key={user.email} userData={user} setShowForm={setShowForm} />
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
