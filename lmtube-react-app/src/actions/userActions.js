import { GET_ERRORS } from "./types"
import axios from "axios"

export const userAuthentication = (creditials, history) => async dispatch => {

    try {
        const params = {
            headers: {
                "Content-Type": "application/json"
            },
        }

        const data= {
            username: creditials.username,
            password: creditials.password,
        }

        await axios.post("http://localhost:8080/lmtube/api/user/login", data, params)
        history.push("/")
    } catch(err){
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data 
        })
    }


}




