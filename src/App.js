import React from "react";
import UserList from "./components/UserList";

export const config = {
  endpoint: "https://jsonplaceholder.typicode.com",
};

const App = () => {
  return (
    <div className="app">
      <UserList />
    </div>
  );
};

export default App;
