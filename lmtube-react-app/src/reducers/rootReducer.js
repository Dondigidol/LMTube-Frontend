import {combineReducers} from "redux"
import errorReducer from "./errorReducer"
import videoReducer from "./videoReducer"
import userReducer from "./userReducer"

export default combineReducers({
    errors: errorReducer,
    videos: videoReducer,
    security: userReducer
})