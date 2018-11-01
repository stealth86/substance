import { ADD_TEXTURE,SET_ENV_TEXTURE } from './types';
import defaultPreview from '../images/texture.png';

export const addTexture = (name,texture,tags) => (dispatch,getState) => {
    const {defaultTag} = getState().TextureReducer
    dispatch({
        type: ADD_TEXTURE,
        payload: {texture:texture,preview:defaultPreview,tags:tags?tags.concat(defaultTag):defaultTag},
        name : name
    })
}

export const setEnvTexture = (textureName) => (dispatch,getState) =>{
    const {textures} = getState().TextureReducer
    dispatch({
        type:SET_ENV_TEXTURE,
        payload: {texture:textures[textureName],map:null}
    })
}