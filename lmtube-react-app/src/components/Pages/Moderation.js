import React from "react";
import Header from "../Elements/Header";
import { connect } from "react-redux";
import { getVideos } from "../../actions/videoActions";
import PropTypes from "prop-types";
import VideoPreview from "../Elements/VideoPreview";

class Moderation extends React.Component {
  constructor(props) {
    super(props);
    if (!props.validToken) {
      window.location.href = "/login";
    }
    switch (props.user.role) {
      case "ADMINISTRATOR":
      case "MODERATOR":
        break;
      default:
        window.location.href = "/";
    }
  }

  searchingVideo = (e) => {
    e.preventDefault();
    var mask = e.target.elements.mask.value;
    this.props.getVideos(mask, false);
  };

  componentDidMount = () => {
    this.props.getVideos("", false);
  };

  render() {
    const { videos } = this.props.videos;
    return (
      <div>
        <Header searchingMethod={this.searchingVideo} />
        <div className="container-fluid">
          <div className="row pt-3">
            {videos.map((video) => {
              return (
                <div
                  key={video.id}
                  className="col-sm-12 col-md-4 col-lg-3 videoPreview"
                >
                  <VideoPreview video={video} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

Moderation.propTypes = {
  videos: PropTypes.object.isRequired,
  getVideos: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  validToken: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    videos: state.videos,
    user: state.security.user,
    validToken: state.security.validToken,
  };
};

export default connect(mapStateToProps, { getVideos })(Moderation);
