import React from 'react';
import { Link } from 'react-router-dom';
import AssignmentsControls from './AssignmentsControls';
import ModuleControlButtons from '../Modules/ModuleControlButtons';
import LessonControlButtons from '../Modules/LessonControlButtons';
import { FaClipboardCheck } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">
      <AssignmentsControls />
      <br /><br />

      <ul id="wd-assignments-title" className="list-group rounded-0">
        {/* Assignment 1 */}
        <li className="wd-assignment-list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <ModuleControlButtons />
          </div>

          <ul className="wd-lessons list-group rounded-0">
            {/* Assignment 1 */}
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="fs-3" />
              <FaClipboardCheck color="green" size={20} className="me-3" />
              <Link className="wd-assignment-link" to="/Kanbas/Courses/1234/Assignments/123">
                A1 - ENV + HTML
              </Link>
              <LessonControlButtons />
              <div className="wd-assignment-description">
                Multiple Modules | <strong>Not available until</strong> May 6 at 12:00am |{' '}
                <strong>Due</strong> May 13 at 11:59pm | 100 pts
              </div>
            </li>

            {/* Assignment 2 */}
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="fs-3" />
              <FaClipboardCheck color="green" size={20} className="me-3" />
              <Link className="wd-assignment-link" to="/Kanbas/Courses/1234/Assignments/124">
                A2 - CSS + BOOTSTRAP
              </Link>
              <LessonControlButtons />
              <div className="wd-assignment-description">
                Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am |{' '}
                <strong>Due</strong> May 20 at 11:59pm | 100 pts
              </div>
            </li>

            {/* Assignment 3 */}
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="fs-3" />
              <FaClipboardCheck color="green" size={20} className="me-3" />
              <Link className="wd-assignment-link" to="/Kanbas/Courses/1234/Assignments/125">
                A3 - JavaScript + React
              </Link>
              <LessonControlButtons />
              <div className="wd-assignment-description">
                Multiple Modules | <strong>Not available until</strong> May 20 at 12:00am |{' '}
                <strong>Due</strong> May 27 at 11:59pm | 100 pts
              </div>
            </li>

            {/* Assignment 4 */}
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="fs-3" />
              <FaClipboardCheck color="green" size={20} className="me-3" />
              <Link className="wd-assignment-link" to="/Kanbas/Courses/1234/Assignments/126">
                A4 - DOM Manipulation
              </Link>
              <LessonControlButtons />
              <div className="wd-assignment-description">
                Single Module | <strong>Not available until</strong> May 27 at 12:00am |{' '}
                <strong>Due</strong> June 3 at 11:59pm | 100 pts
              </div>
            </li>

            {/* Assignment 5 */}
            <li className="wd-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="fs-3" />
              <FaClipboardCheck color="green" size={20} className="me-3" />
              <Link className="wd-assignment-link" to="/Kanbas/Courses/1234/Assignments/127">
                A5 - Advanced JavaScript
              </Link>
              <LessonControlButtons />
              <div className="wd-assignment-description">
                Multiple Modules | <strong>Not available until</strong> June 3 at 12:00am |{' '}
                <strong>Due</strong> June 10 at 11:59pm | 100 pts
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
