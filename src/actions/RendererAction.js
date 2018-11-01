import { SET_RENDERER, ADD_RENDERER_CALLBACK } from "./types";

export const setRenderer = (name,renderer) => (dispatch) => {
    dispatch({
      type: SET_RENDERER,
      payload: renderer,
      name:name
    })
  }

  export const addCallback = (name,order,callback) =>(dispatch) => {
    dispatch({
      type: ADD_RENDERER_CALLBACK,
      payload : {order:order, callback:callback},
      name:name
    })
  }