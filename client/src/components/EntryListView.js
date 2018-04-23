import React from "react";
import axios from "axios";
import proxify from "proxify-url";
import { Search, Dropdown, Rating, Container } from "semantic-ui-react";
import BookDetail from "./Entry/BookDetail";
import EntryDetail from "./Entry/EntryDetail";
import NavBar from "./NavBar";
import "./EntryListView.css";
import _ from "lodash";

class EntryListView extends React.Component {
  constructor() {
    super();
    this.state = {
      category: "books",
      categoryOptions: [
        {
          text: "books",
          value: "books"
        },
        {
          text: "movies",
          value: "movies"
        }
      ],
      results: [],
      resultDetail: false
    };
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.search = this.search.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.renderResult = this.renderResult.bind(this);
  }

  renderResult(result) {
    if (this.state.category === "books") {
      return (
        <div>
          <img className="entry-image" src={result.imageUrl} />
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
    } else if (this.state.category === "movies") {
      return (
        <div>
          <img
            className="entry-image"
            src={"https://image.tmdb.org/t/p/w500"}
          />
        </div>
      );
    }
  }

  handleResultSelect(e, data) {
    const params = {
      id: data.result.apiId,
      key: "KB2ywbcnLjNO8pokkBVgg"
    };
    const self = this;
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
        let authors;
        if (Array.isArray(book.authors.author)) {
          authors = book.authors.author
            .map(author => {
              if (author.role) {
                return `${author.name} (${author.role})`;
              }
              return author.name;
            })
            .join(", ");
        } else {
          authors = book.authors.author.name;
        }
        self.setState({
          resultDetail: {
            title: book.title,
            rating: book.average_rating,
            apiId: book.id,
            authors,
            yearPublished: book.publication_year,
            description: book.description
              .split("<br /><br />")
              .map(paragraph => paragraph.replace(/<.*?>/gm, "")),
            imageUrl: book.image_url,
            link: book.link
          }
        });
        self.props.history.push({
          pathname: `/entry/${self.state.resultDetail.apiId}`,
          state: { result: self.state.resultDetail }
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  search(e, data) {
    e.preventDefault();
    this.setState({
      results: []
    });
    console.log("search fired", `category: ${this.state.category}`);
    if (this.state.category === "books") {
      const params = {
        q: data.value.replace(/\s+/g, "-"),
        key: "KB2ywbcnLjNO8pokkBVgg"
      };
      const self = this;
      const url = proxify(
        `https://www.goodreads.com/search/index.xml?q=${params.q}&key=${
          params.key
        }`,
        { inputFormat: "xml" }
      );

      axios.get(url).then(res => {
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
        self.setState({
          results: books
        });
      });
    } else if (this.state.category === "movies") {
      const params = {
        api_key: "9e1ab4f6c063b70843455bf3f7852d66",
        query: data.value
      };
      axios
        .get("https://api.themoviedb.org/3/search/movie?", { params: params })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }
  }

  handleDropDownChange(event, data) {
    this.setState({
      category: data.value
    });
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
          disabled
          icon="star"
        />
      </div>
    );
  }

  render() {
    const throttledSearch = _.debounce(this.search, 300);
    return (
      <div>  
        <NavBar />
        <Container>
          <div className="page-title">
            <h1>Add New Recommendations</h1>
          </div>

          <Dropdown
            placeholder="Select Category"
            selection
            options={this.state.categoryOptions}
            onChange={this.handleDropDownChange}
          />
          <Search
            onSearchChange={throttledSearch}
            results={this.state.results}
            resultRenderer={this.renderResult}
            onResultSelect={this.handleResultSelect}
          />
        </Container>
      </div>  
    );
  }
}

export default EntryListView;
