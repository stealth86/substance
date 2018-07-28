import * as THREE from 'three';
var cameraLocal = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
cameraLocal.position.z =5
//cameraLocal.updateProjectionMatrix()
const initialState={
    camera: cameraLocal
}

export default function(state=initialState,action){
    switch(action.type){
        default:
            return{
                ...state
            }
    }
}