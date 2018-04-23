import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import './Login.css';
import axios from 'axios';

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
        console.log('state being sent, ', state);
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
