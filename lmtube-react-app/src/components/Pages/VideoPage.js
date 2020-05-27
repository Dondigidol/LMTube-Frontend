import React from "react";
import Header from "../Elements/Header";
import Recomendations from "../Elements/Recomendations";
import { connect } from "react-redux";
import PropTypes from "prop-types"
import { getSelectedVideo } from "../../actions/videoActions";

class VideoPage extends React.Component {
  state = {
    title: null,
    description: null,
    views: null,
    author: null,
    createdAt: null,
    posterSrc: null,
    videoStreams: [],
    videoContainerWidth: 0,
  };

  componentDidMount() {
    this.props.getSelectedVideo(this.props.match.params.videoId)
    this.setState({
      videoContainerWidth: this.videoContainer.clientWidth,
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.video){
      const posterSrc = `http://localhost:8080/lmtube/api/poster/${newProps.video.poster.id}`

      let streams = [];
      newProps.video.videos.forEach((video) => {
        const src = `http://localhost:8080/lmtube/api/video/stream/${video.name}?res=${video.resolution}`;
        const stream = {
          id: video.id,
          src: src,
          mimeType: video.mimeType,
          length: video.contentLength,
        }
        streams.push(stream);
      })


      this.setState({
        title: newProps.video.title ,
        description: newProps.video.description,
        views: newProps.video.views,
        author: newProps.video.author.fullName,
        createdAt: newProps.video.createdAt,
        posterSrc: posterSrc,
        videoStreams: streams,
      })
    }

  }

  render() {
    return (
      <div key={1}>
        <Header />
        <div className="container">
          <div className="row">
            <div
              className="col-sm-12 col-lg-8"
              ref={(cont) => (this.videoContainer = cont)}
            >
              <video
                preload="auto"
                poster={this.state.posterSrc}
                controls
                style={{
                  height: this.state.videoContainerWidth * 0.6,
                  width: this.state.videoContainerWidth,
                }}
                className="video"
              >
                {
                  this.state.videoStreams.map(stream => (
                    <source key={stream.id} src={stream.src} type={stream.mimeType} length={stream.length} /> 
                  ))
                }
              </video>
              <div>
                <h4>{this.state.title}</h4>
              </div>
              <small className="text-muted">
                <div className="d-inline">Автор: {this.state.author}</div>
                <div className="d-inline float-right">
                  Загружено: {this.state.createdAt}
                </div>

                <div>Просмотров: {this.state.views}</div>
              </small>
              <hr />
              <div className="">{this.state.description}</div>
            </div>
            <div className="col-sm-12 col-lg-4">
              <p className="breadcrumb breadcrumb-item active mt-3">
                Рекомендации
              </p>
              <Recomendations videoId={this.props.match.params.videoId} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VideoPage.propTypes = {
  video: PropTypes.object.isRequired,
  getSelectedVideo: PropTypes.func.isRequired
}

const mapStateToProps = state =>{
  return {
    video: state.videos.video
  }
}

export default connect(mapStateToProps, {getSelectedVideo}) (VideoPage);
