import React from "react";

const User = ({ userData, setShowForm }) => {
  const handleEdit = () => {
    setShowForm(true);
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
      </div>
    </div>
  );
};

export default User;
