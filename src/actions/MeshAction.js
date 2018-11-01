import { ADD_MESH ,UPDATE_MESH_GEOMETRY, UPDATE_MESH_MATERIAL } from './types';
import defaultPreview from '../images/texture.png';

export const addMesh = (name,mesh,tags) => (dispatch,getState) => {
    const {defaultTag} = getState().MeshReducer
    dispatch({
        type: ADD_MESH,
        payload: {mesh:mesh,preview:defaultPreview,tags:tags?tags.concat(defaultTag):defaultTag},
        name : name
    })
}

export const updateMaterial = (mesh,material) => (dispatch) => {
    mesh.material = material
    dispatch({
        type:UPDATE_MESH_MATERIAL,
        payload: mesh,
        name: mesh.name
    })
}

export const updateGeometry = (mesh,geometry) => (dispatch) => {
    mesh.geometry = geometry
    dispatch({
        type:UPDATE_MESH_GEOMETRY,
        payload: mesh,
        name: mesh.name
    })
}