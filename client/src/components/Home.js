import React, { Component } from 'react';
import styled from 'styled-components';
import './Home.css';
import NavBar from './NavBar';
import BrowseView from './BrowseView';
import { Route, Link, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Dropdown, Menu, Button, Container, Header, Icon, Table, Grid } from 'semantic-ui-react';

import { Row, Col } from 'reactstrap';

import BookDetail from './Entry/BookDetail';
import NewRexButton from './NewRexButton.js';

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
        <BrowseView userId={this.props.userId} />
        <div className="newRecBuffer">
          <NewRexButton />
        </div>
      </div>
    );
  }
}

export default Home;
