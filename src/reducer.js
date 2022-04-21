import { combineReducers } from 'redux'
import photosReducer from "./features/photos/photosSlice";
import gameReducer from "./features/game/gameSlice";

const rootReducer = combineReducers({
  photos: photosReducer,
  game: gameReducer,
})

export default rootReducer