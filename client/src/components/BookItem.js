import moment from 'moment';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Popup, Image } from 'semantic-ui-react';
import rex from '../images/rex.svg';

import './BookItem.css';

const BookItemContainer = styled.div`
  display: flex;
  height: auto;
  border-bottom: 3px solid #2185d0;
  padding: 15px;
  overflow: hidden;
`;

class BookItem extends Component {
  state = {
    category: '',
    imageStatus: 'loading',
    open: false,
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;
    const {
      id,
      book,
      recommendations,
      markCompleted,
      deleteBook,
      category,
      handleClick,
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
          <div>
            <Popup
              key={id}
              trigger={<Image src={rex} avatar />}
              content={`Recommended by ${rexers}`}
            />
          </div>
          <div className="book-detail-container">
            <div className="book-title-container">
              <h2 className="book-title" onClick={handleClick}>
                <Link to={{ pathname: `/browse/${id}`, query: { book, id, recommendations } }}>
                  {title}
                </Link>
              </h2>
            </div>
          </div>
          <div className="book-action-container">
            <Icon
              name="check"
              className="book-option"
              onClick={() => markCompleted({ category, id })}
              size="big"
            />
          </div>
        </BookItemContainer>
      </li>
    );
  }
}

export default BookItem;
