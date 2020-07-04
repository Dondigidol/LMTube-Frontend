import { GET_ERRORS, GET_VIDEOS, GET_SELECTED_VIDEO } from "./types";
import axios from "axios";

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
    await axios.post(
      "http://localhost:8080/lmtube/api/video/upload",
      formData,
      params
    );
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
    `http://localhost:8080/lmtube/api/video/videos?title=${searchMask}&available=${availability}`
  );
  dispatch({
    type: GET_VIDEOS,
    payload: res.data,
  });
};

export const getVideo = (videoId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/lmtube/api/video/${videoId}`
    );
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
  const res = await axios.get("http://localhost:8080/lmtube/api/user/videos");

  dispatch({
    type: GET_VIDEOS,
    payload: res.data,
  });
};

export const setAvailability = (videoId, availability) => async (dispatch) => {
  const res = await axios.post(
    `http://localhost:8080/lmtube/api/video/availability?id=${videoId}&available=${availability}`
  );
  dispatch({
    type: GET_SELECTED_VIDEO,
    payload: res.data,
  });
};

export const getPosterSrc = (posterId) => {
  if (posterId) {
    return `http://localhost:8080/lmtube/api/poster/${posterId}`;
  }
  return null;
};

export const getVideoSrc = (resolution, name) => {
  if (resolution && name) {
    return `http://localhost:8080/lmtube/api/video/stream/${resolution}/${name}`;
  }
  return null;
};
