import React from 'react';
import { Button, Popup } from 'semantic-ui-react';

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
    content="Search for more information."
    on="hover"
  />
);

export default CheckOutButton;
