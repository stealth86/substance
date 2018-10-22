import { LOAD_OBJECT } from '../actions/types';
import * as THREE from 'three-full';
const initialState = {
    FBXLoader : new THREE.FBXLoader(),
    objects : []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_OBJECT:{
            return {
                ...state,
                objects : [
                    ...state.objects,
                    action.payload
                ]
            }
        }
        default:
            return {
                ...state
            }
    }
}