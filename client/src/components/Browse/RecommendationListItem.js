import React from "react";
import moment from "moment";
import { List, Item, Icon, Container } from "semantic-ui-react";

const RecommendationListItem = props => (
  <Container>
    <div>
      <Icon size="large" name="user circle" />
    </div>
    <Item.Content>
      <Item.Header>{props.recommendation.recommender_name}</Item.Header>
      <Item.Meta>
        <span className="date_added">
          {moment(props.recommendation.date_added).format("L")}
        </span>
        <span className="stay">
          {moment(props.recommendation.date_added).fromNow()}
        </span>
      </Item.Meta>
      <Item.Description>{props.recommendation.comment}</Item.Description>
    </Item.Content>
  </Container>

  // <div>
  //   <List horizontal>
  //     <List.Item>
  //       <List.Content>
  //         <List.Header>Date</List.Header>
  //         {moment(props.recommendation.date_added).format("L")}
  //       </List.Content>
  //     </List.Item>

  //     <List.Item>
  //       <List.Content>
  //         <List.Header>Recommender</List.Header>
  //         {props.recommendation.recommender_name}
  //       </List.Content>
  //     </List.Item>

  //     <List.Item>
  //       <List.Content>
  //         <List.Header>Comments</List.Header>
  //         {props.recommendation.comment}
  //       </List.Content>
  //     </List.Item>
  //   </List>
  // </div>
);

export default RecommendationListItem;
