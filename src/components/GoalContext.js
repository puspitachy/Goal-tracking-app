import React, { createContext, useState, useEffect } from "react";

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const storedGoals = localStorage.getItem("goals");
    if (storedGoals) setGoals(JSON.parse(storedGoals));
  }, []);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  return (
    <GoalContext.Provider value={{ goals, setGoals }}>
      {children}
    </GoalContext.Provider>
  );
};
