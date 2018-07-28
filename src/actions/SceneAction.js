import {ADD_MESH} from './types';

export const addMesh=(dispatch,getState)=>{
    const {SceneReducer} = getState().SceneReducer
    var scene = SceneReducer.scene
    console.log(scene)
    dispatch({
      type: ADD_MESH,
      payload: scene 
    })
}