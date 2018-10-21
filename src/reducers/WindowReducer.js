import { UPDATE_LAYOUT } from '../actions/types';
import { ROW_HEIGHT, GRID_COLUMNS, WINDOW_MARGIN_X, WINDOW_MARGIN_Y, CONTAINER_WIDTH } from '../Constants';
const initialState = {
    columnWidth : (CONTAINER_WIDTH - WINDOW_MARGIN_X * (GRID_COLUMNS - 1) - WINDOW_MARGIN_X * 2) / GRID_COLUMNS,
    rowHeight : ROW_HEIGHT,
    gridColumns : GRID_COLUMNS,
    marginX : WINDOW_MARGIN_X,
    marginY : WINDOW_MARGIN_Y,
    containerWidth : CONTAINER_WIDTH,
    units: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_LAYOUT:
            return {
                ...state,
                units: {
                    ...state.units,
                    [action.name] : action.payload
                }
            }
        default:
            return {
                ...state
            }
    }
}