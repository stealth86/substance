import { ADD_MESH, UPDATE_MESH_GEOMETRY,UPDATE_MESH_MATERIAL } from '../actions/types';
const initialState = {
    meshes : null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MESH || UPDATE_MESH_GEOMETRY || UPDATE_MESH_MATERIAL :{
            return {
                ...state,
                meshes : {
                    ...state.meshes,
                    [action.name] : action.payload
                }
            }
        }
        default:
            return {
                ...state
            }
    }
}