import { ADD_MESH, CREATE_MESH } from './types';
import * as THREE from 'three';

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