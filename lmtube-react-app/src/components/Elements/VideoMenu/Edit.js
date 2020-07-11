import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Edit extends React.Component {
  redirectToEditPage() {
    window.location.href = `/edit/${this.props.video.id}`;
  }

  render() {
    return <div onClick={() => this.redirectToEditPage()}>редактировать</div>;
  }
}

Edit.propTypes = {
  video: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    video: state.videos.video,
  };
};

export default connect(mapStateToProps)(Edit);
