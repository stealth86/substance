import { ADD_LAYER, UPDATE_LAYER } from "./types";

export const addLayer = (layer)=>(dispatch) =>{
    dispatch({
        type: ADD_LAYER,
        payload: layer
    })
}

export const updateLayer= (layerOrder,layer)=>(dispatch)=>{
    dispatch({
        type:UPDATE_LAYER,
        payload:layer,
        layerOrder : layerOrder
    })
}