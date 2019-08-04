import { ADD_LAYER, UPDATE_LAYER } from '../actions/types';

const initialState = {
    layers: {},
    ColorWorker: new Worker("../workers/Color.worker", { type: 'module' })
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_LAYER:{
                return {
                    ...state,
                    layers: {
                        ...state.layers,
                        [action.payload.material]: {
                            ...state.layers[action.payload.material],
                            matLayers: {
                                ...(state.layers[action.payload.material] && state.layers[action.payload.material].matLayers),
                                [action.payload.layerOrder]: action.payload.layer
                            }
                        }
                    }
                }
            }
        case UPDATE_LAYER:
            return {
                ...state,
                layers: {
                    ...state.layers,
                    [action.payload.material]: {
                        ...state.layers[action.payload.material],
                        matLayers: {
                            ...(state.layers[action.payload.material] && state.layers[action.payload.material].matLayers),
                            [action.payload.layerOrder]: action.payload.layer
                        }
                    }
                }
            }
        default:
            return {
                ...state
            }
    }
}