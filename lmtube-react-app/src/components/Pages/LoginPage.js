import React from "react";
import Header from "../Elements/Header";
import { connect } from "react-redux";
import PropTypes from "prop-types"
import {userAuthentication} from "../../actions/userActions"

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps){
    if (nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onLogin = (e) => {
    e.preventDefault();
    console.log(this.state.username);
    
    const creditials ={
      username: this.state.username,
      password: this.state.password
    }
    this.props.userAuthentication(creditials, this.props.history)
  };

  render() {
    const errors = this.state.errors
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
                  <p>{errors.username}</p>
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
                  <p>{errors.password}</p>
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


LoginPage.propTypes = {
  userAuthentication: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps =state =>({
  errors: state.errors
})

export default connect(mapStateToProps, {userAuthentication}) (LoginPage);
