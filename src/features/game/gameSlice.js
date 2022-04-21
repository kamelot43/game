
const initialState = {
  difficultyLevel: 'easy',
  round: 0,
  rightAnswers: 0,
  currentPictureId: null,
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
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
        round: 0,
      }
    }
    default:
      return state
  }
}
