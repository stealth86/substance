import { ADD_MATERIAL , UPDATE_MATERIAL} from './types';
import defaultPreview from '../images/texture.png';

export const addMaterial = (name,material,tags) => (dispatch,getState) => {
    const {defaultTag} = getState().MaterialReducer
    dispatch({
        type: ADD_MATERIAL,
        payload: {material:material,preview:defaultPreview,tags:tags?tags.concat(defaultTag):defaultTag},
        name : name
    })
}

export const updateMaterial = (material,attributes) => (dispatch) => {
    Object.keys(attributes).forEach((key, value)=>{
        material[key]=value
    })
    material.needsUpdate=true
    dispatch({
        type: UPDATE_MATERIAL,
        payload: material,
        name : material.name
    })
}