import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client"; // Import API client functions

export default function Signin() {
  const [credentials, setCredentials] = useState<{ username?: string; password?: string }>({});
  const [error, setError] = useState<string | null>(null); // State to handle error messages

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    try {
      // Call the API client function to authenticate the user
      const user = await client.signin(credentials);
      if (!user) return;

      // Dispatch the user information to the Redux store
      dispatch(setCurrentUser(user));

      // Navigate to the Dashboard
      navigate("/Kanbas/Dashboard");
    } catch (err) {
      // Handle errors (e.g., invalid credentials)
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div id="wd-signin-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Sign in</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        id="wd-username"
        placeholder="Username"
        className="form-control mb-3"
        value={credentials.username || ""}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />

      <input
        id="wd-password"
        placeholder="Password"
        type="password"
        className="form-control mb-3"
        value={credentials.password || ""}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />

      <button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100 mb-3">
        Sign in
      </button>

      <div className="text-center">
        <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}
