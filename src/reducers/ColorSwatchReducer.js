import { DISPLAY_PALETTE } from "../actions/types";

const initialState = {
    displayPalette: {
        display:false,
        posX:0,
        posY:0
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DISPLAY_PALETTE:
            return {
                ...state,
                displayPalette : action.payload
            }
        default:
            return {
                ...state
            }
    }
}