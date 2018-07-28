import * as THREE from 'three';
const initialState={
    scene: new THREE.Scene().add(new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshNormalMaterial()))
}

export default function(state=initialState,action){
    switch(action.type){
        default:
            return{
                ...state
            }
    }
}