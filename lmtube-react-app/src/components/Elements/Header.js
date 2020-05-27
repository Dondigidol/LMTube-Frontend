import React from "react";
import SearchForm from "./SearchForm";
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {userLogout} from "../../actions/userActions"
import classnames from "classnames"

const pages = [
  // title, uri, is public?, searchingField 
  ["Главная", "/", true, true], 
  ["Мои видео", "/user-videos", false, false],
  ["Загрузить", "/add-video", false, false], 
];



class Header extends React.Component {

  state = {
    searchEnabled: false
  }

  componentDidMount=()=>{    
    const path = window.location.pathname
    pages.forEach(page => {      
      if (page[1] === path && page[3])
        this.setState({
          searchEnabled: true
        })
    });
  }


  render() {
    const {validToken, user} = this.props.security;
    const curPath = window.location.pathname;

    const userIsAuthenticated = (
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {      
            pages.map((item) => (
              <li key={item[0]} className="nav-item">
              {
                <a className={classnames("nav-link", {
                  "nav-link text-muted font-weight-lighter": item[1] !== curPath
                })} href={item[1]}>{item[0]}</a>
              }              
              </li>
            ))
          }
        </ul>
        {
          this.state.searchEnabled && (
            <SearchForm searchingMethod={this.props.searchingMethod} />
          )
        }

        <div className="navbar-nav">
          <a className="nav-link text-muted font-weight-lighter" href="/" onClick={()=>this.props.userLogout()}>Выйти</a>
        </div>
      </div>
      )

    const userNotAuthenticated = (
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
        {      
          pages.map((item) => 
            item[2] && (
              <li key={item[0]} className="nav-item">
                {
                  <a className={classnames("nav-link", {
                    "nav-link text-muted font-weight-lighter": item[1] !== curPath
                  })} href={item[1]}>{item[0]}</a>
                }              
              </li>
            )
          )
        }  
        </ul>
        {
          this.state.searchEnabled && (
            <SearchForm searchingMethod={this.props.searchingMethod} />
          )
        }
        <div className="navbar-nav">
          <a className={classnames("nav-link", {
            "nav-link text-muted font-weight-lighter": "/login" !== curPath
          })} href="/login">Войти</a>
        </div>
      </div>
    )

    let headerLinks;

    if(validToken && user){
      headerLinks = userIsAuthenticated
    } else {
      headerLinks = userNotAuthenticated
    }

    return (
      <nav className="navbar navbar-expand navbar-light header-bg-color">
        <a className="navbar-brand" href="/">
          LMPlay
        </a>
          {headerLinks}
      </nav>
    );
  }
}

Header.propTypes = {
  userLogout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
}

const mapStateToProps = state =>{
  return {
    security: state.security
  } 
}

export default connect(mapStateToProps, {userLogout})(Header);
