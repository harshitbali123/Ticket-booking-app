import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import BlurCircle from '../components/BlurCircle';
import heroBackground from '../assets/backgroundImage.png';
import { authService } from '../services/authService';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', formData.name);
        
        // Redirect to home or dashboard
        navigate('/');
      } else {
        setError(data.message || 'Sign up failed');
      }
    } catch (error) {
      setError('Network error. Please try again later.');
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBackground})` }}
      >
      <div className="absolute inset-0 bg-black/70"></div>
      <BlurCircle top="-200px" left="-200px" />
      <BlurCircle bottom="-200px" right="-200px" />

      <div className="relative bg-gray-900/90 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-full max-w-md text-white">
        <h1 className="text-4xl font-bold mb-6 text-center text-primary">Create Account</h1>
        <p className="text-gray-300 text-center mb-8">Sign up and start watching epic movies</p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-xl text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={loading}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={loading}
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              className="p-4 rounded-xl bg-gray-800 placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              required
              disabled={loading}
              minLength="6"
            />
            <span
              className="absolute right-4 top-4 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </span>
          </div>

          <button
            type="submit"
            className="mt-2 py-3 bg-primary hover:bg-primary-dull rounded-xl font-semibold text-lg transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;