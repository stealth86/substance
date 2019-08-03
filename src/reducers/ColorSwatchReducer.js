import { DISPLAY_PALETTE, UPDATE_COLOR } from "../actions/types";

const initialState = {
    displayPalette: {
        display:false,
        color : 0xffffff,
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
        case UPDATE_COLOR:
            return {
                ...state,
                displayPalette:{
                    ...state.displayPalette,
                    color : action.payload
                }
            }
        default:
            return {
                ...state
            }
    }
}