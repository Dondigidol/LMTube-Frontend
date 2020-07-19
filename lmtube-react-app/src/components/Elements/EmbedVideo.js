import React from "react";
import Video from "./Video";
import NoVideoContainer from "../containers/NoVideoContainer";
import { getVideo } from "../../actions/videoActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class EmbedVideo extends React.Component {
  constructor(props) {
    super(props);
    this.props.getVideo(this.props.match.params.videoId);

    this.state = {
      video: undefined,
    };
  }

  componentDidUpdate(newProps) {
    if (newProps.video && newProps.video !== this.state.video) {
      this.setState({
        video: newProps.video,
      });
    }
  }

  render() {
    return (
      <div>
        {this.props.error.message ? (
          <NoVideoContainer />
        ) : (
          this.state.video && <Video />
        )}
      </div>
    );
  }
}

EmbedVideo.propTypes = {
  video: PropTypes.object.isRequired,
  getVideo: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    video: state.videos.video,
    error: state.errors,
  };
};

export default connect(mapStateToProps, { getVideo })(EmbedVideo);
