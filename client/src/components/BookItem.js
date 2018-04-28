import moment from 'moment';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Grid, Popup, Image, Button } from 'semantic-ui-react';

import './BookItem.css';

const BookItemContainer = styled.div`
  display: flex;
  height: auto;
  border-bottom: 3px solid #2185d0;
  padding: 15px auto;
  overflow: hidden;
`;

class BookItem extends Component {
  state = {
    category: '',
    imageStatus: 'loading',
  };

  render() {
    const {
      id,
      book,
      recommendations,
      markCompleted,
      deleteBook,
      category,
      handleClick,
      userId
    } = this.props;
    const { title, description, thumbnail_url } = book;
    const firstRecommender = recommendations[0];
    let rexers = recommendations.map(rec => rec.recommender_name);
    const lastRexer = rexers.pop();
    rexers = rexers.join(', ');
    if (rexers.length) {
      rexers += ` & ${lastRexer}`;
    } else {
      rexers = lastRexer;
    }
    return (
      <li>
        <BookItemContainer>
          <Grid columns={4}>
            <Grid.Row>
              <Grid.Column width={4} verticalAlign={'middle'}>
                <Image src={`${book.thumbnail_url}`} size="tiny" />
              </Grid.Column>
              <Grid.Column width={8} verticalAlign={'middle'}>
                <Link
                  className={'title'}
                  to={{ pathname: `/browse/${id}`, query: { book, id, recommendations, userId } }}
                >
                  {title}
                </Link>
              </Grid.Column>
              <Grid.Column width={2} floated={'right'} verticalAlign={'middle'}>
                <Popup
                  key={id}
                  trigger={
                    <Button
                      circular
                      className="upvote-item"
                      color="blue"
                      icon="thumbs up"
                      floated={'right'}
                    />
                  }
                  content={`Recommended by ${rexers}`}
                />
              </Grid.Column>
              <Grid.Column width={2} floated={'right'} verticalAlign={'middle'}>
                <Popup
                  key={id}
                  trigger={
                    <Button
                      circular
                      className="upvote-item"
                      color="green"
                      icon="check"
                      floated={'right'}
                      onClick={() => markCompleted({ category, id })}
                    />
                  }
                  content={'Mark complete'}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </BookItemContainer>
      </li>
    );
  }
}

export default BookItem;
