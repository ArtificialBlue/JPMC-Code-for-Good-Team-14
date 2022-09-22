import "../../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { User } from "../../../components/types";
import NavBarLogOut from "../../../components/NavBar/NavBarLogOut";
import { addNewPoints } from "../../../utils/points";

export function Directory() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/leaderboard");
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    addNewPoints(4);
  }, []);

  return (
    <div style={{
      "height": "100%",
      "backgroundSize": "cover",
      "backgroundImage": "linear-gradient(to top, #30CFD0 0%, #330867 100%)",
          
      
    }}>
      <NavBarLogOut />
      <header className="mt-5 container border rounded" style={{backgroundColor: 'rgba(255, 255, 255, 0.85)'}}>
        <table className="table">
          <thead className="thead-dark lead ">
            <tr>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Role</th>
              <th scope="col">Username</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody className="thead">
            {users.map((item, index) => (
              <tr key={index}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.type}</td>
                <td>{item.username}</td>
                <td>{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default Directory;
