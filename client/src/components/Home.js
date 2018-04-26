import React, { Component } from 'react';
import styled from 'styled-components';
import './Home.css';
import NavBar from './NavBar';
import BrowseView from './BrowseView';
import { Route, Link, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Dropdown, Menu, Button, Container, Header, Icon, Table, Grid } from 'semantic-ui-react';

import { Row, Col } from 'reactstrap';

import BookDetail from './Entry/BookDetail';

const NewRecommendationButton = () => (
  <div className="newRecButton">
    <Link to="/entry">
      <Button circular className="add round-button" size="massive" color="red" icon="plus" />
    </Link>
  </div>
);

class Home extends Component {
  state = {
    category: '',
    imageStatus: 'loading',
  };
  handleImageLoaded() {
    this.setState({ imageStatus: 'loaded' });
  }

  handleImageErrored() {
    this.setState({ imageStatus: 'failed to load' });
  }

  render() {
    return (
      <div>
        <NavBar loggedIn={true} handleAuth={this.props.handleAuth} />
        <div className="landing-page icon-list">
          <Button
            circular
            className="active category-button round-button"
            size="massive"
            color="red"
            icon="book"
          />
          <Button
            circular
            className="category-button round-button"
            size="massive"
            color="blue"
            icon="utensils"
          />
          <Button
            circular
            className="category-button round-button"
            size="massive"
            color="green"
            icon="music"
          />
          <Button
            circular
            className="category-button round-button"
            size="massive"
            color="yellow"
            icon="film"
          />
        </div>
        <BrowseView />
        <div className="newRec-button">
          <NewRecommendationButton />
        </div>
      </div>
    );
  }
}

class FindRecommendationButton extends Component {
  state = {
    category: '',
  };

  render() {
    return (
      <div>
        <Menu vertical>
          <Dropdown text="Find Something from" pointing="left" className="link item">
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  this.setState({ category: 'books' });
                }}
              >
                <Link to="/browse">Books</Link>
              </Dropdown.Item>
              <Dropdown.Item>Movies</Dropdown.Item>
              <Dropdown.Item>Restaurants</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </div>
    );
  }
}

export default Home;
