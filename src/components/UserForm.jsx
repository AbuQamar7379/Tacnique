import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../App";

const UserForm = ({
  setShowForm,
  handleAddOrEditUser,
  selectedUser,
  setSelectedUser,
}) => {
  const [formData, setFormData] = useState({
    name: selectedUser ? selectedUser.name : "",
    email: selectedUser ? selectedUser.email : "",
    company: {
      name: selectedUser ? selectedUser.company.name : "",
    },
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        company: {
          name: selectedUser.company.name,
        },
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company.name) {
      setError("All fields are required.");
      return;
    }
    const method = selectedUser ? "put" : "post";
    const endpoint = selectedUser
      ? `${config.endpoint}/users/${selectedUser.id}`
      : `${config.endpoint}/users`;

    axios[method](endpoint, formData)
      .then((response) => {
        handleAddOrEditUser(response.data);
        setFormData({
          name: "",
          email: "",
          company: {
            name: "",
          },
        });
        setSelectedUser(null);
        setShowForm(false);
      })
      .catch((err) => setError(err.message));
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      company: "",
    });
    setSelectedUser(null);
  };

  return (
    <div className="formParent">
      <form onSubmit={handleSubmit} className="form">
        {error && <p className="error">{error}</p>}
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
          value={formData.company.name}
          onChange={(e) =>
            setFormData({ ...formData, company: { name: e.target.value } })
          }
        />
        <button type="submit">{selectedUser ? "Update" : "Add"}</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserForm;
