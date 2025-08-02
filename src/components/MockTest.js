import React from 'react';
import { useParams } from 'react-router-dom';

const MockTest = () => {
  const { goalId, stepIndex } = useParams();

  return (
    <div>
      <h2>Mock Test</h2>
      <p>Step: {stepIndex} of Goal ID: {goalId}</p>
      {/* Display AI-generated quiz here */}
    </div>
  );
};

export default MockTest;
