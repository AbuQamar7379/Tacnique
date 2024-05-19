import React from "react";

/**
 * Component for displaying user data.
 * @param {Object} props - Component props.
 * @param {Object} props.userData - The user data object.
 * @param {Function} props.setShowForm - Function to show/hide the form.
 * @param {Function} props.handleEditUser - Function to handle user editing.
 * @param {Function} props.handleDeleteUser - Function to handle user deletion.
 */
const User = ({ userData, setShowForm, handleEditUser, handleDeleteUser }) => {
  /**
   * Handle edit button click.
   */
  const handleEdit = () => {
    setShowForm(true);
    handleEditUser(userData);
  };

  /**
   * Handle delete button click.
   */
  const handleDelete = () => {
    handleDeleteUser(userData.id);
  };

  return (
    <div className="user">
      <div>
        <p>ID: {userData.id}</p>
        <p>First Name: {userData.name.split(" ")[0]}</p>
        <p>Last Name: {userData.name.split(" ")[1]}</p>
        <p>Email: {userData.email}</p>
        <p>Company : {userData.company.name}</p>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default User;
