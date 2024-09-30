import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Sign in</h3>
      
      <input
        id="wd-username"
        placeholder="Username"
        className="form-control mb-3"
      />
      
      <input
        id="wd-password"
        placeholder="Password"
        type="password"
        className="form-control mb-3"
      />
      
      <Link
        id="wd-signin-btn"
        to="/Kanbas/Dashboard"
        className="btn btn-primary w-100 mb-3"
      >
        Sign in
      </Link>

      <div className="text-center">
        <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}
