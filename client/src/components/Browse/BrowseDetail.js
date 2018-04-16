import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import RecommendationListItem from './RecommendationListItem';
import BookDetail from '../Entry/BookDetail';

const CheckOutButton = () => <Button>Checkout</Button>;

const MarkAsCompleteButton = () => <Button>Mark as done</Button>;

const RemoveFromListButton = () => <Button>Remove from list</Button>;

const AddRecommenderButton = () => <Button>Add Recommender</Button>;

class BrowseDetail extends Component {
  constructor() {
    super();

    this.state = {
      books: [
        { date: '2/10/2018', recommender: 'Mike', comments: 'Like the story a lot!' },
        { date: '3/02/2018', recommender: 'Shu', comments: 'Fun to read!' },
        { date: '4/10/2018', recommender: 'Evan', comments: 'Interesting book!' },
      ],
    };
  }

  render() {
    return (
      <div>
        <header className="book-detail">
          <BookDetail />
        </header>
        <ul className="list-of-comments">
          {this.state.books.map(book => <RecommendationListItem book={book} />)}
        </ul>
        <div className="buttons">
          <CheckOutButton />
          <MarkAsCompleteButton />
          <RemoveFromListButton />
          <AddRecommenderButton />
        </div>
      </div>
    );
  }
}

export default BrowseDetail;
