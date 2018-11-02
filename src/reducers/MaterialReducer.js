import { ADD_MATERIAL,UPDATE_MATERIAL} from '../actions/types';
import defaultPreview from '../images/material.png';

const initialState = {
    materials: null,
    defaultTag : ["material"],
    defaultPreview : defaultPreview
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MATERIAL :
            return {
                ...state,
                materials: {
                    ...state.materials,
                    [action.name]: action.payload
                }
            }
        case UPDATE_MATERIAL :
            return{
                ...state,
                materials:{
                    ...state.materials,
                    [action.name]:{
                        ...state.materials[action.name],
                        material : action.payload
                    }
                }
            }
        default:
            return {
                ...state
            }
    }
}