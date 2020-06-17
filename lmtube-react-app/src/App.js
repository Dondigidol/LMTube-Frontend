import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import VideoPage from "./components/pages/VideoPage";
import UserVideoPage from "./components/pages/UserVideoPage";
import LoginPage from "./components/pages/LoginPage";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { userLogout } from "./actions/userActions";
import EmbedVideo from "./components/Elements/EmbedVideo";
import Moderation from "./components/pages/Moderation";
import PageNotFound from "./components/pages/PageNotFound";
import UploadVideoPage from "./components/pages/UploadVideoPage";
import TestPage from "./components/pages/TestPage";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded,
  });

  const currentType = Date.now() / 1000;
  if (decoded.exp < currentType) {
    store.dispatch(userLogout());
    window.location.href = "/";
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          {
            // public routes
          }

          <Router>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/video/:videoId" component={VideoPage} />
              <Route exact path="/embed/:videoId" component={EmbedVideo} />
              <Route exact path="/uploading" component={UploadVideoPage} />
              <Route exact path="/user-videos" component={UserVideoPage} />
              <Route exact path="/moderation" component={Moderation} />
              <Route exact path="/test/:videoId" component={TestPage} />
              <Route exact path="/404" component={PageNotFound} />
              <Redirect from="*" to="/404" />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
