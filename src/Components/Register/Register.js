import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import "./Register.css";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [validate, setValidate] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const isValid = form.checkValidity();
    if (isValid) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast("You are register success");
      } catch (error) {
        console.log(error);
      }
    } else setValidate(true);
    navigate("/login");
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center p-5">
          <Col md={4} className=" text-bg-light">
            <Form onSubmit={onFormSubmit} noValidate validated={validate}>
              <h1>Register</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Form.Control.Feedback type="valid">
                  Correct E-mail
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Your email is not correct
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Button variant="warning" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
