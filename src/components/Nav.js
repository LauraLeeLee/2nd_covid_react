import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {  NavLink } from "react-router-dom";

class Nav extends Component {

  render() {

    return(
      <React.Fragment>
        <nav className="home-view-nav">
          <ul>
            <li>
              <NavLink activeClassName="active-link" exact to="/" >
                  Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-link" to="/Countries">
                  Data by Country
              </NavLink>
            </li>
            <li>
            <NavLink activeClassName="active-link" to="/States">
                Data by State
            </NavLink>
            </li>
          </ul>
        </nav>
      </React.Fragment>

    )
  }
}

export default Nav;