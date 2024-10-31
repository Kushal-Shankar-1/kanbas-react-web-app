import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Fetch the current user's profile or redirect if not signed in
  const fetchProfile = () => {
    if (!currentUser) {
      navigate("/Kanbas/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  };

  // Sign out function to clear the user and navigate to Signin
  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div id="wd-profile-screen" className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="text-center mb-4">Profile</h3>
      
      {profile && (
        <>
          <div className="mb-3">
            <label htmlFor="wd-username" className="form-label fw-bold">Username</label>
            <input
              id="wd-username"
              value={profile.username || ""}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="wd-password" className="form-label fw-bold">Password</label>
            <input
              id="wd-password"
              value={profile.password || ""}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              type="password"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="wd-firstname" className="form-label fw-bold">First Name</label>
            <input
              id="wd-firstname"
              value={profile.firstName || ""}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="wd-lastname" className="form-label fw-bold">Last Name</label>
            <input
              id="wd-lastname"
              value={profile.lastName || ""}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="wd-dob" className="form-label fw-bold">Date of Birth</label>
            <input
              id="wd-dob"
              value={profile.dob || ""}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              type="date"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="wd-email" className="form-label fw-bold">Email</label>
            <input
              id="wd-email"
              value={profile.email || ""}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              type="email"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="wd-role" className="form-label fw-bold">Role</label>
            <select
              id="wd-role"
              value={profile.role || "USER"}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="form-control"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>

          <button
            onClick={signout}
            className="btn btn-danger w-100"
            id="wd-signout-btn"
          >
            Sign out
          </button>
        </>
      )}
    </div>
  );
}
