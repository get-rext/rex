import React, { Component } from "react";
import styled from "styled-components";
import {
  Dropdown,
  Menu,
  Button,
  Container,
  Header,
  Icon
} from "semantic-ui-react";
import { Route, Link, BrowserRouter, Switch, Redirect } from "react-router-dom";

const ButtonContainer = styled.ul`
  width: 100%;
  padding: 10%;
`;

// const FindRecommendationButton = () => (
//   <Link to="/browse">
//     <Button>
//       Find Something from <Category />
//     </Button>
//   </Link>
// );

const NewRecommendationButton = () => (
  <Container>
    <Link to="/entry">
      <Button animated="fade">
        <Button.Content visible>Enter New Recommendation</Button.Content>
        <Button.Content hidden>+</Button.Content>
      </Button>
    </Link>
  </Container>
);

class Home extends Component {
  state = {
    category: ""
  };

  render() {
    return (
      <ButtonContainer>
        <div className="new-recommendation-button">
          <NewRecommendationButton />
        </div>
        <div className="find-recommendation-button">
          <FindRecommendationButton category={this.state.category} />
        </div>
      </ButtonContainer>
    );
  }
}

class FindRecommendationButton extends Component {
  state = {
    category: ""
  };

  render() {
    return (
      <div>
        <Menu vertical>
          <Dropdown
            text="Find Something from"
            pointing="left"
            className="link item"
          >
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  this.setState({ category: "books" });
                  //<Redirect to="/browse" />;
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
