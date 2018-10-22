import { ADD_MESH } from './types';

export const loadMesh = (mesh) => (dispatch) => {
    dispatch({
        type: ADD_MESH,
        payload: mesh
    })
}