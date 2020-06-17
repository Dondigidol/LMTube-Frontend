import React from "react";
import UploadVideoContainer from "../containers/UploadVideoContainer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./../Elements/Header";

const UploadVideoPage = (props) => {
  if (props.validToken) {
    return (
      <div>
        <Header />
        <UploadVideoContainer />
      </div>
    );
  } else window.location.href = "/login";
};

UploadVideoPage.propTypes = {
  validToken: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    validToken: state.security.validToken,
  };
};

export default connect(mapStateToProps)(UploadVideoPage);
