import { ADD_MATERIAL } from './types';

export const addMaterial = (name,material) => (dispatch) => {
    dispatch({
        type: ADD_MATERIAL,
        payload: material,
        name : name
    })
}