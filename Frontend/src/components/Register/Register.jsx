import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      fullname: '',
      email: '',
      username: '',
      password: '',
      profilepicture: null,
    });
  
    const handleChange = (e) => {
      const { name, value, type } = e.target;
      const newValue = type === 'file' ? e.target.files[0] : value;
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const formDataForBackend = new FormData();
        formDataForBackend.append('fullname', formData.fullname);
        formDataForBackend.append('email', formData.email);
        formDataForBackend.append('username', formData.username);
        formDataForBackend.append('password', formData.password);
        formDataForBackend.append('profilepicture', formData.profilepicture);
  
        const response = await axios.post('http://localhost:8000/api/v1/users/register', formDataForBackend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Check if 'response' is defined before accessing 'data'
        if (response && response.data) {
          // Handle the response from the backend (success or failure)
          console.log('Registration successful:', response.data);
  
          // Reset form data after successful registration
          setFormData({
            fullname: '',
            email: '',
            username: '',
            password: '',
            profilepicture: null,
          });
  
          // Redirect the user to the login page after successful registration
          navigate('/login');
        } else {
          console.error('Unexpected response:', response);
        }
      } catch (error) {
        // Handle errors from the backend
        console.error('Registration failed:', error.response ? error.response.data : error.message);
      }
    };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            placeholder='Full Name'
            onChange={handleChange}
            required
          />
            <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            placeholder='Username'
            onChange={handleChange}
            required
          />
            <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder='Email'
            onChange={handleChange}
            required
          />
            <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder='Password'
            onChange={handleChange}
            required
          />
            <input
            type="file"
            id="profilepicture"
            name="profilepicture"
            onChange={handleChange}
            accept=".jpg, .jpeg, .png"
            required
          />
            <button onClick={handleSubmit}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
