import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Plyr from "plyr";
import { getPosterSrc, getVideoSrc } from "../../actions/videoActions";

class Video extends React.Component {
  state = {
    video: undefined,
  };

  shouldComponentUpdate(newProps, oldProps) {
    console.log(newProps.video);
    console.log(oldProps.video);
    if (newProps.video !== oldProps.video && this.state.video === undefined) {
      this.setState({
        video: newProps.video,
      });
      this.createPlayer(newProps.video);
      return true;
    }
    return false;
  }

  createPlayer(video) {
    let posterSrc = getPosterSrc(video.poster.id);
    let streams = [];
    video.videos.forEach((video) => {
      let videoSrc = getVideoSrc(video.resolution, video.name);
      let stream = {
        src: videoSrc,
        type: video.mimeType,
        size: video.resolution,
      };
      streams.push(stream);
    });

    let player = new Plyr(document.getElementById("player"), {
      title: video.title,
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "settings",
        "fullscreen",
      ],
      settings: ["quality", "speed"],
      autoplay: this.props.autoplay,
      autopause: true,
      clickToPlay: true,
      hideControls: true,
      fullscreen: {
        enabled: true,
      },
    });

    player.source = {
      type: "video",
      title: video.title,
      sources: streams,
      poster: posterSrc,
    };

    player.quality = {
      default: "480",
    };
  }

  render() {
    this.createPlayer(this.props.video);
    return (
      <div>
        <video id="player" preload="auto" controls width="auto" height="100%" />
      </div>
    );
  }
}

Video.propTypes = {
  video: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    video: state.videos.video,
  };
};

export default connect(mapStateToProps)(Video);
