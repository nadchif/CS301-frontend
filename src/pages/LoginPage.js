import axios from "axios";
import { ENV_CONSTANTS } from "env";
import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { LocalSwal } from "shared/LocalSwal";
import MajorPageTemplate from "../components/MajorPageTemplate";
import AuthContext from "../context/auth-context";

export default function LoginPage() {
  const authContext = useContext(AuthContext);

  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });

  const [isWorking, setIsWorking] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsWorking(true);
    const url = `${ENV_CONSTANTS.apiUrl}/auth`;
    try {
      const result = await axios.post(url, {
        email: userForm.email,
        password: userForm.password,
      });
      authContext.login(result.data);
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

  return authContext.authenticated ? (
    <Redirect to="/" />
  ) : (
    <MajorPageTemplate>
      <h3 className="pb-3 ">Sign In</h3>
      <p>
        Welcome to <span className="text-danger">Cra&lt;ings</span>. Login to
        continue
      </p>
      <form onSubmit={handleSubmitForm}>
        <div className="form-group w-100">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            onChange={handleInputChange}
            required
            disabled={isWorking}
            className="form-control mb-2 rounded-0"
          />
        </div>
        <div className="form-group w-100">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            required
            className="form-control mb-2 rounded-0"
            disabled={isWorking}
          />
        </div>

        <button
          disabled={isWorking}
          type="submit"
          className="btn btn-block btn-warning rounded-0"
        >
          Login
        </button>

        <Link to="/signup" type="submit" className="btn btn-block btn-link">
          No Account? Create Account
        </Link>
      </form>
    </MajorPageTemplate>
  );
}
