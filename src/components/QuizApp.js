import React, { Component, PropTypes } from 'react';
import Quiz from './Quiz';
import Results from './Results';
import shuffleQuestions from '../helpers/shuffleQuestions';
import { questions } from '../data/quiz-data';

const NUM_QUESTIONS = 3;
const QUESTIONS = shuffleQuestions(questions, NUM_QUESTIONS);

class QuizApp extends Component {
  constructor(props) {
    super();

    this.state = {
      questions: QUESTIONS,
      userAnswers: QUESTIONS.map(question => {
        return {
          tries: 0
        }
      }),
      step: 1,
      score: 0
    };

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  handleAnswerClick(e) {
    const { questions, step, userAnswers } = this.state;
    const isCorrect = questions[0].answers[questions[0].correct] === e.target.innerText;
    const answersFromUser = userAnswers.slice();
    const currentStep = step - 1;
    const tries = answersFromUser[currentStep].tries;

    if (isCorrect) {

      document.querySelector('.question:first-child').style.pointerEvents = 'none';

      e.target.classList.add('right');

      answersFromUser[currentStep] = {
        tries: tries + 1
      };

      this.setState({
        userAnswers: answersFromUser
      });

      setTimeout(() => {
        const praise = document.querySelector('.praise');
        const bonus = document.querySelector('.bonus');

        if (tries === 0) {
          praise.textContent = '1st Try!';
          bonus.textContent = '+10';
        }
        else if (tries === 1) {
          praise.textContent = '2nd Try!';
          bonus.textContent = '+5';
        }
       
        document.querySelector('.correct-modal').classList.add('modal-enter');
				document.querySelector('.correct-modal').classList.remove('wrong-answer');
        document.querySelector('.bonus').classList.add('show');

      }, 250);
			
			var self = this;
      setTimeout(function(){
				self.nextStep(true);
			}, 1500);

    } else {

      e.target.style.pointerEvents = 'none';
      e.target.classList.add('wrong');

      answersFromUser[currentStep] = {
        tries: tries + 1
      };

      this.setState({
        userAnswers: answersFromUser
      });
			
			if (answersFromUser[currentStep].tries === 2) {
				setTimeout(() => {
					const praise = document.querySelector('.praise');
					const bonus = document.querySelector('.bonus');
					
					praise.textContent = 'Wrong!';
					bonus.textContent = '';

					document.querySelector('.correct-modal').classList.add('modal-enter');
					document.querySelector('.correct-modal').classList.add('wrong-answer');
					document.querySelector('.bonus').classList.add('show');

					var self = this;
					setTimeout(function() {
						self.nextStep(false);
					}, 1500);
				}, 250);
			}
    }
  }

  nextStep(addScore) {
    document.querySelector('.correct-modal').classList.remove('modal-enter');
    document.querySelector('.bonus').classList.remove('show');
    const { questions, userAnswers, step, score } = this.state;
    const restOfQuestions = questions.slice(1);
    const currentStep = step - 1;
    const tries = userAnswers[currentStep].tries;

    this.setState({
      step: step + 1,
      score: (() => {
				if (addScore) {
					if (tries === 1) return score + 10;
					if (tries === 2) return score + 5;
				}
				return score;
      })(),
      questions: restOfQuestions
    });
  }

  restartQuiz() {
    window.location.reload();
  }

  render() {
    const { totalQuestions } = this.props;
    const { step, questions, userAnswers, score } = this.state;
    return (
      <div>
        {(() => {
          if (step >= totalQuestions + 1) {
            return (
              <Results
                score={score}
                restartQuiz={this.restartQuiz}
                userAnswers={userAnswers}
              />
            );
          } else return (
            <Quiz
              step={step}
              questions={questions}
              totalQuestions={totalQuestions}
              score={score}
              handleAnswerClick={this.handleAnswerClick}
            />
          );
        })()}
      </div>
    );
  }
}

QuizApp.defaultProps = {
  totalQuestions: QUESTIONS.length
};

QuizApp.propTypes = {
  totalQuestions: PropTypes.number.isRequired
};

export default QuizApp;
