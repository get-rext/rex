// react
import React, { Component } from 'react';
// modules
import { Form, Container, Button } from 'semantic-ui-react';
import axios from 'axios';
import NavBar from '../NavBar';

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
      <div>
        <NavBar loggedIn={false} />
        <Container text>
          <Form onSubmit={this.handleSubmit}>
            <Form>
              <label>First Name</label>
              <Form.Input name="firstName" value={firstName} onChange={this.handleChange} />
              <label>Last Name</label>
              <Form.Input name="lastName" value={lastName} onChange={this.handleChange} />
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
              <Button className="signup-button" floated="right" content="Submit" color="blue" />
            </Form>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Signup;
