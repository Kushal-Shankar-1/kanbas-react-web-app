import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAssignment } from './reducer';
import AssignmentsControls from './AssignmentsControls';
import LessonControlButtons from '../Modules/LessonControlButtons';
import { BsGripVertical } from 'react-icons/bs';
import { Assignment } from './reducer';

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const courseAssignments = assignments.filter((a: Assignment) => a.course === cid);

  const handleDelete = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <div id="wd-assignments" className="p-3">
      {/* Display AssignmentsControls only for FACULTY users */}
      {currentUser?.role === "FACULTY" && <AssignmentsControls />}
      <br /><br />

      <ul id="wd-assignments-title" className="list-group rounded-0">
        <li className="wd-assignment-list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <span className="flex-grow-1">ASSIGNMENTS</span>
          </div>

          {/* List of Assignments */}
          <ul className="wd-lessons list-group rounded-0">
            {courseAssignments.map((assignment: Assignment) => (
              <li
                key={assignment._id}
                className="wd-lesson list-group-item p-3 d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-start">
                  <BsGripVertical className="fs-4 me-3" />
                  <div>
                    <Link
                      className="wd-assignment-link text-decoration-none fw-bold"
                      to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </Link>
                    <div className="wd-assignment-description mt-1">
                      <strong>Due:</strong> {assignment.dueDate || 'TBD'} | <strong>Points:</strong> {assignment.points || 100} pts
                    </div>
                  </div>
                </div>

                {/* Show edit/delete buttons only for FACULTY users */}
                {currentUser?.role === "FACULTY" && (
                  <div className="d-flex align-items-center">
                    <Link
                      to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                      className="btn btn-sm btn-warning me-3"
                    >
                      Edit
                    </Link>
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
