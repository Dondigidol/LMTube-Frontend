import store from "../store"
import { loginUser, loginingErrorHandler } from "./userActions"

export const updateUserInfo=(userinfo)=>{
    store.dispatch(loginUser(userinfo))
}

export const loginingError=()=>{
    store.dispatch(loginingErrorHandler())
}