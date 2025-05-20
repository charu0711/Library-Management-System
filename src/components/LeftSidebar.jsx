import React from 'react';
import { Link } from 'react-router-dom';
import './LeftSidebar.css';

const LeftSidebar = () => (
  <div className="left-sidebar">
    <h3>Dashboard</h3>
    <nav>
      <ul>
        <li><Link to="/">Librarian Panel</Link></li>
        <li><Link to="/catalog">Catalog</Link></li>
        <li><Link to="/member-dashboard">Member Dashboard</Link></li>
      </ul>
    </nav>
  </div>
);

export default LeftSidebar;
