import React, { useContext, useState } from "react";
import { GoalContext } from "./GoalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./progress.css";

const Progress = ({ user }) => {
  const { goals, setGoals } = useContext(GoalContext);
  const [feedback, setFeedback] = useState({});
  const navigate = useNavigate();

  const handleUpload = async (goalId, stepIndex, file) => {
    const goal = goals.find((g) => g.id === goalId);
    const step = goal.steps[stepIndex];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("step", step.text);
    formData.append("name", `${user?.displayName || ""}`);

    try {
      const res = await axios.post("http://localhost:5000/validate-proof", formData);
      const fb = res.data.feedback;
      setFeedback((prev) => ({ ...prev, [`${goalId}-${stepIndex}`]: fb }));
    } catch (error) {
      setFeedback((prev) => ({ ...prev, [`${goalId}-${stepIndex}`]: "❌ Error validating input." }));
    }
  };

  const handleTextInput = async (goalId, stepIndex, text) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const updatedSteps = goal.steps.map((step, i) =>
          i === stepIndex ? { ...step, textInput: text } : step
        );
        return { ...goal, steps: updatedSteps };
      }
      return goal;
    });
    setGoals(updatedGoals);

    try {
      const goal = goals.find((g) => g.id === goalId);
      const step = goal.steps[stepIndex];
      const res = await axios.post("http://localhost:5000/validate-proof", {
        text,
        step: step.text,
      });
      const fb = res.data.feedback;
      setFeedback((prev) => ({ ...prev, [`${goalId}-${stepIndex}`]: fb }));
    } catch (error) {
      setFeedback((prev) => ({ ...prev, [`${goalId}-${stepIndex}`]: "❌ Error validating input." }));
    }
  };

  const handleMarkAsDone = (goalId, stepIndex) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const updatedSteps = goal.steps.map((step, i) =>
          i === stepIndex ? { ...step, status: "completed" } : step
        );
        return { ...goal, steps: updatedSteps };
      }
      return goal;
    });
    setGoals(updatedGoals);
  };

  const renderProofInput = (step, goalId, stepIndex) => {
    const key = `${goalId}-${stepIndex}`;
    const lower = step.text.toLowerCase();

    const isUpload =
      lower.includes("certificate") ||
      lower.includes("certification") ||
      lower.includes("master") ||
      lower.includes("skill") ||
      lower.includes("project") ||
      lower.includes("portfolio") ||
      lower.includes("dashboard") ||
      lower.includes("model");

    const isMock =
      lower.includes("quiz") ||
      lower.includes("test") ||
      lower.includes("interview");

    return (
      <>
        {isUpload ? (
          <>
            <input
              type="file"
              onChange={(e) => handleUpload(goalId, stepIndex, e.target.files[0])}
            />
            <small>📁 Upload certificate or project proof.</small>
          </>
        ) : isMock ? (
          <>
            <button onClick={() => navigate(`/mock-test/${goalId}/${stepIndex}`)}>
              🧪 Start Mock Test
            </button>
            <small>Simulate a quiz or interview for this step.</small>
          </>
        ) : (
          <>
            <textarea
              placeholder="Describe what you did..."
              onChange={(e) => handleTextInput(goalId, stepIndex, e.target.value)}
            />
            <small>📝 Write what you did to complete this step.</small>
          </>
        )}

        {feedback[key] && (
          <div className="feedback-box">
            <strong>AI Feedback:</strong> {feedback[key]}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="progress-tracker-container">
      {goals.map((goal) => (
        <div key={goal.id} className="goal-card">
          <h3>{goal.title}</h3>
          <ul className="steps-container">
            {goal.steps.map((step, index) => (
              <li key={index} className="step-box">
                <div className="step-left">{step.text}</div>
                <div className="step-center">
                  {renderProofInput(step, goal.id, index)}
                </div>
                <div className="step-right">
                  {step.status !== "completed" ? (
                    <button onClick={() => handleMarkAsDone(goal.id, index)}>
                      ✅ Mark as Done
                    </button>
                  ) : (
                    <span className="done">✅ Completed</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};


export default Progress;
