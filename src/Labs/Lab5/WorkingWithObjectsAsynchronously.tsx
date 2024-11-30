import React, { useEffect, useState } from "react";
import * as client from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({
    id: 1,
    title: "",
    description: "",
    due: "",
    completed: false,
    score: 0,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch assignment data on load
  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const assignmentData = await client.fetchAssignment();
        setAssignment(assignmentData);
      } catch (error) {
        setErrorMessage("Error fetching assignment");
      }
    };
    fetchAssignment();
  }, []);

  // Generic field update handler
  const handleFieldChange = (field: string, value: any) => {
    setAssignment((prev: any) => ({ ...prev, [field]: value }));
  };

  // Update a specific field of the assignment
  const updateField = async (field: string, value: any) => {
    try {
      const updatedAssignment = await client.updateField(assignment.id, {
        [field]: value,
      });
      setAssignment(updatedAssignment);
      setSuccessMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`);
      setErrorMessage(null); // Clear any previous errors
    } catch (error) {
      setErrorMessage(`Error updating ${field}`);
      setSuccessMessage(null); // Clear any previous success messages
    }
  };

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>

      {/* Display error message */}
      {errorMessage && (
        <div className="alert alert-danger">
          {errorMessage}
          <button
            onClick={() => setErrorMessage(null)}
            className="btn-close float-end"
          ></button>
        </div>
      )}

      {/* Display success message */}
      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
          <button
            onClick={() => setSuccessMessage(null)}
            className="btn-close float-end"
          ></button>
        </div>
      )}

      <h4>Assignment</h4>

      {/* Title */}
      <label htmlFor="wd-title">Title</label>
      <input
        id="wd-title"
        value={assignment.title}
        className="form-control mb-2"
        onChange={(e) => handleFieldChange("title", e.target.value)}
      />
      <button
        className="btn btn-primary mb-3"
        onClick={() => updateField("title", assignment.title)}
      >
        Update Title
      </button>

      {/* Description */}
      <label htmlFor="wd-description">Description</label>
      <textarea
        id="wd-description"
        value={assignment.description}
        className="form-control mb-2"
        onChange={(e) => handleFieldChange("description", e.target.value)}
      />
      <button
        className="btn btn-primary mb-3"
        onClick={() => updateField("description", assignment.description)}
      >
        Update Description
      </button>

      {/* Due Date */}
      <label htmlFor="wd-due">Due Date</label>
      <input
        id="wd-due"
        type="date"
        value={assignment.due}
        className="form-control mb-2"
        onChange={(e) => handleFieldChange("due", e.target.value)}
      />
      <button
        className="btn btn-primary mb-3"
        onClick={() => updateField("due", assignment.due)}
      >
        Update Due Date
      </button>

      {/* Completed */}
      <div className="form-check form-switch">
        <input
          id="wd-completed"
          type="checkbox"
          className="form-check-input"
          checked={assignment.completed}
          onChange={(e) => handleFieldChange("completed", e.target.checked)}
        />
        <label className="form-check-label" htmlFor="wd-completed">
          Completed
        </label>
      </div>
      <button
        className="btn btn-primary mt-2"
        onClick={() => updateField("completed", assignment.completed)}
      >
        Update Completed
      </button>

      {/* Score */}
      <label htmlFor="wd-score">Score</label>
      <input
        id="wd-score"
        type="number"
        value={assignment.score}
        className="form-control mb-2"
        onChange={(e) => handleFieldChange("score", e.target.value)}
      />
      <button
        className="btn btn-primary mb-3"
        onClick={() => updateField("score", assignment.score)}
      >
        Update Score
      </button>

      {/* Display the assignment object */}
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
