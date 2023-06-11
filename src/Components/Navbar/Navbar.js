import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase";
import "./Navbar.css";

const NavbarComponent = ({ cart }) => {
  const navigate = useNavigate();
  const userIsLoggedIn = sessionStorage.getItem("user_token");
  const onLogOut = async () => {
    sessionStorage.removeItem("user_token");
    await signOut(auth);
    navigate();
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Ali Express</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav>
              <Link to="/" className="btn btn-outline-dark">
                Home
              </Link>
            </Nav>
            {userIsLoggedIn ? (
              <Nav>
                <Button onClick={onLogOut}>
                  <FontAwesomeIcon icon={faUser} />
                  Logout
                </Button>
              </Nav>
            ) : (
              <>
                <Nav>
                  <Link to="/login" className="btn btn-outline-dark">
                    <FontAwesomeIcon icon={faUser} />
                    Login
                  </Link>
                </Nav>
                <Nav>
                  <Link to="/register" className="btn btn-outline-dark ms-2">
                    <FontAwesomeIcon icon={faUser} />
                    Register
                  </Link>
                </Nav>
              </>
            )}

            <Nav>
              <Link to="/cart">
                <Button variant="secondary">
                  <FontAwesomeIcon icon={faCartShopping} className="pe-2" />
                  <span>Cart({cart.length})</span>
                </Button>
              </Link>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
