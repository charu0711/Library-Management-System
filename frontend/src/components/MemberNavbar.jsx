import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const MemberNavbar = () => {
  const navigate = useNavigate();
  return (
    <nav style={{
      width: '100%',
      background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
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
        Member Portal
      </div>
      <div style={{ display: 'flex', gap: '2rem', fontWeight: 500 }}>
        <NavLink to="/memberportal" style={({ isActive }) => ({ color: isActive ? '#ffe082' : '#fff', textDecoration: 'none' })} end>
          Dashboard
        </NavLink>
        <NavLink to="/memberportal/catalog" style={({ isActive }) => ({ color: isActive ? '#ffe082' : '#fff', textDecoration: 'none' })}>
          Book Catalog
        </NavLink>
        <NavLink to="/memberportal/borrowed" style={({ isActive }) => ({ color: isActive ? '#ffe082' : '#fff', textDecoration: 'none' })}>
          My Borrowed Books
        </NavLink>
        <NavLink to="/memberportal/reserved" style={({ isActive }) => ({ color: isActive ? '#ffe082' : '#fff', textDecoration: 'none' })}>
          My Reserved Books
        </NavLink>
        <NavLink to="/memberportal/profile" style={({ isActive }) => ({ color: isActive ? '#ffe082' : '#fff', textDecoration: 'none' })}>
          Profile
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

export default MemberNavbar;
