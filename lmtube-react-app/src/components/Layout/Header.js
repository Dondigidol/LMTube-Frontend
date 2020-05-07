import React, { Component } from "react";
import SearchForm from "./SearchForm";

const pages = [
  ["Главная", "/"],
  ["Загрузить", "/add-video"],
];

class Header extends Component {
  state = {
    search: this.props.searching,
    highlight: this.props.highlight,
    parent: this.props.parent,
  };

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
                  <a className="nav-link " href={value[1]}>
                    {value[0]}
                  </a>
                ) : (
                  <a
                    className="nav-link text-muted font-weight-lighter"
                    href={value[1]}
                  >
                    {value[0]}
                  </a>
                )}
              </li>
            ))}
          </ul>
          {this.props.searching && (
            <SearchForm searchingMethod={this.props.searchingMethod} />
          )}
        </div>
      </nav>
    );
  }
}

export default Header;
