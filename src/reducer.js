import { combineReducers } from 'redux'
import photosReducer from "./features/photos/photosSlice";

const rootReducer = combineReducers({
  photos: photosReducer,
})

export default rootReducer