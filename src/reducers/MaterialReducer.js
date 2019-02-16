import { ADD_MATERIAL, UPDATE_MATERIAL, SET_ACTIVE_MATERIAL } from '../actions/types';
import defaultPreview from '../images/material.png';

const initialState = {
    materials: null,
    defaultTag: ["material"],
    defaultPreview: defaultPreview,
    activeMaterial: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MATERIAL:
            return {
                ...state,
                materials: {
                    ...state.materials,
                    [action.name]: action.payload
                }
            }
        case UPDATE_MATERIAL:
            return {
                ...state,
                materials: {
                    ...state.materials,
                    [action.name]: {
                        ...state.materials[action.name],
                        material: action.payload
                    }
                }
            }
        case SET_ACTIVE_MATERIAL:
            return {
                ...state,
                activeMaterial: state.materials[action.payload].material
            }
        default:
            return {
                ...state
            }
    }
}