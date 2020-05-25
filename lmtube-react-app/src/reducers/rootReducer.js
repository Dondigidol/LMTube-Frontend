import {combineReducers} from "redux"
import errorReducer from "./errorReducer"
import videoReducer from "./videoReducer"

export default combineReducers({
    errors: errorReducer,
    videos: videoReducer
})