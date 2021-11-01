import { combineReducers } from 'redux';
import albumsReducer from './albumsReducer';
import photosReducer from './photosReducer';
import userReducer from './userReducer';

export default combineReducers({ albumsArray: albumsReducer,  
                                 photosArray: photosReducer,
                                 userReducer: userReducer });