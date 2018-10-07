import * as THREE from 'three-full';
const initialState={
    geometry: new THREE.BoxGeometry(200,200,200)
}

export default function(state=initialState,action){
    switch(action.type){
        default:
            return{
                ...state
            }
    }
}