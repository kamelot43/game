
const initialState = {
  difficultyLevel: 'easy',
  gameStatus: 'progress',
  round: 1,
  rightAnswers: 0,
  rightAnswersSet: new Set(),
  currentPictureId: null,
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case 'game/checkGameStatus': {
      if (
        (state.rightAnswers === 2) && (state.difficultyLevel === 'easy') ||
        (state.rightAnswers === 3) && (state.difficultyLevel === 'normal') ||
        (state.rightAnswers === 4) && (state.difficultyLevel === 'hard')
      )
      {
        return {
          ...state,
          gameStatus: 'win',
        }
      }
      return state
    }
    case 'game/gameOverStatus': {

      return {
        ...state,
        gameStatus: 'loose',
        rightAnswers: 0,
        round: state.round +=1,
      }
    }
    case 'game/newGameStatus': {

      return {
        ...state,
        gameStatus: 'progress',
        rightAnswers: 0,
      }
    }
    case 'game/chooseGameDifficulty': {

      return {
        ...state,
        difficultyLevel: action.payload,
      }
    }
    case 'game/setCurrentPictureId': {

      return {
        ...state,
        currentPictureId: action.payload,
      }
    }
    case 'game/addRightAnswersArray': {

      return {
        ...state,
        rightAnswersArray: [...this.state.rightAnswersArray, action.payload],
      }
    }
    case 'game/increaseGameCounter': {

      return {
        ...state,
        round: state.round +=1,
      }
    }
    case 'game/increaseRightAnswers': {

      return {
        ...state,
        rightAnswers: state.rightAnswers +=1,
      }
    }
    case 'game/clearRightAnswers': {

      return {
        ...state,
        rightAnswers: 0,
      }
    }
    case 'game/clearGameCounter': {

      return {
        ...state,
        round: 1,
      }
    }
    default:
      return state
  }
}
