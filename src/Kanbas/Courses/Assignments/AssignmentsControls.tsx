import { FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AssignmentsControls() {
  const navigate = useNavigate();
  const { cid } = useParams<{ cid: string }>();
  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user from Redux store

  const handleAddAssignment = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
  };

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
        {/* Show Group button for all users */}
        <button className="btn btn-secondary me-2 d-flex align-items-center">
          <FaPlus className="me-1" />
          Group
        </button>

        {/* Show Assignment button only for FACULTY users */}
        {currentUser?.role === "FACULTY" && (
          <button
            onClick={handleAddAssignment}
            className="btn btn-danger d-flex align-items-center"
          >
            <FaPlus className="me-1" />
            Assignment
          </button>
        )}
      </div>
    </div>
  );
}
