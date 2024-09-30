import { BsFillFileEarmarkTextFill } from "react-icons/bs";

export default function AssignmentsList() {
  return (
    <ul id="wd-assignments" className="list-group rounded-0">
      {/* Assignment 1 */}
      <li className="wd-assignment list-group-item p-3 border-0">
        <div className="d-flex align-items-center">
          <BsFillFileEarmarkTextFill className="fs-3 me-3 text-danger" />
          <div>
            <h5 className="m-0">A1: Introduction to Web Development</h5>
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
            <h5 className="m-0">A2: Understanding React Components</h5>
            <small className="text-muted">
              Due: Oct 12, 2024, 11:59 PM | 75 points
            </small>
          </div>
        </div>
      </li>

    </ul>
  );
}
