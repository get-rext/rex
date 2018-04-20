import React, { Component } from "react";
import moment from "moment";
import {
  List,
  Item,
  Icon,
  Container,
  Button,
  Confirm
} from "semantic-ui-react";
import { METHODS } from "http";

class ConfirmHeader extends Component {
  state = { open: false };

  show = () => this.setState({ open: true });
  handleConfirm = () => {
    const {
      comment,
      date_added,
      recommender_name,
      recommender_id
    } = this.props.recommendation;
    const id = this.props.id;
    const removeItem = {
      comment,
      date_added,
      recommender_name,
      recommender_id,
      id
    };
    this.setState({ open: false });
    const userId = 3;
    const category = "books";
    //delete the entry from recommendation table, then update the state in the BrowseView (a long trip)
    console.log(
      "this.props.recommendations.length",
      this.props.recommendations.length
    );
    if (this.props.recommendations.length > 1) {
      fetch(`/u/${userId}/${category}/${id}`, {
        method: "DELETE",
        body: JSON.stringify(removeItem),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
        .then(res => {
          console.log("deleted from db removeItem!", removeItem);
          var newRecs = this.props.recommendations.filter(rec => {
            return (
              rec.recommender_name !== removeItem.recommender_name &&
              rec.comment !== removeItem.comment &&
              rec.date_added !== removeItem.date_added
            );
          });
          this.props.handleRemoveRec(newRecs);
        })
        .catch(err => {
          throw err;
        });
    }
  };

  handleCancel = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Icon name="trash" size="large" onClick={this.show} />
        <Confirm
          open={this.state.open}
          header="Remove the book from my list"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
}

const RecommendationListItem = props => (
  <Container>
    <span>
      <Icon size="large" name="user circle" />
    </span>

    <Item.Content>
      <Item.Header>
        Recommended by: {props.recommendation.recommender_name}
      </Item.Header>
      <Item.Meta>
        <span className="date_added">
          Date: {moment(props.recommendation.date_added).format("L")}
        </span>
        <ConfirmHeader
          handleRemoveRec={props.handleRemoveRec}
          id={props.id}
          recommendation={props.recommendation}
          recommendations={props.recommendations}
        />
      </Item.Meta>
      <Item.Description>
        Comments: {props.recommendation.comment}
      </Item.Description>
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
