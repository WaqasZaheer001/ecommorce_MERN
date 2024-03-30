// CategoryList.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook to navigate programmatically

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async id => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.delete(`http://localhost:5000/api/categories/${id}`, config);
      setCategories(categories.filter(category => category._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      <h2>Category List</h2>
      <Link to="/category/add">Add New Category</Link>
      <ul>
        {categories.map(category => (
          <li key={category._id}>
            {category.name} - {category.description}
            <button onClick={() => handleDelete(category._id)}>Delete</button>
            {/* Use Link to navigate to CategoryEditForm with category id and details */}
            <Link to={{ pathname: `/category/edit/${category._id}`, state: { category } }}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
