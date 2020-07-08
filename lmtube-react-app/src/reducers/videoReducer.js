import {
  GET_VIDEOS,
  GET_SELECTED_VIDEO,
  GET_RECOMMENDATIONS,
} from "../actions/types";

const initialState = {
  videos: [],
  video: {},
  recommendations: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOS:
      return {
        ...state,
        videos: action.payload,
      };
    case GET_SELECTED_VIDEO:
      return {
        ...state,
        video: action.payload,
      };
    case GET_RECOMMENDATIONS:
      return {
        ...state,
        recommendations: action.payload,
      };
    default:
      return state;
  }
}
