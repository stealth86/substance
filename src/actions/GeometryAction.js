import { ADD_GEOMETRY } from './types';

export const addGeometry = (name,geometry) => (dispatch) => {
    dispatch({
        type: ADD_GEOMETRY,
        payload: geometry,
        name : name
    })
}