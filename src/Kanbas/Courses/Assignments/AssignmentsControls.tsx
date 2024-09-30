import { FaPlus, FaSearch } from "react-icons/fa";

export default function AssignmentsControls() {
  return (
    <div id="wd-assignments-controls" className="d-flex justify-content-between mb-3">
      {/* Search Input Field */}
      <div className="input-group w-50">
        <span className="input-group-text bg-white border-secondary">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control border-secondary"
          placeholder="Search for Assignment"
        />
      </div>

      {/* Right-side buttons */}
      <div className="d-flex">
        {/* Group Button */}
        <button className="btn btn-secondary me-2 d-flex align-items-center">
          <FaPlus className="me-1" />
          Group
        </button>

        {/* Assignment Button */}
        <button className="btn btn-danger d-flex align-items-center">
          <FaPlus className="me-1" />
          Assignment
        </button>
      </div>
    </div>
  );
}
