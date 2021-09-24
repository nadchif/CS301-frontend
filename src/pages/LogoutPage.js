import React, { useEffect } from "react";
import { useContext } from "react";
import { Redirect } from "react-router-dom";

import AuthContext from "../context/auth-context";

export default function Logout() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.logout();
  }, [authContext]);
  return <Redirect to="/login" />;
}
