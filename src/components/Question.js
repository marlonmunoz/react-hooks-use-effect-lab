import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    if (timeRemaining === 0) { // if time runs out, treat as incorrect answer
      setTimeRemaining(10); // reset timer back to 10
      onAnswered(false); // call onAnswered with false to notify parent component
                          // that the answer was incorrect
    }

    const timerId = setTimeout(() => { // set up timer to decrement timeRemaining
      setTimeRemaining((time) => time - 1); // decrement timeRemaining by 1
    }, 1000); // run every 1000ms (1 second)
    return () => clearTimeout(timerId); // clean up timer when component unmounts
  }, [timeRemaining, onAnswered]); // re-run effect when timeRemaining or onAnswered changes
  


  function handleAnswer(isCorrect) { 
    setTimeRemaining(10); 
    onAnswered(isCorrect);  
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
