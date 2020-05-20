import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddVideoPage from "./components/Layout/Pages/AddVideoPage";
import MainPage from "./components/Layout/Pages/MainPage";
import VideoPage from "./components/Layout/Pages/VideoPage";
import AdminConsole from "./components/Layout/Pages/AdminConsole";
import MyPage from "./components/Layout/Pages/MyPage";
import LoginPage from "./components/UserManagment/LoginPage";

class App extends React.Component {
  render() {
    return (
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
    );
  }
}

export default App;
