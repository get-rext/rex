import React from "react";
import { Rating, Header, Container, Image } from "semantic-ui-react";

const BookDetail = props => {
  const {
    title,
    authors,
    rating,
    imageUrl,
    description,
    yearPublished,
    link,
    apiId
  } = props.result;
  return (
    <div>
      <Container>
        <Header as="a" size="huge" href={link}>
          {title}
        </Header>
        <Header size="small">{authors.join(", ")}</Header>
        <Rating defaultRating={rating} icon="star" disabled maxRating={5} />
        <span>{rating}</span>
        <Image as="a" href={link} src={imageUrl} size="small" floated="left" />
        {description.map(paragraph => <p>{paragraph}</p>)}
        <p>Year Published: {yearPublished}</p>
      </Container>
    </div>
  );
};

export default BookDetail;
