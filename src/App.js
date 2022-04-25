import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };


    fetch('http://localhost:5000/user', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      const newUsers = [...users, data]
      setUsers(newUsers);
      console.log(data)
    })

  };
  // post data



  return (
    <div className="App">
      <h3>my own data is: {users?.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name"></input>
        <input type="text" name="email" placeholder="Email"></input>
        <input type="submit" value="Add User"></input>
      </form>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            Id: {user.id}, name: {user.name}, email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
