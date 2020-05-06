import React from "react";
import Header from "../Header";
import VideoPreview from "../VideoPreview";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      mask: "",
    };

    this.getVideos = this.getVideos.bind(this);
    this.handleMask = this.handleMask.bind(this);
  }

  componentDidMount() {
    this.getVideos();
  }

  handleMask(event) {
    this.setState(
      {
        mask: event.target.value,
      },
      () => {
        this.getVideos();
      }
    );
  }

  async getVideos() {
    const api_url = await fetch(
      `http://localhost:8080/lmtube/api/video/search?title=${this.state.mask}`
    );
    const data = await api_url.json();
    this.setState({
      videos: data,
    });
  }

  render() {
    return (
      <div>
        <Header searching="true" />
        <div className="form-group">
          <form className="col-sm-12 col-lg-6 offset-lg-3 mt-2">
            <input
              type="text"
              value={this.state.mask}
              onChange={this.handleMask}
              className="form-control"
              placeholder="Найти"
            />
          </form>
        </div>
        <div className="container-fluid">
          <div className="row pt-3">
            {this.state.videos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="col-sm-12 col-md-4 col-lg-3 videoPreview"
                >
                  <VideoPreview
                    videoId={item.id}
                    posterId={item.poster.id}
                    title={item.title}
                    createdAt={item.createdAt}
                    views={item.views}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
