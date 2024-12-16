import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState<{ username?: string; password?: string; verifyPassword?: string }>({});
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    if (!user.username || !user.password || !user.verifyPassword) {
      setError("All fields are required.");
      return;
    }
  
    if (user.password !== user.verifyPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      // Create the new user
      await client.signup({ username: user.username, password: user.password });
  
      // Redirect to the Sign In page
      navigate("/Kanbas/Account/Signin");
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError(err.response.data.message); // Display "Username already in use"
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div id="wd-signup-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Sign up</h3>

      {/* Display error message */}
      {error && <div className="alert alert-danger mb-3">{error}</div>}

      {/* Username Input */}
      <input
        id="wd-username"
        placeholder="Username"
        className="form-control mb-3"
        value={user.username || ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      {/* Password Input */}
      <input
        id="wd-password"
        placeholder="Password"
        type="password"
        className="form-control mb-3"
        value={user.password || ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      {/* Verify Password Input */}
      <input
        id="wd-verify-password"
        placeholder="Verify Password"
        type="password"
        className="form-control mb-3"
        value={user.verifyPassword || ""}
        onChange={(e) => setUser({ ...user, verifyPassword: e.target.value })}
      />

      {/* Sign Up Button */}
      <button onClick={signup} className="btn btn-primary w-100 mb-3">
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
