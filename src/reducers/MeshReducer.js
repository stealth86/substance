import { UPDATE_LAYOUT } from '../actions/types';
const initialState = {
    meshes : null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_LAYOUT:
            return {
                ...state,
                units: {
                    ...state.units,
                    [action.name] : action.payload
                }
            }
        default:
            return {
                ...state
            }
    }
}