import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import IframePopup from "./VideoMenu/IframePopup";

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
              поделиться
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default VideoActionsMenu;
