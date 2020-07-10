import React from "react";
import Video from "./Video";
import { getVideo } from "../../actions/videoActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class EmbedVideo extends React.Component {
  componentDidMount() {
    this.props.getVideo(this.props.match.params.videoId);
  }

  render() {
    return <Video />;
  }
}

EmbedVideo.propTypes = {
  video: PropTypes.object.isRequired,
  getVideo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    video: state.videos.video,
  };
};

export default connect(mapStateToProps, { getVideo })(EmbedVideo);
