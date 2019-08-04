import { ADD_TEXTURE, SET_ENV_TEXTURE } from '../actions/types';
import defaultPreview from '../images/texture.png';

const initialState = {
    textures: null,
    envTexture: null,
    defaultPreview : defaultPreview,
    defaultTag : ["texture"]
}

export default function (state = initialState, action) {
    //console.log(action.payload)
    switch (action.type) {        
        case ADD_TEXTURE:
            return {
                ...state,
                textures: {
                    ...state.textures,
                    [action.name]: action.payload
                }
            }
        case SET_ENV_TEXTURE:
        return{
            ...state,
            envTexture : action.payload
        }        
        default:
            return {
                ...state
            }
    }
}