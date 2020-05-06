import React from "react";
import Poster from "./Poster";
import { Link } from "react-router-dom";

class VideoPreview extends React.Component {
  render() {
    const videoUri = "/video/" + this.props.videoId;
    return (
      <Link className="nav-link text-muted" to={videoUri}>
        <div className="videoPreview">
          <div style={{ padding: 5 }}>
            <Poster posterId={this.props.posterId} alt={this.props.title} />
          </div>
          <p className="text-center font-weight-bold">{this.props.title}</p>
          <small className="muted">
            <div>Автор: </div>
            <div>Загружен: {this.props.createdAt}</div>
            <div>Просмотров: {this.props.views}</div>
          </small>
        </div>
      </Link>
    );
  }
}

export default VideoPreview;
