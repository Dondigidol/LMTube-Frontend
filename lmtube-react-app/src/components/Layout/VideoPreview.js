import React from "react";
import Poster from "./Poster";
import { Link } from "react-router-dom";

const VideoPreview = (props) => {
  const videoUri = "/video/" + props.videoId;
  return (
    <Link className="nav-link text-muted" to={videoUri}>
      <div className="videoPreview">
        <div style={{ padding: 5 }}>
          <Poster posterId={props.posterId} alt={props.title} />
        </div>
        <p className="text-center font-weight-bold">{props.title}</p>
        <small className="muted">
          <div>Автор: </div>
          <div>Загружен: {props.createdAt}</div>
          <div>Просмотров: {props.views}</div>
        </small>
      </div>
    </Link>
  );
};

export default VideoPreview;
