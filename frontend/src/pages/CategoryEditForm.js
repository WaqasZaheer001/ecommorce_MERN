import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const CategoryEditForm = ({ history }) => {
  const location = useLocation();
  const { category } = location.state || { category: null };

  const [formData, setFormData] = useState({
    name: category ? category.name : '',
    description: category ? category.description : '',
    image: category ? category.image : ''
  });

  useEffect(() => {
    if (!category) {
      return; // No need to fetch data if category is not available
    }

    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${category._id}`);
        const { name, description, image } = response.data;
        setFormData({ name, description, image });
      } catch (error) {
        console.error('Error fetching category details:', error);
      }
    };

    fetchCategory();
  }, [category]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.put(`http://localhost:5000/api/categories/${category._id}`, formData, config);
      history.push('/category');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  if (!category) {
    return <div>No category found</div>;
  }

  return (
    <div>
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Category Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default CategoryEditForm;
