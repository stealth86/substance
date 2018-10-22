import { ADD_MATERIAL } from './types';

export const loadMesh = (material) => (dispatch) => {
    dispatch({
        type: ADD_MATERIAL,
        payload: material
    })
}