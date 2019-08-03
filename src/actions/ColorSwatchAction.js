import { DISPLAY_PALETTE,UPDATE_COLOR } from './types';

export const switchDisplay = (display) => (dispatch) => {
    dispatch({
      type: DISPLAY_PALETTE,
      payload: display
    })
  }

export const updateColor = (color) => (dispatch) =>{
    dispatch({
        type:UPDATE_COLOR,
        payload : color
    })
}