import { ADD_SCENE,UPDATE_SCENE} from './types';

export const addScene = (name,scene) => (dispatch) => {
  dispatch({
    type: ADD_SCENE,
    payload: scene,
    name: name
  })
}

export const updateScene = (scene,sceneObject) => (dispatch, getState) => {
  scene.add(sceneObject)
  dispatch({
    type: UPDATE_SCENE,
    payload: scene,
    name: scene.name
  })
}