import React from "react";
import Header from "../Elements/Header";
import VideoPreview from "../Elements/VideoPreview";

class UserVideoPage extends React.Component {
  state = {
    videos: [],
  };

  componentDidMount() {
    this.getVideos();
  }

  getVideos = async () => {
    const targetUri = await fetch(
      "http://localhost:8080/lmtube/api/user/videos"
    );
    const data = await targetUri.json();
    if (data) {
      this.setState({
        videos: data,
      });
    }
  };

  render() {
    const {videos} = this.state.videos
    return (
      <div>
        <Header />
        <div className="container">
         
        </div>
      </div>
    );
  }
}

export default UserVideoPage;
