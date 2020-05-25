import React from "react";
import Header from "../Elements/Header";
import { connect } from "react-redux";
import PropTypes from "prop-types"
import {userAuthentication} from "../../actions/userActions"
import classnames from "classnames"

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
                    className={classnames("form-control", {
                      "is-invalid": errors.username
                    })}
                    placeholder="ЛДАП"
                    value={this.state.username}
                    name="username"
                    onChange={this.onChange}
                  />
                  {
                    errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )
                  }
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control",{
                      "is-invalid":errors.password
                    })}
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    placeholder="Пароль"
                  />
                  {
                    errors.password && (
                      <div className="invalid-feedback" >{errors.password}</div>
                    )
                  }
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
