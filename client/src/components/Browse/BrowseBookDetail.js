import React from "react";
import { Header, Container, Image } from "semantic-ui-react";

const BrowseBookDetail = props => {
  const { title, thumbnail_url, description, url } = props.book;

  return (
    <div>
      <Container>
        <Header as="a" size="huge" href={url}>
          {title}
        </Header>
        <Image
          as="a"
          href={url}
          src={thumbnail_url}
          size="small"
          floated="left"
        />
        {<p>{description}</p>}
      </Container>
    </div>
  );
};

export default BrowseBookDetail;
