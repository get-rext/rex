import React from 'react';
import { Rating } from 'semantic-ui-react';
import './EntryListView.css';

const EntryListEntry = (props) => {
  if (props.category === 'books') {
    return (
      <div className="search-entry" onClick={() => { props.handleClick({}, props.data) }}>
        <img className="book-image result-image" src={props.data.imageUrl} alt="book thumbnail" />
        <div className="book-data result-data">
          <h4>{props.data.title}</h4>
          <p>{props.data.author}</p>
          <Rating size="medium" maxRating={5} defaultRating={props.data.rating} disabled icon="star" />
        </div>
      </div>
    );
  } else if (props.category === 'food') {
    return (
      <div className="search-entry" onClick={() => { props.handleClick({}, props.data) }}>
        <img className="restaurant-image result-image" src={props.data.imageUrl} height="130" width="130" alt="restaurant thumbnail" />
        <div className="restaurant-data result-data">
          <h4>{props.data.name}</h4>
          <Rating size="medium" maxRating={5} defaultRating={props.data.rating} disabled icon="star" />
          <p>{props.data.location[0]}</p>
          <p>{props.data.location[1]}</p>
        </div>
      </div>
    );
  } else if (props.category === 'music') {
    return (
      <div className="search-entry" onClick={() => { props.handleClick({}, props.data) }}>
        <img className="music-image result-image" src={props.data.album.images[0].url} height="130" width="130" alt="restaurant thumbnail" />
        <div className="musid-data result-data">
          <h4>{props.data.name}</h4>
          <Rating size="medium" maxRating={5} defaultRating={props.data.rating} disabled icon="star" />
          <p>{props.data.artist[0].name}</p>
          <p>{props.data.album.name}</p>
        </div>
      </div>
    );
  }
  return <div />;
};

export default EntryListEntry;
