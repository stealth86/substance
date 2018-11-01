import { ADD_MESH, UPDATE_MESH_GEOMETRY, UPDATE_MESH_MATERIAL } from '../actions/types';
const initialState = {
    meshes: null,
    defaultTag : ["mesh"]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MESH :
            return {
                ...state,
                meshes: {
                    ...state.meshes,
                    [action.name]: action.payload
            }
        }
        case UPDATE_MESH_GEOMETRY || UPDATE_MESH_MATERIAL:
        return {
            ...state,
            meshes : {
                ...state.meshes,
                [action.name] : {
                    ...state.meshes[action.name],
                    mesh: action.payload
                }
            }
        }
        default:
            return {
                ...state
            }
    }
}