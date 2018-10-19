import { ADD_CAMERA } from './types';

export const addCamera = (name,camera) => (dispatch) => {
    dispatch({
      type: ADD_CAMERA,
      payload: camera,
      name: name
    })
  }