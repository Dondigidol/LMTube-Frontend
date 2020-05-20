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
        {this.state.videos.map((item) => {
          return (
            <div key={item.id} className="videoPreview">
              <VideoPreview
                videoId={item.id}
                posterId={item.poster.id}
                title={item.title}
                createdAt={item.createdAt}
                views={item.views}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Recomendations;
