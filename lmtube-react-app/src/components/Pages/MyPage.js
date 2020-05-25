import React from "react";
import Header from "../Elements/Header";
import VideoPreview from "../Elements/VideoPreview";

class MyPage extends React.Component {
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
    return (
      <div>
        <Header />
        <div className="container">
          {this.state.videos.map((item) => {
            return (
              <div>
                <VideoPreview
                  videoId={item.videoId}
                  posterId={item.posterId}
                  title={item.title}
                  createdAt={item.createdAt}
                  views={item.views}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MyPage;
