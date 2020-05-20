import React from "react";
import Poster from "./Poster";
import { Link } from "react-router-dom";

const VideoPreview = (props) => {
  const videoUri = "/video/" + props.videoId;

  return (
    <Link className="nav-link text-muted" to={videoUri} poster={props.posterId}>
      <div className="videoPreview card-body">
        <div>
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
