import { ADD_MATERIAL } from '../actions/types';
const initialState = {
    materials: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MATERIAL:
            return {
                ...state,
                materials: {
                    ...state.materials,
                    [action.name]: action.payload
                }
            }
        default:
            return {
                ...state
            }
    }
}