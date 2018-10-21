import { LOAD_MESH } from './types';

export const loadMesh = (file) => (dispatch,getState) => {
    const {FBXLoader} = getState().LoaderReducer
    FBXLoader.load(URL.createObjectURL(file),(object)=>{
        console.log(object)
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );
        dispatch({
            type: LOAD_MESH,
            payload: object
          })
    })
}