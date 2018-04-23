import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import {
  List,
  Item,
  Icon,
  Container,
  Button,
  Confirm
} from "semantic-ui-react";
import { METHODS } from "http";
import "./BrowseDetail.css";

const MenuBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  margin-left: 15%;
`;
const RecommendationListItem = props => (
  <MenuBar>
    <div>
      <Icon size="large" name="user circle" />
    </div>

    <div className="recommendation-table">
      <div>
        Recommender Name:{" "}
        {
          <span className="recommender-info">
            {props.recommendation.recommender_name}
          </span>
        }{" "}
      </div>
      <div>
        {
          <span className="recommender-info">
            {moment(props.recommendation.date_added).fromNow()}
          </span>
        }{" "}
      </div>
      <div>
        Comments:{" "}
        <span className="recommender-info">
          {" "}
          {props.recommendation.comment}
        </span>
      </div>
    </div>
  </MenuBar>
);

export default RecommendationListItem;
