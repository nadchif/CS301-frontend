import LogoutPage from "pages/LogoutPage";
import React, { useLayoutEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "pages/OrdersPage";
import OrderDetailsPage from "pages/OrderDetailsPage";
import OrderTrackingPage from "pages/OrderTracking";
import ProfilePage from "pages/ProfilePage";

const AppRouter = () => {
  const location = useLocation();
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Switch>
      <Route path="/orders/:id" component={OrderDetailsPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/track" component={OrderTrackingPage} />
      <Route path="/orders" component={OrdersPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/logout" component={LogoutPage} />
      <Route path="/" component={Dashboard} />
    </Switch>
  );
};

export default AppRouter;
