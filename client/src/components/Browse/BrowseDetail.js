import React, { Component } from 'react';
import { Button, Popup, Item, Form, Input, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import RecommendationListItem from './RecommendationListItem';
import BrowseBookDetail from './BrowseBookDetail';
import NavBar from '../NavBar';
import AddRecommenderForm from './AddRecommenderForm';
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
            <RecommendationListItem recommendation={recommendation} userId={target.userId} />
          ))}
        </Item.Group>
        <div className="button-list-container">
          <div className="checkout-button-container">
            <CheckOutButton url={this.state.book.url} />
          </div>
          <div className="add-reco-form-container">
            <AddRecommenderForm
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
