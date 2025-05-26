import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const TopNavbar = () => {
  const navigate = useNavigate();
  return (
    <nav style={{
    width: '100%',
    background: 'linear-gradient(90deg, #1e90ff 0%, #6dd5fa 100%)',
    color: '#fff',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(30,144,255,0.07)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  }}>
    <div style={{ fontWeight: 700, fontSize: '1.6rem', letterSpacing: 1 }}>
      Library Management System
    </div>
    <div style={{ display: 'flex', gap: '2rem', fontWeight: 500 }}>
      <NavLink to="/dashboard" style={({ isActive }) => ({ color: isActive ? '#ffe082' : '#fff', textDecoration: 'none' })}>
        Dashboard
      </NavLink>
      <NavLink to="/books" style={({ isActive }) => ({ color: isActive ? '#ffe082' : '#fff', textDecoration: 'none' })}>
        Book Management
      </NavLink>
      <NavLink to="/members" style={({ isActive }) => ({ color: isActive ? '#ffe082' : '#fff', textDecoration: 'none' })}>
        Member Management
      </NavLink>
      <NavLink to="/addbook" style={({ isActive }) => ({ color: isActive ? '#ffe082' : '#fff', textDecoration: 'none' })}>
        Add Book
      </NavLink>
      <NavLink to="/borrowings" style={({ isActive }) => ({ color: isActive ? '#ffe082' : '#fff', textDecoration: 'none' })}>
        Borrowings
      </NavLink>
      <button
        onClick={() => navigate('/')}
        style={{ background: 'none', border: 'none', color: '#fff', textDecoration: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}
      >
        Logout
      </button>
    </div>
  </nav>
  );
};

export default TopNavbar;
