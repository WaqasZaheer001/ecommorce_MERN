// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginAdmin from './pages/LoginAdmin';
import AdminDashboardHome from './pages/AdminDashboardHome';
import SignupAdmin from './pages/SignupAdmin';
import CategoryList from './pages/CategoryList';
import CategoryForm from './pages/CategoryForm';
import CategoryEditForm from './pages/CategoryEditForm'; // Import CategoryEditForm

const App = () => {
  // Check if the user is authenticated by looking for the token in localStorage
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/signup" element={<SignupAdmin />} />
        <Route
          path="/admindashboard"
          element={isAuthenticated ? <AdminDashboardHome /> : <Navigate to="/login" />}
        />
        <Route path="/category/*" element={<CategoryRoutes />} />
      </Routes>
    </Router>
  );
};

const CategoryRoutes = () => (
  <Routes>
    <Route path="/" element={<CategoryList />} />
    <Route path="add" element={<CategoryForm />} />
    <Route path="edit/:id" element={<CategoryEditForm />} /> {/* Use CategoryEditForm for editing */}
  </Routes>
);

export default App;
