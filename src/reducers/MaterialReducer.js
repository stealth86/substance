import { ADD_MATERIAL } from '../actions/types';
const initialState = {
    materials : []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MATERIAL:{
            console.log(action)
            return {
                ...state,
                materials : [
                    ...state.materials,
                    action.payload
                ]
            }
        }
        default:
            return {
                ...state
            }
    }
}