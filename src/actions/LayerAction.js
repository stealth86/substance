import { ADD_LAYER } from "./types";

export const addLayer = (layer)=>(dispatch) =>{
    dispatch({
        type: ADD_LAYER,
        payload: layer
    })
}