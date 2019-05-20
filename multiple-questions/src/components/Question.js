import React, { Component } from 'react';
import spinner from '../img/nat-1.jpg';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAnswers: []
    };
  }
  componentDidMount() {}
  setAnswer = e => {
    var userAnswers = this.state.userAnswers;
    userAnswers[this.props.question.id - 1] = e.target.value;
    this.setState({ userAnswers: userAnswers });
    this.props.callback(this.state.userAnswers);
  };
  render() {
    var answer = this.props.question.answers.map((answer, index) => {
      return (
        <div key={index}>
          <input
            type='radio'
            name='question'
            value={answer}
            onChange={this.setAnswer}
            checked={
              answer === this.state.userAnswers[this.props.question.id - 1]
            }
          />
          &emsp;{answer}
        </div>
      );
    });
    return (
      <div className='question-container'>
        <h3 className='question-title'>{this.props.question.question}:</h3>
        <div className='question-list'>
          <div className='question-item'>{answer} </div>
          <img
            className='question-img'
            src={this.props.question.url}
            height='50px'
            alt='aa'
          />
        </div>
      </div>
    );
  }
}
