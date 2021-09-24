import React, { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth-context";
import { countCartItems } from "../shared/utils";

export default function Header() {
  const authContext = useContext(AuthContext);
  return (
    <header>
      <>
        <Navbar bg="warning" variant="light">
          <Container>
            <Link to="/" className="navbar-brand font-weight-bold">
              Cra&lt;ings
            </Link>
            <Nav>
              {authContext.authenticated ? (
                <>
                  <Link to="/" className="nav-link d-none d-md-block">
                    Menu
                  </Link>
                  <Link to="/orders" className="nav-link">
                    Orders
                  </Link>
                  <Link
                    to="/cart"
                    className={`${
                      authContext.userData.cart &&
                      authContext.userData.cart.length > 0
                        ? "font-weight-bold"
                        : ""
                    } nav-link `}
                  >
                    Cart (
                    <span className="text-danger">
                      {authContext.userData.cart
                        ? countCartItems(authContext.userData.cart)
                        : 0}
                    </span>
                    )
                  </Link>
                  <NavDropdown
                    title={authContext.userData.user.fullname}
                    id="basic-nav-dropdown"
                  >
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                    <NavDropdown.Divider />
                    <Link to="/logout" className="dropdown-item">
                      {" "}
                      Logout
                    </Link>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Link to="/track" className="nav-link">
                    Track Order
                  </Link>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
      </>
    </header>
  );
}
