import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AdminSidebarNavbar from '../components/AdminSidebarNavbar';

const AdminDashboardHome = () => {
  return (
    <div className="admin-dashboard-home" style={{ 
      backgroundImage: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)',
      height: '100vh' // Set the height to full screen
    }}>
      <AdminSidebarNavbar />
      <div className="admin-dashboard-content">
        <h2 className="mb-4 text-center">Welcome to Admin Dashboard Home</h2>
        <Container>
          <Row>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Products</Card.Title>
                  <Card.Text>Manage your products here.</Card.Text>
                  <Button variant="primary" href="/products">View Products</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Categories</Card.Title>
                  <Card.Text>Manage your categories here.</Card.Text>
                  <Button variant="primary" href="/category">View Categories</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
