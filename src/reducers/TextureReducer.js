import { ADD_TEXTURE, SET_ENV_TEXTURE } from '../actions/types';
import defaultPreview from '../images/texture.png';

const initialState = {
    textures: null,
    envTexture: {
        textureName : null,
        map:null
    },
    defaultPreview : defaultPreview,
    defaultTag : ["texture"]
}

export default function (state = initialState, action) {
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