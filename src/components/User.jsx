import React from "react";

const User = ({ user}) => {

  return (
    <div className="user">
        <div>
          <p>ID: {user.id}</p>
          <p>First Name : {user.name.split(" ")[0]}</p>
          <p>Last Name : {user.name.split(" ")[1]}</p>
          <p>Email : {user.email}</p>
          <p>Company : {user.company.name}</p>
        </div>
    </div>
  );
};

export default User;
