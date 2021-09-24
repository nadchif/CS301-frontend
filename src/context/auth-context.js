import React from "react";
const authContext = React.createContext({
  authenticated: false,
  userData: {},
  addToCart: (food) => {},
  removeFromCart: (food, singleMode) => {},
  emptyCart: () => {},
  login: (userData) => {},
  logout: () => {},
});
export default authContext;
