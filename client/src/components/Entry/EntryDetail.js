import React from 'react';

import BookDetail from './BookDetail';
import FoodDetail from './FoodDetail';
import MusicDetail from './MusicDetail';
import RecommendationEntry from './RecommendationEntry';
import NavBar from '../NavBar';

const EntryDetail = (props) => {
  const target = props.location.state.result;
  const { category } = props.location.state;
  let detail;
  if (category === 'books') {
    detail = <BookDetail result={target} />;
  } else if (category === 'food') {
    detail = <FoodDetail result={target} />;
  } else if (category === 'music') {
    detail = <MusicDetail result={target} />;
  }
  return (
    <div>
      <NavBar />
      <div>
        {detail}
      </div>
      <div>
        <RecommendationEntry userId={props.userId} entry={target} category={category} />
      </div>
    </div>
  );
};

export default EntryDetail;
