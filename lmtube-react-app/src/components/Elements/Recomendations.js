import React from "react";
import VideoPreview from "../Elements/VideoPreview";

class Recomendations extends React.Component {
  state = {
    videos: [],
  };

  componentDidMount() {
    this.getRecommendations();
  }

  getRecommendations = async () => {
    const videoId = this.props.videoId;
    const uri_api = await fetch(
      `http://localhost:8080/lmtube/api/video/recommendations/${videoId}`
    );
    const videos = await uri_api.json();
    this.setState({
      videos: videos,
    });
  };

  render() {
    return (
      <div>
        {this.state.videos.map((video) => {
          return (
            <div className="videoPreview">
              <VideoPreview
                key={video.id}
                video ={video}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Recomendations;
