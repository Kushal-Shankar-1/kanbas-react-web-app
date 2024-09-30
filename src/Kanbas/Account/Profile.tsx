import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="text-center mb-4">Profile</h3>
      
      <div className="mb-3">
        <label htmlFor="wd-username" className="form-label fw-bold">Username</label>
        <input
          id="wd-username"
          value="alice"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-password" className="form-label fw-bold">Password</label>
        <input
          id="wd-password"
          value="123"
          type="password"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-firstname" className="form-label fw-bold">First Name</label>
        <input
          id="wd-firstname"
          value="Alice"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-lastname" className="form-label fw-bold">Last Name</label>
        <input
          id="wd-lastname"
          value="Wonderland"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-dob" className="form-label fw-bold">Date of Birth</label>
        <input
          id="wd-dob"
          value="2000-01-01"
          type="date"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-email" className="form-label fw-bold">Email</label>
        <input
          id="wd-email"
          value="alice@wonderland.com"
          type="email"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-role" className="form-label fw-bold">Role</label>
        <select id="wd-role" className="form-control">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
      </div>

      <Link
        to="/Kanbas/Account/Signin"
        className="btn btn-danger w-100"
      >
        Sign out
      </Link>
    </div>
  );
}
