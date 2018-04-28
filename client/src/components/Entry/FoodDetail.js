import React from 'react';
import { Rating, Header, Container, Image } from 'semantic-ui-react';

const FoodDetail = (props) => {
  const {
    name, rating, id, url, phone, location, photos, price, categories,
  } = props.result;
  return (
    <div>
      <Container>
        <Header as="a" size="huge" href={url}>
          {name}
        </Header>
        <p>{categories.map(category => (`${category.title} `))}</p>
        <Rating defaultRating={rating} size="huge" icon="star" disabled maxRating={5} />
        <Header size="small">{phone}</Header>
        <Header>{location.map(loc => (<div>{loc}</div>))}</Header>
        {photos.map(photo => (<Image as="a" href={url} src={photo} size="medium" floated="left" />))}
      </Container>
    </div>
  );
};

export default FoodDetail;
