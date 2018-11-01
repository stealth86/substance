import { LOAD_OBJECT, ADD_MESH, ADD_MATERIAL } from './types';
import { JPG, HDR, JPEG } from '../Constants';
import { addTexture } from './TextureAction'
import * as THREE from "three-full";

export const loadObject = (file) => (dispatch, getState) => {
    const { FBXLoader } = getState().LoaderReducer
    FBXLoader.load(URL.createObjectURL(file), (object) => {
        object.name = file.name.replace(/\..+$/, '')
        object.traverse(child => {
            if (child.isMesh) {
                dispatch({
                    type: ADD_MESH,
                    payload: child,
                    name: child.name
                })
                var materialArray = [].concat(child.material || [])
                materialArray.forEach(material => {
                    dispatch({
                        type: ADD_MATERIAL,
                        payload: material,
                        name: material.name
                    })
                })
            }
        })
        dispatch({
            type: LOAD_OBJECT,
            payload: object,
            name: object.name
        })
    })
}

export const loadTexture = (file) => (dispatch, getState) => {
    var fileExtension = file.name.split('.')[1].toLowerCase()
    var url = URL.createObjectURL(file)
    var name= file.name.replace(/\..+$/, '')
    switch (true) {
        case (fileExtension===JPG || fileExtension===JPEG):
            const { TextureLoader } = getState().LoaderReducer
            TextureLoader.load(url, (texture) => {
                texture.name = name
                dispatch(addTexture(texture.name,texture))
            })
            break;
        case (fileExtension===HDR):
            const { HDRLoader } = getState().LoaderReducer
            HDRLoader.load(url, (texture) => {
                texture.name = name
                texture.encoding = THREE.RGBEEncoding;
                texture.minFilter = THREE.NearestFilter;
                texture.magFilter = THREE.NearestFilter;
                texture.flipY = true;
                dispatch(addTexture(texture.name,texture))
            })
            break;
        default:
            break;
    }
}