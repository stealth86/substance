import {ADD_LAYER, UPDATE_LAYER} from '../actions/types';
const initialState = {
    layers : {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_LAYER:
            {
                var currentOrder = Math.max(...Object.keys(state.layers && state.layers[action.payload.material] ? state.layers[action.payload.material] : {"-1":0}).map(Number))+1
            return {
                ...state,
                layers :{
                    ...state.layers,
                    [action.payload.material] : {
                        ...state.layers[action.payload.material],
                        [currentOrder] : action.payload.layer
                    }
                }
            }
        }
        case UPDATE_LAYER:
            return {
                ...state,
                layers:{
                    ...state.layers,
                    [action.payload.material]:{
                        ...state.layers[action.payload.material],
                        [action.layerOrder]:action.payload.layer
                    }
                }
            }
        default:
            return {
                ...state
            }
    }
}