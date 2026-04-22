import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Team from './components/Team';
import Customers from './components/Customers';
import Logistics from './components/Logistics';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar Navigation */}
        <nav className="sidebar">
          <h2>Analytics Pro</h2>
          <ul className="nav-links">
            <li><Link to="/">📊 Overview</Link></li>
            <li><Link to="/team">👥 Sales Team</Link></li>
            <li><Link to="/customers">🛒 Customers</Link></li>
            <li><Link to="/logistics">🚚 Logistics</Link></li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/logistics" element={<Logistics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;