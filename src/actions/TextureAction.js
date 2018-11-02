import { ADD_TEXTURE,SET_ENV_TEXTURE } from './types';

export const addTexture = (name,texture,tags) => (dispatch,getState) => {
    const {defaultTag,defaultPreview} = getState().TextureReducer
    dispatch({
        type: ADD_TEXTURE,
        payload: {texture:texture,preview:defaultPreview,tags:tags?tags.concat(defaultTag):defaultTag},
        name : name
    })
}

export const setEnvTexture = (textureName) => (dispatch,getState) =>{
    dispatch({
        type:SET_ENV_TEXTURE,
        payload: {textureName:textureName,map:null}
    })
}