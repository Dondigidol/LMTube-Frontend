import React from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const IframePopup = (props) => {
  const iframeText =
    "<iframe " +
    "title='" +
    props.video.title +
    "' " +
    "src='http://localhost:3000/embed/" +
    props.video.id +
    "' " +
    "frameBorder='0' " +
    "height= '300' " +
    "width='" +
    300 * 1.77 +
    "' allowfullscreen />";
  return (
    <Modal show={props.show} animation={false} onHide={props.hide}>
      <Modal.Body>
        <p>Скопируйте текст в необходимую страницу</p>
        <textarea
          className="form-control w-100"
          defaultValue={iframeText}
          rows="3"
          style={{ fontSize: "0.8em" }}
        />
      </Modal.Body>
    </Modal>
  );
};

IframePopup.propTypes = {
  video: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    video: state.videos.video,
  };
};

export default connect(mapStateToProps)(IframePopup);
