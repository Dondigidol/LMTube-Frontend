import React from "react";
import Header from "../Elements/Header";
import Recomendations from "../Elements/Recomendations";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getVideo } from "../../actions/videoActions";
import Video from "../Elements/Video";
import VideoActionsMenu from "../Elements/VideoActionsMenu";

class VideoPage extends React.Component {
  state = {
    videoId: 0,
    videoContainerWidth: 0,
    video: {},
    author: undefined,
    available: true,
  };

  componentDidMount() {
    const videoId = this.props.match.params.videoId;
    //this.props.getVideo(videoId);
    this.setState({
      videoContainerWidth: this.videoContainer.clientWidth,
      videoId: videoId,
      video: this.props.video,
      available: this.props.video.available,
    });
  }

  componentWillReceiveProps = (newProps) => {
    if (newProps) {
      this.setState({
        video: newProps.video,
        author: newProps.video.author.fullName,
        available: newProps.video.available,
      });
    }
  };

  render() {
    return (
      <div key={1}>
        <Header />
        <div className="container">
          <div className="row">
            <div
              className="col-sm-12 col-lg-8 pt-3"
              ref={(cont) => (this.videoContainer = cont)}
            >
              <div
                style={{
                  height: this.state.videoContainerWidth * 0.54,
                }}
              >
                <Video videoId={this.props.match.params.videoId} />
              </div>

              {!this.state.available && (
                <div className="alert alert-warning">
                  В настоящее время видео снято с пуликации.
                </div>
              )}

              <VideoActionsMenu />

              <div>
                <h4>{this.state.video.title}</h4>
              </div>
              <small className="text-muted">
                <div className="d-inline">Автор: {this.state.author}</div>
                <div className="d-inline float-right">
                  Загружено: {this.state.video.createdAt}
                </div>

                <div>Просмотров: {this.state.video.views}</div>
              </small>
              <hr />
              <div className="">{this.state.video.description}</div>
            </div>
            <div className="col-sm-12 col-lg-4">
              <p className="breadcrumb breadcrumb-item active mt-3">
                Рекомендации
              </p>
              <Recomendations videoId={this.state.videoId} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VideoPage.propTypes = {
  video: PropTypes.object.isRequired,
  getVideo: PropTypes.func.isRequired,
  videos: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    video: state.videos.video,
    videos: state.videos,
    security: state.security,
  };
};

export default connect(mapStateToProps, { getVideo })(VideoPage);
