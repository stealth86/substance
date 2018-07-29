import * as THREE from 'three';
const initialState={
    geometry: new THREE.BoxGeometry(1,1,1)
}

export default function(state=initialState,action){
    switch(action.type){
        default:
            return{
                ...state
            }
    }
}