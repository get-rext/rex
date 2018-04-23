// React
import React, { Component } from 'react';
// Styling
import styled from 'styled-components';
import { Container, Header, Icon, Menu } from 'semantic-ui-react';
import swal from 'sweetalert2';
import './BrowseView.css';
// Components
import NavBar from './NavBar';
import SortMenu from './SortMenu';
import BookItem from './BookItem';
import BrowseDetail from './Browse/BrowseDetail';

const BookList = styled.ul`
  width: 100%;
  padding: 5px;
  list-style: none;
`;

class BrowseView extends Component {
  state = {
    userId: 3,
    activeItem: 'Recommendations',
    books: {},
    bookOrder: [],
    showCompleted: false,
    clickedBook: {},
    clickedRecommendations: [],
    detailedView: false,
  };

  populateBooks() {
    const category = 'books';
    const { userId } = this.state;
    // Use 'category' and 'categoryItems' to eventually add other categories
    // For now, category and sort is hard-coded to books

    fetch(`/u/${userId}/${category}`)
      .then(res => res.json())
      .then(categoryItems => {
        this.setState({
          [category]: categoryItems,
          bookOrder: Object.entries(categoryItems).map(([key, val]) => key),
        });
      })
      .catch(err => {
        throw err;
      });
  }

  deleteBook = deletedInfo => {
    // Pop-up asking for delete confirmation
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.value) {
        // On confirmation, send DELETE request to server
        const { category, id } = deletedInfo;
        const { userId } = this.state;

        fetch(`/u/${userId}/${category}/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            // On server response, delete item from state
            const categoryItems = this.state[category];
            const bookOrder = this.state.bookOrder.filter(bookId => bookId !== id);

            delete categoryItems[id];

            this.setState({
              [category]: categoryItems,
              bookOrder,
            });
          })
          .catch(err => console.log('delete unsuccessful', err));
      }
    });
  };

  markCompleted = itemInfo => {
    const { userId } = this.state;
    const { category, id } = itemInfo;

    // Rating pop-up
    swal({
      title: 'Rate the recommendation:',
      showCancelButton: true,
      type: 'question',
      input: 'range',
      inputAttributes: {
        min: 0,
        max: 5,
        step: 0.5,
      },
      inputValue: 2.5,
    }).then(result => {
      if (result.value) {
        // If rating confirmed, update in server
        fetch(`/u/${userId}/${category}/${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify({
            status: 'completed',
            rating: result.value,
          }),
        })
          .then(res =>
            // Update rating / status in state
            this.setState({
              [category]: {
                ...this.state[category],
                [id]: {
                  ...this.state[category][id],
                  book: {
                    ...this.state[category][id].book,
                    status: 'completed',
                    rating: result.value,
                  },
                },
              },
            }),
          )
          .catch(err => console.log('insert failed'));
      }
    });
  };

  componentDidMount() {
    this.populateBooks();
  }

  handleCompletedClick = (e, { name }) =>
    this.setState({ showCompleted: !this.state.showCompleted });

  // When menu sort option clicked
  handleItemClick = (e, { name }) => {
    const sortType = name;
    const bookArray = Object.entries(this.state.books);

    this.setState({ activeItem: name });

    const getLastRecDate = recommendationsArray => {
      return recommendationsArray.reduce((latestDate, rec) => {
        return Math.max(new Date(rec.date_added), latestDate);
      }, new Date(recommendationsArray[0].date_added));
    };

    const sortBooksByRecDate = (book1, book2) => {
      const book1LastRecDate = getLastRecDate(book1[1].recommendations);
      const book2LastRecDate = getLastRecDate(book2[1].recommendations);

      if (sortType === 'Newest') {
        return book2LastRecDate - book1LastRecDate;
      } else if (sortType === 'Oldest') {
        return book1LastRecDate - book2LastRecDate;
      }
    };

    // set state with the newly sorted array of books
    const sortedArray = bookArray.sort(sortBooksByRecDate).map(([id, book]) => id);

    console.log(sortedArray);

    this.setState({
      bookOrder: sortedArray,
    });
  };

  handleClick = ({ book, recommendations, id }) => {
    this.setState({
      detailedView: true,
      clickedBook: book,
      clickedRecommendations: recommendations,
      clickedId: id,
    });
  };

  render() {
    //const { category } = this.props;
    const category = 'books';
    const { activeItem, userId, showCompleted } = this.state;
    const { bookOrder } = this.state;

    return (
      <div>
        <NavBar />

        <Container>
          <Header as="h1" icon textAlign="center">
            <Icon name="book" circular />
            <Header.Content>Books</Header.Content>
          </Header>

          <SortMenu
            activeItem={activeItem}
            showCompleted={showCompleted}
            handleItemClick={this.handleItemClick}
            handleCompletedClick={this.handleCompletedClick}
          />

          <BookList>
            {bookOrder.length > 0 &&
              bookOrder.map(bookId => {
                const bookInfo = this.state.books[bookId];
                const { book, recommendations } = bookInfo;
                const recommendationCount = recommendations.length;
                const { showCompleted } = this.state;

                if (showCompleted || book.status === 'active') {
                  return (
                    <BookItem
                      handleClick={props => this.handleClick(props)}
                      id={bookId}
                      book={book}
                      recommendations={recommendations}
                      deleteBook={deletedInfo => this.deleteBook(deletedInfo)}
                      markCompleted={this.markCompleted}
                      category={category}
                    />
                  );
                }
              })}
          </BookList>
        </Container>
      </div>
    );
  }
}

export default BrowseView;
