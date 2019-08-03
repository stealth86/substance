import { DISPLAY_PALETTE } from './types';

export const switchDisplay = (display) => (dispatch) => {
    dispatch({
      type: DISPLAY_PALETTE,
      payload: display
    })
  }