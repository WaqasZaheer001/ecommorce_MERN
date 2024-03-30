import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignupAdmin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const response = await axios.post('/api/auth/admin/signup', formData);
        console.log(response.data); // Success message from backend
        // Handle success, redirect, etc.
      } catch (error) {
        console.error(error.response.data); // Error message from backend
        setError(error.response.data.message); // Set error message for display
      }
    }
    setValidated(true);
  };

  return (
    <div 
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="bg-light p-4 rounded shadow">
            <h2 className="text-center mb-4">Admin Sign Up</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" className="mx-auto mt-3">
                Sign Up
              </Button>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              <div className="mt-3 text-center">
                <Link to="/login">Already have an account? Log In</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupAdmin;
