import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import RecommendationListItem from "./RecommendationListItem";
import BrowseBookDetail from "../Browse/BrowseBookDetail";

const CheckOutButton = () => <Button>Checkout</Button>;
const MarkAsCompleteButton = () => <Button>Mark as done</Button>;
const RemoveFromListButton = () => <Button>Remove from list</Button>;
const AddRecommenderButton = () => <Button>Add Recommender</Button>;

const BrowseDetail = props => {
  return (
    <div>
      {console.log("book", props.book, "rec", props.recommendations)}
      <header className="book-detail">
        <BrowseBookDetail book={props.book} />
      </header>
      <ul className="list-of-comments">
        {props.recommendations.map(recommendation => (
          <RecommendationListItem recommendation={recommendation} />
        ))}
      </ul>
      <div className="buttons">
        <CheckOutButton />
        <MarkAsCompleteButton />
        <RemoveFromListButton />
        <AddRecommenderButton />
      </div>
    </div>
  );
};

export default BrowseDetail;
