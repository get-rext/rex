import React, { Component } from "react";
import { Button, Popup, Item, Form, Input, TextArea } from "semantic-ui-react";
import { Route, Link, BrowserRouter, Switch, Redirect } from "react-router-dom";
import RecommendationListItem from "./RecommendationListItem";
import BrowseBookDetail from "../Browse/BrowseBookDetail";
import styled from "styled-components";
import { RSA_SSLV23_PADDING } from "constants";

const BrowseContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin: 30px;
`;

const CheckOutButton = props => (
  <Popup
    trigger={
      <Button as="a" href={props.url} icon="search" content="Check it out" />
    }
    content="Search for more information about the book."
    on="hover"
  />
);

class AddRecommenderButton extends Component {
  state = {
    toggle: false,
    firstName: "",
    lastName: "",
    comments: ""
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
      comments
    };
    const category = "books";
    const userId = 3;
    //update recommendation table,
    fetch(`/u/${userId}/${category}/${bookInfo.id}`, {
      method: "POST",
      body: JSON.stringify(bookInfo),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res =>
        fetch(`/u/${userId}/${category}`)
          .then(res => res.json())
          .then(categoryItems => {
            let newRecs = Object.entries(categoryItems).find(book => {
              return book[0] === id;
            })[1].recommendations;
            return this.props.handleRecUpdate(newRecs);
          })
      )
      .catch(err => {
        throw err;
      });
  };

  render() {
    return (
      <div>
        <Popup
          trigger={
            <Button
              onClick={() => this.setState({ toggle: !this.state.toggle })}
              icon="add"
              content="Add a recommender"
            />
          }
        />
        {this.state.toggle && (
          <Form onSubmit={this.handleSubmit}>
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
              id="form-button-control-public"
              control={Button}
              content="Submit"
              label="Label with htmlFor"
            />
          </Form>
        )}
      </div>
    );
  }
}

//const MarkAsCompleteButton = () => <Button>Mark as done</Button>;
//const RemoveFromListButton = () => <Button>Remove from list</Button>;

const BrowseDetail = props => {
  return (
    <div>
      <header className="book-detail">
        <BrowseContainer>
          <BrowseBookDetail book={props.book} />
        </BrowseContainer>
      </header>
      <Item.Group>
        {props.recommendations.map(recommendation => (
          <RecommendationListItem recommendation={recommendation} />
        ))}
      </Item.Group>
      <div className="buttons">
        <CheckOutButton url={props.book.url} />

        <AddRecommenderButton
          handleRecUpdate={props.handleRecUpdate}
          book={props.book}
          id={props.id}
          recommendations={props.recommendations}
        />
      </div>
    </div>
  );
};

export default BrowseDetail;
