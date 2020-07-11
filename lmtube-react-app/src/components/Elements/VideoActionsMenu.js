import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import IframePopup from "./VideoMenu/IframePopup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Availability from "../Elements/VideoMenu/Availability";
import Edit from "./VideoMenu/Edit";

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

  getMenuItems() {
    var menuItems = [];
    switch (this.props.user.role) {
      case "ADMINISTRATOR":
      case "MODERATOR":
        menuItems.push(
          <Dropdown.Item onClick={this.showIframePopup}>
            встроить видео
          </Dropdown.Item>
        );
        menuItems.push(
          <Dropdown.Item>
            <Availability />
          </Dropdown.Item>
        );
        menuItems.push(
          <Dropdown.Item>
            <Edit />
          </Dropdown.Item>
        );
        break;

      case "CREATOR":
        {
          menuItems.push(
            <Dropdown.Item onClick={this.showIframePopup}>
              встроить видео
            </Dropdown.Item>
          );
          const videoAuthor = this.props.video.author
            ? this.props.video.author.username
            : "";
          const username = this.props.user.username;
          if (username !== undefined && username === videoAuthor) {
            menuItems.push(
              <Dropdown.Item>
                <Edit />
              </Dropdown.Item>
            );
          }
        }
        break;
      default:
        menuItems.push(
          <Dropdown.Item onClick={this.showIframePopup}>
            встроить видео
          </Dropdown.Item>
        );
        break;
    }
    return menuItems;
  }

  render() {
    const menuItems = this.getMenuItems();

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
            {menuItems.map((menuItem, index, array) => (
              <div key={index}>{menuItem}</div>
            ))}
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
