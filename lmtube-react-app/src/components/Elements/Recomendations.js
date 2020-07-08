import React from "react";
import VideoPreview from "../Elements/VideoPreview";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecommendations } from "../../actions/videoActions";

class Recomendations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      video: {},
      recommendations: [],
    };
  }

  componentDidUpdate(newProps, oldProps) {
    if (newProps.video) {
      this.props.getRecommendations(newProps.video.id);
    }
  }

  render() {
    return (
      <div>
        <p className="breadcrumb breadcrumb-item active mt-3">Рекомендации</p>
        {this.state.recommendations
          ? this.state.recommendations.map((recommendation) => (
              <div key={recommendation.id} className="videoPreview">
                <VideoPreview video={recommendation} />
              </div>
            ))
          : ""}
      </div>
    );
  }
}

Recomendations.propTypes = {
  getRecommendations: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    video: state.videos.video,
    errors: state.errors,
    recommendations: state.videos.recommendations,
  };
};

export default connect(mapStateToProps, { getRecommendations })(Recomendations);
