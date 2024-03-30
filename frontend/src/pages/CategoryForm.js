import React, { useState } from 'react';
import axios from 'axios';

const CategoryForm = ({ history }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null  // Initialize image state to null
  });

  const handleChange = e => {
    if (e.target.name === 'image') {
      // Update image state with the selected file
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      // Update other form data fields
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image); // Append image file to FormData

      await axios.post('http://localhost:5000/api/categories/create', formDataToSend, config);
      history.push('/category');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <h2>Add Category</h2>
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
          type="file"   // Set input type to file for image upload
          name="image"
          accept="image/*"  // Specify accepted file types
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CategoryForm;
