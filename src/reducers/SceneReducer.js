import {ADD_SCENE,UPDATE_SCENE} from '../actions/types';
const initialState={
    scenes : null
}

export default function(state=initialState,action){
    switch(action.type){
        case ADD_SCENE || UPDATE_SCENE:
            return{
                ...state,
                scenes:{
                    ...state.scenes,
                    [action.name] : action.payload
                }
            }
        default:
            return{
                ...state
            }
    }
}