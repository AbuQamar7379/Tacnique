import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "./User";
import "../styles/styles.css";
import { config } from "../App";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      let { data } = await axios.get(config.endpoint + "/users");
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {error && <h1 className="error">Error Occured : {error}</h1>}
      <div className="user-list">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
