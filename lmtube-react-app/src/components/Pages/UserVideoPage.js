import React from "react";
import Header from "../Elements/Header";
import { connect } from "react-redux";
import { getUserVideos } from "../../actions/videoActions";
import PropTypes from "prop-types";
import VideoPreview from "../Elements/VideoPreview";

class UserVideoPage extends React.Component {
  state = {
    videos: [],
  };

  componentDidMount() {
    this.props.getUserVideos();
  }

  componentDidUpdate(newProps) {
    if (newProps.videos && newProps.videos !== this.state.videos) {
      this.setState({
        videos: newProps.videos,
      });
    }
  }

  render() {
    return (
      <div>
        <Header searchingMethod={this.searchingVideo} />
        <div className="container-fluid">
          <div className="row pt-3">
            {this.state.videos
              ? this.state.videos.map((video) => {
                  return (
                    <div
                      key={video.id}
                      className="col-sm-12 col-md-4 col-lg-3 videoPreview"
                    >
                      <VideoPreview video={video} />
                    </div>
                  );
                })
              : {}}
          </div>
        </div>
      </div>
    );
  }
}

UserVideoPage.propTypes = {
  videos: PropTypes.array.isRequired,
  getUserVideos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    videos: state.videos.videos,
  };
};

export default connect(mapStateToProps, { getUserVideos })(UserVideoPage);
