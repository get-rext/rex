import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Home';
import EntryDetail from './Entry/EntryDetail';
import BrowseDetail from './Browse/BrowseDetail';
import { Button, Container } from 'semantic-ui-react';
import { Dropdown, Menu } from 'semantic-ui-react';
import axios from 'axios';
import EntryListView from './EntryListView';
import BrowseView from './BrowseView';
import CssBaseline from 'material-ui/CssBaseline';
import { Navbar } from 'react-bootstrap';
import Auth from './Auth';

const NewRecommendationButton = () => <Button>Enter New Recommendation </Button>;

class App extends Component {
  state = {
    isAuthenticated: false,
    username: '',
  };

  handleAuth({ isAuthenticated, username }) {
    this.setState({ isAuthenticated, username });
  }

  componentDidMount() {
    const self = this;
    axios
      .get('/auth')
      .then(res => {
        self.handleAuth(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const username = this.state.username;

    if (this.state.isAuthenticated) {
      return (
        <Switch>
          <Route exact path="/" render={() => <Home username={username} />} />
          <Route path="/browse/:bookId" component={BrowseDetail} />
          <Route path="/entry/:bookId" component={EntryDetail} />
          <Route exact path="/entry" component={EntryListView} />
          <Route exact path="/browse" component={BrowseView} />
        </Switch>
      );
    } else {
      return <Auth handleAuth={this.handleAuth.bind(this)} />;
    }
  }
}

export default App;
