import axios from "axios";
import config from "../config";
axios.defaults.headers.post["Content-Type"] = "application/json";

const UPDATE_GAME = "UPDATE_GAME";
const UPDATE_GAME_ERROR = "UPDATE_GAME_ERROR";
const UPDATE_QUESTIONS = "UPDATE_QUESTIONS";
const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
const UPDATE_CURRENT_QUESTION = "UPDATE_CURRENT_QUESTION";

const initState = {
  game: null,
  questions: null,
  categories: null,

  current_question: null,
  current_category: null
};
var TOKEN = null;

export default function reducer(state = initState, action) {
  const payload = action.payload;
  switch (action.type) {
    case UPDATE_GAME:
      return Object.assign({}, state, { game: payload.game });
    case UPDATE_QUESTIONS:
      return Object.assign({}, state, { questions: payload.questions });
    case UPDATE_CATEGORIES:
      return Object.assign({}, state, { categories: payload.categories });
    case UPDATE_CURRENT_QUESTION:
      return Object.assign({}, state, {
        current_question: payload.current_question,
        current_category: payload.current_category
      });
    default:
      return state;
  }
}

function updateGame(game) {
  return {
    type: UPDATE_GAME,
    payload: { game: game }
  };
}

function updateGameError(error) {
  return {
    type: UPDATE_GAME_ERROR,
    error: true,
    payload: error
  };
}

function updateQuestions(questions) {
  return {
    type: UPDATE_QUESTIONS,
    payload: { questions: questions }
  };
}

function updateCategories(categories) {
  return {
    type: UPDATE_CATEGORIES,
    payload: { categories: categories }
  };
}

export function updateCurrentQuestion(question) {
  return {
    type: UPDATE_CURRENT_QUESTION,
    payload: { current_question: question, current_category: question.category }
  };
}

export function fetchGame(user_id) {
  return dispatch => {
    axios({
      method: "post",
      url: `${config.api_url}/games/new`,
      data: {
        user_id: user_id
      }
    })
      .then(response => {
        if (response.data.status === "success" || response.status === 200) {
          return response.data;
        } else {
          throw new Error(response);
        }
      })
      .then(data => {
        // set game
        let game = {
          token: data.token,
          user_id: data.user_id,
          questions_count: data.questions_count,
          questions_in_category: data.questions_in_category,
          categories_count: data.categories.length
        };
        TOKEN = game.token;
        dispatch(updateGame(game));

        // orginize questions/categories
        let categories = [];
        let questions = [[]];
        for (let i = 0; i < data.categories.length; i++) {
          let cat = data.categories[i];

          // collect & orginize the data...
          categories.push(cat);
          questions[i] = cat.questions;
        }
        dispatch(updateQuestions(questions));
        dispatch(updateCategories(categories));
      })
      .catch(error => {
        console.error("failed to fetch a new game", error);
        dispatch(updateGameError(error));
      });
  };
}

export function checkAnswer(answer) {
  return dispatch => {
    axios({
      method: "post",
      url: `${config.api_url}/games/${TOKEN}/answer`,
      data: answer
    })
      .then(response => {
        if (response.data.status === "success" || response.status === 200) {
          return response.data;
        } else {
          throw new Error(response);
        }
      })
      .then(data => {
        if (data.response) {
          console.log("answer true - next: ", data);
          
        } else {
          console.log(data.correct_answers[0].id);
        }
      });
  };
}
