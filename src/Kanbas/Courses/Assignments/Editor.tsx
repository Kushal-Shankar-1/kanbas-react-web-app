// src/Kanbas/Courses/Assignments/Editor.tsx
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignment, updateAssignmentAction } from './reducer';
import { createAssignment, updateAssignment } from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);

  const existingAssignment = assignments.find((a: any) => a._id === aid);
  const [assignment, setAssignment] = useState(
    existingAssignment || {
      _id: "",
      title: '',
      description: '',
      points: 100,
      dueDate: '',
      availableDate: '',
      availableUntil: '',
      course: cid,
    }
  );

  const handleSave = async () => {
    try {
      if (existingAssignment) {
        // Update an existing assignment
        const updatedAssignment = await updateAssignment(assignment);
        dispatch(updateAssignmentAction(updatedAssignment));
      } else {
        // Create a new assignment
        const newAssignment = await createAssignment(cid!, assignment);
        dispatch(addAssignment(newAssignment));
      }
  
      navigate(`/Kanbas/Courses/${cid}/Assignments`); // Navigate back
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("An error occurred while saving the assignment. Please try again.");
    }
  };

  return (
    <div id="wd-assignments-editor" className="container my-4 p-4">
      <h2 className="mb-4">Assignment - {assignment.title || 'New Assignment'}</h2>

      <div className="row">
        <div className="col-lg-8">
          {/* Assignment Name */}
          <div className="mb-3">
            <label htmlFor="wd-name" className="form-label">Assignment Name</label>
            <input
              id="wd-name"
              value={assignment.title}
              onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
              className="form-control"
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="wd-description" className="form-label">Description</label>
            <textarea
              id="wd-description"
              rows={4}
              className="form-control"
              value={assignment.description}
              onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
            />
          </div>

          {/* Points */}
          <div className="mb-3">
            <label htmlFor="wd-points" className="form-label">Points</label>
            <input
              id="wd-points"
              type="number"
              className="form-control"
              value={assignment.points}
              onChange={(e) => setAssignment({ ...assignment, points: +e.target.value })}
            />
          </div>

          {/* Due Date */}
          <div className="mb-3">
            <label htmlFor="wd-due-date" className="form-label">Due Date</label>
            <input
              id="wd-due-date"
              type="date"
              className="form-control"
              value={assignment.dueDate}
              onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
            />
          </div>

          {/* Available From */}
          <div className="mb-3">
            <label htmlFor="wd-available-date" className="form-label">Available From</label>
            <input
              id="wd-available-date"
              type="date"
              className="form-control"
              value={assignment.availableDate}
              onChange={(e) => setAssignment({ ...assignment, availableDate: e.target.value })}
            />
          </div>

          {/* Available Until */}
          <div className="mb-3">
            <label htmlFor="wd-available-until" className="form-label">Available Until</label>
            <input
              id="wd-available-until"
              type="date"
              className="form-control"
              value={assignment.availableUntil}
              onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
            />
          </div>

          {/* Save and Cancel Buttons */}
          <div className="d-flex justify-content-end mt-3">
            <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
              Cancel
            </Link>
            <button onClick={handleSave} className="btn btn-danger">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
