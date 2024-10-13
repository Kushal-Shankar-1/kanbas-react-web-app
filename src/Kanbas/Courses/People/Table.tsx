import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import * as db from "../../Database";

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>(); // Retrieve course ID from URL
  const { users, enrollments } = db;

  // Handle cases where users or enrollments might not be loaded correctly
  const enrolledUsers = users.filter((user) =>
    enrollments.some(
      (enrollment) => enrollment.user === user._id && enrollment.course === cid
    )
  );

  if (enrolledUsers.length === 0) {
    return <p>No users enrolled in this course.</p>;
  }

  return (
    <div id="wd-people-table" className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {enrolledUsers.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}