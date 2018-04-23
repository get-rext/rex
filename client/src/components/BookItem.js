import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import BookDetail from './Entry/BookDetail';
import './BookItem.css';

const BookItemContainer = styled.div`
  display: flex;
  height: auto;
  border: 1px solid grey;
  border-width: hairline;
  border-radius: 5px;
  padding: 15px;
  overflow: hidden;
`;

const BookItem = ({
  id,
  book,
  recommendations,
  markCompleted,
  deleteBook,
  category,
  handleClick,
}) => {
  const { title, description, thumbnail_url } = book;
  const firstRecommender = recommendations[0];

  return (
    <li>
      <BookItemContainer>
        <span className="recommender">Recommenders: {recommendations.length}</span>
        <div className="book-image-container">
          <img className="book-image" src={`${thumbnail_url}`} alt="" />
        </div>
        <div className="book-detail-container">
          <div className="book-title-container">
            <h2 className="book-title" onClick={handleClick}>
              <Link to={{ pathname: `/browse/${id}`, query: { book, id, recommendations } }}>
                {title}
              </Link>
            </h2>
            <p className="book-description">{description}</p>
          </div>
          <div className="book-recommender-container">
            <span className="book-recommender-name">Recommended By:</span>{' '}
            {firstRecommender.recommender_name} <span className="book-recommended-date">Date:</span>{' '}
            {moment(firstRecommender.date_added).format('L')}
          </div>
        </div>
        <div className="book-action-container">
          <Icon name="check" onClick={() => markCompleted({ category, id })} size="big" />
          <Icon name="trash" onClick={() => deleteBook({ category, id })} size="big" />
        </div>
      </BookItemContainer>
    </li>
  );
};

export default BookItem;
