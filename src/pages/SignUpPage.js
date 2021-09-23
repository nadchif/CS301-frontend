import React from "react";
import { Link } from "react-router-dom";
import MajorPageTemplate from "../components/MajorPageTemplate";

export default function SignUpPage() {
  return (
    <MajorPageTemplate>
      <h3 className="pb-3">Create Account</h3>

      <form>
        <div className="form-group w-100">
          <label htmlFor="username">Fullname: </label>
          <input
            type="text"
            name="username"
            required
            className="form-control mb-2"
          />
        </div>
        <div className="form-group w-100">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            required
            className="form-control mb-2"
          />
        </div>
        <div className="form-group w-100">
          <label htmlFor="contact">Contact Number: </label>
          <input
            type="tel"
            name="contact"
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
        <div className="form-group w-100">
          <label htmlFor="confirm-password">Confirm Password: </label>
          <input
            type="password"
            name="confirm-password"
            required
            className="form-control mb-2"
          />
        </div>

        <button type="submit" className="btn btn-block btn-dark">
          Sign Up
        </button>

        <Link to="/login" className="btn btn-block btn-link">
          Already Have account? Sign In
        </Link>
      </form>
    </MajorPageTemplate>
  );
}
