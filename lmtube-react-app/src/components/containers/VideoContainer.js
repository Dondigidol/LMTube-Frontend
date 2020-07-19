import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Video from "../Elements/Video";
import VideoActionsMenu from "../Elements/VideoActionsMenu";

class VideoContainer extends React.Component {
  render() {
    return (
      <div className="col-sm-12 pt-3">
        <div>
          <Video />
        </div>

        {!this.props.video.available && (
          <div className="alert alert-warning">
            В настоящее время видео снято с пуликации.
          </div>
        )}

        <VideoActionsMenu />

        <div>
          <h4>{this.props.video.title}</h4>
        </div>
        <small className="text-muted">
          <div className="d-inline">
            Автор:{" "}
            {this.props.video.author
              ? this.props.video.author.fullName
                ? this.props.video.author.fullName
                : "Неизвестен"
              : "Неизвестен"}
          </div>
          <div className="d-inline float-right">
            Загружено: {this.props.video.createdAt}
          </div>

          <div>Просмотров: {this.props.video.views}</div>
        </small>
        <hr />
        <div className="">{this.props.video.description}</div>
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
