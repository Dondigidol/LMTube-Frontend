import { GET_ERRORS, GET_VIDEOS } from "./types";
import axios from "axios";

export const uploadVideoDetails = (videoDetails, history) => async dispatch => {
    try {
        const formData = new FormData();
        formData.append("title", videoDetails.title)
        formData.append("description", videoDetails.description)
        formData.append("videoFile", videoDetails.videoFile)
        formData.append("posterFile",videoDetails.posterFile)
        const params = {
            headers :{
                "Content-Type": "multipart/form-data",
                "Authorization": "Lmplay eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImZ1bGxOYW1lIjoi0K3QvNC40LvRjCDQotGD0LvQsdCw0LXQsiIsInBvc2l0aW9uIjoi0YHQv9C10YbQuNCw0LvQuNGB0YIg0YLQtdGF0L3QuNGH0LXRgdC60L7QuSDQv9C-0LTQtNC10YDQttC60LgiLCJleHAiOjE1OTA0MjgxMTUsImlhdCI6MTU5MDQyODA4NSwidXNlcm5hbWUiOiI2MDAzMTgwOSJ9.UmFYe_7tjWFR8Lt_AYQ801K-9bOMbGay7jMztT3ZXPgg1-i9ktTn0g_YzKRvPvBHky9vKgNdaOqh3-MlBNNERw"
            }
        }
        await axios.post("http://localhost:8080/lmtube/api/video/upload", formData, params)
        history.push("/")
        
    }catch(err){
        dispatch ({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getVideos = (searchMask) => async dispatch => {
    const res = await axios.get(`http://localhost:8080/lmtube/api/video/search?title=${searchMask}`)
    dispatch({
        type: GET_VIDEOS,
        payload: res.data
    })
}