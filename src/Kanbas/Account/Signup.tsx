import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Sign up</h3>
      
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
      
      <input
        id="wd-verify-password"
        placeholder="Verify Password"
        type="password"
        className="form-control mb-3"
      />
      
      <Link
        to="/Kanbas/Account/Profile"
        className="btn btn-primary w-100 mb-3"
      >
        Sign up
      </Link>

      <div className="text-center">
        <Link id="wd-signin-link" to="/Kanbas/Account/Signin">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
}
