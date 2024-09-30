import { FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">
      {/* Assignment Controls */}
      <div id="wd-assignments-controls" className="d-flex justify-content-between mb-3">
        {/* Search Input */}
        <div className="input-group w-50">
          <span className="input-group-text bg-white border-secondary">
            <FaSearch />
          </span>
          <input
            id="wd-search-assignment"
            className="form-control border-secondary"
            type="text"
            placeholder="Search for Assignments"
          />
        </div>

        {/* Right-side buttons */}
        <div className="d-flex">
          {/* Group Button */}
          <button className="btn btn-secondary me-2 d-flex align-items-center" id="wd-add-assignment-group">
            <FaPlus className="me-1" />
            Group
          </button>

          {/* Assignment Button */}
          <button className="btn btn-danger d-flex align-items-center" id="wd-add-assignment">
            <FaPlus className="me-1" />
            Assignment
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 id="wd-assignments-title" className="mt-4">
        ASSIGNMENTS 40% of Total
        <button className="btn btn-link text-danger ms-2">+</button>
      </h3>

      <ul id="wd-assignment-list" className="list-group mt-3">
        {/* Assignment 1 */}
        <li className="wd-assignment-list-item list-group-item border-0 d-flex flex-column">
          <Link className="wd-assignment-link fw-bold fs-5 text-decoration-none" to="/Kanbas/Courses/1234/Assignments/123">
            A1 - ENV + HTML
          </Link>
          <div className="wd-assignment-description text-muted">
            Multiple Modules | <strong>Not available until</strong> May 6 at 12:00am | <strong>Due</strong> May 13 at 11:59pm | 100 pts
          </div>
        </li>

        {/* Assignment 2 */}
        <li className="wd-assignment-list-item list-group-item border-0 d-flex flex-column">
          <Link className="wd-assignment-link fw-bold fs-5 text-decoration-none" to="/Kanbas/Courses/1234/Assignments/124">
            A2 - CSS + BOOTSTRAP
          </Link>
          <div className="wd-assignment-description text-muted">
            Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts
          </div>
        </li>

        {/* Assignment 3 */}
        <li className="wd-assignment-list-item list-group-item border-0 d-flex flex-column">
          <Link className="wd-assignment-link fw-bold fs-5 text-decoration-none" to="/Kanbas/Courses/1234/Assignments/125">
            A3 - JAVASCRIPT + REACT
          </Link>
          <div className="wd-assignment-description text-muted">
            Multiple Modules | <strong>Not available until</strong> May 20 at 12:00am | <strong>Due</strong> May 27 at 11:59pm | 100 pts
          </div>
        </li>

        {/* Assignment 4 */}
        <li className="wd-assignment-list-item list-group-item border-0 d-flex flex-column">
          <Link className="wd-assignment-link fw-bold fs-5 text-decoration-none" to="/Kanbas/Courses/1234/Assignments/126">
            A4 - DOM MANIPULATION
          </Link>
          <div className="wd-assignment-description text-muted">
            Single Module | <strong>Not available until</strong> May 27 at 12:00am | <strong>Due</strong> June 3 at 11:59pm | 100 pts
          </div>
        </li>

        {/* Assignment 5 */}
        <li className="wd-assignment-list-item list-group-item border-0 d-flex flex-column">
          <Link className="wd-assignment-link fw-bold fs-5 text-decoration-none" to="/Kanbas/Courses/1234/Assignments/127">
            A5 - ADVANCED JAVASCRIPT
          </Link>
          <div className="wd-assignment-description text-muted">
            Multiple Modules | <strong>Not available until</strong> June 3 at 12:00am | <strong>Due</strong> June 10 at 11:59pm | 100 pts
          </div>
        </li>
      </ul>
    </div>
  );
}
