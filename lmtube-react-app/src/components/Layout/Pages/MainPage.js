import React from "react";
import Header from "../Header";
import VideoPreview from "../VideoPreview";

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
    };
  }

  componentDidMount() {
    this.getVideos("");
  }

  searchingVideo = (e) => {
    e.preventDefault();
    var mask = e.target.elements.mask.value;
    this.getVideos(mask);
  };

  getVideos = async (mask) => {
    const api_url = await fetch(
      `http://localhost:8080/lmtube/api/video/search?title=${mask}`
    );
    const data = await api_url.json();
    this.setState({
      videos: data,
    });
  };

  render() {
    return (
      <div>
        <Header searching={true} searchingMethod={this.searchingVideo} />
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
