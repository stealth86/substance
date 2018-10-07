import { SET_RENDERER } from "./types";

export const setRenderer = (renderer) => (dispatch, getState) => {
    dispatch({
      type: SET_RENDERER,
      payload: renderer
    })
  }