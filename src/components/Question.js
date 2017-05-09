import React, { PropTypes } from 'react';
import Answer from './Answer';

const Question = ({ question, image, answers, handleAnswerClick }) => {
  return (
    <li className="question">
      <h2 className="question-title">
        {question}
      </h2>
      {image ? <img src={`/question-img/${image}`}/> : ""}
      <ol className="question-answers">
        {answers.map(answer => {
          return (
            <Answer
              key={answer}
              answer={answer}
              handleAnswerClick={handleAnswerClick}
            />
          );
        })}
      </ol>
    </li>
  );
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  handleAnswerClick: PropTypes.func.isRequired
};

export default Question;
