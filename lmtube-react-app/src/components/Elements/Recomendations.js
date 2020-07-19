import React from "react";
import VideoPreview from "../Elements/VideoPreview";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecommendations } from "../../actions/videoActions";

class Recomendations extends React.Component {
  render() {
    const newVideo = this.props.video;
    if (newVideo !== this.video) {
      this.video = newVideo;
      if (newVideo.id) {
        this.props.getRecommendations(newVideo.id);
      } else {
        this.props.getRecommendations(-1);
      }
    }
    return (
      <div>
        <p className="breadcrumb breadcrumb-item active mt-3">Рекомендации</p>
        {this.props.recommendations.map((recommendation) => (
          <div key={recommendation.id} className="videoPreview">
            <VideoPreview video={recommendation} />
          </div>
        ))}
      </div>
    );
  }
}

Recomendations.propTypes = {
  getRecommendations: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
  recommendations: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    video: state.videos.video,
    errors: state.errors,
    recommendations: state.videos.recommendations,
  };
};

export default connect(mapStateToProps, { getRecommendations })(Recomendations);
