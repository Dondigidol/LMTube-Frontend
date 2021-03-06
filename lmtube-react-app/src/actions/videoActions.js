import {
  GET_ERRORS,
  GET_VIDEOS,
  GET_SELECTED_VIDEO,
  GET_RECOMMENDATIONS,
} from "./types";
import axios from "axios";

axios.defaults.baseURL = "https://lmplay:8443/lmplay/api";

//axios.defaults.baseURL = "https://localhost:8443/lmplay/api";

export const uploadVideoDetails = (videoDetails, history) => async (
  dispatch
) => {
  try {
    const formData = new FormData();
    formData.append("title", videoDetails.title);
    formData.append("description", videoDetails.description);
    formData.append("videoFile", videoDetails.videoFile);
    formData.append("posterFile", videoDetails.posterFile);
    const params = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios.post("/video/upload", formData, params);
    window.location.href = "/user-videos";
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getVideos = (searchMask, availability) => async (dispatch) => {
  const res = await axios.get(
    `/video/videos?title=${searchMask}&available=${availability}`
  );
  dispatch({
    type: GET_VIDEOS,
    payload: res.data,
  });
};

export const getVideo = (videoId) => async (dispatch) => {
  try {
    const res = await axios.get(`/video/${videoId}`);
    if (res.data)
      dispatch({
        type: GET_SELECTED_VIDEO,
        payload: res.data,
      });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getUserVideos = () => async (dispatch) => {
  const res = await axios.get("/user/videos");

  dispatch({
    type: GET_VIDEOS,
    payload: res.data,
  });
};

export const setAvailability = (videoId, availability) => async (dispatch) => {
  const res = await axios.post(
    `/video/availability?id=${videoId}&available=${availability}`
  );
  dispatch({
    type: GET_SELECTED_VIDEO,
    payload: res.data,
  });
};

export const getPosterSrc = (posterId) => {
  if (posterId) {
    return axios.defaults.baseURL + `/poster/${posterId}`;
  }
  return null;
};

export const getVideoSrc = (resolution, name) => {
  if (resolution && name) {
    return axios.defaults.baseURL + `/video/stream/${resolution}/${name}`;
  }
  return null;
};

export const getRecommendations = (videoId) => async (dispatch) => {
  try {
    const res = await axios.get(
      axios.defaults.baseURL + `/video/recommendations/${videoId}`
    );
    if (res.data) {
      dispatch({
        type: GET_RECOMMENDATIONS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const editVideo = (videoId, title, description) => async (dispatch) => {
  try {
    const data = {
      id: videoId,
      title: title,
      description: description,
    };

    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post("/video/edit", data, params);

    window.location.href = `/video/${videoId}`;
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
