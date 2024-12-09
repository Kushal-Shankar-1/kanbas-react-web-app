// src/Kanbas/Courses/People/CoursePeople.tsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "./Table"; // Ensure the path is correct
import * as client from "../client"; // Import the Courses client

export default function CoursePeople() {
  const { cid } = useParams<{ cid: string }>(); // Extract course ID from URL
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourseUsers = async () => {
    if (!cid) return;
    setLoading(true);
    setError(null);
    try {
      const courseUsers = await client.findUsersForCourse(cid);
      setUsers(courseUsers);
    } catch (err: any) {
      console.error("Error fetching course users:", err);
      setError(err.message || "Failed to fetch users for course.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cid) fetchCourseUsers();
  }, [cid]);

  if (loading) {
    return (
      <div>
        <h3>Enrolled Students</h3>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h3>Enrolled Students</h3>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3>Enrolled Students</h3>
      <PeopleTable users={users} />
    </div>
  );
}
