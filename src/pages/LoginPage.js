import React from "react";
import { Link } from "react-router-dom";
import MajorPageTemplate from "../components/MajorPageTemplate";

export default function LoginPage() {
  return (
    <MajorPageTemplate>
      <h3 className="pb-3 ">Sign In</h3>
      <p>
        Welcome to <span className="text-danger">Kra&lt;ings</span>. Login to
        continue
      </p>
      <form>
        <div className="form-group w-100">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            required
            className="form-control mb-2"
          />
        </div>
        <div className="form-group w-100">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            required
            className="form-control mb-2"
          />
        </div>

        <button type="submit" className="btn btn-block btn-warning">
          Login
        </button>

        <Link to="/signup" type="submit" className="btn btn-block btn-link">
          No Account? Create Account
        </Link>
      </form>
    </MajorPageTemplate>
  );
}
