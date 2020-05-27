import { GET_ERRORS, GET_VIDEOS, GET_SELECTED_VIDEO } from "./types";
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

export const getSelectedVideo = (videoId) => async dispatch => {
    const res = await axios.get(`http://localhost:8080/lmtube/api/video/${videoId}`);
    dispatch({
        type: GET_SELECTED_VIDEO,
        payload: res.data
    })
}

export const getUserVideos = () => async dispatch => {
    const res = await axios.get("http://localhost:8080/lmtube/api/user/videos")
    console.log(res.data);
    
    dispatch({
        type: GET_VIDEOS,
        payload: res.data,
    })
}