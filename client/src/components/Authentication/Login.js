// React
import React, { Component } from 'react';
// modules
import { Form, Container, Button } from 'semantic-ui-react';
import axios from 'axios';
// components
import './Login.css';
import NavBar from '../NavBar';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = (event, { name, value }) => this.setState({ [name]: value });

  handleSubmit = event => {
    const self = this;
    const state = this.state;
    axios
      .post('/login', this.state)
      .then(res => {
        self.props.handleAuth({ ...res.data, state });
      })
      .catch(err => console.log(err));

    this.setState({ username: '', password: '' });
  };

  render() {
    const { name, email } = this.state;

    return (
      <div>
        <NavBar loggedIn={false} />
        <Container text>
          <Form onSubmit={this.handleSubmit}>
            <Form>
              <label>Username</label>
              <Form.Input
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <label>Password</label>
              <Form.Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Button className="login-button" floated="right" content="Submit" color="blue" />
            </Form>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
