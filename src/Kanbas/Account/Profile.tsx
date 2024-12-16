import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  /**
   * Fetches the latest profile from the server and syncs with Redux.
   */
  const fetchProfile = async () => {
    try {
      const fetchedProfile = await client.profile();
      setProfile(fetchedProfile);

      // Update Redux store if fetched data differs from Redux state
      if (JSON.stringify(currentUser) !== JSON.stringify(fetchedProfile)) {
        dispatch(setCurrentUser(fetchedProfile));
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to fetch profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates the user's profile on the server.
   */
  const updateProfile = async () => {
    setError(null);
    setSuccess(null);

    try {
      const updatedProfile = await client.updateUser(profile);
      setProfile(updatedProfile); // Update local state
      dispatch(setCurrentUser(updatedProfile)); // Update Redux state
      setSuccess("Profile updated successfully! Relogin to see the changes");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    }
  };

  /**
   * Signs the user out by clearing the session and Redux state.
   */
  const signout = async () => {
    try {
      await client.signout();
      dispatch(setCurrentUser(null));
      navigate("/Kanbas/Account/Signin");
    } catch (error) {
      console.error("Error signing out:", error);
      setError("Failed to sign out. Please try again.");
    }
  };

  /**
   * Fetch the profile data when the component mounts.
   */
  useEffect(() => {
    if (location.pathname === "/Kanbas/Account/Profile") {
    fetchProfile();
    }
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wd-profile-screen" className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="text-center mb-4">Profile</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {profile && (
        <>
          {/* Username */}
          <div className="mb-3">
            <label htmlFor="wd-username" className="form-label fw-bold">Username</label>
            <input
              id="wd-username"
              value={profile.username || ""}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              className="form-control"
              disabled
            />
          </div>

          {/* Password */}
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

          {/* First Name */}
          <div className="mb-3">
            <label htmlFor="wd-firstname" className="form-label fw-bold">First Name</label>
            <input
              id="wd-firstname"
              value={profile.firstName || ""}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              className="form-control"
            />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label htmlFor="wd-lastname" className="form-label fw-bold">Last Name</label>
            <input
              id="wd-lastname"
              value={profile.lastName || ""}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              className="form-control"
            />
          </div>

          {/* Date of Birth */}
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

          {/* Email */}
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

          {/* Role */}
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

          {/* Update Button */}
          <button
            onClick={updateProfile}
            className="btn btn-primary w-100 mb-2"
            id="wd-update-btn"
          >
            Update
          </button>

          {/* Sign Out Button */}
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
