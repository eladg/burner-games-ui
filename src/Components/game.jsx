import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Categories from './categories';
import Question from './question';

import '../styles/index.scss';

import { 
  fetchGame, 
  updateCurrentQuestion,
} from "../redux/reducer";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game_started: false,
      questionIndex: 0,
      categoryIndex: 0,
      answerStreak: 0,
    }

    // actions
    this.startButtonClicked  = this.startButtonClicked.bind(this);

    this.skipQuestionClicked = this.skipQuestionClicked.bind(this);
    this.hintButtonClicked   = this.hintButtonClicked.bind(this);

    // view conditions
    this._hasGameData  = this._hasGameData.bind(this);

    // views
    this._loadingView = this._loadingView.bind(this);
    this._gameView    = this._gameView.bind(this);
    this._errorView   = this._errorView.bind(this);
  }

  setCurrentQuestion() {
    const question = this.props.questions[this.state.categoryIndex][this.state.questionIndex];
    
    this.props.dispatch(updateCurrentQuestion(question));
  }

  startButtonClicked() {
    this.setState({
      game_started: true,
    });

    this.setCurrentQuestion();
  }

  hintButtonClicked() {
    console.log("hintButtonClicked");
  }

  skipQuestionClicked() {
    console.log("skipQuestionClicked");
  }

  _hasGameData() {
    if (this.props.game) {
      return true;
    } else {
      return false;
    }
  }

  _welcomeView() {
    return(
      <Row center="xs" style={{display: "table"}}>
        <div style={{height: "800px", display: "table-cell", "verticalAlign": "middle" }}>
          <div className="anim-fadeIn" style={{margin: "0 auto", borderRadius: "9px", backgroundColor: "rgba(45, 95, 136, 0.76)"}}>
            <div>
              <h1>משחקי הברן</h1>
              <p className="desc">ברוכים הבאים למשחק הטריוויה החדש שיתן מענה לשאלה שמעסיקה את כולם: האם אתם ברנרים אמיתיים? איך מנצחים? פשוט:עליכם לעבור 5 נושאים שקשורים למידברן, ובכל אחד לענות נכון על 2 שאלות רצופות תוכלו להשתמש בשני גלגלי הצלה בכל נושא. בהצלחה!</p>
              <button className="startBtn" onClick={this.startButtonClicked}></button>
            </div>
          </div>
        </div>
      </Row>
    );
  }

  _gameView() {
    return (
      <div className="sixteen-nine">
        <div className="content">

          <div className="header">
            <div className="links inline">
              <a href="https://www.facebook.com/midburns/" target="_blank">
                <img src="http://games.midburn.org/assets/facebook.png" style={{ height: "30px" }}/>
              </a>
              <a href="http://midburn.org/he-survival-guide/" target="_blank">
                <img src="http://games.midburn.org/assets/guid.png" style={{ height: "22px" }}/>
              </a>
            </div>
          </div>
          
          <Row className="layout">
            <Col xs={9}>
              <div className="quiz-zone">
                <Question/>
              </div>
            </Col>

            <Col xs={3} className="categories-">
              <Categories categories={this.props.categories}/>
            </Col>
          
          </Row>
          
          <div className="life-line flex-space">
            <button className="button-hint btn-sm" onClick={this.hintButtonClicked} ></button>
            <button className="button-skip btn-sm" onClick={this.skipQuestionClicked} ></button>
          </div>
        </div>
      </div>
    );
  }

  _loadingView() {
    return (
      <div>בטעינה... </div>
    );
  }

  _errorView() {
    return(
      <div>אוייש... משהו רע קרה... נסה שוב?</div>
    )
  }

  render() {
    let model;

    if (!this.state.game_started) {
      model = this._welcomeView();
    }

    if (this.props.error != null) {
      model = this._errorView();
    }

    if (this._hasGameData() && this.state.game_started) {
      model = this._gameView();
    }

    return(
      <Grid className="right-to-left" fluid>
        { model }
      </Grid>
    );
  }

  componentDidMount() {
    this.props.dispatch(fetchGame(this.props.userId));
  }
}

// map redux store props to component props
const mapStateToProps = (state) => { 
  return { 
    error: state.error,
    game: state.game,
    questions: state.questions,
    categories: state.categories,
  } 
}

// add dispatch to props
const mapDispatchToProps = (dispatch) => { return { dispatch } };

export default connect(mapStateToProps, mapDispatchToProps)(Game);