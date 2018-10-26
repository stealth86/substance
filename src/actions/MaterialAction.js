import { ADD_MATERIAL } from './types';

export const addMaterial = (name,material) => (dispatch) => {
    dispatch({
        type: ADD_MATERIAL,
        payload: material,
        name : name
    })
}

export const updateMaterial = (material,channel,texture) => (dispatch) => {
    material[channel]=texture
    dispatch({
        type: ADD_MATERIAL,
        payload: material,
        name : material.name
    })
    material.needsUpdate=true
}