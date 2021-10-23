import { GET_ALBUMS } from '../types/types';
import { GET_PHOTOS } from '../types/types';
import { GET_FAILURE } from '../types/types';
import { ADD_ALBUM } from '../types/types';
import { ADD_PHOTO } from '../types/types';
import axios from 'axios';

export const getAlbums = () => async dispatch => {
  await axios.get('https://jsonplaceholder.typicode.com/albums')
  .then(res => dispatch({
    type: GET_ALBUMS,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_FAILURE,
    payload: err.message
  }))
}

export const getPhotos = (id) => async dispatch => {
  await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
  .then(res => dispatch({
    type: GET_PHOTOS,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_FAILURE,
    payload: err.message
  }))  
}

export const addAlbum = (album) => dispatch => {  
  dispatch({
    type: ADD_ALBUM,
    payload: album
  })
}

export const addPhoto = (photo) => async dispatch => {
  dispatch({
    type: ADD_PHOTO,
    payload: photo
  })
}