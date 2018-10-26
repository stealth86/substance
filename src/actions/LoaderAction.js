import { LOAD_OBJECT, ADD_MESH, ADD_MATERIAL, ADD_TEXTURE } from './types';

export const loadObject = (file) => (dispatch, getState) => {
    const { FBXLoader } = getState().LoaderReducer
    FBXLoader.load(URL.createObjectURL(file), (object) => {
        object.name=file.name.replace(/\..+$/, '')
        object.traverse(child => {
            if (child.isMesh) {
                dispatch({
                    type: ADD_MESH,
                    payload : child,
                    name : child.name
                })
            var materialArray = [].concat(child.material || [])
            materialArray.forEach(material=>{
                dispatch({
                    type: ADD_MATERIAL,
                    payload : material,
                    name : material.name
                })
            })
            }
        })
        dispatch({
            type: LOAD_OBJECT,
            payload: object,
            name : object.name
        })
    })
}

export const loadTexture = (file) => (dispatch, getState) => {
    const { TextureLoader } = getState().LoaderReducer
    TextureLoader.load(URL.createObjectURL(file), (texture) => {
        texture.name=file.name.replace(/\..+$/, '')
        dispatch({
            type: ADD_TEXTURE,
            payload: texture,
            name : texture.name
        })
    })
}