import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../context/auth-context";

export default function Dashboard() {
  const authContext = useContext(AuthContext);

  return authContext.authenticated ? (
    <div>Hello user</div>
  ) : (
    <Redirect to="/login" />
  );
}
