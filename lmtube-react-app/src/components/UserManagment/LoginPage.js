import React from "react";
import Header from "../Layout/Elements/Header";
import { login } from "../API/Login";

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onLogin = (e) => {
    login(e, this.state.username, this.state.password);
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-4 position-absolute login-form ">
              <form onSubmit={this.onLogin}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ЛДАП"
                    value={this.state.username}
                    name="username"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    placeholder="Пароль"
                  />
                </div>
                <div className="form-group text-center">
                  <button
                    className="btn btn-success btn-primary btn-lg"
                    type="submit"
                  >
                    Войти
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
