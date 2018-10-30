import { ADD_GEOMETRY } from "../actions/types";

const initialState = {
    geometries: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_GEOMETRY:
            return {
                ...state,
                geometries: {
                    ...state.geometries,
                    [action.name]: action.payload
                }
            }
        default:
            return {
                ...state
            }
    }
}