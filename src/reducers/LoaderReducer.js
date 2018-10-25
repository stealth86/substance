import { LOAD_OBJECT } from '../actions/types';
import * as THREE from 'three-full';
const initialState = {
    FBXLoader : new THREE.FBXLoader(),
    objects : null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_OBJECT:{
            return {
                ...state,
                objects : {
                    ...state.objects,
                    [action.name] : action.payload
                }
            }
        }
        default:
            return {
                ...state
            }
    }
}