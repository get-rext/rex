import React from 'react';

import { List } from 'semantic-ui-react';

const RecommendationListItem = props => (
  <div>
    <List horizontal>
      <List.Item>
        <List.Content>
          <List.Header>Date</List.Header>
          {props.book.date}
        </List.Content>
      </List.Item>

      <List.Item>
        <List.Content>
          <List.Header>Recommender</List.Header>
          {props.book.recommender}
        </List.Content>
      </List.Item>

      <List.Item>
        <List.Content>
          <List.Header>Comments</List.Header>
          {props.book.comments}
        </List.Content>
      </List.Item>
    </List>
  </div>
);

export default RecommendationListItem;
