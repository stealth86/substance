import { ADD_MATERIAL , UPDATE_MATERIAL} from './types';

export const addMaterial = (name,material,tags) => (dispatch,getState) => {
    const {defaultTag,defaultPreview} = getState().MaterialReducer
    dispatch({
        type: ADD_MATERIAL,
        payload: {material:material,preview:defaultPreview,tags:tags?tags.concat(defaultTag):defaultTag},
        name : name
    })
}

export const updateMaterial = (material,attributes) => (dispatch) => {
    Object.keys(attributes).forEach((key)=>{
        material[key]=attributes[key]
    })
    material.needsUpdate=true
    dispatch({
        type: UPDATE_MATERIAL,
        payload: material,
        name : material.name
    })
}