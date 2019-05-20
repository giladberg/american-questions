import React, { Component } from 'react';
import questions from '../questions/questions';
import Question from '../components/Question';
import '../App.css';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfQuestions: questions,
      currentQuestion: questions[0],
      userAnswers: [],
      score: 0,
      finished: false
    };
  }
  componentDidMount() {}

  nextQuestion = () => {
    var nextQuestion = this.state.listOfQuestions[
      this.state.currentQuestion.id
    ];
    this.setState({ currentQuestion: nextQuestion });
  };
  prevQuestion = () => {
    var prevQuestion = this.state.listOfQuestions[
      this.state.currentQuestion.id - 2
    ];
    this.setState({ currentQuestion: prevQuestion });
  };
  calculate = () => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      var totalScore = 0;
      for (var i = 0; i < this.state.listOfQuestions.length; i++) {
        if (
          this.state.userAnswers[i] === this.state.listOfQuestions[i].solution
        ) {
          totalScore += 100 / this.state.listOfQuestions.length;
        }
      }
      this.setState({ score: totalScore });
      this.setState({ finished: true });
    }
  };
  setAnswer = answer => {
    this.setState({ userAnswers: answer });
  };

  reset = () => {
    this.setState({
      listOfQuestions: questions,
      currentQuestion: questions[0],
      userAnswers: [],
      score: 0,
      finished: false
    });
  };

  render() {
    var currentButton;
    if (this.state.currentQuestion.id === this.state.listOfQuestions.length) {
      currentButton = (
        <button
          className='btn'
          onClick={this.calculate}
          disabled={
            this.state.listOfQuestions.length !== this.state.userAnswers.length
          }
        >
          {' '}
          Done
        </button>
      );
    } else {
      currentButton = (
        <button className='btn' onClick={this.nextQuestion}>
          {' '}
          Next
        </button>
      );
    }

    return (
      <div>
        {this.state.finished === true ? (
          <div className='container-score'>
            <h1 className='total-score'>your score is: {this.state.score}</h1>
            {this.state.score === 100 ? (
              <h2 className='feedback-score'>you did a great job!</h2>
            ) : (
              <h2 className='feedback-score'>oh man please try again</h2>
            )}
            <button className='btn' onClick={this.reset}>
              {' '}
              Reset
            </button>
          </div>
        ) : (
          <div>
            <h1 className='main-title'>
              Please answer all the questions for view your score!
            </h1>
            <div className='container'>
              <Question
                question={this.state.currentQuestion}
                callback={answer => {
                  this.setAnswer(answer);
                }}
              />
              <div className='buttons-container'>
                <button
                  className='btn'
                  disabled={this.state.currentQuestion.id === 1}
                  onClick={this.prevQuestion}
                >
                  {' '}
                  Prev
                </button>
                {currentButton}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
