import React, { useState, useEffect } from "react";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { FaPlus } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    const fetchedUsers = await client.findAllUsers();
    setUsers(fetchedUsers);
  };

  // Create a new user
  const createUser = async () => {
    try {
      const newUser = await client.createUser({
        firstName: "New",
        lastName: `User${users.length + 1}`,
        username: `newuser${Date.now()}`,
        password: "password123",
        email: `email${users.length + 1}@example.com`,
        section: "S101",
        role: "STUDENT",
      });
      setUsers([...users, newUser]); // Update the state with the new user
    } catch (error) {
      console.error("Error creating user:", error); // Handle errors
    }
  };

  // Filter users by role
  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const filteredUsers = await client.findUsersByRole(role);
      setUsers(filteredUsers);
    } else {
      fetchUsers();
    }
  };

  // Filter users by name
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const filteredUsers = await client.findUsersByPartialName(name);
      setUsers(filteredUsers);
    } else {
      fetchUsers();
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Users</h3>
      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => filterUsersByName(e.target.value)}
          className="form-control me-2 wd-filter-by-name"
        />
        <select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select wd-select-role"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>
      <button
        onClick={createUser}
        className="btn btn-danger float-end wd-add-people"
      >
        <FaPlus className="me-2" />
        New User
      </button>
      <PeopleTable users={users} />
    </div>
  );
}
