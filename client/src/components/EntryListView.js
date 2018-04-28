// React
import React from 'react';
import { withRouter } from 'react-router-dom';
// Modules
import axios from 'axios';
import proxify from 'proxify-url';
import { Dropdown, Rating, Container, Input } from 'semantic-ui-react';
import _ from 'lodash';
// Components
import NavBar from './NavBar';
import './EntryListView.css';
import EntryListEntry from './EntryListEntry';
import NewRexButton from './NewRexButton';

// Category, searchbar, API results for adding recommendations
class EntryListView extends React.Component {
  constructor() {
    super();
    this.state = {
      category: 'books',
      // Format necessary for semanti-ui search dropdown
      categoryOptions: [
        {
          text: 'Books',
          value: 'books',
        },
        {
          text: 'Food',
          value: 'food',
        },
        {
          text: 'Music',
          value: 'music',
        }
      ],
      query: '',
      queryLocation: '',
      loading: false,
      results: [],
    };
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.search = _.debounce(this.search.bind(this), 300);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  // Brung up entryDetail when user selects book from search
  handleResultSelect(e, data) {
    const self = this;
    if (this.state.category === 'books') {
      const params = {
        id: data.apiId,
        key: process.env.READ_API,
      };
      // Proxify necessary for Goodreads CORS requests
      const url = proxify(
        `https://www.goodreads.com/book/show.xml?id=${params.id}&key=${params.key}`,
        { inputFormat: 'xml' },
      );

      axios
        .get(url)
        .then((res) => {
          const { book } = res.data.query.results.GoodreadsResponse;
          let authors;

          // Goodreads sends array for multiple authors, object for single
          if (Array.isArray(book.authors.author)) {
            authors = book.authors.author
              .map((author) => {
                // Goodreads includes illustrators, etc as 'authors'
                // Creates string of authors and their roles
                if (author.role) {
                  return `${author.name} (${author.role})`;
                }
                return author.name;
              })
              .join(', ');
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
                .split('<br /><br />')
                .map(paragraph => paragraph.replace(/<.*?>/gm, '')),
              imageUrl: book.image_url,
              link: book.link,
            },
          });

          // Reactrouting
          self.props.history.push({
            pathname: `/entry/${self.state.resultDetail.apiId}`,
            state: { result: self.state.resultDetail, category: self.state.category },
          });
        })
        .catch((err) => {
          throw err;
        });
    } else if (this.state.category === 'food') {
      axios
        .get('/helpers/food/details', {
          params: {
            id: data.id,
          },
        }).then((res) => {
          self.setState({
            resultDetail: {
              name: res.data.name,
              rating: res.data.rating,
              id: res.data.id,
              url: res.data.url,
              phone: res.data.display_phone,
              location: res.data.location.display_address,
              photos: res.data.photos,
              price: res.data.price,
              categories: res.data.categories,
            },
          });
          self.props.history.push({
            pathname: `/entry/${self.state.resultDetail.id}`,
            state: { result: self.state.resultDetail, category: self.state.category },
          });
        });
    } else if (this.state.category === 'music') {
      self.props.history.push({
        pathname: `/entry/${data.id}`,
        state: { result: data, category: self.state.category },
      });
    }
  }

  search() {
    const data = this.state.query;
    this.setState({
      results: [],
      loading: true,
    });
    const that = this;

    if (this.state.category === 'books') {
      const params = {
        q: data.replace(/\s+/g, '-'),
        key: process.env.READ_API,
      };
      // Proxified URL (for goodReads Cors requests)
      const url = proxify(
        `https://www.goodreads.com/search/index.xml?q=${params.q}&key=${params.key}`,
        { inputFormat: 'xml' },
      );

      axios.get(url).then((res) => {
        const resultItems = res.data.query.results.GoodreadsResponse.search.results.work;
        const books = resultItems.map(book => ({
          title: book.best_book.title,
          rating: Number(book.average_rating),
          apiId: Number(book.best_book.id.content),
          author: book.best_book.author.name,
          imageUrl: book.best_book.image_url,
        }));

        that.setState({
          results: books,
          loading: false,
        });
      });
    } else if (this.state.category === 'food') {
      axios.get('/helpers/food', {
        params: {
          query: this.state.query,
          location: this.state.queryLocation,
        },
      }).then((results) => {
        const restaurants = results.data.businesses.map(restaurant => ({
          id: restaurant.id,
          name: restaurant.name,
          location: restaurant.location.display_address,
          rating: restaurant.rating,
          imageUrl: restaurant.image_url,
        }));
        that.setState({
          results: restaurants,
          loading: false,
        });
      });
    } else if (this.state.category === 'music') {
      axios.get('/helpers/spotify', {
        params: {
          song: this.state.query,
        },
      }).then((results) => {
        const songs = results.data.tracks.items.map(song => ({
          id: song.id,
          name: song.name,
          artist: song.artists,
          album: song.album,
          popularity: song.popularity,
          preview: song.preview_url,
          url: song.external_urls.spotify,
          uri: song.uri,
        }));
        that.setState({
          results: songs,
          loading: false,
        });
      });
    }
    if (this.state.query === '') {
      this.setState({ loading: false });
    }

  }

  //   // Beginning of using movies API
  //   else if (this.state.category === 'movies') {
  //     const params = {
  //       api_key: 'process.env.SOME_API_KEY_HERE',
  //       query: data.value,
  //     };
  //     axios
  //       .get('https://api.themoviedb.org/3/search/movie?', { params })
  //       .then(res => console.log(res.data))
  //       .catch(err => console.log(err));
  //   }
  // }

  handleDropDownChange(event, data) {
    this.setState({
      category: data.value,
      results: [],
    });
    this.search();
  }

  updateQuery(e) {
    this.setState({
      query: e.target.value,
    });
  }

  updateLocation(e) {
    this.setState({
      queryLocation: e.target.value,
    });
  }

  render() {
    let locationSearch = <div />;
    if (this.state.category === 'food') {
      locationSearch = (
        <Input
          className="search"
          icon={{ name: 'search', circular: true }}
          placeholder="Specify Location"
          loading={this.state.loading}
          onChange={(e) => { this.search(); this.updateLocation(e); }}
        />
      );
    } else { locationSearch = <div />; }

    return (
      <div>
        <NavBar loggedIn handleAuth={this.props.handleAuth} />
        <Container>
          <div className="page-title">
            <h1>Add New Rex</h1>
          </div>

          <Dropdown
            placeholder="Select Category"
            selection
            options={this.state.categoryOptions}
            onChange={this.handleDropDownChange}
          />
          <Input
            className="search"
            icon={{ name: 'search', circular: true }}
            placeholder="Search for Rec..."
            loading={this.state.loading}
            onChange={(e) => {
              this.search();
              this.updateQuery(e);
            }}
          />
          {locationSearch}
          <div className="results test">
            {this.state.results.map((res, i) => (
              <EntryListEntry
                data={res}
                key={i}
                category={this.state.category}
                handleClick={this.handleResultSelect}
              />
            ))}
          </div>
          <div className="newRecBuffer">
            <NewRexButton />
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(EntryListView);
