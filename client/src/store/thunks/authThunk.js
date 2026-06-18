import {
  loginSuccess,
  logoutSuccess,
  tokenExpired,
  setLoading,
} from "../slices/authSlice";
import Alert from "../../utils/alert";

export const checkAuth = () => async (dispatch) => {
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!storedUser || !token) {
    dispatch(setLoading(false));
    return;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = payload.exp * 1000;
    const timeLeft = expiryTime - Date.now();

    if (timeLeft > 0) {
      setTimeout(() => {
        dispatch(expireSession());
      }, timeLeft);
      dispatch(setLoading(false));
    } else {
      dispatch(expireSession());
    }
  } catch (error) {
    console.error("Invalid token", error);
    dispatch(expireSession());
  }
};

export const loginUser = (data) => async (dispatch) => {
  dispatch(loginSuccess(data));
};

export const logoutUser = () => async (dispatch) => {
  dispatch(logoutSuccess());
  window.location.href = "/login";
};

export const expireSession = () => async (dispatch) => {
  dispatch(tokenExpired());
  await Alert.warning(
    "Session Expired",
    "Your session has expired. Please login again."
  );
  window.location.href = "/login";
};