import { ADD_MESH, CREATE_MESH,ADD_SCENE } from './types';
import * as THREE from 'three-full';

export const addScene = (name,scene) => (dispatch) => {
  dispatch({
    type: ADD_SCENE,
    payload: scene,
    name: name
  })
}

export const addMesh = () => (dispatch, getState) => {
  const { SceneReducer } = getState()
  var scene = SceneReducer.scene
  scene.add(SceneReducer.mesh)
  dispatch({
    type: ADD_MESH,
    payload: scene
  })
}

export const createMesh = () => (dispatch, getState) => {
  const { MaterialReducer } = getState()
  const { GeometryReducer } = getState()
  var mesh = new THREE.Mesh(GeometryReducer.geometry, MaterialReducer.material)
  dispatch({
    type: CREATE_MESH,
    payload: mesh
  })
}