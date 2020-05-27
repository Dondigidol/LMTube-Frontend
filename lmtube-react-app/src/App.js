import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddVideoPage from "./components/Pages/AddVideoPage";
import MainPage from "./components/Pages/MainPage";
import VideoPage from "./components/Pages/VideoPage";
import AdminConsole from "./components/Pages/AdminConsole";
import UserVideoPage from "./components/Pages/UserVideoPage";
import LoginPage from "./components/Pages/LoginPage";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode"
import setJWTToken from "./securityUtils/setJWTToken" 
import { SET_CURRENT_USER } from "./actions/types";
import {userLogout} from "./actions/userActions"

const jwtToken = localStorage.jwtToken

if (jwtToken){
  setJWTToken(jwtToken)
  const decoded = jwt_decode(jwtToken)
  console.log(decoded);
  
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  })

  const currentType = Date.now()/1000
  if (decoded.exp < currentType){
    store.dispatch(userLogout())
    window.location.href = "/"
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
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/video/:videoId" component={VideoPage} />
          </Router>

          {
            // private routes
          }
          <Router>
            <Route exact path="/add-video" component={AddVideoPage} />
            <Route exact path="/admin-console" component={AdminConsole} />
            <Route exact path="/user-videos" component={UserVideoPage} />
          </Router>
        
      </div>
      </Provider>
    )
  }
}

export default App;
