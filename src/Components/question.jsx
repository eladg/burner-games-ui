import React from 'react';
import { connect } from 'react-redux';
import { 
  fetchGame, 
  updateCurrentQuestion,
  checkAnswer,
} from "../redux/reducer";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  checkAnswer(i, event) {
    let answer = {question_id:this.props.question.id,answer_ids:[i.toString()]}
    let answerJson = JSON.stringify(answer)
    let id = this.props.dispatch(checkAnswer(answerJson))
    
    console.log(mapStateToProps(this.props.question)); 
  }



  _isDrawReady() {
    return (this.props.question != undefined)
  }

  render() {
    if (!this._isDrawReady()) {
      return(<div></div>);
    }

    const answerItems = this.props.question.answers.map((answer, index) =>
        <li onClick={this.checkAnswer.bind(this, answer.id)} key={ answer.id }>
          <label className="answer-option-label">
            <input type="radio" name="answer" value={answer.id} style={{display: "none"}}/> {index+1}. {answer.body}
          </label>
        </li>
    );

    return (
      <div className="question-area">
        <h3 className="question"> { this.props.question.body }</h3>
        <ul id="options" className="options list-no-bullets">
          { answerItems }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.current_question,
  }
}
const mapDispatchToProps = (dispatch) => { return { dispatch } };

export default connect(mapStateToProps, mapDispatchToProps)(Question);