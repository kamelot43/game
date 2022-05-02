import {HTTP} from "../../http-common";

const initialState = {
  photos: [],
}

export default function photosReducer(state = initialState, action) {
  switch (action.type) {
    case 'photos/photosLoad': {

      return {
        ...state,
        photos: action.payload,
      }
    }
    default:
      return state
  }
}

// Thunk function
export async function fetchPhotosData(dispatch, _getState) {
  await HTTP.get('photos')
    .then((response) => {
      if(response.data && response.data.length > 0) {
        dispatch({ type: 'photos/photosLoad', payload: response.data})
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
