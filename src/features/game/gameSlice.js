
const initialState = {
  difficultyLevel: 'easy',
  round: 0
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case 'game/chooseGameDifficulty': {

      return {
        ...state,
        difficultyLevel: action.payload,
      }
    }
    case 'game/increaseGameCounter': {

      return {
        ...state,
        round: state.round +=1,
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
