import * as THREE from 'three-full';
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