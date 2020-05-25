import React from "react";
import Header from "../Elements/Header";
import VideoPreview from "../Elements/VideoPreview";
import { connect } from "react-redux";
import PropTypes from "prop-types"
import {getVideos} from "../../actions/videoActions"


class MainPage extends React.Component {

  searchingVideo = (e) => {
    e.preventDefault();
    var mask = e.target.elements.mask.value;
    this.props.getVideos(mask);
  };

  componentDidMount(){
    this.props.getVideos("")
  }


  render() {
    const {videos} = this.props.videos
    return (
      <div>
        <Header searching={true} searchingMethod={this.searchingVideo} />
        <div className="container-fluid">
          <div className="row pt-3">
            {
              videos.map((video) => {
              return (
                <div key={video.id} className="col-sm-12 col-md-4 col-lg-3 videoPreview">
                  <VideoPreview
                    video={video}
                  />
                </div>
              );
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  getVideos: PropTypes.func.isRequired,
  videos: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  videos: state.videos
})

export default connect(mapStateToProps, {getVideos})(MainPage);
