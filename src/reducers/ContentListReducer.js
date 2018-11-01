import { ADD_CONTENT_TYPE } from "../actions/types";

const initialState = {
    contentList: [
        { name : "Textures", tagTypes: ["texture","image"]},
        { name : "Meshes", tagTypes: ["mesh"]},
        { name : "Materials", tagTypes: ["material"]}
    ]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_CONTENT_TYPE:
            return {
                ...state,
                contentList : [
                    ...state.contentList,
                     action.payload
                ]
            }
        default:
            return {
                ...state
            }
    }
}