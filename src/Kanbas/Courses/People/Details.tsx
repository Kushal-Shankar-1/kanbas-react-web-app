import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import * as client from "../../Account/client";

export default function PeopleDetails() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<any>(null); // Full user object
  const [name, setName] = useState(""); // Name state for editing
  const [email, setEmail] = useState(""); // Email state for editing
  const [role, setRole] = useState(""); // Role state for editing
  const [editing, setEditing] = useState(false); // Editing mode
  const [error, setError] = useState<string | null>(null); // Error state
  const navigate = useNavigate();

  // Fetch user details from the server
  const fetchUser = async () => {
    if (!userId) return;
    try {
      const fetchedUser = await client.findUserById(userId);
      if (fetchedUser) {
        setUser(fetchedUser);
        setName(`${fetchedUser.firstName} ${fetchedUser.lastName}`);
        setEmail(fetchedUser.email || "");
        setRole(fetchedUser.role || "");
      } else {
        setError("User not found.");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("An error occurred while fetching user details.");
    }
  };

  // Save updated user details
  const saveUser = async () => {
    if (!user) return;
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    try {
      await client.updateUser(updatedUser);
      setUser(updatedUser);
      setEditing(false);
    } catch (err) {
      console.error("Error updating user:", err);
      setError("An error occurred while updating the user.");
    }
  };

  // Delete user
  const handleDelete = async () => {
    if (!userId) return;
    try {
      await client.deleteUser(userId);
      navigate("/Kanbas/Account/Users"); // Redirect after deletion
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user.");
    }
  };

  // Fetch user details on component mount
  useEffect(() => {
    fetchUser();
  }, [userId]);

  // Loading state
  if (!user && !error) {
    return <p>Loading...</p>;
  }

  // Error state
  if (error) {
    return (
      <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
        <div className="text-danger">{error}</div>
        <button
          onClick={() => navigate(-1)}
          className="btn position-fixed end-0 top-0 wd-close-details"
        >
          <IoCloseSharp className="fs-1" />
        </button>
      </div>
    );
  }

  // Render user details and editing controls
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={() => navigate(-1)}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4 wd-name">
        {!editing ? (
          <>
            <div onClick={() => setEditing(true)}>
              {user?.firstName} {user?.lastName}
            </div>
            <FaPencil onClick={() => setEditing(true)} className="float-end fs-5 mt-2 wd-edit" />
          </>
        ) : (
          <>
            <input
              className="form-control w-50 wd-edit-name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveUser()}
            />
            <FaCheck onClick={saveUser} className="float-end fs-5 mt-2 me-2 wd-save" />
          </>
        )}
      </div>
      <b>Email:</b>
      {editing ? (
        <input
          type="email"
          className="form-control w-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      ) : (
        <span>{email}</span>
      )}
      <br />
      <b>Role:</b>
      {editing ? (
        <select
          className="form-select w-50"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Admin</option>
        </select>
      ) : (
        <span>{role}</span>
      )}
      <hr />
      <button onClick={handleDelete} className="btn btn-danger float-end wd-delete">
        Delete
      </button>
      <button onClick={() => navigate(-1)} className="btn btn-secondary float-start me-2 wd-cancel">
        Cancel
      </button>
    </div>
  );
}
