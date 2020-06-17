import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Video from "../Elements/Video";
import VideoActionsMenu from "../Elements/VideoActionsMenu";

class VideoContainer extends React.Component {
  state = {
    video: {
      author: {},
    },
  };

  componentDidUpdate() {
    let video = this.props.video;
    if (
      video.id !== this.state.video.id ||
      video.available !== this.state.video.available
    ) {
      this.setState({
        video: video,
      });
    }
  }

  render() {
    return (
      <div className="col-sm-12 pt-3">
        <div>
          <Video />
        </div>

        {!this.state.video.available && (
          <div className="alert alert-warning">
            В настоящее время видео снято с пуликации.
          </div>
        )}

        <VideoActionsMenu />

        <div>
          <h4>{this.state.video.title}</h4>
        </div>
        <small className="text-muted">
          <div className="d-inline">
            Автор: {this.state.video.author.fullName}
          </div>
          <div className="d-inline float-right">
            Загружено: {this.state.video.createdAt}
          </div>

          <div>Просмотров: {this.state.video.views}</div>
        </small>
        <hr />
        <div className="">{this.state.video.description}</div>
      </div>
    );
  }
}

VideoContainer.propTypes = {
  video: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    video: state.videos.video,
  };
};

export default connect(mapStateToProps)(VideoContainer);
