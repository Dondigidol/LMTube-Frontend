import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import IframePopup from "./VideoMenu/IframePopup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Availability from "../Elements/VideoMenu/Availability";

class VideoActionsMenu extends React.Component {
  state = {
    showIframePopup: false,
  };

  showIframePopup = () => {
    this.setState({
      showIframePopup: true,
    });
  };

  hideIframePopup = () => {
    this.setState({
      showIframePopup: false,
    });
  };

  render() {
    return (
      <div>
        <IframePopup
          show={this.state.showIframePopup}
          hide={this.hideIframePopup}
        />

        <Dropdown>
          <Dropdown.Toggle
            className="btn-sm mt-1 float-right btn-outline-light"
            style={{ fontSize: "0.8em", backgroundColor: "#50c779" }}
          >
            Меню
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ fontSize: "0.8em" }}>
            <Dropdown.Item onClick={this.showIframePopup}>
              встроить видео
            </Dropdown.Item>
            <Dropdown.Item>
              <Availability />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

VideoActionsMenu.propTypes = {
  user: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.security.user,
    video: state.videos.video,
  };
};

export default connect(mapStateToProps)(VideoActionsMenu);
