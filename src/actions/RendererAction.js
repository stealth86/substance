import { SET_RENDERER, ADD_RENDERER_CALLBACK } from "./types";

export const setRenderer = (renderer) => (dispatch) => {
    dispatch({
      type: SET_RENDERER,
      payload: renderer
    })
  }

  export const addCallback = (order,callback) =>(dispatch) => {
    dispatch({
      type: ADD_RENDERER_CALLBACK,
      payload : callback,
      order : order
    })
  }