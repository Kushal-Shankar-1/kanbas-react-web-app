import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  findAssignmentsForCourse,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "./client";
import {
  setAssignments,
  addAssignment,
  updateAssignmentAction,
  deleteAssignmentAction,
} from "./reducer";
import AssignmentsControls from "./AssignmentsControls";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { Assignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const [assignmentName, setAssignmentName] = useState("");
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("2024-12-31");
  const [availableFrom, setAvailableFrom] = useState("2024-11-01");
  const [availableUntil, setAvailableUntil] = useState("2024-12-31");
  const [editedAssignment, setEditedAssignment] = useState<Assignment | null>(null);
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  // Fetch assignments when the component is mounted
  useEffect(() => {
    const fetchAssignments = async () => {
      if (!cid) return;
      try {
        const data = await findAssignmentsForCourse(cid); // Fetch by courseId
        dispatch(setAssignments(data));
      } catch (error) {
        console.error(`Error fetching assignments for course ${cid}:`, error);
      }
    };

    fetchAssignments();
  }, [cid, dispatch]);

  const handleCreate = async () => {
    if (!cid || !assignmentName.trim()) return;
    const newAssignment = {
      title: assignmentName,
      description: "New Assignment",
      course: cid,
      points,
      dueDate,
      availableFrom,
      availableUntil,
    };
    try {
      const created = await createAssignment(cid, newAssignment);
      dispatch(addAssignment(created));
      setAssignmentName("");
      setPoints(100); // Reset default values
      setDueDate("2024-12-31");
      setAvailableFrom("2024-11-01");
      setAvailableUntil("2024-12-31");
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  const handleUpdate = async () => {
    if (!editedAssignment) return;

    try {
      const updated = await updateAssignment(editedAssignment); // Update on server
      dispatch(updateAssignmentAction(updated)); // Update in Redux store
      setEditedAssignment(null); // Clear edit mode
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  // Utility function to edit individual fields
  const editField = (field: keyof Assignment, value: any) => {
    if (editedAssignment) {
      setEditedAssignment({ ...editedAssignment, [field]: value } as Assignment);
    }
  };

  const handleDelete = async (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        await deleteAssignment(assignmentId);
        dispatch(deleteAssignmentAction(assignmentId));
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };

  return (
    <div id="wd-assignments" className="p-3">
      {/* Display AssignmentsControls only for FACULTY users */}
      {currentUser?.role === "FACULTY" && (
        <>
          <AssignmentsControls />
          <div className="mt-3">
            <input
              className="form-control"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              placeholder="Enter assignment name"
            />
            <input
              className="form-control mt-2"
              type="number"
              value={points}
              onChange={(e) => setPoints(+e.target.value)}
              placeholder="Points"
            />
            <input
              className="form-control mt-2"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <input
              className="form-control mt-2"
              type="date"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
            <input
              className="form-control mt-2"
              type="date"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={handleCreate}>
              Create Assignment
            </button>
          </div>
        </>
      )}

      <br />

      <ul id="wd-assignments-title" className="list-group rounded-0">
        <li className="wd-assignment-list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <span className="flex-grow-1">ASSIGNMENTS</span>
          </div>

          {/* List of Assignments */}
          <ul className="wd-lessons list-group rounded-0">
            {assignments.map((assignment: Assignment) => (
              <li
                key={assignment._id}
                className="wd-lesson list-group-item p-3 d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-start">
                  <BsGripVertical className="fs-4 me-3" />
                  <div>
                    {editedAssignment?._id === assignment._id ? (
                      <>
                        <input
                          className="form-control"
                          value={editedAssignment.title}
                          onChange={(e) => editField("title", e.target.value)}
                        />
                        <textarea
                          className="form-control mt-2"
                          value={editedAssignment.description}
                          onChange={(e) => editField("description", e.target.value)}
                        />
                        <input
                          className="form-control mt-2"
                          type="number"
                          value={editedAssignment.points}
                          onChange={(e) => editField("points", +e.target.value)}
                        />
                        <input
                          className="form-control mt-2"
                          type="date"
                          value={editedAssignment.dueDate}
                          onChange={(e) => editField("dueDate", e.target.value)}
                        />
                        <input
                          className="form-control mt-2"
                          type="date"
                          value={editedAssignment.availableFrom}
                          onChange={(e) => editField("availableFrom", e.target.value)}
                        />
                        <button className="btn btn-primary mt-2" onClick={handleUpdate}>
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          className="wd-assignment-link text-decoration-none fw-bold"
                          to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                        >
                          {assignment.title}
                        </Link>
                        <div className="wd-assignment-description mt-1">
                          <strong>Description:</strong> {assignment.description} <br />
                          <strong>Points:</strong> {assignment.points} pts <br />
                          <strong>Due:</strong> {assignment.dueDate || "TBD"} <br />
                          <strong>Available From:</strong> {assignment.availableFrom || "TBD"}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Show edit/delete buttons only for FACULTY users */}
                {currentUser?.role === "FACULTY" && (
                  <div className="d-flex align-items-center">
                    <button
                      onClick={() => setEditedAssignment(assignment)}
                      className="btn btn-sm btn-warning me-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(assignment._id)}
                      className="btn btn-sm btn-danger me-3"
                    >
                      Delete
                    </button>
                    <LessonControlButtons />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
