import React from "react";
import { getPosterSrc } from "../../actions/videoActions";

class Poster extends React.Component {
  state = {
    width: 0,
  };

  componentDidMount = () => {
    this.setState({
      width: this.posterContainer.clientWidth,
    });
  };

  render() {
    const posterId = this.props.posterId;
    const api_url = getPosterSrc(posterId);
    return (
      <div
        ref={(cont) => (this.posterContainer = cont)}
        style={{
          height: this.state.width * 0.7,
        }}
      >
        <img className="poster" src={api_url} alt={this.props.alt} />
      </div>
    );
  }
}

export default Poster;
