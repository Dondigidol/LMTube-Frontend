import React from "react";
import VideoContainer from "../containers/VideoContainer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVideo } from "../../actions/videoActions";
import Header from "../Elements/Header";
import Recomendations from "../Elements/Recomendations";
import NoVideoContainer from "../containers/NoVideoContainer";

class TestPage extends React.Component {
  constructor(props) {
    super(props);

    const videoId = this.props.match.params.videoId;

    this.state = {
      videoId: videoId,
      video: {},
      error: {},
    };

    if (videoId !== undefined) {
      this.props.getVideo(videoId);
    }
  }

  componentDidUpdate = (newProps, oldProps) => {
    if (newProps.error.message !== oldProps.error.message) {
      this.setState({
        error: newProps.error,
      });
    }
    if (newProps.video.id !== oldProps.video.id) {
      this.setState({
        video: newProps.video,
      });
    }
  };

  render() {
    const errorMessage = this.state.error.message;
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8">
              {errorMessage ? (
                <NoVideoContainer />
              ) : (
                this.props.video.id && <VideoContainer />
              )}
            </div>
            <div className="col-12 col-lg-4">
              <Recomendations />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TestPage.propTypes = {
  video: PropTypes.object.isRequired,
  getVideo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    video: state.videos.video,
    error: state.errors,
  };
};

export default connect(mapStateToProps, { getVideo })(TestPage);
