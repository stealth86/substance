import { SET_RENDERER, ADD_RENDERER_CALLBACK } from '../actions/types'
const initialState = {
    renderers : null,
    rendererCallbacks: null,
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_RENDERER:
            return {
                ...state,
                renderers :{
                    ...state.renderers,
                [action.name]: action.payload
                }
            }
        case ADD_RENDERER_CALLBACK:
            var callbacks = state.rendererCallbacks && state.rendererCallbacks[action.name]?
                [...state.rendererCallbacks[action.name],
                action.payload] : [action.payload]
            callbacks = callbacks.sort((x, y) => x.order - y.order)
            return {
                ...state,
                rendererCallbacks: {
                    ...state.rendererCallbacks,
                    [action.name] : callbacks
                }
            }
        default:
            return {
                ...state
            }
    }
}