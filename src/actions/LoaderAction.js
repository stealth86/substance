import { LOAD_OBJECT, ADD_MESH, ADD_MATERIAL } from './types';

export const loadObject = (file) => (dispatch, getState) => {
    const { FBXLoader } = getState().LoaderReducer
    FBXLoader.load(URL.createObjectURL(file), (object) => {
        object.traverse(child => {
            if (child.isMesh) {
                dispatch({
                    type: ADD_MESH,
                    payload : child
                })
            var materialArray = [].concat(child.material || [])
            materialArray.forEach(material=>{
                dispatch({
                    type: ADD_MATERIAL,
                    payload : material
                })
            })
            }
        })
        dispatch({
            type: LOAD_OBJECT,
            payload: object
        })
    })
}