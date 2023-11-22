import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ProductDataService from "../services/product-services";
import { useNavigate } from "react-router-dom";


function Login({loginapp}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const login = () => {
    loginapp({ username: username, password: password });
    // props.history.push('/');
 
    navigate("/");
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    login();
  };
  
  return (
    <Container>
      <Form onsubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={onChangeUsername}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={onChangePassword}
          />
        </Form.Group>
        <Button type="submit" variant="primary" onClick={login}>
          Login{" "}
        </Button>
      </Form>{" "}
    </Container>
  );
}

export default Login;
