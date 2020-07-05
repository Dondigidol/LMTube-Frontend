import React from "react";
import Poster from "./Poster";

const VideoPreview = (props) => {
  const videoUri = "/video/" + props.video.id;

  return (
    <a
      className="nav-link text-muted"
      href={videoUri}
      poster={props.video.poster.id}
    >
      <div className="videoPreview card-body">
        {!props.video.available && (
          <div className="badge badge-pill badge-warning position-absolute font-weight-light mt-1 ml-1">
            не опубликовано
          </div>
        )}
        <div>
          <Poster posterId={props.video.poster.id} alt={props.video.title} />
        </div>
        <p className="text-center font-weight-bold">{props.video.title}</p>
        <small className="muted">
          <div>
            Автор:{" "}
            {props.video.author
              ? props.video.author.fullName
                ? props.video.author.fullName
                : "Неизвестен"
              : "Неизвестен"}
          </div>
          <div>Загружен: {props.video.createdAt}</div>
          <div>Просмотров: {props.video.views}</div>
        </small>
      </div>
    </a>
  );
};

export default VideoPreview;
