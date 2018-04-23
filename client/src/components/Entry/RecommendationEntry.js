import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Form,
  Input,
  TextArea,
  Button,
  Container,
  Divider
} from "semantic-ui-react";

class RecommendationEntry extends Component {
  state = {
    firstName: "",
    lastName: "",
    comments: "",
    inserted: false
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    const { firstName, lastName, comments } = this.state;
    // send our data to server and server will save to the db
    const {
      title,
      authors,
      description,
      imageUrl,
      link,
      rating,
      yearPublished,
      apiId
    } = this.props.entry;

    const category = "books";
    const userId = 3;
    const bookInfo = {
      title,
      imageUrl,
      authors,
      description,
      link,
      rating,
      yearPublished,
      firstName,
      lastName,
      comments,
      category,
      userId,
      apiId
    };

    fetch(`/u/${userId}/${category}`, {
      method: "POST",
      body: JSON.stringify(bookInfo),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => {
        if (res.status === 404) {
          alert(`${title} already exists in your recommendations!`);
        } else {
          this.setState({
            inserted: true
          });
        }
      })
      .catch(err => {
        throw err;
      });
  };

  render() {
    return this.state.inserted ? (
      <Redirect to="/browse" />
    ) : (
      <Container>
        <Divider />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              required
              id="form-input-control-first-name"
              control={Input}
              label="Recommender's First name"
              placeholder="First name"
              name="firstName"
              onChange={this.handleChange}
            />
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="Recommender's Last name"
              placeholder="Last name"
              name="lastName"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field
            id="form-textarea-control-opinion"
            control={TextArea}
            label="Comments"
            placeholder="Comments"
            name="comments"
            onChange={this.handleChange}
          />
          <Form.Field
            id="form-button-control-public"
            control={Button}
            content="Save"
          />
        </Form>
      </Container>
    );
  }
}

export default RecommendationEntry;
