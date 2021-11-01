import { GET_PHOTOS, ADD_PHOTO } from '../types/types';

const initialState = {
  photos: []
}

const photosReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PHOTOS:
      return {
        ...state, photos: action.payload
      }
    case ADD_PHOTO:
      return {
        ...state, photos: [...state.photos, action.payload]
      }     
    default: return state;  
  }
}

export default photosReducer;