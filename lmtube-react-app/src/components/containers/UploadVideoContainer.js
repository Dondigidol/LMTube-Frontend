import React, { Component } from "react";
import { uploadVideoDetails } from "../../actions/videoActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Loader from "../Elements/Loader";

class UploadVideoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      videoFile: {},
      posterFile: {},
      showLoader: false,
    };
  }

  submitForm = (e) => {
    e.preventDefault();
    const videoDetails = {
      title: this.state.title,
      description: this.state.description,
      videoFile: this.state.videoFile,
      posterFile: this.state.posterFile,
    };
    this.props.uploadVideoDetails(videoDetails, this.props.history);
    this.setState({
      showLoader: true,
    });
  };

  shouldComponentUpdate() {
    if (this.state.showLoader) {
      this.setState({
        showLoader: false,
      });
    }
    return true;
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSelectFile = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  render() {
    const errors = this.props.errors;
    return (
      <div className="container">
        <Loader show={this.state.showLoader} />
        <p className="h4 text-center text-secondary">Загрузка видео</p>
        <form
          className="text-left col-8 offset-2"
          onSubmit={this.submitForm}
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label htmlFor="title">Заголовок</label>
            <input
              type="text"
              className={classnames("form-control", {
                "is-invalid": errors.title,
              })}
              id="title"
              name="title"
              onChange={this.onChange}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
            <small className="text-muted">
              * Заголовок должен быть коротким, но точно отражающим суть видео
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="description">Описание к видео</label>
            <textarea
              className={classnames("form-control", {
                "is-invalid": errors.description,
              })}
              name="description"
              id="description"
              onChange={this.onChange}
              rows="5"
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
            <small className="text-muted">
              * Короткое, но ёмкое по смыслу описание загружаемого видео
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="videoFile">Видеофайл</label>
            <input
              type="file"
              name="videoFile"
              id="videoFile"
              className="form-control-file"
              onChange={this.onSelectFile}
              accept="video/*"
            />
            {errors.videoFile && (
              <div className="invalid-feedback d-block">{errors.videoFile}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="posterFile">Постер к видео</label>
            <input
              type="file"
              name="posterFile"
              id="posterFile"
              className="form-control-file"
              onChange={this.onSelectFile}
              accept="image/*"
            />
            {errors.posterFile && (
              <div className="invalid-feedback d-block">
                {errors.posterFile}
              </div>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary btn-success btn-lg"
            >
              Загрузить
            </button>
          </div>
        </form>
      </div>
    );
  }
}

UploadVideoContainer.propTypes = {
  uploadVideoDetails: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  validToken: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.security.user,
  validToken: state.security.validToken,
});

export default connect(mapStateToProps, { uploadVideoDetails })(
  UploadVideoContainer
);
