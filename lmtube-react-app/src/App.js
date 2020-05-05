import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddVideoPage from "./components/Layout/Pages/AddVideoPage";
import MainPage from "./components/Layout/Pages/MainPage";
import VideoPage from "./components/Layout/Pages/VideoPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/add-video" component={AddVideoPage} />
        <Route exact path="/video/:videoId" component={VideoPage} />
      </Router>
    </div>
  );
}

export default App;
