import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Popup, Item, Form, Input, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';

import RecommendationListItem from './RecommendationListItem';
import BrowseBookDetail from './BrowseBookDetail';
import NavBar from '../NavBar';
import AddRecommenderForm from './AddRecommenderForm';
import './BrowseDetail.css';
import CheckOutButton from '../Forms/CheckOutButton';
import NewRecButton from '../NewRexButton';

const BrowseContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin: 30px;
`;

class BrowseDetail extends React.Component {
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
  };

  render() {
    const target = this.props.location.query;
    return (
      <div>
        <NavBar loggedIn={true} handleAuth={this.props.handleAuth} />
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
        <div className="newRecBuffer">
          <NewRexButton />
        </div>
      </div>
    );
  }
}

// export default BrowseDetail;
export default withRouter(BrowseDetail);
