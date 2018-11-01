import { ADD_TEXTURE, SET_ENV_TEXTURE } from '../actions/types';
const initialState = {
    textures: null,
    envTexture: {
        texture : null,
        map:null
    },
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