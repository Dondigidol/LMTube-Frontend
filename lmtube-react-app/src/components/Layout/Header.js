import React, { Component } from "react";

const pages = [
  ["Главная", "/"],
  ["Загрузить", "/add-video"],
];

function SearchField(props) {
  if (props.enable === "true") {
    return (
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Поиск"
          aria-label="Поиск"
        />
      </form>
    );
  } else return null;
}

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: this.props.searching,
      highlight: this.props.highlight,
    };
  }

  render() {
    const curPath = window.location.pathname;
    return (
      <nav className="navbar navbar-expand navbar-light header-bg-color">
        <a className="navbar-brand" href="/">
          LMTube
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {pages.map((value) => (
              <li key={value[0]} className="nav-item">
                {curPath === value[1] ? (
                  <a className="nav-link menu-selected-item" href={value[1]}>
                    {value[0]}
                  </a>
                ) : (
                  <a className="nav-link" href={value[1]}>
                    {value[0]}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <SearchField enable={this.state.search} />
        </div>
      </nav>
    );
  }
}

export default Header;
