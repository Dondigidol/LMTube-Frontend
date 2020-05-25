import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddVideoPage from "./components/Pages/AddVideoPage";
import MainPage from "./components/Pages/MainPage";
import VideoPage from "./components/Pages/VideoPage";
import AdminConsole from "./components/Pages/AdminConsole";
import MyPage from "./components/Pages/MyPage";
import LoginPage from "./components/Pages/LoginPage";
import { Provider } from "react-redux";
import store from "./store";
 


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
            <Route exact path="/my-videos" component={MyPage} />
          </Router>
        
      </div>
      </Provider>
    )
  }
}

export default App;
