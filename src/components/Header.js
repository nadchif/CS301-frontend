import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function Header() {
  return (
    <header>
      <>
        <Navbar bg="warning" variant="light">
          <Container>
            <Navbar.Brand href="#home">Kra&lt;ings</Navbar.Brand>
            <Nav>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Track Order</Nav.Link>
              <Nav.Link href="#pricing">Login</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    </header>
  );
}
