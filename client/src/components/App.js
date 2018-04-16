import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Home';
import EntryDetail from './Entry/EntryDetail';
import BrowseDetail from './Browse/BrowseDetail';
import { Button } from 'semantic-ui-react';
import { Dropdown, Menu } from 'semantic-ui-react';
import EntryListView from './EntryListView';
import BrowseView from './BrowseView';

const Title = () => <h1> Rex </h1>;
const NewRecommendationButton = () => <Button>Enter New Recommendation </Button>;

class App extends Component {
  render() {
    return (
      <div>
        <Title />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/browsedetail" component={BrowseDetail} />
          <Route exact path="/entrydetail" component={EntryDetail} />
          <Route exact path="/entry" component={EntryListView} />
          <Route exact path="/browse" component={BrowseView} />
        </Switch>
      </div>
    );
  }
}

export default App;
