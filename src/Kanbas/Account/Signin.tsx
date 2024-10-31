import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as db from "../Database";

export default function Signin() {
  // State to handle user credentials
  const [credentials, setCredentials] = useState<{ username?: string; password?: string }>({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle Sign In logic
  const signin = () => {
    const user = db.users.find(
      (u: any) => u.username === credentials.username && u.password === credentials.password
    );

    // If no matching user is found, return
    if (!user) return;

    // Dispatch the user information to Redux store and navigate to Dashboard
    dispatch(setCurrentUser(user));
    navigate("/Kanbas/Dashboard");
  };

  return (
    <div id="wd-signin-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Sign in</h3>
      
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
