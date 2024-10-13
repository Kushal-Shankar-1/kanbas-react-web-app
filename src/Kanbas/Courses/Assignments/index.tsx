import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AssignmentsControls from './AssignmentsControls';
import ModuleControlButtons from '../Modules/ModuleControlButtons';
import LessonControlButtons from '../Modules/LessonControlButtons';
import { FaClipboardCheck } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';
import * as db from '../../Database'; // Import database

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>(); // Retrieve course ID
  const courseAssignments = db.assignments.filter((a) => a.course === cid); // Filter assignments

  return (
    <div id="wd-assignments" className="p-3">
      <AssignmentsControls />
      <br /><br />

      <ul id="wd-assignments-title" className="list-group rounded-0">
        <li className="wd-assignment-list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <ModuleControlButtons />
          </div>

          <ul className="wd-lessons list-group rounded-0">
            {courseAssignments.map((assignment) => (
              <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="fs-3" />
                <FaClipboardCheck color="green" size={20} className="me-3" />
                <Link
                  className="wd-assignment-link"
                  to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                >
                  {assignment.title}
                </Link>
                <LessonControlButtons />
                <div className="wd-assignment-description">
                  <strong>Due:</strong> {assignment.dueDate || 'TBD'} | <strong>Points:</strong>{' '}
                  {assignment.points || 100} pts
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}