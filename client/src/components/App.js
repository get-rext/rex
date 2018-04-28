// React
import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
// Modules
import { Dropdown, Menu, Button, Container } from 'semantic-ui-react';
import axios from 'axios';
import { Navbar } from 'react-bootstrap';
// Components
import Home from './Home';
import Profile from './Profile';
import EntryDetail from './Entry/EntryDetail';
import BrowseDetail from './Browse/BrowseDetail';
import EntryListView from './EntryListView';
import BrowseView from './BrowseView';
import Auth from './Authentication/Auth';

class App extends Component {
  state = {
    isAuthenticated: false,
    username: '',
    first_name: '',
    last_name: '',
    id: '',
  };

  handleAuth({ isAuthenticated, username, id, first_name, last_name }) {
    this.setState({ isAuthenticated, username, id, first_name, last_name });
  }

  // On Mount, gets authentication from server, sets state of isAuthenticated
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
    const { username, isAuthenticated, id, first_name, last_name } = this.state;

    // If state authenticated, loads homepage, otherwise login / signup
    if (isAuthenticated) {
      return (
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <Home username={username} userId={id} handleAuth={this.handleAuth.bind(this)} />
            )}
          />
          <Route
            path="/profile"
            render={() => (
              <Profile
                username={username}
                firstName={first_name}
                lastName={last_name}
                handleAuth={this.handleAuth.bind(this)}
              />
            )}
          />
          <Route
            path="/browse/:bookId"
            render={() => <BrowseDetail handleAuth={this.handleAuth.bind(this)} />}
          />
          <Route path="/entry/:bookId" component={EntryDetail} userId={id} />
          <Route
            exact
            path="/entry"
            render={() => <EntryListView handleAuth={this.handleAuth.bind(this)} />}
          />
          <Route exact path="/browse" component={BrowseView} />
        </div>
      );
    } else {
      return <Auth handleAuth={this.handleAuth.bind(this)} />;
    }
  }
}

export default App;
