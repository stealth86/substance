import { ADD_TEXTURE } from '../actions/types';
const initialState = {
    textures: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TEXTURE: {
            return {
                ...state,
                textures: {
                    ...state.textures,
                    [action.name]: action.payload
                }
            }
        }
        default:
            return {
                ...state
            }
    }
}