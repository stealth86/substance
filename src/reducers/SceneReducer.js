import * as THREE from 'three';
const initialState={
    scene: new THREE.Scene()
}

export default function(state=initialState,action){
    switch(action.type){
        default:
            return{
                ...state
            }
    }
}