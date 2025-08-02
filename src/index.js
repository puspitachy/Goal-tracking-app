import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoalProvider } from './components/GoalContext'; // ✅ Make sure the path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoalProvider>
      <App />
    </GoalProvider>
  </React.StrictMode>
);

reportWebVitals();
