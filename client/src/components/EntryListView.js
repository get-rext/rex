import React from "react";
import axios from "axios";
import { parseString } from "xml2js";
import { Search, Dropdown, Rating } from "semantic-ui-react";
import "./EntryListView.css";
import BookDetail from "./Entry/BookDetail";

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
    const options = {
      params: {
        id: data.result.id,
        key: "KB2ywbcnLjNO8pokkBVgg"
      }
    };
    const entries = this;
    axios
      .get("https://www.goodreads.com/book/show.xml", options)
      .then(res => {
        parseString(res.data, (err, result) => {
          const book = result.GoodreadsResponse.book[0];
          console.log(book.description[0].split("<br /><br />"));
          entries.setState({
            resultDetail: {
              title: book.title[0],
              rating: book.average_rating[0],
              id: data.result.id,
              authors: book.authors[0].author.map(obj => obj.name[0]),
              yearPublished: book.publication_year[0],
              description: book.description[0].split("<br /><br />"),
              imageUrl: book.image_url[0],
              link: book.link[0]
            }
          });
          console.log(entries.state.resultDetail);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  search(e, data) {
    e.preventDefault();
    const options = {
      params: {
        q: data.value,
        key: "KB2ywbcnLjNO8pokkBVgg"
      }
    };
    const entries = this;
    axios
      .get("https://www.goodreads.com/search/index.xml", options)
      .then(res => {
        parseString(res.data, (err, result) => {
          if (err) {
            return console.log(err);
          }
          const books = result.GoodreadsResponse.search[0].results[0].work.map(
            book => {
              const rating = Number(book.average_rating[0]);
              const otherInfo = book.best_book[0];
              return {
                title: otherInfo.title[0],
                rating: rating,
                id: Number(otherInfo.id[0]._),
                author: otherInfo.author[0].name[0],
                imageUrl: otherInfo.small_image_url[0]
              };
            }
          );
          entries.setState({
            results: books
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.resultDetail) {
      return <BookDetail result={this.state.resultDetail} />;
    } else {
      return (
        <div>
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
        </div>
      );
    }
  }
}

export default EntryListView;
