import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client"; // Import API client functions

export default function Signup() {
  const [user, setUser] = useState<{ username?: string; password?: string; verifyPassword?: string }>({});
  const [error, setError] = useState<string | null>(null); // State to handle error messages

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async () => {
    // Validation: Check for empty fields
    if (!user.username || !user.password || !user.verifyPassword) {
      setError("All fields are required.");
      return;
    }

    // Validation: Check if passwords match
    if (user.password !== user.verifyPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Call the API client function to create a new user
      const newUser = await client.signup({ username: user.username, password: user.password });
      dispatch(setCurrentUser(newUser));

      // Navigate to the Profile screen
      navigate("/Kanbas/Account/Profile");
    } catch (err) {
      // Safely handle errors by checking if `err` is an AxiosError
      if (err instanceof Error && "response" in err) {
        const axiosError = err as any; // Cast to `any` to access `response`
        setError(axiosError.response?.data?.message || "Error signing up. Please try again.");
      } else {
        setError("Unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div id="wd-signup-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Sign up</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        id="wd-username"
        placeholder="Username"
        className="form-control mb-3"
        value={user.username || ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <input
        id="wd-password"
        placeholder="Password"
        type="password"
        className="form-control mb-3"
        value={user.password || ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <input
        id="wd-verify-password"
        placeholder="Verify Password"
        type="password"
        className="form-control mb-3"
        value={user.verifyPassword || ""}
        onChange={(e) => setUser({ ...user, verifyPassword: e.target.value })}
      />

      <button onClick={signup} id="wd-signup-btn" className="btn btn-primary w-100 mb-3">
        Sign up
      </button>

      <div className="text-center">
        <Link id="wd-signin-link" to="/Kanbas/Account/Signin">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
}
