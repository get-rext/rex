import React from "react";
import BookDetail from "./BookDetail";
import RecommendationEntry from "./RecommendationEntry";

const EntryDetail = props => (
  <div>
    <BookDetail image={props.params} />
    <RecommendationEntry />
  </div>
);

export default EntryDetail;
