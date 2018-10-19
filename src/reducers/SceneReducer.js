import {ADD_MESH, CREATE_MESH, ADD_SCENE} from '../actions/types';
const initialState={
    scenes : null
}

export default function(state=initialState,action){
    switch(action.type){
        case ADD_SCENE:
            return{
                ...state,
                scenes:{
                    ...state.scenes,
                    [action.name] : action.payload
                }
            }
        case CREATE_MESH:
            return{
                ...state,
                mesh : action.payload
            }
        case ADD_MESH:
            return{
                ...state,
                scene : action.payload
            }
        default:
            return{
                ...state
            }
    }
}