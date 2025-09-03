import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function SignUp() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form Data:', formData);
    const response = await authService.signup(formData);
    if (response) {
      console.log('Sign up successful:', response);
      navigate('/');
    }
    else {
      console.error('Sign up failed');
    }
  }


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Sign Up</h2>
        <div className="login-input-group">
          <label>Username</label>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="login-input-group">
          <label>Email</label>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="login-input-group">
          <label>Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="login-input-group">
          <label>Location</label>
          <input
            className="login-input"
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Sign Up
        </button>

        <p className="signup">
          Already have an account? <a href="/">Log in</a>
        </p>
      </form>
    </div >
  );
}

export default SignUp;
