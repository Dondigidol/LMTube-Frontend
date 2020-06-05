import React, { Component } from "react";
import Header from "../Elements/Header";
import { uploadVideoDetails } from "../../actions/videoActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class AddVideoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      videoFile: {},
      posterFile: {},
      errors: {},
    };
  }

  // life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
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
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSelectFile = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  render() {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      window.location.href = "/login";
    }

    const { errors } = this.state;

    return (
      <div>
        <Header searching={false} />
        <div className="container">
          <h4 className="display-4 text-center">Загрузка видео</h4>
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
                <div className="invalid-feedback d-block">
                  {errors.videoFile}
                </div>
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
      </div>
    );
  }
}

AddVideoPage.propTypes = {
  uploadVideoDetails: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  security: state.security,
});

export default connect(mapStateToProps, { uploadVideoDetails })(AddVideoPage);
