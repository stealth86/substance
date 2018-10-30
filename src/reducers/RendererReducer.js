import { SET_RENDERER, ADD_RENDERER_CALLBACK } from '../actions/types'
const initialState = {
    rendererCallbacks: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_RENDERER:
            return {
                ...state,
                renderer: action.payload
            }
        case ADD_RENDERER_CALLBACK:
            var callbacks = [
                ...state.rendererCallbacks,
                action.payload]
            callbacks = callbacks.sort((x, y) => x.order - y.order)
            return {
                ...state,
                rendererCallbacks: callbacks
            }
        default:
            return {
                ...state
            }
    }
}