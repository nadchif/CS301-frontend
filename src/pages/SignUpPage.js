import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MajorPageTemplate from "../components/MajorPageTemplate";
import { ENV_CONSTANTS } from "../env";
import { LocalSwal } from "../shared/LocalSwal";

export default function SignUpPage() {
  const [userForm, setUserForm] = useState({
    fullname: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [isWorking, setIsWorking] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsWorking(true);
    if (userForm.password !== userForm.confirmPassword) {
      LocalSwal.fire(
        "Uh Oh",
        "Password and password confirmation must match",
        "warning"
      );

      setIsWorking(false);
      return;
    }
    const url = `${ENV_CONSTANTS.apiUrl}/user`;
    try {
      await axios.post(url, {
        fullname: userForm.fullname,
        email: userForm.email,
        contact_number: userForm.contactNumber,
        password: userForm.password,
      });
      setUserForm({
        fullname: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
      });
      LocalSwal.fire(
        "Welcome",
        "You've registered successfully! Proceed to login",
        "success"
      );
    } catch (e) {
      if (e.response.data.error) {
        LocalSwal.fire("Uh Oh", e.response.data.error, "error");
      } else {
        LocalSwal.fire(
          "Uh Oh",
          "An error occured. Please try again later",
          "error"
        );
      }
      console.error("s", e.response);
    }

    setIsWorking(false);
  };

  const handleInputChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <MajorPageTemplate>
      <h3 className="pb-3">Create Account</h3>

      <form onSubmit={handleSubmitForm}>
        <div className="form-group w-100">
          <label htmlFor="fullname">Fullname: </label>
          <input
            type="text"
            name="fullname"
            required
            onChange={handleInputChange}
            value={userForm.fullname}
            className="form-control mb-2 rounded-0"
          />
        </div>
        <div className="form-group w-100">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            value={userForm.email}
            required
            className="form-control mb-2 rounded-0"
          />
        </div>
        <div className="form-group w-100">
          <label htmlFor="contact">Contact Number: </label>
          <input
            type="tel"
            name="contactNumber"
            onChange={handleInputChange}
            value={userForm.contactNumber}
            required
            className="form-control mb-2 rounded-0"
          />
        </div>
        <div className="form-group w-100">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            minLength={5}
            value={userForm.password}
            required
            className="form-control mb-2 rounded-0"
          />
        </div>
        <div className="form-group w-100">
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleInputChange}
            value={userForm.confirmPassword}
            required
            className="form-control mb-2 rounded-0"
          />
        </div>

        <button
          type="submit"
          className="btn btn-block btn-dark rounded-0"
          disabled={isWorking}
        >
          Sign Up
        </button>

        <Link to="/login" className="btn btn-block btn-link">
          Already Have account? Sign In
        </Link>
      </form>
    </MajorPageTemplate>
  );
}
