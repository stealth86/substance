import { ADD_TEXTURE } from './types';

export const addTexture = (name,texture) => (dispatch) => {
    dispatch({
        type: ADD_TEXTURE,
        payload: texture,
        name : name
    })
}