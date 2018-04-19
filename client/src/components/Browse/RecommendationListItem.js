import React from "react";
import moment from "moment";
import { List } from "semantic-ui-react";

const RecommendationListItem = props => (
  <div>
    <List horizontal>
      <List.Item>
        <List.Content>
          <List.Header>Date</List.Header>
          {moment(props.recommendation.date_added).format("L")}
        </List.Content>
      </List.Item>

      <List.Item>
        <List.Content>
          <List.Header>Recommender</List.Header>
          {props.recommendation.recommender_name}
        </List.Content>
      </List.Item>

      <List.Item>
        <List.Content>
          <List.Header>Comments</List.Header>
          {props.recommendation.comment}
        </List.Content>
      </List.Item>
    </List>
  </div>
);

export default RecommendationListItem;
