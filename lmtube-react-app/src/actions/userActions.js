import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const userAuthentication = (creditials) => async (dispatch) => {
  try {
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      username: creditials.username,
      password: creditials.password,
    };
    const res = await axios.post(
      "http://localhost:8080/lmtube/api/user/login",
      data,
      params
    );

    const { token } = res.data;
    localStorage.setItem("jwtToken", token);

    setJWTToken(token);

    const decoded = jwt_decode(token);

    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
