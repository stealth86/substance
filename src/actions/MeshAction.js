import { ADD_MESH, UPDATE_MESH_GEOMETRY, UPDATE_MESH_MATERIAL, SET_ACTIVE_MESH } from './types';

export const addMesh = (name, mesh, tags) => (dispatch, getState) => {
    const { defaultTag, defaultPreview } = getState().MeshReducer
    dispatch({
        type: ADD_MESH,
        payload: { mesh: mesh, preview: defaultPreview, tags: tags ? tags.concat(defaultTag) : defaultTag },
        name: name
    })
}

export const setActiveMesh = (name) => (dispatch) => {
    dispatch({
        type: SET_ACTIVE_MESH,
        payload: name
    })
}

export const updateMeshMaterial = (mesh, material, index) => (dispatch) => {
    if (index === undefined)
        mesh.material = material
    else
        mesh.material[index] = material
    dispatch({
        type: UPDATE_MESH_MATERIAL,
        payload: mesh,
        name: mesh.name
    })
}

export const updateMeshGeometry = (mesh, geometry) => (dispatch) => {
    mesh.geometry = geometry
    dispatch({
        type: UPDATE_MESH_GEOMETRY,
        payload: mesh,
        name: mesh.name
    })
}