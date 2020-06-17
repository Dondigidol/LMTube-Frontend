import React from "react";
import VideoContainer from "../containers/VideoContainer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVideo } from "../../actions/videoActions";

class TestPage extends React.Component {
  constructor(props) {
    super(props);

    const videoId = this.props.match.params.videoId;

    this.state = {
      videoId: videoId,
      video: {},
    };

    if (videoId !== undefined) {
      this.props.getVideo(videoId);
    }
  }

  render() {
    return (
      <div>
        <div className="col-12 col-lg-8">
          <VideoContainer />
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
  };
};

export default connect(mapStateToProps, { getVideo })(TestPage);
