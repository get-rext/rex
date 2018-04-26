import React from 'react';

import BookDetail from './BookDetail';
import RecommendationEntry from './RecommendationEntry';
import NavBar from '../NavBar';

const EntryDetail = (props) => {
  const target = props.location.state.result;
  const category = props.location.state.category;
  console.log(props.location.state.category);
  let detail;
  if (category === 'books') {
    detail = <BookDetail result={target} />;
  } else if (category === 'food') {
    detail = <FoodDetail result={target} />;
  } else if (category === 'music') {
    detail = <MusicDetail result={target} />
  }
  return (
    <div>
      <NavBar />
      <div>
        {detail}
      </div>
      <div>
        <RecommendationEntry entry={target} />
      </div>
    </div>
  );
};

export default EntryDetail;
