import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class NoVideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.cont = React.createRef();

    this.state = {
      clientWidth: 0,
    };
  }

  componentDidMount() {
    this.setState({
      clientWidth: this.cont.current.clientWidth,
    });
  }

  render() {
    return (
      <div className="container">
        <div
          ref={this.cont}
          className="row text-secondary"
          style={{
            height: this.state.clientWidth * 0.56,
          }}
        >
          <div className="my-auto col-12 text-center">
            <p className="h4">Упс...</p>
            {this.props.error.message}
          </div>
        </div>
      </div>
    );
  }
}

NoVideoContainer.propTypes = {
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    error: state.errors,
  };
};

export default connect(mapStateToProps)(NoVideoContainer);
