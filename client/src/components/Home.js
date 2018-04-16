import React from 'react';
import { Button } from 'semantic-ui-react';
import { Dropdown, Menu } from 'semantic-ui-react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';

const Category = () => {
  const options = [{ key: 1, text: 'Books', value: 1 }, { key: 2, text: 'Movies', value: 2 }];
  return (
    <Menu compact>
      <Dropdown text="Category" options={options} simple item />
    </Menu>
  );
};

const FindRecommendationButton = () => (
  <Link to="/browse">
    <Button>
      Find Something from <Category />
    </Button>
  </Link>
);

const NewRecommendationButton = () => (
  <Link to="/entry">
    <Button>Enter New Recommendation </Button>{' '}
  </Link>
);

const Home = () => (
  <div>
    <div className="new-recommendation-button">
      <NewRecommendationButton />
    </div>
    <div className="find-recommendation-button">
      <FindRecommendationButton />
    </div>
  </div>
);

export default Home;
