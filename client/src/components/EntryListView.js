import React from "react";

import axios from "axios";
import proxify from "proxify-url";

import { Search, Dropdown, Rating, Container } from "semantic-ui-react";

import "./EntryListView.css";

import BookDetail from "./Entry/BookDetail";
import EntryDetail from "./Entry/EntryDetail";

class EntryListView extends React.Component {
  constructor() {
    super();
    this.state = {
      category: "books",
      results: [],
      resultDetail: false
    };
    this.search = this.search.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.renderResult = this.renderResult.bind(this);
  }

  renderResult(result) {
    return (
      <div>
        <img className="book-image" src={result.imageUrl} />
        <h4>{result.title}</h4>
        <p>{result.author}</p>
        <Rating
          size="tiny"
          maxRating={5}
          defaultRating={result.rating}
          disabled={true}
          icon="star"
        />
      </div>
    );
  }

  handleResultSelect(e, data) {
    const params = {
      id: data.result.apiId,
      key: "KB2ywbcnLjNO8pokkBVgg"
    };
    const entries = this;
    const url = proxify(
      `https://www.goodreads.com/book/show.xml?id=${params.id}&key=${
        params.key
      }`,
      { inputFormat: "xml" }
    );
    axios
      .get(url)
      .then(res => {
        const book = res.data.query.results.GoodreadsResponse.book;
        console.log("!!!!!!!!!!!!!", book);
        entries.setState({
          resultDetail: {
            title: book.title,
            rating: book.average_rating,
            apiId: book.id,
            authors: book.authors.author.map(author => {
              if (author.role) {
                return `${author.name} (${author.role})`;
              }
              return author.name;
            }),
            yearPublished: book.publication_year,
            description: book.description
              .split("<br /><br />")
              .map(paragraph => paragraph.replace(/<.*?>/gm, "")),
            imageUrl: book.image_url,
            link: book.link
          }
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  search(e, data) {
    e.preventDefault();
    const params = {
      q: data.value,
      key: "KB2ywbcnLjNO8pokkBVgg"
    };
    const entries = this;

    const url = proxify(
      `https://www.goodreads.com/search/index.xml?q=${params.q}&key=${
        params.key
      }`,
      { inputFormat: "xml" }
    );

    axios
      .get(url)
      .then(res => {
        const resultItems =
          res.data.query.results.GoodreadsResponse.search.results.work;
        const books = resultItems.map(book => {
          return {
            title: book.best_book.title,
            rating: Number(book.average_rating),
            apiId: Number(book.best_book.id.content),
            author: book.best_book.author.name,
            imageUrl: book.best_book.image_url
          };
        });
        entries.setState({
          results: books
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.resultDetail) {
      return <EntryDetail result={this.state.resultDetail} />;
    } else {
      return (
        <Container>
          <div className="page-title">
            <h1>Add Recommendations</h1>
          </div>

          <Dropdown
            placeholder="Select Category"
            selection
            options={[{ text: "books", value: "books" }]}
          />
          <Search
            onSearchChange={this.search}
            results={this.state.results}
            resultRenderer={this.renderResult}
            onResultSelect={this.handleResultSelect}
          />
        </Container>
      );
    }
  }
}

export default EntryListView;
