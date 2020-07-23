import React from "react";
import SearchForm from "./SearchForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userLogout } from "../../actions/userActions";
import classnames from "classnames";

const pages = [
  // title, uri, is public?, searchingField
  ["Главная", "/", 0, true], // 0 - available to all users, 1 - for creater or highter, 2 - for moderators or highter, 3 - for admins
  ["Мои видео", "/user-videos", 1, false],
  ["Загрузить", "/uploading", 1, false],
  ["Модерация", "/moderation", 2, true],
];

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchEnabled: false,
    };
    this.menu = React.createRef();
  }

  componentDidMount = () => {
    const path = window.location.pathname;
    pages.forEach((page) => {
      if (page[1] === path && page[3])
        this.setState({
          searchEnabled: true,
        });
    });
  };

  menuButtonClick = () => {
    const menu = this.menu.current;
    if (menu.style.display === "" || menu.style.display === "none") {
      menu.style.display = "block";
    } else if (menu.style.display === "block") {
      menu.style.display = "";
    }
  };

  render() {
    const { validToken, user } = this.props.security;
    const curPath = window.location.pathname;
    var accessLevel = 0;

    switch (user.role) {
      case "CREATOR":
        accessLevel = 1;
        break;
      case "MODERATOR":
        accessLevel = 2;
        break;
      case "ADMINISTRATOR":
        accessLevel = 3;
        break;
      default:
        break;
    }

    const userIsAuthenticated = (
      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
        ref={this.menu}
      >
        <ul className="navbar-nav mr-auto">
          {pages.map(
            (page) =>
              page[2] <= accessLevel && (
                <li key={page[0]} className="nav-item">
                  {
                    <a
                      className={classnames("nav-link active", {
                        "nav-link text-muted font-weight-lighter":
                          page[1] !== curPath,
                      })}
                      href={page[1]}
                    >
                      {page[0]}
                    </a>
                  }
                </li>
              )
          )}
        </ul>
        {this.state.searchEnabled && (
          <SearchForm searchingMethod={this.props.searchingMethod} />
        )}
      </div>
    );

    const userNotAuthenticated = (
      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
        ref={this.menu}
      >
        <ul className="navbar-nav mr-auto">
          {pages.map(
            (page) =>
              page[2] === 0 && (
                <li key={page[0]} className="nav-item">
                  {
                    <a
                      className={classnames("nav-link active", {
                        "nav-link text-muted font-weight-lighter":
                          page[1] !== curPath,
                      })}
                      href={page[1]}
                    >
                      {page[0]}
                    </a>
                  }
                </li>
              )
          )}
        </ul>
        {this.state.searchEnabled && (
          <SearchForm searchingMethod={this.props.searchingMethod} />
        )}
      </div>
    );

    let headerLinks;

    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userNotAuthenticated;
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light header-bg-color">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.menuButtonClick}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/">
            LMPlay
          </a>

          {headerLinks}
          {validToken ? (
            <div className="navbar-expand">
              <div className="inline-block float-left text-muted text-center ml-3 mr-3">
                <div className="small">{user.fullName}</div>
                <div className="small m-0 p-0">{user.role}</div>
              </div>
              <div className="inline-block float-right">
                <a
                  className="nav-link text-muted font-weight-lighter"
                  href="/"
                  onClick={() => this.props.userLogout()}
                >
                  Выйти
                </a>
              </div>
            </div>
          ) : (
            <div className="navbar-nav">
              <a
                className={classnames("nav-link active", {
                  "nav-link text-muted font-weight-lighter":
                    "/login" !== curPath,
                })}
                href="/login"
              >
                Войти
              </a>
            </div>
          )}
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  userLogout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    security: state.security,
  };
};

export default connect(mapStateToProps, { userLogout })(Header);
