import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client"; // Import the API client

export default function Signin() {
  // State to handle user credentials and error messages
  const [credentials, setCredentials] = useState<{ username?: string; password?: string }>({});
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle Sign In logic
  const signin = async () => {
    try {
      // Call the API to authenticate the user
      const user = await client.signin(credentials);

      // If no user is returned, set an error
      if (!user) {
        setError("Invalid username or password.");
        return;
      }

      // Dispatch the authenticated user to Redux and navigate to Dashboard
      dispatch(setCurrentUser(user));
      navigate("/Kanbas/Dashboard");
    } catch (err) {
      // Handle API errors
      console.error("Sign-in error:", err);
      setError("Invalid username or password.");
    }
  };

  return (
    <div id="wd-signin-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Sign in</h3>

      {/* Display error message if present */}
      {error && <div className="alert alert-danger mb-3">{error}</div>}

      {/* Username Input */}
      <input
        id="wd-username"
        placeholder="Username"
        className="form-control mb-3"
        value={credentials.username || ""}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />

      {/* Password Input */}
      <input
        id="wd-password"
        placeholder="Password"
        type="password"
        className="form-control mb-3"
        value={credentials.password || ""}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />

      {/* Sign In Button */}
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
