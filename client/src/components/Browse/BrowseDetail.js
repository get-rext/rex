import React, { Component } from 'react';
import { Button, Popup, Item, Form, Input, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';
import { Route, Link, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { RSA_SSLV23_PADDING } from 'constants';
import RecommendationListItem from './RecommendationListItem';
import BrowseBookDetail from './BrowseBookDetail';
import NavBar from '../NavBar';
import './BrowseDetail.css';

const BrowseContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin: 30px;
`;

const CheckOutButton = props => (
  <Popup
    className="popup-box"
    trigger={
      <Button
        className="checkout-button"
        color="blue"
        as="a"
        target="_blank"
        href={props.url}
        icon="search"
        content="Check it out"
      />
    }
    content="Search for more information about the book."
    on="hover"
  />
);

class AddRecommenderButton extends Component {
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

class BrowseDetail extends Component {
  state = {
    book: this.props.location.query.book,
    recs: this.props.location.query.recommendations,
  };

  handleRecUpdate = clickedBookRec => {
    console.log('this.state before~~~~', this.state);
    console.log('clickedBookRec', clickedBookRec);
    this.setState({
      recs: clickedBookRec,
    });
    console.log('this.state after~~~~', this.state);
  };
  // const BrowseDetail = props => {
  //   return (
  //     <div>
  //       <header className="book-detail">
  //         <BrowseContainer>
  //           <BrowseBookDetail book={props.book} />
  //         </BrowseContainer>
  //       </header>

  //       <Item.Group>
  //         {props.recommendations.map(recommendation => (
  //           <RecommendationListItem
  //             handleRemoveRec={props.handleRemoveRec}
  //             id={props.id}
  //             recommendation={recommendation}
  //             recommendations={props.recommendations}
  //           />
  //         ))}
  //       </Item.Group>

  //       <div className="buttons">
  //         <CheckOutButton url={props.book.url} />

  render() {
    console.log(this.props.location);
    const target = this.props.location.query;
    return (
      <div>
        <NavBar />
        <header className="book-detail">
          <BrowseBookDetail book={this.state.book} />
        </header>
        <Item.Group>
          {this.state.recs.map(recommendation => (
            <RecommendationListItem recommendation={recommendation} />
          ))}
        </Item.Group>
        <div className="button-list-container">
          <div className="checkout-button-container">
            <CheckOutButton url={this.state.book.url} />
          </div>
          <div className="add-reco-form-container">
            <AddRecommenderButton
              handleRecUpdate={this.handleRecUpdate}
              book={this.state.book}
              id={target.id}
              recommendations={this.state.recs}
            />
          </div>
          <div>
            <Link to="/browse">
              <div className="back-button"> {`< back`}</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BrowseDetail;
