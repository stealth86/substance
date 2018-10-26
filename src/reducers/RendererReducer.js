import {SET_RENDERER, ADD_RENDERER_CALLBACK} from '../actions/types'
const initialState ={
    rendererCallbacks : []
}
export default function(state=initialState,action){
    switch(action.type){
        case SET_RENDERER:
        return{
            ...state,
            renderer : action.payload
        }
        case ADD_RENDERER_CALLBACK:
        return{
            ...state,
            rendererCallbacks : [
                ...state.rendererCallbacks,
                action.payload
            ]
        }
        default:
            return{
                ...state
            }
    }
}