import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import LessonControlButtons from "../Modules/LessonControlButtons";

export default function AssignmentsList() {
  return (
    <ul id="wd-assignments" className="list-group rounded-0">
      {/* Assignment 1 */}
      <li className="wd-assignment list-group-item p-3 border-0">
        <div className="d-flex align-items-center">
          <BsFillFileEarmarkTextFill className="fs-3 me-3 text-danger" />
          <div>
            <Link className="wd-assignment-link" to="/Kanbas/Courses/1234/Assignments/123">
              <h5 className="m-0">A1: Introduction to Web Development</h5>
            </Link>
            <LessonControlButtons />
            <small className="text-muted">
              Due: Oct 5, 2024, 11:59 PM | 50 points
            </small>
          </div>
        </div>
      </li>

      {/* Assignment 2 */}
      <li className="wd-assignment list-group-item p-3 border-0">
        <div className="d-flex align-items-center">
          <BsFillFileEarmarkTextFill className="fs-3 me-3 text-danger" />
          <div>
            <Link className="wd-assignment-link" to="/Kanbas/Courses/1234/Assignments/124">
              <h5 className="m-0">A2: Understanding React Components</h5>
            </Link>
            <LessonControlButtons />
            <small className="text-muted">
              Due: Oct 12, 2024, 11:59 PM | 75 points
            </small>
          </div>
        </div>
      </li>

      {/* Assignment 3 */}
      <li className="wd-assignment list-group-item p-3 border-0">
        <div className="d-flex align-items-center">
          <BsFillFileEarmarkTextFill className="fs-3 me-3 text-danger" />
          <div>
            <Link className="wd-assignment-link" to="/Kanbas/Courses/1234/Assignments/125">
              <h5 className="m-0">A3: JavaScript + React</h5>
            </Link>
            <LessonControlButtons />
            <small className="text-muted">
              Due: Oct 20, 2024, 11:59 PM | 100 points
            </small>
          </div>
        </div>
      </li>

      {/* Assignment 4 */}
      <li className="wd-assignment list-group-item p-3 border-0">
        <div className="d-flex align-items-center">
          <BsFillFileEarmarkTextFill className="fs-3 me-3 text-danger" />
          <div>
            <Link className="wd-assignment-link" to="/Kanbas/Courses/1234/Assignments/126">
              <h5 className="m-0">A4: DOM Manipulation</h5>
            </Link>
            <LessonControlButtons />
            <small className="text-muted">
              Due: Nov 3, 2024, 11:59 PM | 100 points
            </small>
          </div>
        </div>
      </li>

      {/* Assignment 5 */}
      <li className="wd-assignment list-group-item p-3 border-0">
        <div className="d-flex align-items-center">
          <BsFillFileEarmarkTextFill className="fs-3 me-3 text-danger" />
          <div>
            <Link className="wd-assignment-link" to="/Kanbas/Courses/1234/Assignments/127">
              <h5 className="m-0">A5: Advanced JavaScript</h5>
            </Link>
            <LessonControlButtons />
            <small className="text-muted">
              Due: Nov 10, 2024, 11:59 PM | 100 points
            </small>
          </div>
        </div>
      </li>
    </ul>
  );
}
