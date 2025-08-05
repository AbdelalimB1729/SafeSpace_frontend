// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">MySafeSpace</Link>
        
        <ul className="nav-links">
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/papers">Papers</Link></li>
          
          {user ? (
            <>
              {user.role === 'admin' && (
                <>
                  <li><Link to="/blogs/create">Create Blog</Link></li>
                  <li><Link to="/papers/upload">Upload Paper</Link></li>
                </>
              )}
              <li><span>Hello, {user.username}</span></li>
              <li><button onClick={handleLogout} className="btn">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;