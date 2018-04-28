import React, { Component } from 'react';

import { Button, Container, Grid } from 'semantic-ui-react';

import Login from './Login';
import Signup from './Signup';
import NavBar from '../NavBar';
import './Login.css';

class Auth extends Component {
  state = {
    login: false,
    signup: false,
  };

  handleLoginClick() {
    this.setState({
      login: true,
    });
  }

  handleSignupClick() {
    this.setState({
      signup: true,
    });
  }

  render() {
    if (this.state.login) {
      return <Login handleAuth={this.props.handleAuth} />;
    } else if (this.state.signup) {
      return <Signup handleAuth={this.props.handleAuth} />;
    } else {
      return (
        <div>
          <NavBar loggedIn={false} />
          <Container>
            <div className="auth">
              <Button
                className="auth-button"
                size="massive"
                color="green"
                onClick={() => this.handleLoginClick()}
              >
                Login
              </Button>
              <div className="auth">
                <Button
                  className="auth-button"
                  size="massive"
                  color="yellow"
                  onClick={() => this.handleSignupClick()}
                >
                  Signup
                </Button>
              </div>
            </div>
          </Container>
        </div>
      );
    }
  }
}

export default Auth;
