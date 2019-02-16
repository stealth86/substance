import { ADD_MESH, UPDATE_MESH_GEOMETRY, UPDATE_MESH_MATERIAL, SET_ACTIVE_MESH } from '../actions/types';
import defaultPreview from '../images/mesh.png';

const initialState = {
    meshes: null,
    activeMesh : null,
    defaultTag : ["mesh"],
    defaultPreview : defaultPreview
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
        case SET_ACTIVE_MESH:
        return{
            ...state,
            activeMesh : state.meshes[action.payload].mesh
        }
        default:
            return {
                ...state
            }
    }
}