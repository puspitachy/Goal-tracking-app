// Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
// I prefer using a short alias for navigate just for brevity
const nav = useNavigate();

// Our dashboard layout with a sidebar for navigation and main content area.
return (
<div className="dashboard-container">
{/* Sidebar Navigation */}
<div className="sidebar">
<h2>NextStep AI</h2>
<ul className="sidebar-links">
<li>
<button onClick={() => nav("/profile")}>
 My Profile
</button>
</li>
<li>
<button onClick={() => nav("/portfolio")}>
 My Portfolio
</button>
</li>
<li>
<button onClick={() => nav("/pathway")}>
 Learning Pathway
</button>
</li>
<li>
<button onClick={() => nav("/progress")}>
Progress Tracker
</button>
</li>
<li>
<button onClick={() => nav("/goal")}>
 Your Goal
</button>
</li>
</ul>
</div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Become a data analyst</h1>
        <div className="goal-steps">
          <button>Master Excel basics</button>
          <button>Learn SQL queries</button>
          <button>Complete Data Cleaning Project</button>
          <button>Build Data Analyst Portfolio</button>
        </div>

        <div className="progress-bar-container" style={{ marginTop: '20px' }}>
      {/* Note: I'm using a static progress value for now. Will update later if needed. */}
      <progress value="50" max="100"></progress>
      <p>
        <strong>Learning path:</strong> Progressed
      </p>
      {/* This piece might be updated later on, but leaving it as placeholders for now */}
      <p>
        <strong>Progress complete:</strong> --
      </p>
      <p>
        <strong>Learning data Analyst:</strong> --
      </p>
    </div>
  </div>

  {/* AI Co-Pilot Panel */}
  <div className="ai-panel" style={{ marginTop: '40px' }}>
    <h2>AI Co-Pilot</h2>
    <p>
      For today, try practicing SQL and Excel. Remember to log your progress!
      {/* logging progress */}
    </p>
    <a href="#">Next task suggestion →</a>
    <h3>Tips & Resources for you </h3>
    <p>
      <strong>Excel:</strong> Use Ctrl + Arrow keys for fast navigation.
    </p>
    <p>
      <strong>SQL:</strong> Focus on WHERE, GROUP BY, and JOINS today.
    </p>
  </div>
</div>
  );
};

export default Dashboard;
