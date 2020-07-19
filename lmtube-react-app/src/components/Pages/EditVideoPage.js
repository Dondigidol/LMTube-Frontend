import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getVideo } from "../../actions/videoActions";
import roles from "../../roles";
import Header from "../Elements/Header";
import classnames from "classnames";
import { editVideo } from "../../actions/videoActions";

class EditVideoPage extends React.Component {
  constructor(props) {
    super(props);
    if (!this.props.validToken) window.location.href = `/404`;
    switch (this.props.user.role) {
      case roles.ADMINISTRATOR:
      case roles.MODERATOR:
      case roles.CREATOR:
        this.props.getVideo(this.props.match.params.videoId);
        break;
      default:
        window.location.href = `/404`;
        break;
    }

    this.state = {
      title: "",
      description: "",
      titleIsEdited: false,
      descriptionIsEdited: false,
      errors: {},
      video: undefined,
    };

    this.title = React.createRef();
    this.description = React.createRef();
  }

  shouldComponentUpdate(newProps, newState) {
    if (newProps.video && newProps.video !== newState.video) {
      this.setState({
        video: newProps.video,
      });
    }
    return true;
  }

  componentDidUpdate(newProps) {
    if (newProps.video.id) {
      if (
        newProps.user.role === roles.CREATOR &&
        newProps.video.author.username !== newProps.user.username
      ) {
        window.location.href = "/404";
      }

      if (this.title.current.value === "" && !this.state.titleIsEdited) {
        this.title.current.value = newProps.video.title;
        this.setState({
          title: this.title.current.value,
          titleIsEdited: true,
        });
      }

      if (
        this.description.current.value === "" &&
        !this.state.descriptionIsEdited
      ) {
        this.description.current.value = newProps.video.description;
        this.setState({
          description: this.description.current.value,
          descriptionIsEdited: true,
        });
      }
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const videoId = this.props.match.params.videoId;
    const title = this.state.title;
    const description = this.state.description;
    this.props.editVideo(videoId, title, description);
  };

  render() {
    return (
      <div>
        <Header />
        <div className="row">
          {!this.props.errors.message ? (
            this.props.video.id && (
              <div className="my-auto col-8 offset-2">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Заголовок</label>
                    <input
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": this.props.errors.title,
                      })}
                      name="title"
                      ref={this.title}
                      value={this.state.title}
                      onChange={this.onChange}
                    />
                    {this.props.errors.title && (
                      <div className="invalid-feedback">
                        {this.props.errors.title}
                      </div>
                    )}
                    <small className="text-muted">
                      * Заголовок должен быть коротким, но точно отражающим суть
                      видео
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Описание к видео</label>
                    <textarea
                      className={classnames("form-control", {
                        "is-invalid": this.props.errors.description,
                      })}
                      ref={this.description}
                      value={this.state.description}
                      name="description"
                      rows="5"
                      onChange={this.onChange}
                    ></textarea>
                    {this.props.errors.description && (
                      <div className="invalid-feedback">
                        {this.props.errors.description}
                      </div>
                    )}
                    <small className="text-muted">
                      * Короткое, но ёмкое по смыслу описание видео
                    </small>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-success btn-lg"
                    >
                      Сохранить
                    </button>
                  </div>
                </form>
              </div>
            )
          ) : (
            <div className="col-12 text-center mt-4 text-secondary">
              {this.props.errors.message}
            </div>
          )}
        </div>
      </div>
    );
  }
}

EditVideoPage.propTypes = {
  video: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getVideo: PropTypes.func.isRequired,
  editVideo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    video: state.videos.video,
    user: state.security.user,
    errors: state.errors,
    validToken: state.security.validToken,
  };
};

export default connect(mapStateToProps, { getVideo, editVideo })(EditVideoPage);
