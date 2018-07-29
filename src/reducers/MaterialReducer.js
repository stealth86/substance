import * as THREE from 'three';
const initialState={
    material: new THREE.MeshNormalMaterial()
}

export default function(state=initialState,action){
    switch(action.type){
        default:
            return{
                ...state
            }
    }
}