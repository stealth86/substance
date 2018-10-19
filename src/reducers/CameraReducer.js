import { ADD_CAMERA } from "../actions/types";

const initialState = {
    cameras: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_CAMERA:
            return {
                ...state,
                cameras: {
                    ...state.cameras,
                    [action.name]: action.payload
                }
            }
        default:
            return {
                ...state
            }
    }
}