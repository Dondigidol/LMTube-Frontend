import React from "react";

class Video extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      views: 0,
      createdAt: null,
      poster: null,
    };
  }

  render() {
    return (
      <div>
        <div>
          <img src={this.state.poster} />
        </div>
        <div>{this.state.title}</div>
        <div>{this.state.createdAt}</div>
        <div>{this.state.views}</div>
      </div>
    );
  }
}

export default Video;
