import React from 'react';
import { Rating, Header, Container, Image } from 'semantic-ui-react';
import CheckOutButton from '../Forms/CheckOutButton';

const BookDetail = (props) => {
  const {
    title, authors, rating, imageUrl, description, yearPublished, link,
  } = props.result;
  return (
    <div>
      <Container>
        <Header as="a" size="huge" href={link}>
          {title}
        </Header>
        <Header size="small">{authors}</Header>
        <Rating defaultRating={rating} icon="star" disabled maxRating={5} />
        <span>{rating}</span>
        <Image as="a" href={link} src={imageUrl} size="small" floated="left" />
        {description.map(paragraph => <p>{paragraph}</p>)}
        <p>Year Published: {yearPublished}</p>
        <CheckOutButton url="link" />
      </Container>
    </div>
  );
};

export default BookDetail;
