import React, { Component } from 'react';
import { Button, Form, Input, TextArea } from 'semantic-ui-react';

class AddRecommenderForm extends Component {
  state = {
    toggle: false,
    firstName: '',
    lastName: '',
    comments: '',
  };

  handleSubmit = e => {
    //save to database, render new list of rec/comments;

    e.preventDefault();
    const { firstName, lastName, comments } = this.state;
    const id = this.props.id;

    const bookInfo = {
      id,
      firstName,
      lastName,
      comments,
    };
    const category = 'books';
    const userId = 3;
    //update recommendation table,
    console.log('this', this);
    fetch(`/r/${category}/${bookInfo.id}`, {
      method: 'POST',
      body: JSON.stringify(bookInfo),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res =>
        fetch(`/u/${userId}/${category}`)
          .then(res => res.json())
          .then(categoryItems => {
            let newRecs = Object.entries(categoryItems).find(book => {
              return book[0] === id;
            })[1].recommendations;
            return this.props.handleRecUpdate(newRecs);
          }),
      )
      .catch(err => {
        throw err;
      });

    this.setState({
      toggle: false,
      firstName: '',
      lastName: '',
      comments: '',
    });
  };

  render() {
    return (
      <div>
        <div>
          <Button
            className="add-recommender-button"
            color="blue"
            onClick={() => this.setState({ toggle: !this.state.toggle })}
            icon="add"
            content="Add a recommender"
          />
          <hr />

          {this.state.toggle && (
            <Form className="add-recommender-form" onSubmit={this.handleSubmit}>
              <Form.Group widths="equal">
                <Form.Field
                  required
                  id="form-input-control-first-name"
                  control={Input}
                  value={this.state.firstName}
                  onChange={e => this.setState({ firstName: e.target.value })}
                  label="First name"
                  placeholder="First name"
                />
                <Form.Field
                  id="form-input-control-last-name"
                  control={Input}
                  value={this.state.lastName}
                  onChange={e => this.setState({ lastName: e.target.value })}
                  label="Last name"
                  placeholder="Last name"
                />
              </Form.Group>
              <Form.Field
                id="form-textarea-control-opinion"
                control={TextArea}
                value={this.state.comments}
                onChange={e => this.setState({ comments: e.target.value })}
                label="Comments"
                placeholder="Comments"
              />
              <Form.Field
                className="recommender-form-submit-button"
                id="form-button-control-public"
                control={Button}
                content="Submit"
              />
            </Form>
          )}
        </div>
      </div>
    );
  }
}

export default AddRecommenderForm;
