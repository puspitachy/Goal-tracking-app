// goal page
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./goal.css";
import { GoalContext } from "./GoalContext";

// Assignibng proof type: "upload" if step likely requires certificate or mock test otherwise "text"
const assignProofType = (text) => {
  const lower = text.toLowerCase();
// including keynames for assigning proof type 
  if (
    lower.includes("certificate") ||
    lower.includes("certification") ||
    lower.includes("upload") ||
    lower.includes("tool") ||
    lower.includes("build") ||
    lower.includes("project") ||
    lower.includes("dashboard") ||
    lower.includes("model") ||
    lower.includes("portfolio") ||
    lower.includes("framework") ||
    lower.includes("master") ||
    lower.includes("analyze") ||
    lower.includes("learn") ||
    lower.includes("programming") ||
    lower.includes("language") ||
    lower.includes("skills")
  ) {
    return "upload";
  } else {
    return "text";
  }
};

const Goal = () => {
  const { goals, setGoals } = useContext(GoalContext);
  const [goalInput, setGoalInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddGoal = async () => {
    if (!goalInput.trim()) return;

    setLoading(true);
    try {
      // with Ciredentials plus content-type for CORS compliance
      const stepResponse = await axios.post(
        "http://localhost:5000/generate-steps",
        { goal: goalInput },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const stepData = stepResponse.data.steps;

      if (!Array.isArray(stepData) || stepData.length === 0) {
        alert("⚠️ No valid steps returned. Try rephrasing the goal.");
        setLoading(false);
        return;
      }
// local host 5000 port for resources
      const recResponse = await axios.post("http://localhost:5000/recommend-resources", {
        steps: stepData.map((s) => s.text || s)
      });

      const structuredSteps = stepData.map((step, idx) => {
        const text = typeof step === "string" ? step : step.text;
        return {
          text: text.trim(),
          status: "not started",
          proofType: assignProofType(text),
          recommendation: recResponse.data[idx] || "",
          deadline: "",
          aiFeedback: "",
          peerReview: ""
        };
      });

      const titleFormatted = goalInput
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const newGoal = {
        id: Date.now(),
        title: titleFormatted,
        steps: structuredSteps,
        createdAt: new Date().toISOString()
      };

      setGoals([...goals, newGoal]);
      setGoalInput("");
    } catch (error) {
      console.error(" Error getting steps or recommendations", error);
      alert("uable to generate steps or recommendations. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="add-goal-container">
      <h2>Add Goal 🎯</h2>
      <div className="input-section">
        <input
          type="text"
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
          placeholder="e.g. Become a Data Scientist"
        />
        <button onClick={handleAddGoal} disabled={loading}>
          {loading ? "Generating..." : "Add Goal"}
        </button>
        <button className="to-progress" onClick={() => navigate("/progress")}>
          Progress Tracker
        </button>
      </div>

      <div className="goal-summary">
        {goals.map((goal) => (
          <div key={goal.id} className="goal-preview">
            <h3>{goal.title}</h3>
            <ul>
              {goal.steps.map((step, index) => (
                <li key={index}>
                  <strong>Step {index + 1}:</strong> {step.text}
                  <br />
                  <span>Expected Proof Type: {step.proofType}</span>
                  {step.recommendation && (
                    <div>
                      <a
                        href={step.recommendation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="recommend-link"
                      >
                         Suggested Resources
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goal;
