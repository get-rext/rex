import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import rex from '../images/rex.svg';

class NavBar extends Component {
  state = {};

  handleLogout() {
    const self = this;
    axios
      .get('/logout')
      .then(res => {
        self.props.handleAuth({ ...res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                <span>
                  <img src={rex} height="45" />
                  Rex
                </span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Profile />
            <Logout handleLogout={this.handleLogout.bind(this)} />
          </Navbar.Collapse>
        </Navbar>
      );
    }
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <span>
                <img src={rex} height="45" />
                Rex
              </span>
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

const Profile = () => (
  <Nav>
    <NavItem eventKey={2} href="#">
      Profile
    </NavItem>
  </Nav>
);

const Logout = props => (
  <Nav pullRight>
    <NavItem eventKey={2} onClick={props.handleLogout}>
      Log out
    </NavItem>
  </Nav>
);

export default NavBar;
