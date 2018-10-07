import * as THREE from 'three-full';
import {ADD_MESH, CREATE_MESH} from '../actions/types';
const initialState={
    scene: new THREE.Scene()
}

export default function(state=initialState,action){
    switch(action.type){
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