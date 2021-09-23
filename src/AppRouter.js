import React, { useLayoutEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const AppRouter = () => {
  const location = useLocation();
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Switch>
      {/* <Route path="/orders/:id" component={PastorPortfolioPage} /> 
     
      <Route path="/logout" component={LogoutPage} />
 
      <Route path="/verify/:slug" component={VerifyUser} />
      <Route path="/reset-password" component={SetNewPassword} />
      <Route path="/forgot" component={ForgotPassword} /> */}
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/" component={Dashboard} />
    </Switch>
  );
};

export default AppRouter;
