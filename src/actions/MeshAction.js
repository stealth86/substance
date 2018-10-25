import { ADD_MESH ,UPDATE_MESH_GEOMETRY, UPDATE_MESH_MATERIAL } from './types';

export const addMesh = (name,mesh) => (dispatch) => {
    dispatch({
        type: ADD_MESH,
        payload: mesh,
        name : name
    })
}

export const updateMaterial = (mesh,material) => (dispatch) => {
    mesh.material = material
    //console.log(mesh)
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