import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAvailability } from "../../../actions/videoActions";

class Availability extends React.Component {
  updateAvailability = (availability) => {
    this.props.setAvailability(this.props.video.id, availability);
  };

  render() {
    switch (this.props.user.role) {
      case "ADMINISTRATOR":
      case "MODERATOR":
        if (this.props.video.available) {
          return (
            <div onClick={() => this.updateAvailability(false)}>
              снять с публикации
            </div>
          );
        } else {
          return (
            <div onClick={() => this.updateAvailability(true)}>
              опубликовать
            </div>
          );
        }
      default:
        return null;
    }
  }
}

Availability.propTypes = {
  video: PropTypes.object.isRequired,
  setAvailability: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    video: state.videos.video,
    user: state.security.user,
  };
};

export default connect(mapStateToProps, { setAvailability })(Availability);
