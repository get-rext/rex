// React
import React, { Component } from 'react';
// modules
import { Form } from 'semantic-ui-react';
import axios from 'axios';
// components
import './Login.css';

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
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <Form.Input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Form.Button content="Submit" />
        </Form.Group>
      </Form>
    );
  }
}

export default Login;
