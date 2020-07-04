import React from "react";
import VideoPreview from "../Elements/VideoPreview";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Recomendations extends React.Component {
  state = {
    videoId: undefined,
    videos: [],
  };

  componentDidUpdate() {
    let videoId = this.props.videoId;

    if (videoId !== this.state.videoId) {
      this.setState({
        videoId: videoId,
      });

      this.getRecommendations();
    }
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
        <p className="breadcrumb breadcrumb-item active mt-3">Рекомендации</p>
        {this.state.videos.map((video) => (
          <div key={video.id} className="videoPreview">
            <VideoPreview video={video} />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    videoId: state.videos.video.id,
  };
};

export default connect(mapStateToProps)(Recomendations);
