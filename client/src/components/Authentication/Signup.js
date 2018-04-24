// react
import React, { Component } from 'react';
// modules
import { Form } from 'semantic-ui-react';
import axios from 'axios';

class Signup extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  handleChange = (event, { name, value }) => this.setState({ [name]: value });

  handleSubmit = event => {
    const self = this;
    axios
      .post('/signup', this.state)
      .then(res => {
        self.props.handleAuth(res.data);
      })
      .catch(err => console.log(err));

    this.setState({ username: '', password: '', firstName: '', lastName: '' });
  };

  render() {
    const { username, password, firstName, lastName } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
          />
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

export default Signup;
