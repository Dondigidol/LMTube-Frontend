import React from "react";
import Header from "../Elements/Header";
import Recomendations from "../Elements/Recomendations";

class VideoPage extends React.Component {
  state = {
    videoId: this.props.match.params.videoId,
    posterSrc: null,
    streams: [],
    title: null,
    description: null,
    views: null,
    videoContainerWidth: 0,
  };

  // получение информации о видео по ид страницы
  getVideoDetais = async (videoId) => {
    this.setState({
      streams: [],
      posterSrc: null,
    });

    const video_uri = await fetch(
      `http://localhost:8080/lmtube/api/video/${videoId}`
    );
    const data = await video_uri.json();
    const posterSrc = `http://localhost:8080/lmtube/api/poster/${data.poster.id}`;
    const videos = data.videos;
    const streams = [];
    await videos.map((video) => {
      const streamSrc = `http://localhost:8080/lmtube/api/video/stream/${video.name}?res=${video.resolution}`;
      const stream = {
        id: video.id,
        src: streamSrc,
        mimeType: video.mimeType,
        length: video.contentLength,
      };
      streams.push(stream);
      return null;
    });

    this.setState({
      videoId: videoId,
      posterSrc: posterSrc,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      views: data.views,
      streams: streams,
    });
  };

  componentDidMount() {
    this.getVideoDetais(this.props.match.params.videoId);
    this.setState({
      videoContainerWidth: this.videoContainer.clientWidth,
    });
  }

  componentWillReceiveProps(newProps) {
    this.getVideoDetais(newProps.match.params.videoId);
  }

  render() {
    return (
      <div key={this.props.match.params.videoId}>
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
                {this.state.streams.map((stream) => {
                  return (
                    <source
                      key={stream.id}
                      src={stream.src}
                      type={stream.mimeType}
                      length={stream.length}
                    />
                  );
                })}
              </video>
              <div>
                <h4>{this.state.title}</h4>
              </div>
              <small className="text-muted">
                <div className="d-inline">Автор:</div>
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

export default VideoPage;
