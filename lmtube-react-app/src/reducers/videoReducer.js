import {GET_VIDEOS, GET_SELECTED_VIDEO} from "../actions/types"

const initialState = {
    videos: [],
    video: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_VIDEOS:
            return {
                ...state,
                videos: action.payload
            }
        case GET_SELECTED_VIDEO:
            return {
                ...state,
                video: action.payload
            }
        default:
            return state
    }
}