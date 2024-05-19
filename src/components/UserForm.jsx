import React, { useState } from "react";
import axios from "axios";
import { config } from "../App";

const UserForm = ({ setShowForm, handleUsersData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRequest();
    setFormData({
      name: "",
      email: "",
      company: "",
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      company: "",
    });
  };

  const handleRequest = async () => {
    try {
      let res = await axios.post(`${config.endpoint}/users`, formData);
      if (res.status === 201) {
        handleUsersData(res.data);
        return res;
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="formParent">
      <form onSubmit={handleSubmit} className="form">
        {error && <p className="error">Error Occurred : {error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;
