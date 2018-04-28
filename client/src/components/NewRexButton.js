import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const NewRexButton = () => (
  <div className="newRecButton">
    <Link to="/entry">
      <Button circular className="add round-button" size="massive" color="red" icon="plus" />
    </Link>
  </div>
);

export default NewRexButton;
