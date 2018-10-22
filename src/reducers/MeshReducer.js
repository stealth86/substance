import { ADD_MESH } from '../actions/types';
const initialState = {
    meshes : []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MESH:{
            return {
                ...state,
                meshes : [
                    ...state.meshes,
                    action.payload
                ]
            }
        }
        default:
            return {
                ...state
            }
    }
}