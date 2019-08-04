import { ADD_LAYER, UPDATE_LAYER, UPDATE_MATERIAL } from "./types";

export const addLayer = (layer) => (dispatch, getState) => {
    const layerOrder = getLayerOrder(getState, layer)
    //console.log(layerOrder)
    finalColor(dispatch, getState, { type: ADD_LAYER, payload: { ...layer, layerOrder: layerOrder } })
}

export const updateLayer = (layerOrder, layer) => (dispatch, getState) => {
    finalColor(dispatch, getState, { type: UPDATE_LAYER, payload: { ...layer, layerOrder: layerOrder } })
}

const finalColor = (dispatch, state, dispatchObject) => {
    const { ColorWorker, layers } = state().LayerReducer
    const {materials} = state().MaterialReducer
    //console.log(materials)
    const layerStack = {
        ...(layers[dispatchObject.payload.material] && layers[dispatchObject.payload.material].matLayers),
        [dispatchObject.payload.layerOrder]: dispatchObject.payload.layer
    }
    ColorWorker.postMessage({
        layers:layerStack,
        textureSize: materials[dispatchObject.payload.material].textureSize
    })
    ColorWorker.onmessage = (event) => {
        console.log(event.data)
        dispatch(dispatchObject);
        var material = materials[dispatchObject.payload.material].material;
        //console.log(material)
        material.map = event.data.colorTexture
        material.needsUpdate = true
        dispatch({
            type: UPDATE_MATERIAL,
            payload: material,
            name: material.name
        })
    }
}

const getLayerOrder = (state, layer) => {
    const { layers } = state().LayerReducer
    return Math.max(...Object.keys(layers &&
        layers[layer.material] ? layers[layer.material].matLayers : { "-1": 0 }).map(Number)) + 1
}