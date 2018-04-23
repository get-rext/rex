import React, { Component } from 'react';
import styled from 'styled-components';
import './Home.css';
import book from '../images/book.png';
import music from '../images/music.png';
import movie from '../images/movie.png';
import food from '../images/food.png';
import NavBar from './NavBar';
import { Route, Link, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Dropdown, Menu, Button, Container, Header, Icon } from 'semantic-ui-react';

import { Row, Col } from 'reactstrap';

import BookDetail from './Entry/BookDetail';

const NewRecommendationButton = () => (
  <div className="newRecButton">
    <Link to="/entry">
      <Button size="massive" color="teal" borderRadius="30px">
        New Recommendations
        <Icon className="plus" name="plus" />
      </Button>
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
        <NavBar />
        <div className="userName">Welcome! {this.props.username}</div>

        <div className="icon-list">
          <div>
            <Link to="/browse">
              <img
                src={book}
                width="80"
                height="80"
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
              />
            </Link>
          </div>
          <div>
            <img
              src={food}
              width="80"
              height="80"
              onLoad={this.handleImageLoaded.bind(this)}
              onError={this.handleImageErrored.bind(this)}
            />
          </div>
          <div>
            <img
              src={music}
              width="80"
              height="80"
              onLoad={this.handleImageLoaded.bind(this)}
              onError={this.handleImageErrored.bind(this)}
            />
          </div>
          <div>
            <img
              src={movie}
              width="80"
              height="80"
              onLoad={this.handleImageLoaded.bind(this)}
              onError={this.handleImageErrored.bind(this)}
            />
          </div>
        </div>
        <div>
          <div className="newRec-button">
            <NewRecommendationButton />
          </div>
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
                  //<Redirect to="/browse" />;
                  //redirect is like component
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
