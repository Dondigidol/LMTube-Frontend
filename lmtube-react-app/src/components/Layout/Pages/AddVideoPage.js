import React, { Component } from "react";
import axios from "axios";
import Header from "../Header";

class AddVideoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      videoFile: null,
      posterFile: null,
    };
    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelectFile = this.onSelectFile.bind(this);
    this.uploadVideoFile = this.uploadVideoFile.bind(this);
    this.uploadPosterFile = this.uploadPosterFile.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    const videoDetails = {
      title: this.state.title,
      description: this.state.description,
      videos: null,
      poster: null,
    };

    this.uploadVideoFile(this.state.videoFile).then((res) => {
      videoDetails.videos = res.data;
      this.uploadPosterFile(this.state.posterFile).then((res) => {
        videoDetails.poster = res.data;
        console.log(videoDetails);
        axios
          .post("http://localhost:8080/lmtube/api/video/upload", videoDetails)
          .then((res) => {
            console.log(res);
          });
      });
    });
  }

  uploadVideoFile(file) {
    const url = "http://localhost:8080/lmtube/api/video/upload-video";
    const formData = new FormData();
    formData.append("videoFile", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  }

  uploadPosterFile(file) {
    const url = "http://localhost:8080/lmtube/api/poster/upload-poster";
    const formData = new FormData();
    formData.append("posterFile", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSelectFile(e) {
    this.setState({ [e.target.name]: e.target.files[0] });
  }

  render() {
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
                className="form-control"
                id="title"
                name="title"
                onChange={this.onChange}
              />
              <small className="text-muted">
                * Заголовок должен быть коротким, но точно отражающим суть видео
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="description">Описание к видео</label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                onChange={this.onChange}
              ></textarea>
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
              />
            </div>
            <div className="form-group">
              <label htmlFor="posterFile">Постер к видео</label>
              <input
                type="file"
                name="posterFile"
                id="posterFile"
                className="form-control-file"
                onChange={this.onSelectFile}
              />
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

export default AddVideoPage;
