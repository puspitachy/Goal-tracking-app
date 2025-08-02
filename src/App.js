// App.js -all page routing 

import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Imported components 
// imported all pages 
import Login from "./components/login";
import SignUp from "./components/register";
import Profile from "./components/profile";
import Dashboard from "./components/Dashboard";
import Goal from "./components/goal";
import Progress from "./components/progress";
import { auth } from "./components/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null); // userState tracks user who is logged in

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Conditionally render auth-wrapper login/register user*/}
        {user ? (
          <>
         
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/goal" element={<Goal />} />
              <Route path="/progress" element={<Progress />} />
            </Routes>
            <ToastContainer />
          </>
        ) : (
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                {/* Redirecting routes to login page if not logged in already */}
                <Route path="/profile" element={<Navigate to="/login" />} />

                <Route path="/dashboard" element={<Navigate to="/login" />} />

                <Route path="/goal" element={<Navigate to="/login" />} />

                <Route path="/progress" element={<Navigate to="/login" />} />
              </Routes>
              <ToastContainer />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;


// reference for authentication creation-github.com/the debug arena